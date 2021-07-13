/**
 *
 * CommentItem
 *
 */

import React, { memo, useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { connect } from 'react-redux';
import { compose } from 'redux';
import { push } from 'connected-react-router';
import { getCreatedAge } from 'utils/helpers';
import { Button } from '@material-ui/core';
import CountableTextArea from 'components/CountableTextArea';
import {
  postCommentAction,
  clearPostCommentError,
  removeCommentAction,
  changeStateCommentAction,
} from 'containers/App/actions';
import { createStructuredSelector } from 'reselect';
import { makeSelectPostedComment } from 'containers/App/selectors';
import ErrorAlert from 'components/ErrorAlert';
import { VIDEO_STATES, COMMENT_STATE_ACCEPTED } from 'utils/constants';
import {
  ROUTE_LOGIN,
  ROUTE_MY_CHANNEL,
  ROUTE_VIDEO_MAIN,
} from 'containers/App/routes';
import { isAdmin, isLogin } from 'utils/auth';
const StyledCommentWrapper = styled.div`
  display: flex;
  width: 100%;
  background: #fff;
  box-shadow: ${props =>
    props.inMainVideo ? '' : '0 0 6px 0 rgba(0,0,0,.04)'};
  border-bottom: ${props => (props.inMainVideo ? '1px solid #f5f5f9' : '')};

  padding: 1rem;
  margin-top: 1.5em;

  .isSubComment {
    box-shadow: none;
    background: #f5f5f9;
  }

  .contentWrapper {
    width: 100%;
    display: flex;

    .userAvatar {
      display: flex;

      img {
        width: 3.5em;
        height: 3.5em;
        border-radius: 100%;
        cursor: pointer;
      }
    }
    .content {
      width: 100%;
      padding: 0 2em;

      .contentHeader {
        .username {
          color: #484b62;
          cursor: pointer;
        }

        .createdAge {
          display: inline-block;
          font-size: 0.95em;
          font-weight: 300;
          margin-right: 1em;
          color: #6f7285;
        }
      }
      .contentMain {
        margin-top: 1.5em;
        color: #6f7285;
        font-size: 1em;
        line-height: 1.7rem;
      }
      .contentButtons {
        margin-top: 1.7em;

        .MuiButton-root {
          border-radius: 25px;
          padding: 0.15em 1em;
          color: #6f7285;
          box-shadow: none;
        }

        .accept {
          background: #05a3e8;
          color: white !important;
          margin: 0 0.5em;
        }
        .accept .MuiButton-label {
          color: #fff;
        }
      }
    }
  }
  .videoBanner {
    width: 185px;
    height: 95px;
    img {
      width: 100%;
      height: 100%;
      cursor: pointer;
    }
  }

  @media (max-width: 576px) {
    flex-wrap: wrap;

    .videoBanner {
      width: 60%;
      height: 95px;
      margin: 2em auto;

      img {
        width: 100%;
        height: 100%;
      }
    }
  }
  @media (max-width: 420px) {
    .contentButtons .MuiButtonBase-root {
      width: 100%;
      box-sizing: border-box;
      margin: 3px 0 !important;
    }
  }
`;
function CommentItem({
  comment,
  isSubComment,
  submitComment,
  removeComment,
  changeState,
  dispatch,
  inMainVideo,
}) {
  const [showAnswerBox, setShowAnswerBox] = useState(false);

  function handleSubmitComment(value) {
    setShowAnswerBox(false);
    if (value) {
      const data = {
        parent_id: comment.id,
        video_id: comment.video_id,
        body: value,
        videoIsForUser: comment.videoIsForUser,
      };
      submitComment(data);
    }
  }

  function handleRedirectToUserChannel() {
    dispatch(
      push(ROUTE_MY_CHANNEL.replace(':name', comment.user.channel.name)),
    );
  }

  function handleRedirectToLoginOrShowBox() {
    if (isLogin()) {
      setShowAnswerBox(true);
    } else {
      dispatch(push(ROUTE_LOGIN));
    }
  }

  console.log(comment);

  return (
    <StyledCommentWrapper
      inMainVideo={inMainVideo}
      className={isSubComment ? 'isSubComment' : ''}
    >
      <div className="contentWrapper">
        <div
          className="userAvatar"
          onClick={() => handleRedirectToUserChannel()}
        >
          <img src={comment.user.avatar} />
        </div>
        <div className="content">
          <div className="contentHeader">
            <b
              className="username"
              onClick={() => handleRedirectToUserChannel()}
            >
              {comment.user.channel.name}
            </b>
            <span className="createdAge">
              {getCreatedAge(comment.createdAge)}
            </span>
          </div>
          <div className="contentMain">
            <p>{comment.body}</p>
            <div>
              {!!comment.children &&
                !!comment.children.length &&
                comment.children.map(item => (
                  <CommentItem
                    comment={item}
                    key={item.id}
                    removeComment={removeComment}
                    changeState={changeState}
                    isSubComment
                  />
                ))}
            </div>
          </div>
          <div className="contentButtons">
            {!showAnswerBox && (
              <React.Fragment>
                {!isSubComment && comment.videoIsForUser && (
                  <Button
                    variant="text"
                    onClick={() => handleRedirectToLoginOrShowBox()}
                  >
                    پاسخ دادن
                  </Button>
                )}
                {(isAdmin() || comment.videoIsForUser) && (
                  <React.Fragment>
                    {!(comment.state === COMMENT_STATE_ACCEPTED) && (
                      <Button
                        variant="contained"
                        className="accept"
                        onClick={() => changeState(comment.id, 'accepted')}
                      >
                        تایید{' '}
                      </Button>
                    )}
                    <Button
                      variant="outlined"
                      onClick={() => removeComment(comment.id)}
                    >
                      {' '}
                      حذف
                    </Button>
                  </React.Fragment>
                )}
              </React.Fragment>
            )}
            {showAnswerBox && (
              <CountableTextArea
                maxLength={150}
                onChangeValue={handleSubmitComment}
              />
            )}
          </div>
        </div>
      </div>
      {!isSubComment && !inMainVideo && (
        <div className="videoBanner">
          <img
            src={
              comment.video_banner
                ? comment.banner_path + comment.video_banner
                : `${comment.banner_path}../../` +
                  `images/no-image-available.png`
            }
            onClick={() =>
              dispatch(push(ROUTE_VIDEO_MAIN.replace(':slug', comment.slug)))
            }
          />
        </div>
      )}
    </StyledCommentWrapper>
  );
}

CommentItem.propTypes = {
  dispatch: PropTypes.func,
};

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    submitComment: data => dispatch(postCommentAction(data)),
    clearPostError: () => dispatch(clearPostCommentError()),
    removeComment: id => dispatch(removeCommentAction(id)),
    changeState: (id, state) => dispatch(changeStateCommentAction(id, state)),
  };
}

const mapStateToProps = createStructuredSelector({
  postedComment: makeSelectPostedComment(),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(CommentItem);
