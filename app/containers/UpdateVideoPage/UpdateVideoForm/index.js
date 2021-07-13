/**
 *
 * Loading
 *
 */

import React, { memo, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import {
  TextField,
  Grid,
  FormControlLabel,
  Switch,
  Button,
} from '@material-ui/core';
import SelectAparatCategoriesBox from 'components/SelectAparatCategoriesBox';
import MultiSelectBox from 'components/MultiSelectBox';
import SelectChannelCategory from 'components/SelectChannelCategory';
import SelectPlaylist from 'components/SelectPlaylist';
import {
  LaunchOutlined,
  FileCopyOutlined,
  LinkOutlined,
} from '@material-ui/icons';
import { createStructuredSelector } from 'reselect';
import {
  makeSelectUploadBanner,
  makeSelectUpdateVideo,
} from 'containers/App/selectors';
import {
  uploadBannerAction,
  clearUploadBannerError,
  updateVideoAction,
  clearUpdateVideoDataAction,
  notificationShowAction,
} from 'containers/App/actions';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { BASE_URL } from 'utils/constants';
import Loading from 'components/Loading';
import ErrorAlert from 'components/ErrorAlert';
import { push } from 'connected-react-router';
import { ROUTE_SHOW_VIDEO, ROUTE_VIDEO_MAIN } from 'containers/App/routes';
const StyledWrapper = styled(Grid)`
  max-width: 90%;
  width: 90%;
  padding: 2em;
  margin: 0px auto;
  background-color: #fff;
  box-shadow: 0 2px 6px 0 rgba(0, 0, 0, 0.04);

  & .formControl {
    width: 100%;
    background-color: #fff !important;
  }
  & .inputWrapper {
    margin-bottom: 20px;
  }

  & .MuiInputLabel-formControl {
    font-size: 0.9rem;
  }

  & .MuiOutlinedInput-input {
    font-size: 0.85rem;
  }
  & .inputTitle {
    font-size: 0.95em;
    font-weight: 600;
    display: inline-block;
    margin-bottom: 10px;
    color: #484b62cc;
  }
  .videoDescription {
    color: #6f7285;
    font-size: 0.9em;
    display: inline-block;
    margin-top: 4px;
  }
  .bannerImage {
    width: 100%;
    height: 200px;
  }
  .formLeft {
    padding: 2em 2em 2em 0;
  }
  .videoLinkContainer {
    border: 1px solid #d3d6e0;
    width: 100%;
    height: auto;
    margin-top: 10px;
    border-radius: 3px;
    padding: 1em;

    h4 {
      padding: 0;
      margin: 0;
    }
    .videoLink {
      margin-top: 15px;
      text-align: left;
      display: flex;
    }
    .MuiSvgIcon-root {
      color: #484b62;
      font-size: 1.5em;
      margin-right: 4px;
    }
  }

  .copyLink {
    display: inline-block;
    margin-top: 5px;
  }
  .uploadBanner {
    margin-top: 10px;
    .MuiButtonBase-root {
      background: #eee;
      box-shadow: none;
    }
    input {
      display: none;
    }
  }
  .btnWrapper {
    margin-top: 15px;

    .btnPublish {
      margin-bottom: 5px;
    }

    .btnRedirect {
      margin-bottom: 5px;
      color: #6f7285;
      .MuiSvgIcon-root {
        font-size: 1.5em;
        margin-left: 2px;
      }
    }
  }

  @media (max-width: 768px) {
    max-width: 98%;
    width: 98%;
  }
`;
function UpdateVideoForm({
  video,
  uploadBanner,
  onUploadBanner,
  clearUploadBannerError,
  updateVideo,
  updatedVideo,
  clearUpdateVideo,
  dispatch,
}) {
  useEffect(() => {
    if (updatedVideo.data) {
      handleRedirectToShowVideo();
    }
  });

  const [videoData, setVideoData] = useState(video);
  let bannerImageRef = null;
  let linkAddressRef = null;
  const videoShowLink =
    location.origin + ROUTE_VIDEO_MAIN.replace(':slug', video.slug);

  function changeData(key, value) {
    setVideoData({ ...videoData, [key]: value }); // نام داده های تعریف شده در بک اند
  }
  function onChangeBannerImage() {
    if (bannerImageRef.files && bannerImageRef.files[0]) {
      onUploadBanner(bannerImageRef.files[0]);
    }
  }
  function getBannerSrc() {
    if (uploadBanner.data) {
      return `${BASE_URL}videos/tmp/${uploadBanner.data.banner}`;
    }
    return videoData.banner_link;
  }

  function handleCopyAddres() {
    const range = document.createRange();
    range.selectNode(linkAddressRef);
    window.getSelection().removeAllRanges();
    window.getSelection().addRange(range);
    document.execCommand('copy');
    window.getSelection().removeAllRanges();
    dispatch(notificationShowAction('لینک کپی شد'), 'success');
  }

  function isDisableUploadButton() {
    return (
      (JSON.stringify(videoData) === JSON.stringify(video) &&
        uploadBanner.data == null) ||
      uploadBanner.banner
    );
  }

  function handlePublishVideo() {
    const changes = {};
    Object.entries(videoData).forEach(([key, value]) => {
      if (video[key] !== value) {
        changes[key] = value;
      }
    });
    if (uploadBanner.data) {
      changes.banner = uploadBanner.data.banner;
    }

    updateVideo(video.slug, changes);
  }

  function handleShowVideo() {
    clearUpdateVideo();
    dispatch(push(ROUTE_VIDEO_MAIN.replace(':slug', video.slug)));
  }

  function handleRedirectToShowVideo() {
    clearUpdateVideo();
    dispatch(push(ROUTE_SHOW_VIDEO.replace(':slug', video.slug)));
  }

  return (
    <StyledWrapper container>
      <Grid item xs={12} md={7}>
        <Grid item xs={12} className="inputWrapper">
          <label htmlFor="video-title" className="inputTitle">
            عنوان ویدیو
          </label>
          <TextField
            id="video-title"
            defaultValue={videoData.title}
            variant="outlined"
            fullWidth
            size="small"
            className="formControl"
            onChange={e => changeData('title', e.target.value.trim())}
          />
          <span className="videoDescription">
            عنوان ویدیو معرف ویدیو شماست. انتخاب عنوان خوب در جذب کاربران بسیار
            موثر است.
          </span>
        </Grid>

        <Grid item xs={12} className="inputWrapper">
          <label htmlFor="video-info" className="inputTitle">
            توضیحات اضافی
          </label>
          <TextField
            fullWidth
            id="video-info"
            multiline
            rows={3}
            rowsMax={3}
            defaultValue={videoData.info}
            variant="outlined"
            className="formControl"
            size="small"
            onChange={e => {
              changeData('info', e.target.value.trim());
            }}
          />
          <span className="videoDescription">
            در توضیحات اضافه میتوانید محل وقوع حادثه، تاریخ رخ دادن آن یا هر
            نکته دیگری که مربوط به ویدیو میشود را وارد کنید
          </span>
        </Grid>
        <Grid item xs={12} className="inputWrapper">
          <label htmlFor="video-category" className="inputTitle">
            دسته بندی آپارات
          </label>
          <SelectAparatCategoriesBox
            id="video-category"
            value={videoData.category_id}
            variant="outlined"
            fullWidth
            className="formControl"
            size="small"
            handleChange={(key, value) => {
              changeData('category_id', key);
            }}
          />
        </Grid>
        <Grid item xs={12} className="inputWrapper">
          <label htmlFor="video-tags" className="inputTitle">
            برچسب ها
          </label>
          <MultiSelectBox
            label=""
            customClassName="formControl"
            id="video-tags"
            defaultValue={videoData.tags}
            onChange={value => {
              changeData('tags', value);
            }}
          />
        </Grid>
        <Grid item xs={12} className="inputWrapper">
          <label htmlFor="channel-category" className="inputTitle">
            دسته بندی کانال
          </label>
          <SelectChannelCategory
            label=""
            id="channel-category"
            customClassName="formControl"
            defaultValue={videoData.personal_category_id}
            onChange={value => {
              changeData('personal_category', value);
            }}
          />
        </Grid>

        <Grid item xs={12}>
          <FormControlLabel
            control={
              <Switch
                checked={videoData.enable_watermark}
                onChange={event => {
                  changeData('enable_watermark', Number(event.target.checked));
                }}
                value="enable_watermark"
                color="secondary"
                fullWidth
              />
            }
            label="افزودن واترمارک"
          />
        </Grid>
        <Grid item xs={12}>
          <FormControlLabel
            control={
              <Switch
                checked={videoData.enable_comment}
                onChange={event => {
                  changeData('enable_comment', Number(event.target.checked));
                }}
                value="enable_comment"
                color="secondary"
                fullWidth
              />
            }
            label="امکان افزودن  دیدگاه"
          />
        </Grid>
      </Grid>
      <Grid item xs={12} md={5} className="formLeft">
        <Grid item xs={12}>
          <img src={getBannerSrc()} className="bannerImage" />
        </Grid>

        <Grid item xs={12}>
          <div className="uploadBanner">
            <Button
              variant="contained"
              fullWidth
              onClick={e => bannerImageRef.click(e)}
              disabled={!!uploadBanner.banner}
            >
              {' '}
              انتخاب بنر
            </Button>
            <input
              type="file"
              ref={el => {
                bannerImageRef = el;
              }}
              onChange={onChangeBannerImage}
            />
          </div>
          {uploadBanner.banner && <Loading />}
          {uploadBanner.error && (
            <ErrorAlert
              errorText="در بارگذاری تصویر خطایی رخ داده است"
              redirectTo={{
                url: window.location.pathname,
                text: 'صفحه آپدیت ویدیو',
              }}
              error={uploadBanner.error}
              onCloaseAlert={clearUploadBannerError}
            />
          )}
        </Grid>

        <Grid item xs={12}>
          <div className="videoLinkContainer">
            <h4>آدرس ویدیو</h4>
            <div className="videoLink">
              <span
                ref={el => {
                  linkAddressRef = el;
                }}
              >
                {videoShowLink}
              </span>
              <LaunchOutlined />
            </div>
            <div className="copyLink">
              <Button variant="outlined" onClick={handleCopyAddres}>
                <FileCopyOutlined />
                <span>کپی کردن</span>
              </Button>
            </div>
          </div>
        </Grid>

        <Grid item xs={12} className="btnWrapper">
          {updatedVideo.error && (
            <ErrorAlert
              redirectTo={{
                url: window.location.pathname,
                text: 'صفحه آپدیت ویدیو',
              }}
              error={updatedVideo.error}
              onCloaseAlert={clearUpdateVideo}
            />
          )}
          <Button
            fullWidth
            color="secondary"
            variant="contained"
            size="large"
            className="btn btnPublish"
            disabled={isDisableUploadButton()}
            onClick={handlePublishVideo}
          >
            به روزرسانی ویدیو
          </Button>

          <Button
            fullWidth
            variant="outlined"
            size="large"
            className="btn btnRedirect"
            onClick={handleShowVideo}
          >
            <LaunchOutlined />
            مشاهده ویدیو
          </Button>
        </Grid>
      </Grid>
    </StyledWrapper>
  );
}

const mapStateToProps = createStructuredSelector({
  uploadBanner: makeSelectUploadBanner(),
  updatedVideo: makeSelectUpdateVideo(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    onUploadBanner: banner => dispatch(uploadBannerAction(banner)),
    clearUploadBannerError: () => dispatch(clearUploadBannerError()),
    updateVideo: (slug, video) => dispatch(updateVideoAction(slug, video)),
    clearUpdateVideo: () => dispatch(clearUpdateVideoDataAction()),
  };
}
const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);
export default compose(
  withConnect,
  memo,
)(UpdateVideoForm);
