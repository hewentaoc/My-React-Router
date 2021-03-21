import Listener from './Listener'
import Block from './block'
export default function createBrowserHistory(options = {}) {
    const {
        basename = "",
        forceRefresh = false,
        keyLength = 6,
        getUserConfirmation = (message, callback) => callback(window.confirm(message))
    } = options;
    let listenrManage = new Listener();
    let blockManage = new Block(getUserConfirmation);
    let addListener = function(){//监听页面前进后退事件
        window.addEventListener('popstate',function(){
            const location = getLocation();
            const action = 'POP';
            listenrManage.triggerListener(location,action);
            history.location = location;
        })
    }
    addListener()
    let go = function(step){
        window.history.go(step);
    }
    let goBack = function(){
       window.history.back();
    }

    let goForward = function(){
        window.history.forward();
    }
    let listen = function(listener){
        return listenrManage.addListener(listener);
    }
    /**
     * 统一处理页面push,replace方法
     * @param {*} action 
     * @param {*} path 
     * @param {*} state 
     */
    let changePage = function(isPush,path,state) {
        let pathInfo = getPathInfo(path,state);
        let location = getLocationFromPath(pathInfo);
        let action = isPush == 'isPUSH' ? 'PUSH' : 'REPLACE';
        blockManage.triggerBlock(location,action,()=>{//触发页面阻塞事件的监听
            if(action == 'PUSH'){
                window.history.pushState({
                    state:pathInfo.state,
                    key:Math.random().toString(36).substr(2,5)
                },'',pathInfo.path)
            }
            if(action == 'REPLACE'){
                window.history.replaceState({
                    state:pathInfo.state,
                    key:Math.random().toString(36).substr(2,5)
                },'',pathInfo.path)
            }
            listenrManage.triggerListener(location,action)
            history.location = location;
            history.action = action;
        })
    }
    //
    let push = function(path,state){
        changePage('isPUSH',path,state);
    }
    
    let replace = function(path,state){
        changePage('isReplace',path,state)
    }
    let block = function(blocker) {
        return blockManage.addBlock(blocker);
    }
    let history = {
        action: "POP",
        block,
        go,
        goBack,
        goForward,
        length: window.history.length,
        listen,
        location:getLocation(),
        push,
        replace
    }
    return history;
}


/**
 * 初始化时候根据页面地址获取location信息
 * location:{
    hash: "",
    key: "xhscrl",
    pathname: "/a",
    search: "",
    state: {hwt: "c"}
}
 */
function getLocation(){
    let pathname = window.location.pathname;
    let search = window.location.search;
    let hash = window.location.hash;
    let state = window.history.state;
    let location = {
        hash,
        key:undefined,
        pathname,
        search,
        state
    }

    if(state == null) {
        state = undefined;
    }
    if(typeof state == 'object'){
        if('key' in state) {
            location.key = state.key;
        }
    }
    location.state = state;
    return location;
}

/**
 * 统一path,state的格式
 * @param {*} path {    pathname: "/b",    hash: "#abc",    search: "?a=1&b=2"}   
 * @param {*} state 
 */
function getPathInfo(path,state){
    if(typeof path == 'string'){
        console.log('sdd')
        return {
            path,
            state
        }
    }
    if(typeof path == 'object'){
        console.log(333,path)
        let {search = '', hash = '', pathname} = path;
        if(search && search.charAt(0) != '?'){
            search = '?' + search;
        }
        if(hash && hash.charAt(0) != '#'){
            hash = '#' + hash;
        }
        let resultPath = pathname + search + hash;
        return {
            path:resultPath,
            state
        }
    }
}

/**
 * 跳转路径获取location信息
 * @param {*} pathInfo 
 */
function getLocationFromPath(pathInfo){
    let {path = '',state = ''} = pathInfo;
    let searchIndex = path.indexOf('?');
    let hashIndex = path.indexOf('#');
    let pathname = pathInfo.path.replace(/[#?].*$/, "");
    let search;
    if(searchIndex < 0 || (searchIndex > hashIndex) && (hashIndex > 0)){
        search = ''
    }else{
        if(hashIndex > 0){
            search = path.substring(searchIndex,hashIndex);
        }else{
            search = path.substring(searchIndex);
        }
    }
    let hash;
    if(hashIndex < 0){
        hash = '';
    }else{
        hash = path.substring(hashIndex);
    }
    return {
        hash,
        pathname,
        search,
        state
    }
}

// let his = createBrowserHistory()
// console.log(111,window.his = his)
// his.listen((location,action)=>{
//     console.log('listen',location,action)
// })
// window.unblock = his.block('跳转?')
// his.push('/a/b?name=hwt##433','')
// console.log(444,getPathInfo('/a/b?name=hwt#1',''))

// console.log(555,getPathInfo({
//     pathname:'/a/b',
//     search:'name=hwt',
//     hash:'#888'
// },''))