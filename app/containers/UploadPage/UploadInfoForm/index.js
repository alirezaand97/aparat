import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import {
  Grid,
  Tabs,
  Tab,
  TextField,
  Button,
  FormControlLabel,
  Switch,
} from '@material-ui/core';
import SelectAparatCategoriesBox from 'components/SelectAparatCategoriesBox';
import MultiSelectBox from 'components/MultiSelectBox';
import Dump from 'components/Dump';
import SelectChannelCategory from 'components/SelectChannelCategory';
import SelectPlaylist from 'components/SelectPlaylist';
import { connect } from 'react-redux';
import { createVideoAction } from 'containers/App/actions';
import {
  makeSelectCreateVideo,
  makeSelectUploadBanner,
} from 'containers/App/selectors';
import { createStructuredSelector } from 'reselect';
import DatePickerModal from '../DatePickerModal';
const Wrapper = styled.div`
  & .tabs {
    border-bottom: 1px solid #ddd;
  }

  & .formControl {
    width: 100%;
    background-color: rgb(254, 252, 252) !important;
  }
  & .inputWrapper {
    margin-bottom: 20px;
  }

  & .tabContent {
    margin-top: 2rem;
  }
  & .MuiInputLabel-formControl {
    font-size: 0.9rem;
  }

  & .MuiOutlinedInput-input {
    font-size: 0.85rem;
  }

  & .btn-wrapper {
    direction: ltr;
    margin-top: 60px;
    & .btn {
      margin: 3px;

      &.btn-publish-later {
        background: #bbb;
        color: #fff;

        &:hover {
          background: #f50057;
          color: white;
        }
      }
    }
  }
`;

function FileUploadInfo({ videoUploaded, createVideo, uploadBanner }) {
  const [selectedTab, setSelectedTab] = useState(0);
  const [showDatePickerModal, setShowDatePickerModal] = useState(false);
  const [videoData, setVideoData] = useState({
    title: 'عنوان ویدیو',
    video_id:
      videoUploaded && videoUploaded.data ? videoUploaded.data.video : null,
    category_id: 1,
    personal_category: null,
    info: 'این توضیحان هستش',
    tags: [],
    playlist: null,
    enable_comment: true,
    enable_watermark: false,
    publish_at: '',
    banner: null,
  });

  useEffect(() => {
    if (videoUploaded && videoUploaded.data && !videoData.video_id) {
      setVideoData({ ...videoData, video_id: videoUploaded.data.video });
    }
    if (uploadBanner && uploadBanner.data && !videoData.banner) {
      setVideoData({ ...videoData, banner: uploadBanner.data.banner });
    }
  });

  function changeData(key, value) {
    setVideoData({ ...videoData, [key]: value });
  }

  function onCreateVideo() {
    createVideo(videoData);
  }

  return (
    <Wrapper>
      <Tabs
        value={selectedTab}
        onChange={(e, tabIndex) => {
          setSelectedTab(tabIndex);
        }}
        indicatorColor="primary"
        textColor="primary"
        className="tabs"
      >
        <Tab label="مشخصات ویدیو" />
        <Tab label="تنظیمات پیشترفته" />
      </Tabs>
      <Grid container>
        {selectedTab === 0 && (
          <Grid container spacing={2} className="tabContent">
            <Grid item xs={12} sm={6} className="inputWrapper">
              <TextField
                id="video-title"
                label="عنوان ویدیو"
                defaultValue={videoData.title}
                variant="outlined"
                fullWidth
                size="small"
                className="formControl"
                onChange={e => changeData('title', e.target.value.trim())}
              />
            </Grid>
            <Grid item xs={12} sm={6} className="inputWrapper">
              <SelectAparatCategoriesBox
                id="video-category"
                value={videoData.category_id}
                variant="outlined"
                fullWidth
                label="دسته بندی آپارات"
                className="formControl"
                size="small"
                handleChange={(key, value) => {
                  changeData('category_id', key);
                }}
              />
            </Grid>
            <Grid item xs={12} className="inputWrapper">
              <TextField
                fullWidth
                id="video-info"
                label="توضیحات اضافی"
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
            </Grid>
            <Grid item xs={12} sm={6} className="inputWrapper">
              <MultiSelectBox
                label="برچسب ها"
                className="formControl"
                onChange={value => {
                  changeData('tags', value);
                }}
                selecteds={videoData.tags}
              />
            </Grid>
            <Grid item xs={12} sm={6} className="inputWrapper">
              <SelectChannelCategory
                label="دسته بندی کانال"
                className="formControl"
                onChange={value => {
                  changeData('personal_category', value);
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6} className="inputWrapper">
              <SelectPlaylist
                label="لیست پخش"
                className="formControl"
                onChange={value => {
                  changeData('playlist', value);
                }}
              />
            </Grid>
          </Grid>
        )}
        {selectedTab === 1 && (
          <Grid container className="tabContent">
            <Grid item xs={6} sm={6}>
              <FormControlLabel
                control={
                  <Switch
                    checked={videoData.enable_watermark}
                    onChange={event => {
                      changeData('enable_watermark', event.target.checked);
                    }}
                    value="enable_watermark"
                    color="secondary"
                  />
                }
                label="افزودن واترمارک"
              />
            </Grid>
            <Grid item xs={6} sm={6}>
              <FormControlLabel
                control={
                  <Switch
                    checked={videoData.enable_comment}
                    onChange={event => {
                      changeData('enable_comment', event.target.checked);
                    }}
                    value="enable_comment"
                    color="secondary"
                  />
                }
                label="امکان افزودن  دیدگاه"
              />
            </Grid>
          </Grid>
        )}
      </Grid>
      <Grid container className="btn-wrapper">
        <Button
          onClick={() => onCreateVideo()}
          color="secondary"
          variant="contained"
          size="large"
          className="btn btn-publish"
        >
          انتشار ویدیو
        </Button>
        <Button
          color="primary"
          variant="contained"
          size="large"
          className="btn btn-publish-later"
          onClick={() => setShowDatePickerModal(true)}
        >
          ذخیره بعدا منتشر میکنم
        </Button>
      </Grid>
      <DatePickerModal
        open={showDatePickerModal}
        onClose={() => setShowDatePickerModal(false)}
        onAccept={value => changeData('publish_at', value)}
      />
    </Wrapper>
  );
}
const mapStateToProps = createStructuredSelector({
  banner: makeSelectCreateVideo(),
  uploadBanner: makeSelectUploadBanner(),
});
function mapDispatchToProps(dispatch) {
  return {
    createVideo: video => dispatch(createVideoAction(video)),
  };
}
const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);
export default withConnect(FileUploadInfo);
