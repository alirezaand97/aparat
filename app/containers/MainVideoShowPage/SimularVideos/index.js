/**
 *
 * SimularVideos
 *
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { compose } from 'redux';
import MainLayout from 'layouts/MainLayout';
import { convertSecondsToTime, getCreatedAge } from 'utils/helpers';
import { push } from 'connected-react-router';
import { ROUTE_VIDEO_MAIN } from 'containers/App/routes';
import { StyledSimularVideos } from '../styled';
export function SimularVideos({ videos, dispatch }) {
  function redirectToVideoPage(slug) {
    dispatch(push(ROUTE_VIDEO_MAIN.replace(':slug', slug)));
  }
  return (
    <StyledSimularVideos>
      <h4>ویدیوهای مشابه</h4>
      {videos.map(related => (
        <div className="relatedVideoWrapper" key={related.id}>
          <div
            className="relatedBanner"
            onClick={() => redirectToVideoPage(related.slug)}
          >
            <img src={related.banner_link} />
            <b className="duration">{convertSecondsToTime(related.duration)}</b>
          </div>
          <div className="relatedVideoInfo">
            <h2
              className="relatedVideoTitle"
              onClick={() => redirectToVideoPage(related.slug)}
            >
              {related.title}
            </h2>
            <span className="relatedVideoUser">کاربر</span>
            <div className="relatedVideoViews">
              <span>{related.views} بازدید</span>
              <span>{getCreatedAge(related.created_age)}</span>
            </div>
          </div>
        </div>
      ))}
    </StyledSimularVideos>
  );
}

SimularVideos.propTypes = {
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
)(SimularVideos);
