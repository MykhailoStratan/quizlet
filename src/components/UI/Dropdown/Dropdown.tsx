import { FC, useEffect, useState } from 'react';
import './Dropdown.scss';

interface DropdownProps {
    list: (string | number)[];
    onClick?: (event: React.MouseEvent<HTMLDivElement>) => void;
}

const Dropdown: FC<DropdownProps> = ({list}) => {
    const [dropdownVisibile, setDropdownVisible] = useState<boolean>(false);
    console.log(list)
    const [selectedItem, setSelectedItem] = useState<(string|number)>(list[0]);

    function handleSelection(item: (string|number)) {
        setDropdownVisible(false);
        setSelectedItem(item);
    };

    function switchDropdownVisibilityClass() {
        return dropdownVisibile ? 'dropdown-list-visible' : 'dropdown-list-hidden';
    }
    
    useEffect(
        () => {
            setSelectedItem(list[0]);
        }
    , [list]);

    return (
        <div className='dropdown-wrapper'>
            <p className='dropdown-list-item-single'>{ selectedItem }</p>
            { dropdownVisibile 
            ? <ul className={ switchDropdownVisibilityClass() }
                >
                
                     {list.map((element, index) => {
                        return <li 
                            className='dropdown-list-item-multiple'
                            key={ index }>
                                <button 
                                    onClick={ () => handleSelection(element) }>{ element }</button>
                            </li>
                    })
                    
                }
            </ul>
            : null }
            <button 
                className='dropdown-button' 
                onClick={() => setDropdownVisible(!dropdownVisibile)}>▼</button>
        </div>
    );
}

export default Dropdown;