import React, { memo } from 'react';
import PropsTypes from 'prop-types';
import {
  Grid,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from '@material-ui/core';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { push } from 'connected-react-router';
import { ROUTE_SHOW_VIDEO } from 'containers/App/routes';
import { convertSecondsToTime } from 'utils/helpers';
const StyledWrapper = styled(Grid)`
  background-color: #fff;
  box-shadow: 0 2px 6px 0 rgba(0, 0, 0, 0.04);
  padding: 1em;
  margin-top: 2em;

  .topVideosHeader h3 {
    color: #484b62;
    font-size: 0.9rem;
  }
  .topVideoBody {
    color: #484b62;
    font-size: 0.8rem;
    font-weight: 400;
  }
  .bannerWrapper {
    img {
      width: 100px;
      height: 70px;
      margin-left: 10px;
      cursor: pointer;
    }
    .bannerContainer {
      position: relative;
      display: inline-block;
      .duration {
        position: absolute;
        top: 75%;
        left: 14px;
        color: #fff;
        background-color: rgba(0, 0, 0, 0.7);
        border-radius: 3px;
        padding: 0 4px;
        font-size: 0.8em;
      }
    }
  }
`;
function ChannelStatisticsTopVideos({ statistics, dispatch }) {
  return (
    <StyledWrapper container>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow className="topVideosHeader">
            <TableCell align="right">
              <h3>ویدیوهای پربازدید </h3>
            </TableCell>
            <TableCell align="right">
              <h3>بازدید کل</h3>
            </TableCell>
            <TableCell align="right">
              <h3>تعداد لایک</h3>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody className="topVideoBody">
          {statistics.top_videos.map(video => (
            <TableRow key={video.id}>
              <TableCell align="right">
                <div className="bannerWrapper">
                  <div className="bannerContainer">
                    <img
                      src={video.banner_link}
                      onClick={() =>
                        dispatch(
                          push(ROUTE_SHOW_VIDEO.replace(':slug', video.slug)),
                        )
                      }
                    />
                    <b className="duration">
                      {convertSecondsToTime(video.duration)}
                    </b>
                  </div>
                  <span>{video.title}</span>
                </div>
              </TableCell>
              <TableCell align="right">{video.views}</TableCell>
              <TableCell align="right">{video.like_count}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </StyledWrapper>
  );
}
ChannelStatisticsTopVideos.propsTypes = {};

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}
const whitConnect = connect(
  null,
  mapDispatchToProps,
);
export default whitConnect(ChannelStatisticsTopVideos);
