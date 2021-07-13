/**
 *
 * CountableTextArea
 *
 */

import React, { memo, useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { TextField, Button } from '@material-ui/core';
const StyledWrapper = styled.div`
  width: 100%;
  .MuiInputBase-root {
    font-size: 0.8rem;
    color: #484b62;
  }
  .contentButtons {
    margin-top: 1.7em;
    text-align: left;
    .MuiButton-root {
      border-radius: 25px;
      padding: 0.3em 1em;
      color: #6f7285;
      box-shadow: none;
    }
    .accept:not(:disabled) {
      background: #05a3e8;
      color: #fff;
      margin-right: 0.5em;
    }
  }
  .maxLength {
    font-size: 0.8rem;
    color: #6f7285;
    display: inline-block;
    margin-top: 0.3em;
  }
`;
function CountableTextArea({ defaultValue, maxLength, onChangeValue }) {
  const [value, setValue] = useState(defaultValue);

  const remainLength = value ? maxLength - value.length : 150;
  const isDisabled = remainLength < 0 || remainLength == 150;
  function handleChange(e) {
    setValue(e.target.value);
  }

  function handleSubmit() {
    onChangeValue(value);
  }
  function handleCancle() {
    onChangeValue(null);
  }
  return (
    <StyledWrapper>
      <TextField
        id="outlined-multiline-static"
        multiline
        rows={4}
        placeholder="پاسخ خود را وارد کنید ..."
        variant="outlined"
        fullWidth
        onChange={handleChange}
        maxLength="10"
        rowsMax={3}
      />
      <span className="maxLength">{remainLength} کاراکتر باقی مانده</span>
      <div className="contentButtons">
        <Button variant="text" onClick={handleCancle}>
          انصراف{' '}
        </Button>
        <Button
          variant="contained"
          className="accept"
          onClick={handleSubmit}
          disabled={isDisabled}
        >
          {' '}
          ارسال
        </Button>
      </div>
    </StyledWrapper>
  );
}

CountableTextArea.propTypes = {};
CountableTextArea.defaultValue = {
  defaultValue: '',
};

export default memo(CountableTextArea);
