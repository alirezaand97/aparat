/**
 *
 * MyVideosPage
 *
 */

import React, { memo, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { compose } from 'redux';
import DashboardLayouts from 'layouts/DashboardLayouts';
import { createStructuredSelector } from 'reselect';
import { makeSelectGetMyVideos } from 'containers/App/selectors';
import { getMyVideosAction } from 'containers/App/actions';
import FilterVideos from 'components/FilterList';
import VideosList from 'components/VideosList';
import { VIDEO_STATE_BLOCKED } from 'utils/constants';
import Loading from 'components/Loading';

const filterValues = {
  all: 'همه ویدیوها',
  unpublished: 'ویدیوهای منتشر نشده',
  playlist: 'ویدیوهای لیست پخش ',
  republish: 'ویدیوهای بازنشر شده',
};
export function MyVideosPage({ myVideos, getMyVideos }) {
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    getMyVideos('loading');
  }, []);

  function filteredVideos() {
    switch (filter) {
      case 'unpublished':
        return myVideos.data.filter(
          video => video.state === VIDEO_STATE_BLOCKED,
        );
      case 'republish':
        return myVideos.data.filter(video => video.republished);
      case 'playlist':
        return myVideos.data.filter(
          video => video.playlist && video.playlist.length,
        );
      default:
        return myVideos.data;
    }
  }

  console.log(myVideos);

  return (
    <DashboardLayouts>
      <Helmet>
        <title>ویدیوهای من</title>
        <meta name="description" content="ویدیوهای من" />
      </Helmet>
      {myVideos.params && <Loading text="در حال دریافت ویدیوها..." />}
      {myVideos.data && (
        <React.Fragment>
          <FilterVideos
            onChangeFilter={setFilter}
            filter={filter}
            values={filterValues}
          />
          <VideosList videos={filteredVideos()} />
        </React.Fragment>
      )}
    </DashboardLayouts>
  );
}

MyVideosPage.defaulProps = {
  myVideos: [],
};

const mapStateToProps = createStructuredSelector({
  myVideos: makeSelectGetMyVideos(),
});

function mapDispatchToProps(dispatch) {
  return {
    getMyVideos: params => dispatch(getMyVideosAction(params)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(MyVideosPage);
