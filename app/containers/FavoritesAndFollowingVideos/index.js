import React, { memo, useEffect } from 'react';
import MainLayout from 'layouts/MainLayout';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { compose } from 'redux';
import {
  favoriteVideosAction,
  followingsVideosAction,
  searchVideosAction,
} from 'containers/App/actions';
import {
  makeSelectFavoriteVideos,
  makeSelectFollowingsVideos,
  makeSelectSearchVideos,
} from 'containers/App/selectors';
import VideosList from 'components/VideosList';
import Loading from 'components/Loading';
import styled from 'styled-components';
import MainVideoItem from 'components/MainVideoItem';
import { push } from 'connected-react-router';
import {
  ROUTE_FAVORITE_VIDEOS,
  ROUTE_FOLLOWINGS_VIDEOS,
} from 'containers/App/routes';
import NoItemFound from 'components/NoItemFound';

const VideosWrapper = styled.div`
  padding: 2rem;

  .resultHeader {
    margin-bottom: 2rem;
    border-bottom: 1px solid #eee;
  }
  .resultHeader h3 {
    font-size: 1rem;
    font-weight: 500;
  }
  .resultContainer {
    display: flex;
    justify-content: end;
    flex-wrap: wrap;
  }
`;

function FavoritesAndFollowingsVideos({
  getFavoriteVideos,
  getFollowingsVideos,
  favoriteVideosData,
  followingsVideosData,
}) {
  const inFavoriteVideosPage = location.pathname === ROUTE_FAVORITE_VIDEOS;
  const inFollowingsVideosPage = location.pathname === ROUTE_FOLLOWINGS_VIDEOS;

  useEffect(() => {
    if (inFavoriteVideosPage) {
      getFavoriteVideos();
    }
    if (inFollowingsVideosPage) {
      getFollowingsVideos();
    }
  }, [location.pathname]);

  const pageTitle = inFavoriteVideosPage
    ? 'ویدیوهای پسندیده شده'
    : 'ویدیوهای دنبال شدگان';
  const isLoading = favoriteVideosData.loading || followingsVideosData.loading;

  let videos = null;

  if (inFavoriteVideosPage && favoriteVideosData && favoriteVideosData.data) {
    videos = favoriteVideosData;
  }
  if (
    inFollowingsVideosPage &&
    followingsVideosData &&
    followingsVideosData.data
  ) {
    videos = followingsVideosData;
  }

  return (
    <MainLayout fullWidthMain>
      <VideosWrapper>
        <div className="resultHeader">
          <h3>{pageTitle} </h3>
        </div>
        <div className="resultContainer">
          {isLoading && <Loading text="در حال دریافت ویدیوها" />}
          {videos && !videos.data.length && (
            <NoItemFound marginTop={false} title=" ویدیویی موجود نمی باشد" />
          )}
          {videos &&
            videos.data &&
            videos.data.map(item => (
              <MainVideoItem key={item.id} video={item} />
            ))}
        </div>
      </VideosWrapper>
    </MainLayout>
  );
}

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    getFavoriteVideos: () => dispatch(favoriteVideosAction()),
    getFollowingsVideos: () => dispatch(followingsVideosAction()),
  };
}

const mapStateToProps = createStructuredSelector({
  favoriteVideosData: makeSelectFavoriteVideos(),
  followingsVideosData: makeSelectFollowingsVideos(),
});
const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(FavoritesAndFollowingsVideos);
