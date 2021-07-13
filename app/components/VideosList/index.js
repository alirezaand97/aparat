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

const StyledVideosList = styled(Grid)``;
function VideosList({ videos }) {
  return (
    <StyledVideosList container>
      {!!videos &&
        !!videos.length &&
        videos.map(video => <VideoItem key={video.id} video={video} />)}

      {!(videos && videos.length) && (
        <NoItemFound title="ویدیویی موجود نمی باشد" />
      )}
    </StyledVideosList>
  );
}

VideosList.propTypes = {
  videos: PropTypes.array,
};

export default memo(VideosList);
