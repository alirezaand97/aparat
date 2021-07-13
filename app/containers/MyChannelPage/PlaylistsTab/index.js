/**
 *
 * PlaylistsTab
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
import PlaylistItem from 'components/PlaylistItem';
import NoItemFound from 'components/NoItemFound';

const StyledPlaylistsTab = styled(Grid)`
  margin-top: 2em;
`;

const StyledH = styled.h4`
  margin-top: 3em;
`;
export function PlaylistsTab({ channelInfo }) {
  return (
    <React.Fragment>
      <StyledH>لیست های پخش</StyledH>
      <StyledPlaylistsTab container>
        {!channelInfo.user.playlist.length && (
          <NoItemFound title="لیست پخشی موجود نمی باشد" />
        )}

        {channelInfo.user.playlist &&
          channelInfo.user.playlist.map(item => (
            <PlaylistItem playlist={item} />
          ))}
      </StyledPlaylistsTab>
    </React.Fragment>
  );
}

PlaylistsTab.defaulProps = {};

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
)(PlaylistsTab);
