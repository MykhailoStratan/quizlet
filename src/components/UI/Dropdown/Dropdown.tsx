import { FC, ReactNode, useEffect, useState } from 'react';
import './Dropdown.scss';

export type DropdownProps = {
    list: DropdownItem[];
    onChange?: (targetName: string) => void;
    className?: string;
}

export type DropdownItem = {
    itemName: any;
    selected: boolean;
}

const Dropdown: FC<DropdownProps> = ({list, onChange, className}) => {
    const [dropdownVisibile, setDropdownVisible] = useState<boolean>(false);
    console.log(list)
    const [selectedItem, setSelectedItem] = useState<DropdownItem | null>(list[0]);

    function handleSelection(item: DropdownItem) {
        setDropdownVisible(false);
        setSelectedItem(item);
        onChange ? onChange(item.itemName) : null;
        console.log(selectedItem)
    };

    function switchDropdownVisibilityClass() {
        return dropdownVisibile ? 'dropdown-list-visible' : 'dropdown-list-hidden';
    }
    
    useEffect(
        () => {
            const itemToBeSelected = list.find(listItem => listItem.selected === true);
            setSelectedItem(itemToBeSelected || list[0]);
        }
    , [list]);

    return (
        <div 
            className={ `dropdown-wrapper ${className}` }
            onClick={() => setDropdownVisible(!dropdownVisibile)}>
                <p className='dropdown-list-item-single'>{ selectedItem?.itemName }</p>
                { dropdownVisibile 
                ? <ul className={ switchDropdownVisibilityClass() }
                   >{ list.map((element, index) => {
                          return <li 
                                className='dropdown-list-visible-item-multiple'
                                key={ index }
                                onClick={ () => handleSelection(element) }>{ element.itemName }</li>
                        })
                    }</ul>
                : null }
            <button 
                className='dropdown-button'
                type="button">▼</button>
        </div>
    );
}

export default Dropdown;