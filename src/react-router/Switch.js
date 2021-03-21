import React, { Component } from 'react'
import ctx from './context'
import Route from './Route'
import mathPath from './matchPath'
export default class Switch extends Component {
    
    switchRoute = (value)=>{
        let children = [];
        if(Array.isArray(this.props.children)){
            children = this.props.children;
        }else if(typeof this.props.children == 'object'){
            children = [this.props.children];
        }
        for (const cp of children) {
          if(cp.type != Route){
              throw new Error('must be a Route')
          }
          let { sensitive = false,strict = false, exact = false} = cp.props;
          if(mathPath(cp.props.path || '/',value.location.pathname,{ sensitive,strict, exact})){
                return cp;
           }
         }
        return null;
    }
    render() {
        return (
            <ctx.Consumer>
                {this.switchRoute}
            </ctx.Consumer>
        )
    }
}
