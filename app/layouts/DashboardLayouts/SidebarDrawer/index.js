/**
 *
 * SidebarDrawer
 *
 */

import React, { memo, useEffect } from 'react';
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  IconButton,
} from '@material-ui/core';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import {
  makeOpenDrawerSelector,
  makeSelectAparatCategories,
} from 'containers/App/selectors';
import {
  getAparatCategoriesAction,
  openDrawerAction,
} from 'containers/App/actions';
import { Menu, Home, Subscriptions, ThumbUpAlt } from '@material-ui/icons';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Logo from 'components/Logo';
import { push } from 'connected-react-router';
import {
  ROUTE_CATEGORY_VIDEOS,
  ROUTE_FAVORITE_VIDEOS,
  ROUTE_FOLLOWINGS_VIDEOS,
  ROUTE_HOME,
} from 'containers/App/routes';
import Icon from '@material-ui/core/Icon';
import { isLogin } from 'utils/auth';

const StyledDrawer = styled(Drawer)`
  padding: 0 15px;

  & .MuiDrawer-paper {
    min-width: 240px;

    ::-webkit-scrollbar {
      width: 4px;
      height: 4px;
    }

    ::-webkit-scrollbar-thumb {
      background: #8689a2;
      border-radius: 10px;
    }
  }
  .marginFromSide {
    margin-right: 15px;
  }
  ul.MuiList-root {
    border-bottom: 1px solid #e5e5e5;
    min-width: 150px;
  }

  .topLogoItem {
    margin-bottom: 15px;
    padding: 4px 0;
  }

  .MuiListItemIcon-root {
    min-width: 25px;
    color: #6f7285;
  }
  .MuiListItemIcon-root .MuiSvgIcon-root {
    width: 20px;
    height: 20px;
  }

  .MuiListItemText-root {
    text-align: right;
    color: #6f7285;
  }
  .MuiTypography-root {
    font-size: 0.9rem;
    margin-right: 0.5rem;
  }
  .MuiListItem-button {
    padding: 0.5em 2epx;
    transition: background-color 350ms ease;
  }

  .MuiListItem-button:hover {
    background-color: rgba(0, 0, 0, 0.03);
  }

  & .MuiListItem-root.Mui-selected,
  .MuiListItem-root.Mui-selected:hover {
    background-color: #f5f5f9;
  }
  & .MuiListItem-root.Mui-selected .categoryIcon {
    color: #df0f50;
  }
  & .MuiListItem-root.Mui-selected .MuiSvgIcon-root {
    color: #df0f50;
  }
  & .MuiListItem-root:hover {
    background-color: #f5f5f9;
  }
  .material-icons {
    font-size: 20px;
  }
  .categoryHead {
    display: block;
    padding: 0.5rem 1rem;
    font-size: 1rem;
    font-weight: 500;
    color: #df0f50;
    margin: 0;
  }
`;

function SidebarDrawer({
  drawerIsOpen,
  toggleSidebar,
  dispatch,
  getAparatCategories,
  aparatCategories,
}) {
  useEffect(() => {
    getAparatCategories();
  }, []);

  function redirect(path) {
    dispatch(push(path));
    toggleSidebar(false);
  }

  function redirectToCategory(categoryId) {
    dispatch(push(ROUTE_CATEGORY_VIDEOS.replace(':id', categoryId)));
    toggleSidebar(false);
  }

  return (
    <StyledDrawer open={drawerIsOpen} onClose={() => toggleSidebar(false)}>
      <List>
        <ListItem className="topLogoItem">
          <IconButton onClick={() => toggleSidebar(false)}>
            <Menu />
          </IconButton>
          <Logo size="small" className="marginFromSide" />
        </ListItem>

        <ListItem
          button
          onClick={() => redirect(ROUTE_HOME)}
          selected={location.pathname === ROUTE_HOME}
        >
          <ListItemIcon>
            <Home />
          </ListItemIcon>
          <ListItemText primary="صفحه نخست" />
        </ListItem>
        {isLogin() && (
          <div>
            <ListItem
              button
              onClick={() => redirect(ROUTE_FOLLOWINGS_VIDEOS)}
              selected={location.pathname === ROUTE_FOLLOWINGS_VIDEOS}
            >
              <ListItemIcon>
                <Subscriptions />
              </ListItemIcon>
              <ListItemText primary="ویدیوهای دنبال شدگان" />
            </ListItem>

            <ListItem
              button
              onClick={() => redirect(ROUTE_FAVORITE_VIDEOS)}
              selected={location.pathname === ROUTE_FAVORITE_VIDEOS}
            >
              <ListItemIcon>
                <ThumbUpAlt />
              </ListItemIcon>
              <ListItemText primary="ویدیوهای پسندیده شده" />
            </ListItem>
          </div>
        )}
      </List>

      <List>
        <h3 className="categoryHead">دسته بندی ها</h3>
        {aparatCategories &&
          aparatCategories.data &&
          aparatCategories.data.map(category => (
            <ListItem
              button
              key={category.id}
              onClick={() => redirectToCategory(category.id)}
              selected={location.pathname.split('/')[2] == category.id}
            >
              <ListItemIcon>
                <i className="material-icons categoryIcon">{category.icon}</i>
              </ListItemIcon>
              <ListItemText primary={category.title} />
            </ListItem>
          ))}
      </List>
    </StyledDrawer>
  );
}

SidebarDrawer.propTypes = {
  drawerIsOpen: PropTypes.bool,
  toggleSidebar: PropTypes.func.isRequired,
};
const mapStateToProps = createStructuredSelector({
  drawerIsOpen: makeOpenDrawerSelector(),
  aparatCategories: makeSelectAparatCategories(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    toggleSidebar: open => dispatch(openDrawerAction(open)),
    getAparatCategories: () => dispatch(getAparatCategoriesAction()),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  memo,
  withConnect,
)(SidebarDrawer);
