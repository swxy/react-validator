/**
 * Created by swxy on 2017/4/1.
 */

import React from 'react';
import ReactDOM from 'react-dom';

import {AppContainer} from 'react-hot-loader';
// AppContainer is a necessary wrapper component for HMR

import SimpleForm from './simple-form';


ReactDOM.render(
    <AppContainer>
        <SimpleForm/>
    </AppContainer>,
    document.getElementById('app')
);


// Hot Module Replacement API
if (module.hot) {
    module.hot.accept();
    /*
     module.hot.accept('./loop', () => {
     // const NextLoop = require('./loop').default;
     // render(NextLoop)
     render(Loop);
     });*/
}