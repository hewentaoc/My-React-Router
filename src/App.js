import React from 'react';
import { Route} from 'react-router'
import {BrowserRouter as Router} from 'react-router-dom';
export default function App() {
    return (
        <Router>
            <Route path='/a/b'   component={Comp1}></Route>
            <Route path='/'  component={Comp2}></Route>
        </Router>
    )
}

function Comp1(props) {
    console.log(props)
    return (
        <h1>Comp1</h1>
    )
}

function Comp2(props){
    console.log(props,22)
    return(
        <h1>Comp2</h1>
    )
}