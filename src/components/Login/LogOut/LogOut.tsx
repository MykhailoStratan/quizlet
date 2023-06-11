import './LogOut.scss';
import React, { FC } from 'react';
import Button from '../../UI/Button/Button';
import { usersService } from '../../../services/users/users.service';
import { authService } from '../../../services/auth/auth.service';
import { useNavigate } from 'react-router-dom';

const LogOut: FC<{setIsLogged: (newState: boolean) => void}> = ({setIsLogged}) => {
    const navigate = useNavigate();

    const onLogOut = () => {
        authService.logOut();
        setIsLogged(false);
        navigate('/login');
    };

    return (
        <div className="logout-wrapper">
            <div>{ usersService.getActiveUser()?.email }</div>
            <Button onClick={ () => onLogOut() }>Log Out</Button>
        </div>
    );
}

export default LogOut;
