import {pathToRegexp} from 'path-to-regexp'

/**
 * 
 * @param {*} path 路径规则
 * @param {*} pathUrl 页面路径
 * @param {*} options 额外参数
 */
export default function matchPatch(path,pathUrl,options){
    const keys = [];
    let reg = pathToRegexp(path,keys,getOptions(options));
    let result = reg.exec(pathUrl);
    if(!result){
        return null;
    }
    let params = getParams(keys,[...result].slice(1))
    return {
        isExact: result[0] === pathUrl,
        params,
        path,
        url: result[0],
    }
}

function getParams(keys,group){
  let obj = {}
  keys.forEach((item,index)=>{
     let name = item.name;
     obj[name] = group[index];
  })
  return obj;
}



/**
 * 匹配options
 * @param {*} options 
 */
function getOptions (options) {
    let baseOptions = {
      sensitive:false,//区分大小写
      strict:false,//是否严格匹配最后一个斜杠
      exact:false,
    }
    let result = {
        ...baseOptions,
        ...options
    }
    return {
        sensitive:result.sensitive,
        strict:result.sensitive,
        end:result.exact 
    }
}
