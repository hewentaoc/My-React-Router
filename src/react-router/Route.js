import React, { Component } from 'react'
import ctx from './context'
import mathPath from './matchPath'
export default class Route extends Component {
    renderChild = (ctxContext)=>{//根据路径匹配信息，渲染组件
        if(this.props.children != undefined){
           return this.props.children
        }
        if(!ctxContext.match){
            return null;
        }
        if(this.props.render){
            return this.props.render();
        }
        if(this.props.component){
            const Component = this.props.component;
            return <Component {...ctxContext} />
        }
    }
    mathRouter = (location)=>{
        let path = this.props.path || '/';
        let { sensitive = false,strict = false, exact = false} = this.props;
        return mathPath(path,location.pathname,{
            sensitive,
            strict,
            exact
        })
    }
    providerFunc = (value)=>{
        let {history,location} = value;
        let ctxContext = {
            history,
            location,
            match:this.mathRouter(location)//重新生成match对象
        }
        return (
            <ctx.Provider value={ctxContext}>
                {this.renderChild(ctxContext)}
            </ctx.Provider>
        )
    }
    render() {
        return (
            <ctx.Consumer>
                {this.providerFunc}
            </ctx.Consumer>
        )
    }
}
