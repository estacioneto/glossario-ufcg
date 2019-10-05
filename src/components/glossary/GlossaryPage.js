import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import ReactRouterPropTypes from 'react-router-prop-types';

import glossarioLogo from '../../../assets/images/glossario-logo.svg';

import './GlossaryPage.css';
import { Search } from '../common/index';
import terms from '../../lib/data';
import SearchResults from './results/SearchResults';

const DayPhrase = ({ entry }) => {
  return (
    <span className={'glossary__day-phrase'}>
      Você sabe o que é{' '}
      <Link
        className="emphasis pointer-hover light-accent lighter-hover"
        to={`/${entry}`}
      >
        {entry}
      </Link>
      ?
    </span>
  );
};

const GlossaryPage = props => {
  const [searchTerm, setSearchTerm] = useState('');

  const getRandomEntry = () => {
    const entries = Object.keys(terms);
    const index = Math.floor(Math.random() * entries.length);
    return entries[index];
  };

  const handleAcronymChange = selected => {
    props.history.push(`/${selected}`);
  };

  const getTerm = () => props.match.params.term;

  const isSearchEmpty = () => {
    return getTerm() === undefined;
  };

  const handleChange = term => {
    setSearchTerm(term);
  };

  const handleSearch = items => {
    if (!items.length) return handleAcronymChange(searchTerm);

    const [firstItem] = items;
    return handleAcronymChange(firstItem);
  };

  const items = Object.keys(terms)
    .sort()
    .filter(
      term => term.toUpperCase().indexOf(searchTerm.toUpperCase()) !== -1
    );

  const glossaryContainerClass = isSearchEmpty()
    ? 'glossary__container--has-not-search'
    : 'glossary__container--has-search';
  return (
    <div className={`glossary__container ${glossaryContainerClass}`}>
      <div className={'glossary__search-tools'}>
        <Link to={''} className={'glossary__logo'}>
          <img src={glossarioLogo} />
        </Link>
        <Search
          className={'glossary__search'}
          onChange={handleChange}
          value={searchTerm}
          items={items}
          onSelect={handleAcronymChange}
          onSearch={handleSearch}
        />
        {isSearchEmpty() && <DayPhrase entry={getRandomEntry()} />}
      </div>
      {!isSearchEmpty() && <SearchResults term={getTerm()} />}
    </div>
  );
};

GlossaryPage.propTypes = {
  history: ReactRouterPropTypes.history.isRequired,
  location: ReactRouterPropTypes.location.isRequired,
  match: ReactRouterPropTypes.match.isRequired,
  route: ReactRouterPropTypes.route.isRequired,
};

export default GlossaryPage;
