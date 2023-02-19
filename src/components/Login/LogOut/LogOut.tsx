import './LogOut.scss';
import React, { FC } from 'react';
import Button from '../../UI/Button/Button';
import { usersService } from '../../../services/users/users.service';
import { authService } from '../../../services/auth/auth.service';

const LogOut: FC<{setIsLogged: (newState: boolean) => void}> = ({setIsLogged}) => {

    const onLogOut = () => {
        authService.logOut();
        setIsLogged(false);
        // setUser(null);
        // setDisplayOption(DISPLAY_OPTIONS.SIGN_IN);
        // setIsLogged(false);
    }

    return (
        <div className="logout-wrapper">
            <div>{ `Logged as ${ usersService.getActiveUser()?.email }` }</div>
            <Button onClick={ () => onLogOut() }>Log Out</Button>
        </div>
    );
}

export default LogOut;
