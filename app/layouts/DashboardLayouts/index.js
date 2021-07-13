/**
 *
 * DashboardLayouts
 *
 */

import React, { memo, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Grid } from '@material-ui/core';
import { compose } from 'redux';
import { connect } from 'react-redux';
import {
  getTagsAction,
  getAparatCategoriesAction,
  getChannelCategoriesAction,
  getPlaylistsAction,
} from 'containers/App/actions';
import Notification from 'components/Notification';
import SideBar from './SideBar';
import SidebarDrawer from './SidebarDrawer';
import NavBar from './NavBar';

const StyledDashboardWrapper = styled.div`
  & .mainWrapper {
    padding: ${props => (props.fullWidthMain ? '0' : '2.5em 1.5em')};
    flex: 1;
    width: 100%;
    overflow: hidden;
    margin: ${props => (props.fullWidthMain ? '55px 0' : '55px 240px 0 0')};
  }
  @media (max-width: 768px) {
    & .mainWrapper {
      margin: 90px 0;
    }
  }
`;

function DashboardLayouts({ children, showSidebar, fullWidthMain }) {
  return (
    <StyledDashboardWrapper fullWidthMain={fullWidthMain}>
      <NavBar />
      <SidebarDrawer />

      <Grid container>
        {showSidebar && (
          <Grid item className="sidebarWrapper">
            <SideBar />
          </Grid>
        )}

        <Grid item className="mainWrapper">
          {children}
        </Grid>
      </Grid>
      <Notification />
    </StyledDashboardWrapper>
  );
}

DashboardLayouts.propTypes = {
  children: PropTypes.node,
  showSidebar: PropTypes.bool,
};

DashboardLayouts.defaultProps = {
  showSidebar: true,
};

function mapDispatchToProps(dispatch) {
  return {};
}

const withConnect = connect(
  undefined,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(DashboardLayouts);
