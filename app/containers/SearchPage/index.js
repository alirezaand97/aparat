import React, { memo, useEffect } from 'react';
import MainLayout from 'layouts/MainLayout';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { searchVideosAction } from 'containers/App/actions';
import { makeSelectSearchVideos } from 'containers/App/selectors';
import VideosList from 'components/VideosList';
import Loading from 'components/Loading';
import styled from 'styled-components';
import CategorizedVideoItem from 'components/CategorizedVideoItem';
import MainVideoItem from 'components/MainVideoItem';
import { push } from 'connected-react-router';
import { ROUTE_NOT_FOUND } from 'containers/App/routes';

const SearchWrapper = styled.div`
  padding: 2rem;

  .searchHeader {
    margin-bottom: 2rem;
    border-bottom: 1px solid #eee;
  }
  .searchHeader h3 {
    font-size: 1rem;
    font-weight: 500;
  }
  .searchResult {
    display: flex;
    justify-content: end;
    flex-wrap: wrap;
  }
`;

function SearchPage({ searchVideo, searchResult, dispatch }) {
  const search = new URLSearchParams(location.search);

  useEffect(() => {
    searchVideo({
      tag: search.get('tag'),
      search: search.get('search'),
    });
  }, [location.search]);

  useEffect(() => {
    if (searchResult.error == 404) {
      dispatch(push(ROUTE_NOT_FOUND));
    }
  }, [searchResult.error]);

  return (
    <MainLayout fullWidthMain>
      {searchResult.params && <Loading text="در حال جستجو..." />}

      {searchResult.data && (
        <SearchWrapper>
          <div className="searchHeader">
            <h3>نتایج جستجو </h3>
          </div>
          <div className="searchResult">
            {searchResult.data.map(item => (
              <MainVideoItem key={item.id} video={item} />
            ))}
          </div>
        </SearchWrapper>
      )}
    </MainLayout>
  );
}

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    searchVideo: params => dispatch(searchVideosAction(params)),
  };
}

const mapStateToProps = createStructuredSelector({
  searchResult: makeSelectSearchVideos(),
});
const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(SearchPage);
