import React, { memo } from 'react';
import PropsTypes from 'prop-types';
import {
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@material-ui/core';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { Line } from 'react-chartjs-2';
const StyledVideoThumbWrapper = styled(Grid)`
  background-color: #fff;
  box-shadow: 0 2px 6px 0 rgba(0, 0, 0, 0.04);
  padding: 1em;
  margin-top: 2em;
  .daysSelectBox {
    text-align: left;
    padding: 0 25px;
    .MuiSelect-select {
      font-size: 0.8em;
    }
  }
`;
function VideoStatisticChart({ statistic, range, onChangeRange }) {
  const data = {
    labels: Object.keys(statistic).map(
      d => new Date(d).toLocaleString('FA-IR').split('،')[0],
    ),
    datasets: [
      {
        label: 'بازدید های ویدیو',
        backgroundColor: 'rgba(255,99,132,0.2)',
        borderColor: '#df0f50',
        borderWidth: 1,
        hoverBackgroundColor: 'rgba(255,99,132,0.4)',
        hoverBorderColor: 'rgba(255,99,132,1)',
        data: Object.values(statistic),
      },
    ],
  };
  const options = {
    scales: {
      yAxes: [
        {
          ticks: {
            min: 0,
            max: Math.max(...Object.values(statistic)) + 1,
            stepSize: 1,
          },
        },
      ],
    },
  };
  return (
    <StyledVideoThumbWrapper container>
      <Grid item xs={12} className="daysSelectBox">
        <FormControl variant="outlined" size="small">
          <InputLabel id="demo-simple-select-outlined-label">زمان</InputLabel>
          <Select
            labelId="demo-simple-select-outlined-label"
            id="demo-simple-select-outlined"
            value={range}
            onChange={e => onChangeRange(e.target.value)}
            label="زمان"
          >
            <MenuItem value={7}>یک هفته ی اخیر</MenuItem>
            <MenuItem value={30}>یک ماه اخیر</MenuItem>
            <MenuItem value={90}> سه ماه اخیر</MenuItem>
          </Select>
        </FormControl>
      </Grid>
      <Line data={data} options={options} />
    </StyledVideoThumbWrapper>
  );
}
VideoStatisticChart.propsTypes = {};

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}
const whitConnect = connect(
  null,
  mapDispatchToProps,
);
export default whitConnect(VideoStatisticChart);
