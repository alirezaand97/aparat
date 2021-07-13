/**
 *
 * UpdateVideoPage
 *
 */

import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { compose } from 'redux';
import {
  getVideoAction,
  cleargetVideoAferUnmount,
  clearGetVideoError,
} from 'containers/App/actions';
import { createStructuredSelector } from 'reselect';
import { makeSelectGetVideo } from 'containers/App/selectors';
import Loading from 'components/Loading';
import ErrorAlert from 'components/ErrorAlert';
import DashboardLayouts from 'layouts/DashboardLayouts';
import UpdateVideoForm from './UpdateVideoForm';

export function UpdateVideoPage({
  getVideo,
  match,
  video,
  clearGetVideoData,
  clearGetVideoError,
}) {
  useEffect(() => {
    getVideo(match.params.slug);
    return clearGetVideoData;
  }, []);

  return (
    <DashboardLayouts>
      <Helmet>
        <title>UpdateVideoPage</title>
        <meta name="description" content="Description of UpdateVideoPage" />
      </Helmet>
      {video.error && (
        <ErrorAlert
          onCloaseAlert={clearGetVideoError}
          error={video.error}
          redirectTo={{ url: '/myvideos', text: 'ویدیوهای من' }}
        />
      )}
      {video.slug && <Loading />}
      {video.data && <UpdateVideoForm video={video.data} />}
    </DashboardLayouts>
  );
}

UpdateVideoPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
  getVideo: PropTypes.func.isRequired,
  video: PropTypes.any.isRequired,
};

const mapStateToProps = createStructuredSelector({
  video: makeSelectGetVideo(),
});
function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    getVideo: slug => dispatch(getVideoAction(slug)),
    clearGetVideoData: () => dispatch(cleargetVideoAferUnmount()),
    clearGetVideoError: () => dispatch(clearGetVideoError()),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(UpdateVideoPage);
