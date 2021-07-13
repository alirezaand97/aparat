/**
 *
 * VideosList
 *
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Grid } from '@material-ui/core';
import VideoItem from 'components/VideoItem';
import NoItemFound from 'components/NoItemFound';
import FollowItem from 'components/FollowItem';
import { FOLLOWING_TYPE, FOLLOWER_TYPE } from 'utils/constants';

const StyledFollowsList = styled(Grid)``;
function FollowChannelList({ follows, filter }) {
  return (
    <StyledFollowsList container>
      {follows &&
        follows.map(follow => <FollowItem key={follow.id} follow={follow} />)}

      {!(follows && follows.length) && filter === FOLLOWING_TYPE && (
        <NoItemFound title="هنوز هیچ کانالی را دنبال نکرده اید" />
      )}
      {!(follows && follows.length) && filter === FOLLOWER_TYPE && (
        <NoItemFound title="هنوز هیچ کاربری شما را دنبال نکرده است" />
      )}
    </StyledFollowsList>
  );
}

FollowChannelList.propTypes = {
  videos: PropTypes.array,
};

export default memo(FollowChannelList);
