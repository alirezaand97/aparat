/**
 *
 * DrawerButton
 *
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';
// import styled from 'styled-components';
import { Menu } from '@material-ui/icons';
import { IconButton } from '@material-ui/core';
import { openDrawerAction } from 'containers/App/actions';
import { connect } from 'react-redux';
import { compose } from 'redux';

function DrawerButton({ toggleSidebar }) {
  return (
    <IconButton onClick={() => toggleSidebar(true)}>
      <Menu />
    </IconButton>
  );
}

DrawerButton.propTypes = {
  toggleSidebar: PropTypes.func.isRequired,
};

function mapDispatchToProps(dispatch) {
  return {
    toggleSidebar: open => dispatch(openDrawerAction(open)),
  };
}

const withConnect = connect(
  null,
  mapDispatchToProps,
);

export default compose(
  memo,
  withConnect,
)(DrawerButton);
