import { Dialog, Paper } from '@material-ui/core';
import styled from 'styled-components';

export const StyledPaper = styled(Paper)`
  .tableRoot {
    width: 100%;
  }
  .tableContainer {
    max-height: 440px;
  }

  .tableContainer {
    ::-webkit-scrollbar {
      width: 3px;
      height: 4px;
    }

    ::-webkit-scrollbar-thumb {
      background: #8689a2;
      border-radius: 10px;
    }
  }

  .MuiTableRow-root {
    cursor: pointer;
  }
`;

export const StyledDialog = styled(Dialog)`
  .MuiDialog-paper {
    width: 400px;
    max-width: 95%;
  }
  .MuiDialog-paper {
    margin: 10px;
  }
  .inpLabel {
    color: #6e707e;
    font-size: 0.8rem;
  }

  .updateUserButoonWrapper {
    display: flex;
    justify-content: space-between;
    margin-top: 1rem;
  }
  .updateUserButoonWrapper .MuiButton-root {
    padding: 0.3rem 0.6rem;
  }
  .actionButtons .MuiButton-root {
    margin-left: 0.2rem;
  }

  @media (max-width: 576px) {
    .updateUserButoonWrapper {
      flex-direction: column;
    }
  }
`;
