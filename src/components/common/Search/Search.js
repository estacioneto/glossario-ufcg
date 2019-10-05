import React from 'react';
import './Search.css';
import { AutoComplete, Select } from 'antd';
import { Icon } from '../Icon';
import PropTypes from 'prop-types';

const renderOption = item => <Select.Option key={item}>{item}</Select.Option>;

const CustomSearchButton = ({ onClick }) => (
  <button
    className="search__button-container pointer-hover lighter-hover"
    onClick={onClick}
  >
    <Icon className="search__button" icon="search" iconColor='#FFFFFF"' />
  </button>
);

CustomSearchButton.propTypes = {
  onClick: PropTypes.func,
};

const Search = ({ value, items, onChange, onSelect, onSearch }) => (
  <aside className="search">
    <AutoComplete
      value={value}
      dataSource={items.map(renderOption)}
      placeholder="Pesquise..."
      onChange={onChange}
      filterOptions={false}
      onSelect={e => onSelect(e)}
    />
    <CustomSearchButton onClick={() => onSearch(items)} />
  </aside>
);

Search.propTypes = {
  value: PropTypes.string,
  items: PropTypes.arrayOf(PropTypes.string),
  onSelect: PropTypes.func,
  onChange: PropTypes.func,
  onSearch: PropTypes.func,
};

export default Search;
