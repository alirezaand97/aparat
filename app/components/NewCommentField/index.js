/**
 *
 * NewCommentField
 *
 */

import React, { memo, useState } from 'react';
// import PropTypes from 'prop-types';
import {
  Search as SearchIcon,
  Clear as ClearInput,
  SendOutlined,
} from '@material-ui/icons';

import { IconButton } from '@material-ui/core';
import styled from 'styled-components';
import { isLogin } from 'utils/auth';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { push } from 'connected-react-router';
import { ROUTE_LOGIN } from 'containers/App/routes';
import { postCommentAction } from 'containers/App/actions';
const SearchWrapper = styled.div`
  background-color: #f5f5f9;
  border-radius: 25px;
  max-width: 100%;
  padding: 5px;
  position: relative;
  margin: 7px auto;
  display: flex;
  align-items: center;

  & textarea {
    border: none;
    outline: none;
    width: 100%;
    background-color: inherit;
    padding: 3px;
    color: #484b62;
    padding: 5px 20px 5px 50px;
    height: 27px;
    transition: height ease 500ms;
    overflow-y: hidden;
    resize: none;
  }

  & textarea:focus {
    height: 100px;
  }
  & button {
    position: absolute;
    left: 7px;
    top: 3px;
  }
  & button:hover .MuiSvgIcon-root {
    color: #05a3e8;
  }
  .sendIcon {
    transform: rotate(180deg);
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

function NewCommentField({ dispatch, video, submitComment }) {
  const [active, setActive] = useState(false);
  const [value, setValue] = useState('');

  function handleRedirectToLogin() {
    if (!isLogin()) {
      dispatch(push(ROUTE_LOGIN));
    }
  }

  function handleSubmitComment(value) {
    if (value) {
      const data = {
        parent_id: null,
        video_id: video.id,
        body: value,
        videoIsForUser: video.videoIsForUser,
      };
      submitComment(data);
    }
  }
  return (
    <SearchWrapper
      className={active ? 'active' : ''}
      onClick={() => handleRedirectToLogin()}
    >
      <textarea
        type="text"
        placeholder="دیدگاه خود را وارد کنید ..."
        onFocus={() => setActive(true)}
        onBlur={() => setActive(false)}
        onChange={e => setValue(e.target.value)}
        value={value}
        maxLength={150}
      />
      {value && (
        <ClearInput className="clearIcon" onClick={() => setValue('')} />
      )}
      <IconButton
        className="sendButton"
        size="small"
        onClick={() => handleSubmitComment(value)}
      >
        <SendOutlined className="sendIcon" />
      </IconButton>
    </SearchWrapper>
  );
}

NewCommentField.propTypes = {};

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    submitComment: data => dispatch(postCommentAction(data)),
  };
}

const withConnect = connect(
  null,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(NewCommentField);
