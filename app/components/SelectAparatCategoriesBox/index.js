import React, { useState, memo, useEffect } from 'react';
import styled from 'styled-components';
import { TextField, MenuItem, FormControl } from '@material-ui/core';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { makeSelectAparatCategories } from 'containers/App/selectors';
import { getAparatCategoriesAction } from 'containers/App/actions';

const Wrapper = styled.div`
  & .defaultClass {
    background: rgb(254, 252, 252) !important;
  }
  & .formControl {
    background-color: #fff !important;
  }
`;

function SelectAparatCategoriesBox({
  value,
  data,
  handleChange,
  customClassName,
  getCategoriesFromServer,
  ...props
}) {
  const { data: options } = data;
  useEffect(() => {
    getCategoriesFromServer();
  }, []);
  return (
    <Wrapper>
      <TextField
        size="small"
        className={customClassName}
        select
        value={value}
        onChange={(e, value) =>
          handleChange(value.props.value, value.props.children)
        }
        {...props}
      >
        {options.map(option => (
          <MenuItem key={option.id} value={option.id}>
            {option.title}
          </MenuItem>
        ))}
      </TextField>
    </Wrapper>
  );
}

SelectAparatCategoriesBox.propTypes = {
  handleChange: PropTypes.func,
  options: PropTypes.array,
  getCategoriesFromServer: PropTypes.func.isRequired,
};
SelectAparatCategoriesBox.defaultProps = {
  customClassName: 'defaultClass',
};

const mapStateToProps = createStructuredSelector({
  data: makeSelectAparatCategories(),
});

function mapDispatchToProps(dispatch) {
  return {
    getCategoriesFromServer: () => dispatch(getAparatCategoriesAction()),
  };
}
const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);
export default compose(
  withConnect,
  memo,
)(SelectAparatCategoriesBox);
