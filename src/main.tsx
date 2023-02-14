import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { dictionaryService } from './services/dictionary/dictionary.service';
import { firebaseActions } from './firebase/firebase.actions';
import { iUser } from './types/user.type';
import { usersService } from './services/users/users.service';
// import { RouterProvider } from 'react-router-dom';
// import { router } from './router';

// const currentUser: iUser = {
//     id: '2023-02-08T22:25:45.828Z',
//     name: 'Alex',
//     firebaseId: 'active_user_id_x1c2v3',
//     dictionaries: [],
// };

await usersService.initialize();
const users = usersService.getUsers()

await dictionaryService.initialize(firebaseActions, users[0]);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App user={users[0]}></App>
  </React.StrictMode>,
)
