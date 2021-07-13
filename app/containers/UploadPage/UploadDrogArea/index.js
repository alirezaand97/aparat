/**
 *
 * UploadPage
 *
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Grid } from '@material-ui/core';
import { CloudUpload, CloudUploadOutlined } from '@material-ui/icons';
import { FileDrop } from 'react-file-drop';

const Wrapper = styled.div`
  .uploadPolicy {
    width: 100%;
    background-color: rgb(249, 248, 248);
    margin-top: 50px;
    padding: 30px 10px;
    border-radius: 3px;
    overflow: hidden;
    display: flex;
    justify-content: space-around;
  }
  .uploadPolicy p {
    font-size: 12px;
    line-height: 2;
    text-align: right;
    margin: 0px 5px;
    color: rgb(120, 120, 120) !important;
  }

  & .fileDrop {
    border: 2px dashed rgb(212, 212, 212);
    border-radius: 2px;
    margin-top: 50px;
    padding: 3em;
    min-height: 250px;
  }
  & .uploadAreaRight {
    width: 300px;
    max-width: 300px;
    float: right;
    margin-top: 10px;
  }
  & .uploadAreaLeft {
    width: 300px;
    max-width: 300px;
    float: left;
    text-align: center;
    margin-top: -24px;
  }
  & .uploadAreaLeft .MuiSvgIcon-root {
    font-size: 200px;
    color: #efefef;
  }
  & .uploadAreaRight b,
  .uploadAreaRight span {
    display: block;
    text-align: center;
    margin-bottom: 20px;
  }
  & .uploadAreaRight b {
    font-size: 1.3rem;
  }
  & .uploadAreaRight span {
    font-size: 0.9rem;
  }
  & .uploadAreaRight button {
    display: block;
    width: auto;
    background-color: rgb(255, 255, 255);
    outline: none;
    font-size: 0.9rem;
    font-weight: 500;
    color: rgb(136, 135, 135);
    cursor: pointer;
    border-radius: 2px;
    border-width: 1px;
    border-style: solid;
    border-color: rgb(215, 215, 215);
    border-image: initial;
    padding: 0.7em 1.5em;
    margin: 0px auto;
  }

  & [type='file'] {
    display: none;
  }

  @media (max-width: 980px) {
    & .uploadWrapper {
      max-width: 90%;
      width: 90%;
      margin: 30px auto;
    }
    & .uploadAreaRight {
      max-width: 90%;
      width: 90%;
      float: none;
    }
    & .uploadAreaLeft {
      display: none;
    }
  }
`;

export function UploadDrogArea({ onSelectVideo }) {
  let fileSelectedToUpload = null;
  const callFileSelector = () => {
    fileSelectedToUpload.click();
  };
  const handleDrop = files => {
    if (files) {
      const file = files[0];
      if (file.type !== 'video/mp4') {
        return alert(
          'فرمت ویدیوی وارد شده صحیح نمی باشد.ویدیو را با فرمت mp4 وارد کنید',
        );
      }
      if (file.size < 100 || file.size > 1000000000) {
        return alert('حجم ویدیو انتخاب شده مناسب نیست');
      }
      onSelectVideo(files[0]);
    }
    return false;
  };

  const callHandleDropToGetFile = e => {
    handleDrop(e.target.files);
  };

  return (
    <Wrapper className="uploadArea">
      <FileDrop onDrop={handleDrop} className="fileDrop">
        <div className="uploadAreaRight">
          <b>فایل های خود را اینجا بکشید</b>
          <span>یا</span>
          <button type="button" onClick={callFileSelector}>
            انتخاب فایل
          </button>
          <input
            type="file"
            ref={el => {
              fileSelectedToUpload = el;
            }}
            onChange={callHandleDropToGetFile}
          />
        </div>
        <div className="uploadAreaLeft">
          <CloudUploadOutlined />
        </div>
      </FileDrop>
      <div className="uploadPolicy">
        <p>
          در سیستم بارگذاری جدید آپارات ، برای بارگذاری ویدئوهای خود از آخرین
          نسخه مرورگرهای به روز همچون کروم ، فایرفاکس ، سافاری استفاده نمایید.
        </p>

        <p>
          به جهت حفظ حقوق مؤلفین و رونق تجاری سینمای کشور، لطفاً از بارگذاری
          ویدیوهایی که دارای حق نشر می باشند و در شبکه نمایش خانگی به فروش می
          رسند، خودداری فرمایید
        </p>
      </div>
    </Wrapper>
  );
}

UploadDrogArea.propTypes = {
  onSelectFile: PropTypes.func,
};

export default UploadDrogArea;
