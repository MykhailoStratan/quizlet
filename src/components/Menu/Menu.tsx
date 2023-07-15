import { FC, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Button from '../UI/Button/Button';
import './Menu.scss';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { setDefaultMenu, setLoginMenu } from '../../store/actions/menuActions';

interface MenuProps {
    menuOptions: string[];
}

const Menu: FC<MenuProps> = ({ menuOptions }) => {
    const dispatch = useDispatch();
    const isLogged = useSelector((state: RootState) => state.login.isLogged);
    isLogged ? dispatch(setDefaultMenu()) : dispatch(setLoginMenu());

    const menu = useSelector((state: RootState) => state.menu.options);

    const [activeOption, setActiveOption] = useState<string>(menuOptions[0]);
    const [backgroundBlur, setBackgroundBlur] = useState<boolean>(false);

    // const menu = menuOptions.map((option, index) => {
    //     return {
    //         name: option,
    //         id: index,
    //     }
    // });

    const location = useLocation();

    const getMenuOptionClassName = (menuOption: string) => {
        const currentLocation = location.pathname.replace('/','');
        const formattedLocation = currentLocation.toLowerCase().replaceAll(' ', '-')
        const formattedMenuOption = menuOption.toLowerCase().replaceAll(' ', '-')

        return formattedMenuOption === formattedLocation ? 'menu-option active' : 'menu-option';
    };

    const switchBackgroundBlur = () => {
        return setBackgroundBlur(!backgroundBlur);
    }

    const setMenuOptionActive = (menuOption: string) => {
        setActiveOption(menuOption);
    };

    return (
        <div className="menu">
            <div className="menu-burger">
                <input type="checkbox" onClick={ () => switchBackgroundBlur() } checked={ backgroundBlur }/>
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
                                onClick={ () => {setMenuOptionActive(option), switchBackgroundBlur()} }
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
