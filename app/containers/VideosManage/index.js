import React, { memo, useEffect, useState } from 'react';
import DashboardLayouts from 'layouts/DashboardLayouts';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { getAllVideosToManageAction } from 'containers/App/actions';

import { makeSelectGetVideosToManage } from 'containers/App/selectors';
import Loading from 'components/Loading';
import VideosTable from './VideosTable';
import VideoDialog from './VideoDialog';

function VideosManagePage({ dispatch, videosData }) {
  const [perPage, setPerPage] = useState(10);
  const [page, setPage] = useState(1);
  const [selectedVideo, setSelectedVideo] = useState(null);

  useEffect(getVideos, [page, perPage]);

  function getVideos() {
    dispatch(getAllVideosToManageAction({ page, perPage }));
  }

  function changePange(p, pp) {
    setPage(p);
    setPerPage(pp);
  }

  return (
    <DashboardLayouts>
      {videosData.params && <Loading text="در حال دریافت ویدیوها..." />}
      {videosData.data && (
        <VideosTable
          videos={videosData.data.data}
          page={page}
          perPage={perPage}
          handleChangePage={changePange}
          onRowClick={setSelectedVideo}
        />
      )}

      {selectedVideo && (
        <VideoDialog
          onCancel={() => setSelectedVideo(null)}
          onAccept={() => setSelectedVideo(null)}
          open={!!selectedVideo}
          video={selectedVideo}
        />
      )}
    </DashboardLayouts>
  );
}

const mapStateToProps = createStructuredSelector({
  videosData: makeSelectGetVideosToManage(),
});
function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(VideosManagePage);
