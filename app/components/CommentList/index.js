/**
 *
 * CommentList
 *
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Grid } from '@material-ui/core';
import CommentItem from 'components/CommentItem';
import Loading from 'components/Loading';
import { createStructuredSelector } from 'reselect';
import { makeSelectPostedComment } from 'containers/App/selectors';
import { connect } from 'react-redux';
import { compose } from 'redux';

const StyledCommentList = styled(Grid)``;
function CommentList({ comments, postedComment, inMainVideo }) {
  return (
    <StyledCommentList container>
      {postedComment.params && <Loading />}
      {comments &&
        comments.map(comment => (
          <CommentItem
            inMainVideo={inMainVideo}
            key={comment.body}
            comment={comment}
          />
        ))}
    </StyledCommentList>
  );
}

CommentList.propTypes = {
  comments: PropTypes.array,
};

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
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
)(CommentList);
