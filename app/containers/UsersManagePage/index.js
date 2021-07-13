import React, { memo, useEffect, useState } from 'react';
import DashboardLayouts from 'layouts/DashboardLayouts';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { compose } from 'redux';
import {
  getAllVideosToManageAction,
  getUsersAction,
} from 'containers/App/actions';

import { makeSelectGetUsers } from 'containers/App/selectors';
import Loading from 'components/Loading';
import UsersTable from './UsersTable';
import UserDialog from './UserDialog';

function UserManagePage({ dispatch, usersData }) {
  const [perPage, setPerPage] = useState(10);
  const [page, setPage] = useState(1);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(getUsers, [page, perPage]);

  function getUsers() {
    dispatch(getUsersAction({ page, perPage }));
  }

  function changePange(p, pp) {
    setPage(p);
    setPerPage(pp);
  }

  return (
    <DashboardLayouts>
      {usersData.params && <Loading text="در حال دریافت کاربران..." />}
      {usersData.data && (
        <UsersTable
          users={usersData.data.data}
          page={page}
          perPage={perPage}
          handleChangePage={changePange}
          onRowClick={setSelectedUser}
        />
      )}

      {selectedUser && (
        <UserDialog
          onCancel={() => setSelectedUser(null)}
          onAccept={() => setSelectedUser(null)}
          open={!!selectedUser}
          user={selectedUser}
        />
      )}
    </DashboardLayouts>
  );
}

const mapStateToProps = createStructuredSelector({
  usersData: makeSelectGetUsers(),
});
function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(UserManagePage);
