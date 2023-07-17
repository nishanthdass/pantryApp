import Select from 'react-dropdown-select';



export const SelectDrop = ({ options, onChange }) => (
    <Select
      options={options}
      onChange={onChange}
      type = "text"
      placeholder='item...'
    />
  );