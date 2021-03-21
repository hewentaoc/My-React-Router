import React from 'react'
import ctx from './context'
export default function withRouter(Comp) {
    return function(props){
        return (
            <ctx.Consumer>
                {(value)=>{
                    return <Comp {...value} {...props}/>
                }}
            </ctx.Consumer>
        )
    }
}
