import React, { ReactNode, useState } from 'react';
import './MultiSelectDropdown.scss';

interface Item {
    [key: string]: any
}

interface MultiSelectDropdownProps {
    items: Item[];
    placeholder?: string;
    isDisabled?: boolean,
    label: string,
    id: string,
    fieldName: string,
    disableCreate: boolean
    isMultiSelect: boolean
}

const MultiSelectDropdown: React.FC<MultiSelectDropdownProps> = (
    { 
        items,
        placeholder,
        isDisabled,
        label,
        id,
        fieldName,
        disableCreate,
        isMultiSelect,
    }) => {
    
    const [selectedOptions, setSelectedOptions] = useState<Item[]>([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [isShowOptionList, setIsShowDisplayList] = useState<boolean>(false);

    const handleOnChange = (term: string) => {
        setSearchTerm(term);
        setIsShowDisplayList(true);
    }

    const handleSelectedItem = (selectedItem: any) => {
        const isIncludeSelectedItem = selectedOptions.find(item => item['name'] === selectedItem.name);
        if (isMultiSelect && !isIncludeSelectedItem) {
            setSelectedOptions([...selectedOptions, selectedItem]);
        } else {
            setSelectedOptions([selectedItem]);
        }

        setIsShowDisplayList(false);
    }

    const filterOptions = (): ReactNode => {
        if (searchTerm.length <= 1) {
            return items.map((item, index) => <li onClick={() => handleSelectedItem(item)} key={index}>{item?.name}</li>);
        }

        return items.filter((item) =>
            item?.name.toLowerCase().includes(searchTerm.toLowerCase()))
            .map((filteredItem, index) => <li onClick={() => handleSelectedItem(filteredItem)} key={index}>{filteredItem.name}</li>);
    }

    const renderSearchItems = (): ReactNode => {
        const filteredItems = filterOptions();

        return (
            <ul>
            {filteredItems}
            </ul>
        );
    } 

    // Add new items to the item list
    const addNewItem = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter' && !disableCreate) {
            if (searchTerm.trim() !== '' && !items.some(item => item.name === searchTerm)) {
                const newId = Math.max(...items.map(item => item.id)) + 1;
                const newItem = { name: searchTerm, id: newId, icon: '' };
                items.push(newItem);
                handleSelectedItem(newItem);
            }
        }
    }
    
    return (
        <>
            <div>
                <label>{label}</label>
            </div>
            <div className="dropdown-container">
                <input
                    type='text'
                    className="dropdown-input"
                    name={fieldName}
                    id={id}
                    placeholder={placeholder}
                    value={searchTerm}
                    onChange={(e) => handleOnChange(e.target.value)}
                    onKeyDown={(e) => addNewItem(e)}
                    disabled={isDisabled}
                />
                <div className="selected-options">
                    {selectedOptions.map((item, index) => (
                        <span key={index}>{item.name}, </span>
                    ))}
                </div>
                {isShowOptionList && <div className='option-container'>
                    {renderSearchItems()}
                </div>}
            </div>
            
        </>
    );
    
}

export default MultiSelectDropdown;

