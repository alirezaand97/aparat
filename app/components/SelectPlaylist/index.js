import React, { useState, memo, useEffect } from 'react';
import { TextField } from '@material-ui/core';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import {
  makeSelectUserPlaylists,
  makeSelectAddPlaylist,
} from 'containers/App/selectors';
import Autocomplete, {
  createFilterOptions,
} from '@material-ui/lab/Autocomplete';
import { addPlaylistAction, getPlaylistsAction } from 'containers/App/actions';
import styled from 'styled-components';
const Wrapper = styled.div`
  & .defaultClass {
    background: rgb(254, 252, 252) !important;
  }
  & .formControl {
    background-color: #fff !important;
  }
`;
const filter = createFilterOptions();

function SelectPlaylist({
  data,
  onChange,
  onAddPlaylist,
  newPlaylist,
  defaultValue,
  label,
  customClassName,
  getPlaylistFromServer,
  ...props
}) {
  const { data: options } = data;
  const [value, setValue] = React.useState(null);

  function handleSelect(selected) {
    if (selected) {
      if (typeof selected === "object") {
        if (selected.id === undefined) {
          onAddPlaylist(selected.inputValue);
        }
        else {
          onChange(selected.id);
        }
      }
      else if (typeof selected === "string") {
        onAddPlaylist(selected);
      }
    }

  }

  useEffect(() => {
    if (newPlaylist.data) {
      onChange(newPlaylist.data.id);
      onAddPlaylist(null);
    }
  })
  useEffect(() => {
    getPlaylistFromServer()
  }, []);

  return (
    <Wrapper>
      <Autocomplete
        size="small"
        className="formInput"
        onChange={(event, newValue) => {
          handleSelect(newValue);
          if (typeof newValue === 'string') {
            setValue({
              title: newValue,
            });
          } else if (newValue && newValue.inputValue) {
            // Create a new value from the user input
            setValue({
              title: newValue.inputValue,
            });
            onChange(newValue.inputValue);
          } else {
            setValue(newValue);
          }
        }}
        filterOptions={(options, params) => {
          const filtered = filter(options, params);

          // Suggest the creation of a new value
          if (params.inputValue !== '') {
            filtered.push({
              inputValue: params.inputValue,
              title: `اضافه کردن "${params.inputValue}"`,
            });
          }

          return filtered;
        }}
        selectOnFocus
        clearOnBlur
        handleHomeEndKeys
        id="free-solo-with-text-demo"
        options={options}
        getOptionLabel={(option) => {
          // Value selected with enter, right from the input
          if (typeof option === 'string') {
            return option;
          }
          // Add "xxx" option created dynamically
          if (option.inputValue) {
            return option.inputValue;
          }
          // Regular option
          return option.title;
        }}
        renderOption={(option) => option.title}
        style={{ width: '100%' }}
        freeSolo
        defaultValue={defaultValue}
        className={customClassName}
        {...props}
        renderInput={(params) => (
          <TextField {...params} label={label} placeholder="انتخاب کنید یا لیست پخش جدید بسازید" variant="outlined" />
        )}
      />
    </Wrapper>
  );
}

SelectPlaylist.propTypes = {
  value: PropTypes.number,
  onChange: PropTypes.func,
  options: PropTypes.array,
};
SelectPlaylist.defaultProps = {
  customClassName: 'defaultClass'
};

const mapStateToProps = createStructuredSelector({
  data: makeSelectUserPlaylists(),
  newPlaylist: makeSelectAddPlaylist(),
});

function mapDispatchToProps(dispatch) {
  return {
    onAddPlaylist: (playlist) => dispatch(addPlaylistAction(playlist)),
    getPlaylistFromServer: () => dispatch(getPlaylistsAction()),
  };
}
const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);
export default compose(
  withConnect,
  memo,
)(SelectPlaylist);
