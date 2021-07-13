import React, { memo } from 'react';
import styled from 'styled-components';
import { Grid, Button } from '@material-ui/core';

const StyledFilters = styled(Grid)`
  overflow: auto;
  white-space: nowrap;
  margin-bottom: 20px;

  ::-webkit-scrollbar {
    height: 3px;
  }

  ::-webkit-scrollbar-thumb {
    background: #d9d9d9;
    border-radius: 10px;
  }

  & .filterButton {
    background: #d3d6e0;
    padding: 0.5em 1.7em;
    border-radius: 25px;
    margin: 0px 3px;
    font-size: 1em;
  }
  & .filterButton:hover {
    background: #484b62;
    color: #fff;
  }
  & .active {
    background: #484b62;
    color: #fff;
  }
`;

export function FilterList({ onChangeFilter, filter, values }) {
  return (
    <StyledFilters>
      {Object.entries(values).map(([key, label]) => (
        <Button
          className={`filterButton ${key === filter ? 'active' : ''}`}
          onClick={() => onChangeFilter(key)}
          key={key}
        >
          {label}
        </Button>
      ))}
    </StyledFilters>
  );
}

export default memo(FilterList);
