import React from 'react'
import Link from './Link';
import ctx from './context'
import { parsePath } from "history"
import mathPath from './matchPath'
export default function NavLink(props) {
    const {
        activeClass = "active",
        exact = false,
        strict = false,
        sensitive = false,
        ...rest } = props
    return (
        <ctx.Consumer>
            {
              (value)=>{
                  let loc = {}; //保存to中的locaiton对象
                　//参数转换成{pathname:/a/b}
                  if (typeof props.to === "string") {
                      loc = parsePath(props.to);
                  }else{
                      loc.pathname = props.to;
                  }
                  let result = mathPath(loc.pathname,value.location.pathname,{exact,strict,sensitive})
                  if(result){
                    return   <Link  className={activeClass} {...rest}/>
                  }else{
                     return  <Link  {...rest} />
                  }
              }
            }
        </ctx.Consumer>
    )
}
