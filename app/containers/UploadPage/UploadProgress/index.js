/**
 *
 * UploadProgress
 *
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Grid, Button } from '@material-ui/core';
import { AddAPhotoOutlined } from '@material-ui/icons';
import bannerImage from 'images/icon-512x512.png';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { makeSelectUploadBanner } from 'containers/App/selectors';
import { uploadBannerAction } from 'containers/App/actions';
import { BASE_URL } from 'utils/constants';
const Wrapper = styled.div`
  border: 2px dashed #ddd;
  border-radius: 3px;
  padding: 15px;
  margin-bottom: 30px;
  & .bannerImage {
    & img {
      width: 100px;
      height: 100px;
    }
  }

  & .uploadBannerButton {
    text-align: center;
    width: 100px;
    height: 80px;
    background: rgba(0, 0, 0, 0.04);

    & span {
      display: block;
      font-size: 0.9rem;
      padding-top: 5px;
    }

    &:hover {
      background: rgba(0, 0, 0, 0.1);
    }
  }
  & .hidden {
    display: none;
  }
  & .progressInfo {
    padding-top: 15px;
    & span {
      font-size: 13.6px;
      font-weight: normal;
      color: rgb(82, 81, 81);
      line-height: 10px;
    }
    & .progressbarWrapper {
      width: 100%;
      height: 10px;
      background-color: #eee;
      overflow: hidden;
      border-radius: 5px;
      margin-top: 20px;
      position: relative;
    }
    & .progressBar {
      position: absolute;
      background-color: rgb(5, 163, 232);
      height: 10px;
    }
  }

  @media (max-width: 800px) {
    & .imageWrapper {
      width: 100px;
      margin: auto;
      padding-bottom: 19px;
    }
    & .progressInfo {
      & .progressBar {
        height: 7px;
      }
      & .progressbarWrapper {
        height: 7px;
      }
    }
  }
`;

export function UploadProgress({
  onSelectFile,
  percentage,
  uploadBanner,
  onUploadBanner,
}) {
  let uploadBannerelement = null;
  function onSelectBannerImage() {
    if (uploadBannerelement.files && uploadBannerelement.files[0]) {
      onUploadBanner(uploadBannerelement.files[0]);
    }
  }
  return (
    <Wrapper>
      <Grid container>
        <Grid item sm={3} xs={12} className="bannerImage">
          <div className="imageWrapper">
            {uploadBanner.data && (
              <img src={`${BASE_URL}videos/tmp/${uploadBanner.data.banner}`} />
            )}
            {!uploadBanner.data && (
              <React.Fragment>
                <Button
                  className="uploadBannerButton"
                  onClick={() => {
                    uploadBannerelement.click();
                  }}
                >
                  <AddAPhotoOutlined />
                  <span>افزودن بنر</span>
                </Button>
                <input
                  type="file"
                  ref={el => {
                    uploadBannerelement = el;
                  }}
                  className="hidden"
                  onChange={onSelectBannerImage}
                  accept="image/*"
                />
              </React.Fragment>
            )}
          </div>
        </Grid>
        <Grid item sm={9} xs={12} className="progressInfo">
          {percentage <= 99 ? (
            <span>ویدیو در حال آپلود (%{Math.round(percentage)})</span>
          ) : (
            <span>ویدیو با موفقیت بارگذاری شد</span>
          )}

          <div className="progressbarWrapper">
            <div className="progressBar" style={{ width: `${percentage}%` }} />
          </div>
        </Grid>
      </Grid>
    </Wrapper>
  );
}

UploadProgress.propTypes = {};

const mapStateToProps = createStructuredSelector({
  uploadBanner: makeSelectUploadBanner(),
});

function mapDispatchToProps(dispatch) {
  return {
    onUploadBanner: banner => dispatch(uploadBannerAction(banner)),
  };
}
const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default withConnect(UploadProgress);
