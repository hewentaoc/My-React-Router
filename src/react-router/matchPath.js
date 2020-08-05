import {pathToRegexp} from 'path-to-regexp';

/**
 * 
 * @param {*} path 路径规则       /a/:id
 * @param {*} pathname  真实路径  /a/b/c
 * @param {*} options exact，sensitive
 */
export default function matchPath(path,pathname,options){
    let keys = [];//存储用在路径中找到的键填充的数组:id
    let regExp = pathToRegexp(path,keys,getOptions(options)); //根据path得到正则
    let result = regExp.exec(pathname);//正则匹配真实路径
    //匹配失败
    if(!result){
        return;
    }
    let arr = Array.from(result);
    let group = arr.slice(1);
    let params = getParams(keys,group)
    console.log(555,params)
    return {
       isExact: pathname === result[0], //是否精确匹配
       params, //键填充的键值对:{id:a}
       path, //页面的路径规则
       url:result[0],  //匹配的路径
    }
}
// let test = matchPath('/a/:id/','/a/b/c/d');
// console.log(11,test);

/**
 * 将路由中的处理参数转化为path-to-regexp中的参数形式
 * @param {*} options 
 */
function getOptions(options){
    const defaultOptions = {
        exact:false,//默认不进行精确匹配
        sensitive: false, //默认不区分大小写
        strict: false, //默认不匹配 /
    }
    const opt = Object.assign({},defaultOptions,options);
    return {
        sensitive:opt.sensitive,
        strict: opt.strict,
        end: opt.exact
    }
}

/**
 * 得到params对象
 * @param {*} keys  存储用在路径中找到的键填充的数组
 * @param {*} group 键值对应的value数组
 */
function getParams(keys,group){
    let params = {}
    for(let i = 0 ; i < keys.length ; i++){
        let key = keys[i].name;
        params[key] = group[i];
    }
    return params;
}