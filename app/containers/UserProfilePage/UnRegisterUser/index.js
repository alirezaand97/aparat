import React, { memo, useState } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { ReportProblemOutlined } from '@material-ui/icons';
import { Button } from '@material-ui/core';
import ConfirmModal from 'components/ConfirmModal';
import { unRegisterUserAction } from 'containers/App/actions';
import { createStructuredSelector } from 'reselect';
import { makeSelectUnRegisterUser } from 'containers/App/selectors';

const StledUnRegisterWrapper = styled.div`
  width: 100%;
  margin-top: 3em;
  background: #fff;
  box-shadow: 0 2px 6px 0 rgba(0, 0, 0, 0.04);
  padding: 2rem;

  .unregisterAlert {
    background: #f5f5f9;
    padding: 1.5em;
    border-radius: 2px;
    margin-bottom: 1.5rem;
    display: flex;
    flex-wrap: nowrap;
    align-items: center;
    .MuiSvgIcon-root {
      font-size: 3rem;
      color: #70748e;
      display: inline-block;
      margin-left: 1.5rem;
    }
    span {
      font-size: 0.9rem;
    }
  }

  .unregisterButton {
    margin-top: 1rem;
    border-radius: 20px;
  }
`;
function UnRegisterUser({ unRegister, unregisterData }) {
  const [openConfirm, setOpenConfirm] = useState(false);

  function handleAcceptUnregister() {
    setOpenConfirm(false);
    unRegister();
  }

  return (
    <StledUnRegisterWrapper>
      <div className="unregisterAlert">
        <ReportProblemOutlined />
        <span>
          {' '}
          باغیر فعالسازی عضویت ، تمامی ویدیوهای شما،از دسترس خارج خواهند شد. پس
          از غیر فعالسازی عضویت، تنها با یک بار لاگین در سایت، عضویت شما در سایت
          مجدداً فعال خواهد شد.
        </span>
      </div>
      <p>
        لطفاً، پس از مطالعه موارد فوق چنانچه برای غیر فعالسازی عضویت از سایت،
        موافق هستید دکمه زیر را کلیک کنید.
      </p>
      <Button
        variant="contained"
        color="secondary"
        className="unregisterButton"
        onClick={() => setOpenConfirm(true)}
        disabled={unregisterData.loading}
      >
        لغو عضویت
      </Button>
      <ConfirmModal
        onCancel={() => setOpenConfirm(false)}
        onAccept={() => handleAcceptUnregister()}
        open={openConfirm}
        title="آیا مطمین هستید "
        acceptTitle="بله، حذف شود"
      />
    </StledUnRegisterWrapper>
  );
}

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    unRegister: () => dispatch(unRegisterUserAction()),
  };
}

const mapStateToProps = createStructuredSelector({
  unregisterData: makeSelectUnRegisterUser(),
});
const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(UnRegisterUser);
