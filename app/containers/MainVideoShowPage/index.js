/**
 *
 * MainVideoShowPage
 *
 */

import React, { memo, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { compose } from 'redux';
import MainLayout from 'layouts/MainLayout';
import { getVideoAction } from 'containers/App/actions';
import { createStructuredSelector } from 'reselect';
import {
  makeSelectGetVideo,
  makeSelectLocation,
} from 'containers/App/selectors';
import Loading from 'components/Loading';
import { StyledMainLayout } from './styled';
import MainContainer from './MainContainer';
import SideBar from './SideBar';

export function MainVideoShowPage({ getVideo, match, videoData }) {
  useEffect(() => {
    getVideo(match.params.slug);
  }, [match.params.slug]); // در صفحه ویدیو با کلیک روی ویدیوهی دیگری می خواهیم ان ویدیو بارگذاری شود

  return (
    <MainLayout fullWidthMain>
      <Helmet>
        <title>ویدیو</title>
        <meta name="description" content="Description of MainVideoShowPage" />
      </Helmet>
      <StyledMainLayout container>
        {videoData && videoData.data && (
          <React.Fragment>
            <MainContainer video={videoData.data} />
            <SideBar video={videoData.data} />
          </React.Fragment>
        )}
        {videoData && videoData.slug && (
          <Loading text="در حال بارگذاری ویدیو" />
        )}
      </StyledMainLayout>
    </MainLayout>
  );
}

MainVideoShowPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    getVideo: slug => dispatch(getVideoAction(slug)),
  };
}

const mapStateToProps = createStructuredSelector({
  videoData: makeSelectGetVideo(),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(MainVideoShowPage);
