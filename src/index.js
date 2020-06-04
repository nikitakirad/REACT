import ReactDOM from 'react-dom';
import React from 'react';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import {createStore,applyMiddleware} from 'redux';
import authReducer from './store/reducers/auth';
import 'semantic-ui-css/semantic.min.css';
import {BrowserRouter} from 'react-router-dom';

const store=createStore(authReducer,
    applyMiddleware(thunk));

const app = (
    <Provider store={store}>
    <BrowserRouter>
        <App />
    </BrowserRouter>
    </Provider>
    
);
ReactDOM.render(app,document.getElementById( 'root' ) );
registerServiceWorker();

