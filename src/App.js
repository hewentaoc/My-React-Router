import React, { Component }  from 'react';
// import { Route} from 'react-router'
// import {BrowserRouter,Link,NavLink,Switch} from 'react-router-dom';
// import './react-router/matchPath'
// import './react-router/history'

import {BrowserRouter} from './react-router-dom/index'
import Route from './react-router/Route'
import Switch from './react-router/Switch'
import Link from './react-router/Link'
import NavLink from './react-router/NavLink'
import './index.css'
export default function App() {
    return (
        <BrowserRouter>
            <Switch>
                <Route path='/:a/:b'   component={Comp1}></Route>
                <Route path='/'  component={Comp2}></Route>
            </Switch>
            <li>
                <Link to={{
                    pathname: "/page1",
                    search: "?a=1&b=2"
                }}>跳转到页面1</Link>
            </li>
            <li>
                <NavLink to="/page2">跳转到页面2</NavLink>
            </li>
        </BrowserRouter>
    )
}
class Comp1 extends Component {
    componentDidMount() {
        console.log(this.props.history)
        this.props.history.listen(function(location,action){
            console.log(location,action)
        })
        this.props.history.block(()=>{
            return '111'
        })
    }
    render() {
        return (
            <div>
              <h1>Comp1</h1>
                
            </div>
        )
    }
}

class Comp2 extends Component {
    componentDidMount() {
        console.log(this.props.history)
        this.props.history.listen(function(location,action){
            console.log(location,action)
        })
    }
    render(){
        let {props} = this;
        return(
            <>
            <h1>Comp2</h1>
            <button onClick={()=>{
                props.history.push('/a/b');
            }}>Click</button>
            <button onClick={()=>{
                props.history.push('/a',{hwt:'c'});
            }}>Back</button>
            </>
        )
    }
}