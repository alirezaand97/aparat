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
import { StyledPaper } from '../styles';
const columns = [
  {
    name: 'id',
    title: 'کد',
    minWidth: 60,
    align: 'right',
  },
  {
    name: 'name',
    title: 'نام کاربری',
    minWidth: 130,
    align: 'right',
  },
  {
    name: 'mobile',
    title: 'موبایل',
    minWidth: 130,
    align: 'right',
    dir: 'ltr',
  },
  {
    name: 'email',
    title: 'ایمیل',
    minWidth: 130,
    align: 'right',
  },
  {
    name: 'type',
    title: 'نوع کاربری',
    minWidth: 130,
    align: 'right',
    cast: v => (
      <Chip
        label={v === 'admin' ? 'مدیر' : 'کاربر'}
        color={v === 'admin' ? 'secondary' : 'default'}
      />
    ),
  },
  {
    name: 'created_at',
    title: 'تاریخ ثبت نام',
    minWidth: 130,
    align: 'right',
    cast: v => new Date(v).toLocaleString('FA-IR'),
    dir: 'ltr',
  },
  {
    name: 'verified_at',
    title: 'وضعیت',
    minWidth: 130,
    align: 'right',
    cast: v =>
      v ? 'تایید شده' : <b style={{ color: '#f50057' }}>تایید نشده</b>,
  },
];

function UsersTable({ users, page, perPage, handleChangePage, onRowClick }) {
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
            {users.map(user => (
              <TableRow
                hover
                role="checkbox"
                tabIndex={-1}
                key={user.id}
                onClick={() => onRowClick(user)}
              >
                {columns.map(column => {
                  const value = user[column.name];
                  return (
                    <TableCell
                      key={column.name}
                      align={column.align}
                      dir={column.dir}
                    >
                      {column.cast ? column.cast(value) : value}
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
        count={users.total}
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

export default memo(UsersTable);
