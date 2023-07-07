import { FC, useEffect } from 'react';
import './UserInfo.scss';
import { iUser } from '../../types/user.type';
import { UserFormElements } from '../Login/SignUp/SignUp';
import Dropdown, { DropdownItem } from '../UI/Dropdown/Dropdown';
import Button from '../UI/Button/Button';

interface UserInfoFormElement extends HTMLFormElement {
    readonly elements: UserFormElements;
}

const UserInfo: FC<{ activeUser: iUser }> = ({ activeUser }) => {
    const languageOptions: DropdownItem[] = [
        {itemName: 'EN', selected: true},
        {itemName: 'FR', selected: false},
    ]

    const updateUserInfo = async (event: React.FormEvent<UserInfoFormElement>) => {
        event.preventDefault();

        let { email, password, name, phone, surname, language } = event.currentTarget;

        email.value = activeUser.email;
        password.value = '';
        // @ts-ignore
        name.value = activeUser.name;
        phone.value = activeUser.phone;
        surname.value = activeUser.surname;
        language.value = activeUser.language;
    };

    return (
        <div className='user-form-wrapper'>
            <form className='user-form'>
                <label htmlFor="name">User Name:</label>
                <input id="name" type="text" value={activeUser.name}/>
                <label htmlFor="surname">Surname:</label>
                <input id="surname" type="text" value={activeUser.surname}/>
                <label htmlFor="email">Email:</label>
                <input id="email" type="email" value={activeUser.email}/>
                <label htmlFor="password">Password:</label>
                <input id="password" type="password" value={'********'}/>
                <label htmlFor="phone">Phone Number</label>
                <input id="phone" type="tel" value={activeUser.phone}/>
                <label htmlFor="language">Language:</label>
                <Dropdown className="user-form-language-dropdown" list={ languageOptions }/>
                {/* <input id="language" type="text" value={activeUser.language}/> */}
                <Button className="user-form-button">Update</Button>
            </form>
            
        </div>
    );
};

export default UserInfo;