import React, { memo, useState, useEffect } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { Button } from '@material-ui/core';
import { createStructuredSelector } from 'reselect';
import { InsertPhoto } from '@material-ui/icons';
import {
  notificationShowAction,
  uploadChannelBannerAction,
} from 'containers/App/actions';
import { makeSelectuploadChannelBanner } from 'containers/App/selectors';

const STyledUploadBanner = styled.div`
  width: 100%;
  margin-top: 3em;
  background: #fff;
  box-shadow: 0 2px 6px 0 rgba(0, 0, 0, 0.04);
  padding: 2rem;

  h5 {
    font-size: 0.9rem;
  }

  .unregisterButton {
    margin-top: 1rem;
    border-radius: 20px;
    color: #fff;
    background-color: #05a3e8;
  }
  .unregisterButton:hover {
    color: #fff;
    background-color: #05a3e8c9;
  }
  .uploadContainer {
    width: 150px;
    height: 150px;
    border-radius: 100%;
    margin: auto;
    box-sizing: border-box;
    overflow: hidden;
    border: 2px dashed #f6f5f5;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    padding: 0 0.5em;
    cursor: pointer;
  }
  .uploadContainer span {
    text-align: center;
  }
  .uploadContainer svg {
    font-size: 4rem;
    color: #6d7299;
  }
  .pleaseEnter {
    margin-bottom: 0;
    color: #75d175;
  }

  input {
    display: none;
  }
`;
function UploadChannelBanner({
  dispatch,
  uploadChannelBanner,
  uploadedBanner,
}) {
  let uploadProfileBannerRef = null;
  const [file, setFile] = useState(null);
  useEffect(() => {
    if (uploadedBanner.data) {
      setFile(null);
    }
  }, [uploadedBanner.data]);

  function handleChangeUploadBanner() {
    const banner = uploadProfileBannerRef.files[0];
    setFile(banner);
    if (banner) {
      if (banner.size > 4024000) {
        dispatch(
          notificationShowAction('حجم عکس بیش از 4 مگابایت است', 'error'),
        );
      }
    }
  }

  function handleClickOnChooseBanner() {
    uploadProfileBannerRef.click();
  }

  function handleSubmitProfileBanner() {
    uploadChannelBanner(uploadProfileBannerRef.files[0]);
  }

  return (
    <STyledUploadBanner>
      <h5>تغییر تصویر پروفایل</h5>
      <p>حداکثر حجم فایل مجاز 4 مگابایت است.</p>
      <div className="uploadContainer" onClick={handleClickOnChooseBanner}>
        <InsertPhoto />
        <span>برای انتخاب تصویر پروفایل، کلیک کنید</span>
      </div>
      <input
        type="file"
        accept=".png ,.jpeg, .jpg"
        ref={el => {
          uploadProfileBannerRef = el;
        }}
        onChange={handleChangeUploadBanner}
      />
      {file && (
        <h5 className="pleaseEnter" className="pleaseEnter">
          تصویر دریافت شد. برای ثبت تغییرات بر روی گزینه زیر کلیک کنید
        </h5>
      )}
      <Button
        variant="contained"
        color="secondary"
        className="unregisterButton"
        disabled={uploadedBanner.banner || !file}
        onClick={() => handleSubmitProfileBanner()}
      >
        ثبت تغییرات
      </Button>
    </STyledUploadBanner>
  );
}

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    uploadChannelBanner: banner => dispatch(uploadChannelBannerAction(banner)),
  };
}

const mapStateToProps = createStructuredSelector({
  uploadedBanner: makeSelectuploadChannelBanner(),
});
const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(UploadChannelBanner);
