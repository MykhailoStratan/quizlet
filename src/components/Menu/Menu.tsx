import { FC, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Button from '../UI/Button/Button';
import './Menu.scss';
import LogOut from '../Login/LogOut/LogOut';

interface MenuProps {
    menuOptions: string[];
    logOutSetter: (newState: boolean) => void;
}

const Menu: FC<MenuProps> = ({ menuOptions, logOutSetter }) => {
    const [activeOption, setActiveOption] = useState<string>(menuOptions[0]);

    const menu = menuOptions.map((option, index) => {
        return {
            name: option,
            id: index,
        }
    });

    const location = useLocation();

    const getMenuOptionClassName = (menuOption: string) => {
        const currentLocation = location.pathname.replace('/','');
        const formattedLocation = currentLocation.toLowerCase().replaceAll(' ', '-')
        const formattedMenuOption = menuOption.toLowerCase().replaceAll(' ', '-')

        return  formattedMenuOption === formattedLocation ? 'menu-option active' : 'menu-option';
    };

    const setMenuOptionActive = (menuOption: string) => {
        setActiveOption(menuOption);
    };

    return (
        <div className="menu">
            <div className="menu-burger">
                <input type="checkbox"/>
                <div className="menu-burger-background"></div>
                <span></span>
                <span></span>
                <span></span>
                <ul>
                    { menu.map(option => {
                        return <Link
                            to={ '/' + option.name.toLowerCase().replaceAll(' ', '-') }
                            key={ option.id }
                        >
                            <li
                                key={ option.id }
                                id={ option.id.toString() }
                            ><Button
                                className={ getMenuOptionClassName(option.name) }
                                onClick={ () => setMenuOptionActive(option.name) }
                            >{ option.name }</Button>
                            </li>
                        </Link>
                    }) }    
                </ul>
            </div>
        </div>
    );
}

export default Menu;
