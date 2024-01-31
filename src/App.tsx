import React, { useState } from 'react';
import './App.css';
import MultiSelectDropdown from './lib/components/multi-select/MultiSelectDropdown';

function App() {
  const [items, setItems] = useState([
    { name: 'Education', id: 1, icon: '' },
    { name: 'Art', id: 2, icon: ''},
    { name: 'Sport', id: 3, icon: ''},
    { name: 'Games', id: 4 , icon: ''},
  ])

  return (
    <>
      <MultiSelectDropdown
        items={items}
        disableCreate={false}
        isDisabled={false}
        placeholder={"Type you key for search"}
        id={"multi-select"}
        label={"Select your favorites"}
        fieldName={"favorite"}
        isMultiSelect={true}
      />
    </>
  );
}

export default App;
