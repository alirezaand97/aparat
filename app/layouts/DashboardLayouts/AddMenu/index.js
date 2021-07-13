/**
 *
 * AddMenu
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { IconButton, Tooltip } from '@material-ui/core';
import { Add } from '@material-ui/icons';
import { connect } from 'react-redux';
import { push } from 'connected-react-router';
import { ROUTE_UPLOADNEW } from 'containers/App/routes';
import { compose } from 'redux';

const StyledIconButton = styled(IconButton)`
  .MuiSvgIcon-root {
    color: #05a3e8 !important;
  }
`;

function AddMenu({ dispatch }) {
  return (
    <StyledIconButton
      aria-label="show 17 new notifications"
      color="inherit"
      size="small"
      onClick={() => dispatch(push(ROUTE_UPLOADNEW))}
    >
      <Tooltip title="آپلود ویدیوی جدید" aria-label="آپلود ویدیوی جدید">
        <Add color="#05a3e8" />
      </Tooltip>
    </StyledIconButton>
  );
}

AddMenu.propTypes = {
  dispatch: PropTypes.func.isRequired,
};
export default connect()(AddMenu);
