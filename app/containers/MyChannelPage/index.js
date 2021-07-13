/**
 *
 * MyChannelPage
 *
 */

import React, { memo, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { compose } from 'redux';
import DashboardLayouts from 'layouts/DashboardLayouts';
import { createStructuredSelector } from 'reselect';
import {
  makeSelectGetChannelInfo,
  makeSelectUserMe,
} from 'containers/App/selectors';
import {
  getChannelInfoAction,
  getChannelStatisticsClearDataAction,
  getFollowListAction,
} from 'containers/App/actions';
import FilterList from 'components/FilterList';
import styled from 'styled-components';
import Loading from 'components/Loading';
import AboutChannel from './AboutChannel';
import MyChannelHeader from './MyChannelHeader';
import VideosTab from './VideosTab';
import PlaylistsTab from './PlaylistsTab';

const StyledWrapper = styled.div`
  width: 100%;
  padding: 3.5em;
`;

const filterValues = {
  all: 'خانه',
  videos: 'همه ویدیوها',
  playlist: ' لیست پخش ',
  aboutChannel: 'درباره کانال',
};

export function MyChannelPage({
  getChannelInfo,
  clearChannelInfo,
  channelInfo,
  match,
  userMe,
  getFollowList,
}) {
  const [filter, setFilter] = useState('all');
  useEffect(() => {
    if (userMe && userMe.data) {
      getFollowList();
      console.log('get follow list');
    }
    getChannelInfo(match.params.name);
    return clearChannelInfo;
  }, []);
  return (
    <DashboardLayouts showSidebar={false} fullWidthMain>
      <Helmet>
        <title>کانال من</title>
        <meta name="description" content="Description of MyChannelPage" />
      </Helmet>
      {channelInfo && channelInfo.name && <Loading />}

      {channelInfo && channelInfo.data && (
        <React.Fragment>
          <MyChannelHeader channelInfo={channelInfo.data} />

          <StyledWrapper>
            <FilterList
              onChangeFilter={setFilter}
              filter={filter}
              values={filterValues}
              className="filterItems"
            />

            {filter === 'aboutChannel' && (
              <AboutChannel channelInfo={channelInfo.data} />
            )}

            {(filter === 'all' || filter === 'playlist') && (
              <PlaylistsTab channelInfo={channelInfo.data} />
            )}
            {(filter === 'all' || filter === 'videos') && (
              <VideosTab channelInfo={channelInfo.data} />
            )}
          </StyledWrapper>
        </React.Fragment>
      )}
    </DashboardLayouts>
  );
}

MyChannelPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    getChannelInfo: name => dispatch(getChannelInfoAction(name)),
    clearChannelInfo: () => dispatch(getChannelStatisticsClearDataAction()),
    getFollowList: () => dispatch(getFollowListAction()),
  };
}

const mapStateToProps = createStructuredSelector({
  channelInfo: makeSelectGetChannelInfo(),
  userMe: makeSelectUserMe(),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(MyChannelPage);
