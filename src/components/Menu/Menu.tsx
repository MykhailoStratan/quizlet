import { FC, useState } from 'react';
import './Menu.scss';
import { Link } from 'react-router-dom';

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
        return id === activeMenuId ? '' : 'active';
    };
    const menuClick = (id: number) => {
        setActiveMenuId(id);
    };

    return (
        <div className="menu">
            <ul>
                {menu.map(option => {
                    return <li
                        key={ option.id }
                        id={ option.id.toString() }
                        className={ menuOptionClass(option.id) }
                        onClick={ () => menuClick(option.id) }
                    ><Link to={'/'+option.name.toLowerCase().replaceAll(' ', '-')}>{ option.name }</Link></li>
                })}
            </ul>
        </div>
    );
}

export default Menu;
