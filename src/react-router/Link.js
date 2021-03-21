import React from 'react'
import ctx from './context'
export default function Link(props) {
    let {to,...res} = props;
    return (
        <ctx.Consumer>
            {(value)=>{
              return (
               <a href={props.to} {...res} onClick={(e)=>{
                    e.preventDefault();
                    value.history.push(props.to)
                }}>
                    {props.children}
                </a>) 
            }}
        </ctx.Consumer>
    )
}
