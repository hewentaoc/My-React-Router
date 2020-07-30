import {pathToRegexp} from 'path-to-regexp';

/**
 * 
 * @param {*} path 路径规则
 * @param {*} pathname  真实路径
 * @param {*} options exact，sensitive
 */
export default function matchPath(path,pathname,options){
    let regExp = pathToRegexp(path,[],getOptions(options)); //根据path得到正则
    let result = regExp.exec(pathname);
    console.log(333,result)
    if(!path){
        return;
    }

    return {
       isExact:"",
       params:{},
       path:'',
       url:'', 
    }
}
matchPath('/a/:id','/a/b/c');

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