import React, { Component } from 'react'
import {createBrowserHistory} from '../react-router/history/index';
import Router from '../react-router/Router'
export default class BrowserRouter extends Component {
    history = createBrowserHistory(this.props);
    render() {
        return (
           <Router history={this.history}>
               {this.props.children}
           </Router>
        )
    }
}
