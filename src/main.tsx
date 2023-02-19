import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { dictionaryService } from './services/dictionary/dictionary.service';
import { firebaseActions } from './firebase/firebase.actions';
import { usersService } from './services/users/users.service';

(async () => {
    await usersService.initialize();
    await dictionaryService.initialize(firebaseActions);

    ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
        <React.StrictMode>
            <App></App>
        </React.StrictMode>,
    )
})();
