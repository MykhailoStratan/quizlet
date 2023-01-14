import { FC, useState } from 'react';
import './Menu.scss';
import { Link } from 'react-router-dom';
import Button from '../UI/Button/Button';
// @ts-ignore
import {firebaseConfig} from '../../firebase/firebase';

type MenuProps = {
    menuOptions: string[];
};

const Menu: FC<MenuProps> = ({ menuOptions }) => {
    const menu = menuOptions.map((option, index) => {
        return {
            name: option,
            id: index,
        }
    });

    const [activeMenuId, setActiveMenuId] = useState(0);

    const menuOptionClass = (id: number) => {
        return id === activeMenuId ? 'menu-option' : 'menu-option active';
    };
    const menuClick = (id: number) => {
        setActiveMenuId(id);
    };

    return (
        <div className="menu">
            <ul>
                {menu.map(option => {
                    return <Link
                        to={'/' + option.name.toLowerCase().replaceAll(' ', '-')}
                        key={option.id}
                    >
                        <li
                            key={ option.id }
                            id={ option.id.toString() }
                        ><Button
                            className={ menuOptionClass(option.id) }
                            onClick={ () => menuClick(option.id) }
                        >{ option.name }</Button>
                        </li>
                    </Link>
                })}
            </ul>
        </div>
    );
}

export default Menu;
