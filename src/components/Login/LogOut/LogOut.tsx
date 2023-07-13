import './LogOut.scss';
import editUserImgUrl from '../../../assets/icons8-edit-64.png'
import logOutImgUrl from '../../../assets/logout-svgrepo-com.svg'
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
            <img 
                className="logout-user-edit" 
                src={ editUserImgUrl }
                alt="edit user" 
                onClick={ () => navigate('/user') }/>
            <div className="logout-email">{ usersService.getActiveUser()?.email }</div>
            <Button className="logout-btn-text" onClick={ () => onLogOut() }>Log Out</Button>
            <Button className="logout-btn-img" onClick={ () => onLogOut() }>
                <img src={ logOutImgUrl } alt="Log Out" />
            </Button>
        </div>
    );
}

export default LogOut;
