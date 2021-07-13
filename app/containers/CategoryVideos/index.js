import React, { memo, useEffect } from 'react';
import MainLayout from 'layouts/MainLayout';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { compose } from 'redux';
import {
  categoryVideosAction,
  searchVideosAction,
} from 'containers/App/actions';
import {
  makeSelectCategoryVideos,
  makeSelectSearchVideos,
} from 'containers/App/selectors';
import VideosList from 'components/VideosList';
import Loading from 'components/Loading';
import styled from 'styled-components';
import CategorizedVideoItem from 'components/CategorizedVideoItem';
import MainVideoItem from 'components/MainVideoItem';
import { push } from 'connected-react-router';
import { ROUTE_NOT_FOUND } from 'containers/App/routes';
import NoItemFound from 'components/NoItemFound';
import { MusicNote } from '@material-ui/icons';

const CategoryVideosWrapper = styled.div`
  padding: 3rem 2rem;

  .videosCantainer {
    display: flex;
    justify-content: end;
    flex-wrap: wrap;
  }
`;

const StyledCategoryHeader = styled.div`
  width: 100%;
  height: 140px;
  background: #f00959 url(${props => props.banner});
  display: flex;
  align-items: center;
  padding-right: 2rem;

  .catIconWrapper {
    width: 60px;
    height: 60px;
    background: #fff;
    border-radius: 100%;
    box-shadow: rgba(0, 0, 0, 0.5) 1px 1px 5px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #df0f50;
  }
  h3 {
    margin: 0 1.2rem;
    color: #fff;
    text-shadow: rgba(0, 0, 0, 0.5) 1px 1px 5px;
  }
`;

function CategoryVideos({ dispatch, getCategoryVideos, categoryVideos }) {
  const categoryId = location.pathname.split('/')[2];
  useEffect(() => {
    getCategoryVideos(categoryId);
  }, [categoryId]);

  const categoryVideosData =
    categoryVideos && categoryVideos.data && categoryVideos.data.videos;
  const categoryData =
    categoryVideos && categoryVideos.data && categoryVideos.data.category;

  return (
    <MainLayout fullWidthMain>
      <StyledCategoryHeader banner={categoryData && categoryData.banner_link}>
        <div className="catIconWrapper">
          <i className="material-icons">{categoryData && categoryData.icon}</i>
        </div>
        <h3>{categoryData && categoryData.title}</h3>
      </StyledCategoryHeader>

      {categoryVideos && categoryVideos.params && (
        <Loading text="در حال دریافت ویدیوها" />
      )}

      <CategoryVideosWrapper>
        {categoryVideosData && !categoryVideosData.length && (
          <NoItemFound title="ویدیویی برای این دسته بندی یافت نشد" />
        )}
        <div className="videosCantainer">
          {categoryVideosData &&
            categoryVideosData.map(item => (
              <MainVideoItem key={item.id} video={item} />
            ))}
        </div>
      </CategoryVideosWrapper>
    </MainLayout>
  );
}

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    getCategoryVideos: params => dispatch(categoryVideosAction(params)),
  };
}

const mapStateToProps = createStructuredSelector({
  categoryVideos: makeSelectCategoryVideos(),
});
const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(CategoryVideos);
