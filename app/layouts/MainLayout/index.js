/**
 *
 * MainLayouts
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
import NavBar from '../DashboardLayouts/NavBar';
import SidebarDrawer from '../DashboardLayouts/SidebarDrawer';

const StyledMainLayoutWrapper = styled.div`
  & .mainWrapper {
    padding: ${props => (props.fullWidthMain ? '0' : '2.5em 1.5em')};
    flex: 1;
    width: 100%;
    overflow: hidden;
    margin: ${props => (props.fullWidthMain ? '55px 0 0 0' : '55px 240px 0 0')};
  }
  @media (max-width: 768px) {
    & .mainWrapper {
      margin: 90px 0 0 0;
    }
  }
`;

function MainLayouts({ children, showSidebar, fullWidthMain }) {
  return (
    <StyledMainLayoutWrapper fullWidthMain={fullWidthMain}>
      <NavBar />
      <SidebarDrawer />

      <Grid container>
        <Grid item className="mainWrapper">
          {children}
        </Grid>
      </Grid>
      <Notification />
    </StyledMainLayoutWrapper>
  );
}

MainLayouts.propTypes = {
  children: PropTypes.node,
  showSidebar: PropTypes.bool,
};

MainLayouts.defaultProps = {
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
)(MainLayouts);
