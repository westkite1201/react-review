import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from "mobx-react";
import './index.css';
import Root from './clients/Root';
import PostsStore from "./stores/posts";
import * as serviceWorker from './serviceWorker';

const posts = new PostsStore();
ReactDOM.render(
    <Provider posts = {posts}>
        <Root/>
    </Provider>
    , document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();
