/**
 *
 * VideoComments
 *
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { compose } from 'redux';
import 'video-react/dist/video-react.css';
import CommentList from 'components/CommentList';
import NewCommentField from 'components/NewCommentField';

export function VideoComments({ video }) {
  return (
    <div>
      <NewCommentField video={video} />
      {video.comments && <CommentList inMainVideo comments={video.comments} />}
    </div>
  );
}

VideoComments.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

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
)(VideoComments);
