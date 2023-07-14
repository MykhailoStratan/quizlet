import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { dictionaryService } from './services/dictionary/dictionary.service';
import { firebaseActions } from './firebase/firebase.actions';
import { usersService } from './services/users/users.service';
import './index.css'
import { store } from './store/store';
import { Provider } from 'react-redux';

(async () => {
    await usersService.initialize();
    await dictionaryService.initialize(firebaseActions);

    ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
        <Provider store={store}>
            <React.StrictMode>
                <App></App>
            </React.StrictMode>
        </Provider>
        
    )
})();
