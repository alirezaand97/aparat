/**
 *
 * SearchBar
 *
 */

import React, { memo, useState } from 'react';
// import PropTypes from 'prop-types';
import { Search as SearchIcon, Clear as ClearInput } from '@material-ui/icons';

import { IconButton } from '@material-ui/core';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { push } from 'connected-react-router';
import { ROUTE_SEARCH } from 'containers/App/routes';
const SearchWrapper = styled.div`
  background-color: #f5f5f9;
  border-radius: 25px;
  max-width: 600px;
  padding: 5px;
  position: relative;
  margin: 7px auto;

  & input {
    border: none;
    outline: none;
    width: 100%;
    background-color: inherit;
    padding: 5px;
    color: #484b62;
    padding: 5px 20px 5px 50px;
  }

  & button {
    position: absolute;
    left: 7px;
    top: 5px;
  }
  & button:hover .MuiSvgIcon-root {
    color: #05a3e8;
  }
  & .clearIcon {
    font-size: 1rem;
    position: absolute;
    left: 33px;
    top: 11px;
    cursor: pointer;
  }
  & .clearIcon:hover {
    color: #d96c6c;
  }
  &.active {
    box-shadow: 0 0 2px 1px #e4e0e0;
    background: #fff;
  }
`;

function SearchBar({ dispatch }) {
  const [active, setActive] = useState(false);
  const [searchText, setSearchText] = useState('');

  function handleSearch() {
    dispatch(push(`${ROUTE_SEARCH}?search=${searchText}`));
  }

  return (
    <SearchWrapper className={active ? 'active' : ''}>
      <input
        type="text"
        placeholder="جستجوی ویدیوهای رویدادها و شخصیت ها و ..."
        onFocus={() => setActive(true)}
        onBlur={() => setActive(false)}
        onChange={e => setSearchText(e.target.value)}
        value={searchText}
        maxLength={70}
        onKeyDown={e => {
          if (e.keyCode === 13) handleSearch();
        }}
      />
      {searchText && (
        <ClearInput className="clearIcon" onClick={() => setSearchText('')} />
      )}
      <IconButton size="small" onClick={() => handleSearch()}>
        <SearchIcon />
      </IconButton>
    </SearchWrapper>
  );
}

SearchBar.propTypes = {};

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(
  null,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(SearchBar);
