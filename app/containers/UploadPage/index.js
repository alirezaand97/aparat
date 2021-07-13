/**
 *
 * UploadPage
 *
 */

import React, { memo, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { push } from 'connected-react-router';
import { Helmet } from 'react-helmet';
import { compose } from 'redux';
import Layout from 'layouts/DashboardLayouts';
import styled from 'styled-components';
import { Grid, Button } from '@material-ui/core';
import { CloudUpload } from '@material-ui/icons';
import {
  fileUploadAction,
  uploadVideoAction,
  getMyVideosAction,
  clearVideoDataAfterCreateAction,
} from 'containers/App/actions';
import { createStructuredSelector } from 'reselect';
import {
  makeSelectUploadVideo,
  makeSelectCreateVideo,
  makeSelectUploadBanner,
  makeSelectUserMe,
} from 'containers/App/selectors';
import { BASE_URL } from 'utils/constants';
import {
  ROUTE_VIDEOS,
  ROUTE_MY_VIDEOS,
  ROUTE_LOGIN,
  ROUTE_UPDATE_VIDEO,
} from 'containers/App/routes';
import Loading from 'components/Loading';
import UploadInfoForm from './UploadInfoForm';
import UploadProgress from './UploadProgress';
import { UploadDrogArea } from './UploadDrogArea';
const Wrapper = styled(Grid)`
  max-width: 800px;
  width: 800px;
  margin: 30px auto;
  color: rgb(92, 92, 92);
  & .uploadHeader {
    border-bottom: 1px solid rgb(221, 219, 219);
    height: 30px;
    color: rgb(41, 42, 51);
    position: relative;
    margin-bottom: 30px;
  }
  & .uploadHeader > span {
    border-bottom: 0.1em solid rgb(20, 24, 25);
    position: absolute;
    top: 1px;
    height: 30px;
    display: inline-block;
    padding-left: 15px;
  }
  & .uploadHeader .uploadText {
    font-size: 0.9rem;
    font-weight: 600;
    display: inline-block;
    margin-right: 10px;
    color: rgb(88, 88, 88);
  }
  & .uploadHeader .MuiSvgIcon-root {
    color: rgb(88, 88, 88);
  }
  & .videoInfoAfterUpload {
    background-color: #faf9f9;
    box-shadow: rgba(48, 48, 48, 0.08) 0.8px 2.9px 4px 0px;
    padding: 35px 40px;
  }

  & .videoDetailWrapper {
    background-color: #eeeeee80;
    padding: 20px;
    border-radius: 4px;
    margin-bottom: 50px;
  }

  & .videoDetail {
    padding: 15px;

    & .videoDetailBox {
      display: flex;
      align-items: center;
      justify-content: space-around;
    }
    & img {
      width: 100px;
      height: 100px;
    }
  }

  & .noneBanner {
    width: 100px;
    height: 100px;
    border-radius: 2px;
    display: flex;
    justify-content: center;
    align-items: center;
    background: #eee;
    box-shadow: 1px 1px #eee;
  }

  @media (max-width: 800px) {
    & {
      max-width: 90%;
      width: 90%;
      margin: 30px auto;
    }
    & .videoInfoAfterUpload {
      padding: 35px 15px;
    }
    & .videoDetailBox {
      flex-direction: column;
      & img,
      div {
        margin-bottom: 25px;
      }
      & div {
        text-align: center;
      }
    }
  }
`;

export function UploadPage({
  onSelectFile,
  videoUploaded,
  createVideo,
  uploadBanner,
  dispatch,
  onClearVideoDataAfterCreate,
  userMe,
}) {
  useEffect(() => onClearVideoDataAfterCreate, []); // component will unmount

  console.log(createVideo);

  if (userMe && userMe.data) {
    return (
      <Layout showSidebar={false} fullWidthMain>
        <Helmet>
          <title>بارگذاری ویدیو</title>
          <meta name="description" content="بارگذاری ویدیو" />
        </Helmet>
        {!createVideo.data && (
          <Wrapper container>
            <Grid item xs={12}>
              <div className="uploadHeader">
                <span>
                  <CloudUpload />
                  <span className="uploadText">بارگذاری ویدیو</span>
                </span>
              </div>
            </Grid>

            {videoUploaded.file ? (
              <Grid item xs={12} className="videoInfoAfterUpload">
                <UploadProgress percentage={videoUploaded.percentage} />
                <UploadInfoForm videoUploaded={videoUploaded} />
              </Grid>
            ) : (
              <Grid item xs={12}>
                <UploadDrogArea onSelectVideo={onSelectFile} />
              </Grid>
            )}
          </Wrapper>
        )}
        {createVideo.data && (
          <Wrapper container>
            <Grid item xs={12} className="videoDetailWrapper">
              <div className="videoDetail">
                <div className="videoDetailBox">
                  {uploadBanner.data && (
                    <img
                      src={`${BASE_URL}videos/tmp/${uploadBanner.data.banner}`}
                    />
                  )}
                  {!uploadBanner.data && (
                    <img src={`${BASE_URL}images/no-image-available.png`} />
                  )}
                  <div>
                    <b>ویدیو شما با موفقیت بارگذاری شد</b>
                    <p>
                      ویدیوی شما پس از پردازشی کوتاه بر روی آپارات به نمایش
                      درخواهد آمد
                    </p>
                  </div>
                  <Button
                    variant="outlined"
                    onClick={() =>
                      dispatch(
                        push(
                          ROUTE_UPDATE_VIDEO.replace(
                            ':slug',
                            createVideo.data.slug,
                          ),
                        ),
                      )
                    }
                  >
                    مشاهده ویدیو
                  </Button>
                </div>
              </div>
            </Grid>

            <Grid item xs={12} className="withMarginTop">
              <Button
                color="secondary"
                variant="contained"
                size="large"
                className="btn btn-publish"
                onClick={() => dispatch(push(ROUTE_MY_VIDEOS))}
              >
                مدیریت ویدیو ها
              </Button>
            </Grid>
          </Wrapper>
        )}
      </Layout>
    );
  }
  // در صورتی که لاگین نباشد باید برود به صفحه لاگین
  dispatch(push(ROUTE_LOGIN));
}

UploadPage.propTypes = {
  onSelectFile: PropTypes.func,
  videoUploaded: PropTypes.object.isRequired,
};

const mapStateToProps = createStructuredSelector({
  videoUploaded: makeSelectUploadVideo(),
  createVideo: makeSelectCreateVideo(),
  uploadBanner: makeSelectUploadBanner(),
  userMe: makeSelectUserMe(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    onSelectFile: video => dispatch(uploadVideoAction(video)),
    onClearVideoDataAfterCreate: () =>
      dispatch(clearVideoDataAfterCreateAction()),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(UploadPage);
