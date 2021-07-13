import React, { memo, useEffect } from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete, {
  createFilterOptions,
} from '@material-ui/lab/Autocomplete';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { makeSelectTags } from 'containers/App/selectors';
import { createStructuredSelector } from 'reselect';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import { Checkbox } from '@material-ui/core';
import { ArrowDropDownCircleOutlined } from '@material-ui/icons';
import { getTagsAction } from 'containers/App/actions';
const filter = createFilterOptions();

const Wrapper = styled.div`
  width: 100%;
  & .MuiChip-root {
    background-color: rgb(223, 15, 80);
    color: rgb(255, 255, 255);
    font-size: 11px;
    padding: 0px 10px;
    height: 25px;
    margin: 1px;
  }

  & .MuiChip-label {
    padding: 1px;
  }

  & .defaultClass {
    background: rgb(254, 252, 252) !important;
  }
  & .formControl {
    background-color: #fff !important;
  }
`;
function MultiSelectBox({
  data,
  onChange,
  defaultValue,
  label,
  customClassName,
  getTagsFromServer,
  ...props
}) {
  const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
  const checkedIcon = <CheckBoxIcon fontSize="small" />;
  const [value, setValue] = React.useState(null);
  const { data: options } = data;

  useEffect(() => {
    getTagsFromServer();
  }, []);

  return (
    <Wrapper>
      <Autocomplete
        className={customClassName}
        multiple
        size="small"
        onChange={(event, newValue) => {
          if (typeof newValue === 'string') {
            setValue({
              title: newValue,
            });
            onChange(newValue);
          } else if (newValue && newValue.inputValue) {
            setValue({
              title: newValue.inputValue,
            });
            onChange(newValue.inputValue);
          } else {
            setValue(newValue);
            onChange(newValue);
          }
        }}
        filterOptions={(options, params) => {
          const filtered = filter(options, params);
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
        fullWidth
        disableCloseOnSelect
        handleHomeEndKeys
        id="free-solo-with-text-demo"
        options={!value || value.length < 5 ? options : []}
        getOptionLabel={option => {
          if (typeof option === 'string') {
            return option;
          }
          if (option.inputValue) {
            return option.inputValue;
          }
          return option.title;
        }}
        renderOption={(option, { selected }) => (
          <React.Fragment>
            <Checkbox
              icon={icon}
              checkedIcon={checkedIcon}
              style={{ marginRight: 8 }}
              checked={selected}
            />
            {option.title}
          </React.Fragment>
        )}
        style={{ width: '100%' }}
        limitTags={2}
        getLimitTagsText={more => `+${more}`}
        freeSolo
        {...props}
        defaultValue={defaultValue}
        renderInput={params => (
          <TextField
            {...params}
            label={label}
            variant="outlined"
            placeholder="جستجو یا اضافه کردن..."
          />
        )}
      />
    </Wrapper>
  );
}

MultiSelectBox.defaultProps = {
  customClassName: 'defaultClass',
};

function mapDispatchToProps(dispatch) {
  return {
    getTagsFromServer: () => dispatch(getTagsAction()),
  };
}

const mapStateToProps = createStructuredSelector({
  data: makeSelectTags(),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(MultiSelectBox);
