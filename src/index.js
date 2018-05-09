import React from 'react';
import App from './App';
import { render } from 'react-dom';
import { Provider } from 'react-redux';

import configureStore from './store/configureStore'
import registerServiceWorker from './registerServiceWorker';

let store = configureStore()
render(
    <Provider store={store}>
        <App/>
    </Provider>,
    document.getElementById('root')
)

registerServiceWorker();