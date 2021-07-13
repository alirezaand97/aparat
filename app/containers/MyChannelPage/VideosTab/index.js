/**
 *
 * VideosTab
 *
 */

import React, { memo, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import styled from 'styled-components';
import { Grid, Button } from '@material-ui/core';
import { SettingsOutlined } from '@material-ui/icons';
import ChannelVideoShow from 'components/ChannelVideoShow';
import NoItemFound from 'components/NoItemFound';

const StyledVideosTab = styled(Grid)`
  margin-top: 2em;
`;

const StyledH = styled.h4`
  margin-top: 3em;
`;
export function VideosTab({ channelInfo }) {
  return (
    <React.Fragment>
      <StyledH>ویدیوها </StyledH>
      <StyledVideosTab container>
        {!channelInfo.videos.length && (
          <NoItemFound title="ویدیویی موجود نمی باشد" />
        )}

        {channelInfo.videos &&
          channelInfo.videos.map(item => (
            <ChannelVideoShow key={item.id} video={item} />
          ))}
      </StyledVideosTab>
    </React.Fragment>
  );
}

VideosTab.defaulProps = {};

const mapStateToProps = createStructuredSelector({});

function mapDispatchToProps(dispatch) {
  return {};
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(VideosTab);
