/**
 *
 * NavBar
 *
 */

import React, { memo } from 'react';
// import PropTypes from 'prop-types';
import styled from 'styled-components';
import { AppBar, Toolbar, Grid } from '@material-ui/core';
import Logo from 'components/Logo';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { push } from 'connected-react-router';
import { ROUTE_HOME } from 'containers/App/routes';
import NotificationMenu from '../NotificationMenu';
import UserMenu from '../UserMenu';
import AddMenu from '../AddMenu';
import SearchBar from '../SearchBar';
import DrawerButton from '../DrawerButton';

const StyledWrapper = styled.div`
  .navSegmentWrapper {
    display: flex;
    align-items: center;
  }
  & .MuiAppBar-root {
    background: #fff;
    box-shadow: rgba(0, 0, 0, 0.1) 1px 0 7px 0;
    color: #444;
    min-height: 95px;
  }

  & .MuiToolbar-root {
    justify-content: flex-end;
  }

  & .MuiSvgIcon-root {
    color: #6f7285;
  }

  & .sectionDesktop {
    direction: ltr;
  }
  & .leftItems {
    display: flex;
    flex-direction: row-reverse;
    justify-content: flex-end;
    align-items: center;
    max-width: auto;
  }
  .rightItems {
    width: auto;
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    align-items: center;
  }

  & .searchBarWrapper {
    position: absolute;
    left: 0;
    right: 0;
    top: 33px;
  }

  & .navBarLogo {
    cursor: pointer;
  }

  @media (min-width: 600px) {
    & .searchBarWrapper {
      position: inherit;
    }

    & .MuiAppBar-root {
      min-height: auto;
    }

    & .leftItems {
      max-width: 180px;
    }

    & .rightItems {
      max-width: 200px;
    }
  }
`;

function NavBar({ dispatch }) {
  return (
    <StyledWrapper>
      <AppBar position="fixed">
        <Toolbar variant="dense">
          <Grid container spacing={3} className="navSegmentWrapper">
            <Grid item xs className="leftItems">
              <div
                className="navBarLogo"
                onClick={() => dispatch(push(ROUTE_HOME))}
              >
                <Logo size="small" />
              </div>
              <DrawerButton />
            </Grid>
            <Grid item xs className="searchBarWrapper">
              <SearchBar />
            </Grid>
            <Grid item xs className="rightItems">
              <div className="sectionDesktop">
                <UserMenu />
                <NotificationMenu />
                <AddMenu />
              </div>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
    </StyledWrapper>
  );
}

NavBar.propTypes = {};

const mapStateToProps = createStructuredSelector({});
function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);
export default compose(
  memo,
  withConnect,
)(NavBar);
