import React, { Component } from 'react'
import propTypes from 'prop-types';
import ctx from './context';
import matchPath from './matchPath'
export default class Router extends Component {
    static propTypes = {
        history:propTypes.object,
        children:propTypes.node
    }
    state = {
        location: this.props.history.location
    }
    componentDidMount() {
        //监听页面地址的变化,让上下文更新
        this.props.history.listen((location,action)=>{
            this.setState({
                location:location
            })
        })
    }
    render() {
        /**
         * 每次location改变都需要改变上下文，让组件重新匹配
         */
        let ctxObj = {
            history:this.props.history,
            location:this.state.location,
            match:matchPath('/',window.location.pathname,{})
        }
        return (
            <ctx.Provider value={ctxObj}>
                {this.props.children}
            </ctx.Provider>
        )
    }
}
