/**
 *
 * MyChannelHeader
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

const StyledAboutChannel = styled(Grid)`
  margin-top: 4em;
`;
export function MyChannelHeader({ channelInfo }) {
  return (
    <StyledAboutChannel>
      <h4>اطلاعات کانال</h4>
      <p>این کانال به درخواست {channelInfo.channel.name} ایجاد شده است.</p>
      <p>
        تاریخ شروع فعالیت:
        {
          new Date(channelInfo.channel.created_at)
            .toLocaleString('FA-IR')
            .split('،')[0]
        }
      </p>
      <p>تعداد ویدیوها: {channelInfo.channel.videos_count}</p>
      <p>تعداد ویدیوها: {channelInfo.channel.video_views}</p>
    </StyledAboutChannel>
  );
}

MyChannelHeader.defaulProps = {};

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
)(MyChannelHeader);
