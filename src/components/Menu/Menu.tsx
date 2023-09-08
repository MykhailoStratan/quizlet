import { FC, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Button from '../UI/Button/Button';
import './Menu.scss';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { setDefaultMenu, setLoginMenu } from '../../store/actions/menuActions';

const Menu: FC = () => {
    const dispatch = useDispatch();
    const isLogged = useSelector((state: RootState) => state.login.isLogged);
    isLogged ? dispatch(setDefaultMenu()) : dispatch(setLoginMenu());

    const menu = useSelector((state: RootState) => state.menu.options);

    // const [activeOption, setActiveOption] = useState<string>(menuOptions[0]);
    const [backgroundBlur, setBackgroundBlur] = useState<boolean>(false);

    const location = useLocation();

    const getMenuOptionClassName = (menuOption: string) => {
        const currentLocation = location.pathname.replace('/','');
        const formattedLocation = currentLocation.toLowerCase().replaceAll(' ', '-')
        const formattedMenuOption = menuOption.toLowerCase().replaceAll(' ', '-')

        return formattedMenuOption === formattedLocation ? 'menu-option active' : 'menu-option';
    };

    const enableBackgroundBlur = () => {
        return setBackgroundBlur(true);
    };

    const disableBackgroundBlur = () => {
        return setBackgroundBlur(false);
    };

    // const setMenuOptionActive = (menuOption: string) => {
    //     setActiveOption(menuOption);
    // };

    return (
        <div className="menu">
            <div className="menu-burger">
                <input type="checkbox" onClick={ !backgroundBlur ? () => enableBackgroundBlur() : () => disableBackgroundBlur() } checked={ backgroundBlur }/>
                <div className={ backgroundBlur ? "menu-burger-background" : "menu-burger-background-hidden" }></div>
                <span></span>
                <span></span>
                <span></span>
                <ul>
                    { menu.map((option, index) => {
                        return <Link
                            to={ '/' + option.toLowerCase().replaceAll(' ', '-') }
                            key={ index }
                        >
                            <li
                                key={ index }
                                id={ index.toString() }
                            ><Button
                                className={ getMenuOptionClassName(option) }
                                onClick={ () => disableBackgroundBlur() }
                            >{ option }</Button>
                            </li>
                        </Link>
                    }) }    
                </ul>
            </div>
        </div>
    );
}

export default Menu;
