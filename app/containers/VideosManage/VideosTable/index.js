import React, { memo, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import { Chip } from '@material-ui/core';
import {
  VIDEO_STATES_TITLES,
  VIDEO_STATE_PENDING,
  VIDEO_STATE_CONVERTED,
  VIDEO_STATE_ACCEPTED,
  VIDEO_STATE_BLOCKED,
} from 'utils/constants';
import { StyledPaper } from '../styles';

const VIDEO_STATE_COLORS = {
  [VIDEO_STATE_PENDING]: 'default',
  [VIDEO_STATE_ACCEPTED]: 'primary',
  [VIDEO_STATE_CONVERTED]: 'primary',
  [VIDEO_STATE_BLOCKED]: 'secondary',
};

const columns = [
  {
    name: 'id',
    title: 'کد',
    minWidth: 70,
    align: 'right',
  },
  {
    name: 'title',
    title: 'عنوان',
    minWidth: 130,
    align: 'right',
  },
  {
    name: 'user',
    title: 'کاربر',
    minWidth: 100,
    align: 'right',
    cast: v => v.name,
  },
  {
    name: 'user',
    title: 'کانال',
    minWidth: 100,
    align: 'right',
    cast: v => v.channel.name,
  },
  {
    name: 'category_name',
    title: 'دسته بندی',
    minWidth: 130,
    align: 'right',
  },

  {
    name: 'state',
    title: 'وضعیت',
    minWidth: 130,
    align: 'right',
    cast: v => (
      <Chip label={VIDEO_STATES_TITLES[v]} color={VIDEO_STATE_COLORS[v]} />
    ),
  },
];

function VideosTable({ videos, page, perPage, handleChangePage, onRowClick }) {
  function changePage(event, newPage) {
    handleChangePage(newPage + 1, perPage);
  }

  function changePerPage(event) {
    handleChangePage(1, +event.target.value);
  }

  return (
    <StyledPaper className="tableRoot">
      <TableContainer className="tableContainer">
        <Table aria-label=" table">
          <TableHead>
            <TableRow>
              {columns.map(column => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.title}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {videos.map(video => (
              <TableRow
                hover
                role="checkbox"
                tabIndex={-1}
                key={video.id}
                onClick={() => onRowClick(video)}
              >
                {columns.map(column => {
                  const value = video[column.name];
                  return (
                    <TableCell
                      key={column.name}
                      align={column.align}
                      dir={column.dir}
                    >
                      >{column.cast ? column.cast(value) : value}
                    </TableCell>
                  );
                })}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={videos.total}
        rowsPerPage={perPage}
        labelRowsPerPage=""
        labelDisplayedRows={() => `صفحه ${page}`}
        page={page - 1}
        onChangePage={changePage}
        onChangeRowsPerPage={changePerPage}
      />
    </StyledPaper>
  );
}

export default memo(VideosTable);
