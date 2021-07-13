import React, { memo } from 'react';
import PropsTypes from 'prop-types';
import { Grid, IconButton, Paper } from '@material-ui/core';
import styled from 'styled-components';
import {
  TimelineOutlined,
  MovieOutlined,
  PeopleOutline,
  AccessTime,
} from '@material-ui/icons';
import moment from 'moment';
const StyledVideoStatisticWrapper = styled.div`
  position: relative;
  margin-top: 2em;
  box-sizing: border-box;
  .statisticItem {
    background-color: #fff;
    box-shadow: 0 2px 6px 0 rgba(0, 0, 0, 0.04);
    padding: 2em;
    text-align: center;
    .numbers {
      display: block;
      text-align: center;
      color: #484b62;
      fill: #484b62;
      font-size: 1.5em;
      font-weight: 600;
      padding: 0.7em;
    }
    .titles {
      margin-bottom: 1em;
      color: #6f7285;
      fill: #6f7285;
      span {
        display: inline-block;
        margin-right: 6px;
      }
    }
  }
`;
function VideoStatistic({ video, statistic }) {
  function todaysViews() {
    let result = 0;
    Object.entries(statistic.views).forEach(([dt, value]) => {
      if (
        !moment()
          .startOf('day')
          .diff(dt, 'days')
      ) {
        result += value;
      }
    });
    return result;
  }

  return (
    <StyledVideoStatisticWrapper>
      <Grid container spacing={3}>
        <Grid item md={3} xs={6}>
          <div className="statisticItem">
            <span className="numbers">{video.like_count}</span>
            <div className="titles">
              <PeopleOutline />
              <span>تعداد پسند ها</span>
            </div>
          </div>
        </Grid>
        <Grid item md={3} xs={6}>
          <div className="statisticItem">
            <span className="numbers">{video.views}</span>
            <div className="titles">
              <MovieOutlined />
              <span>بازدید ویدیو</span>
            </div>
          </div>
        </Grid>
        <Grid item md={3} xs={6}>
          <div className="statisticItem">
            <span className="numbers">20</span>
            <div className="titles">
              <AccessTime />
              <span> مدت تماشا</span>
            </div>
          </div>
        </Grid>
        <Grid item md={3} xs={6}>
          <div className="statisticItem">
            <span className="numbers">{todaysViews()}</span>
            <div className="titles">
              <TimelineOutlined />
              <span>بازدید امروز</span>
            </div>
          </div>
        </Grid>
      </Grid>
    </StyledVideoStatisticWrapper>
  );
}
VideoStatistic.propsTypes = {
  video: PropsTypes.object.isRequired,
};
export default VideoStatistic;
