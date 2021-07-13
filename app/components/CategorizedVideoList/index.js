/**
 *
 * VideoItem
 *
 */

import React, { memo, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { getCategorizedVideosAction } from 'containers/App/actions';
import { createStructuredSelector } from 'reselect';
import { makeSelectCategorizedVideos } from 'containers/App/selectors';
import Loading from 'components/Loading';
import SlidableVideoList from 'components/SlidableVideoList';
import { push } from 'connected-react-router';
import { ROUTE_CATEGORY_VIDEOS } from 'containers/App/routes';

const StyledCategorizedVideoList = styled.div`
  width: 100%;
  padding: 2rem 0;
`;
function CategorizedVideoList({
  getCategorizedVideos,
  categorizedVideo,
  dispatch,
}) {
  useEffect(() => {
    getCategorizedVideos();
  }, []);

  function handleRedirectToCategory(id) {
    dispatch(push(ROUTE_CATEGORY_VIDEOS.replace(':id', id)));
  }

  return (
    <StyledCategorizedVideoList>
      {categorizedVideo &&
        categorizedVideo.data &&
        categorizedVideo.data.map(item => (
          <SlidableVideoList
            redirectToCategory={id => handleRedirectToCategory(id)}
            key={item.id}
            categoryVideos={item}
          />
        ))}
      {categorizedVideo.loading && <Loading text="در حال بارگذاری ویدیوها" />}
    </StyledCategorizedVideoList>
  );
}

const mapStateToProps = createStructuredSelector({
  categorizedVideo: makeSelectCategorizedVideos(),
});
function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    getCategorizedVideos: () => dispatch(getCategorizedVideosAction()),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(CategorizedVideoList);
