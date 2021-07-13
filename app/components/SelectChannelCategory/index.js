import React, { useState, memo, useEffect } from 'react';
import styled from 'styled-components';
import { TextField, MenuItem, FormControl } from '@material-ui/core';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import {
  makeSelectAparatCategories,
  makeSelectChannelCategories,
  makeSelectAddChannelCategories,
} from 'containers/App/selectors';
import Autocomplete, {
  createFilterOptions,
} from '@material-ui/lab/Autocomplete';
import {
  addChannelCategoriesAction,
  getChannelCategoriesAction,
} from 'containers/App/actions';

const filter = createFilterOptions();
const Wrapper = styled.div`
  & .defaultClass {
    background: rgb(254, 252, 252) !important;
  }
  & .formControl {
    background-color: #fff !important;
  }
`;

function SelectChannelCategory({
  data,
  onChange,
  onAddChannelCategory,
  newCategory,
  defaultValue,
  label,
  customClassName,
  getChannelCatgoriesFromServer,
  ...props
}) {
  const { data: options } = data;
  const [value, setValue] = React.useState(null);
  const [selectedCat, setSelectedCat] = React.useState(null);
  const [changed, setChanged] = React.useState(null);

  useEffect(() => {
    getChannelCatgoriesFromServer();
  }, []);

  function handleSelect(selected) {
    if (selected) {
      if (typeof selected === "object") {
        if (selected.id === undefined) {
          onAddChannelCategory(selected.inputValue);
        }
        else {
          onChange(selected.id);
        }
      }
      else if (typeof selected === "string") {
        onAddChannelCategory(selected);
      }
    }

  }

  useEffect(() => {
    if (newCategory.data) {
      onChange(newCategory.data.id);
      onAddChannelCategory(null);
    }
  })

  return (
    <Wrapper>
      <Autocomplete
        size="small"
        className={customClassName}
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
        {...props}
        defaultValue={options.filter(item => item.id === defaultValue)[0]}
        renderInput={(params) => (
          <TextField {...params} label={label} placeholder="انتخاب کنید یا دسته بندی جدید بسازید" variant="outlined" />
        )}
      />
    </Wrapper>
  );
}

SelectChannelCategory.propTypes = {
  value: PropTypes.number,
  handleChange: PropTypes.func,
  options: PropTypes.array,
};
SelectChannelCategory.defaultProps = {
  customClassName: 'defaultClass',
};

const mapStateToProps = createStructuredSelector({
  data: makeSelectChannelCategories(),
  newCategory: makeSelectAddChannelCategories(),
});

function mapDispatchToProps(dispatch) {
  return {
    onAddChannelCategory: (category) => dispatch(addChannelCategoriesAction(category)),
    getChannelCatgoriesFromServer: () => dispatch(getChannelCategoriesAction()),
  }
}
const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);
export default compose(
  withConnect,
  memo,
)(SelectChannelCategory);
