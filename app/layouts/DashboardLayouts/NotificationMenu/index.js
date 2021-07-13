/**
 *
 * NavBar
 *
 */

import React, { memo } from 'react';
// import PropTypes from 'prop-types';
// import styled from 'styled-components';
import { IconButton, Badge } from '@material-ui/core';
import { Notifications } from '@material-ui/icons';

function NotificationMenu() {
  return (
    <IconButton
      aria-label="show 17 new notifications"
      color="inherit"
      size="small"
    >
      <Notifications />
    </IconButton>
  );
}

NotificationMenu.propTypes = {};

export default memo(NotificationMenu);
