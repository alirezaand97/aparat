/**
 *
 * RenderError
 *
 */

import React, { memo } from 'react';
// import PropTypes from 'prop-types';
// import styled from 'styled-components';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { makeSelectError } from 'containers/App/selectors';
import { compose } from 'redux';
import { globalErrorClear } from 'containers/App/actions';

function RenderError({ error, clearError }) {
  const [state, setState] = React.useState({
    open: true,
    vertical: 'top',
    horizontal: 'center',
  });

  const { vertical, horizontal, open } = state;

  const handleClose = () => {
    setState({ ...state, open: false });
  };

  if (!error) return null;
  return (
    <div>
      <Snackbar
        anchorOrigin={{ vertical, horizontal }}
        open={open}
        onClose={(handleClose, clearError)}
        message={error.toString()}
        key={vertical + horizontal}
      />
    </div>
  );
}

const mapStateToProps = createStructuredSelector({
  error: makeSelectError(),
});

function mapDispatchToProps(dispatch) {
  return {
    clearError: () => dispatch(globalErrorClear()),
  };
}
const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(RenderError);
