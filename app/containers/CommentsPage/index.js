/**
 *
 * CommentsPage
 *
 */

import React, { memo, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { compose } from 'redux';
import DashboardLayouts from 'layouts/DashboardLayouts';
import { getCommentsAction } from 'containers/App/actions';
import { createStructuredSelector } from 'reselect';
import { makeSelectGetComments } from 'containers/App/selectors';
import FilterComments from 'components/FilterList';
import CommentList from 'components/CommentList';
import ErrorAlert from 'components/ErrorAlert';
import NoItemFound from 'components/NoItemFound';
import { COMMENT_STATE_PENDING } from 'utils/constants';
import Loading from 'components/Loading';

const filterValues = {
  all: 'همه دیدگاه ها',
  unAccepted: 'دیدگاه های تایید نشده',
};

export function CommentsPage({ getComment, comments }) {
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    getComment();
  }, []);

  function renderComments() {
    if (filter === 'all') {
      return comments.data;
    }
    return comments.data.reduce((carry, item) => {
      const copiedItem = { ...item };
      if (copiedItem.children && copiedItem.children.length) {
        copiedItem.children = copiedItem.children.filter(
          subItem => subItem.state === COMMENT_STATE_PENDING,
        );
      }
      if (
        copiedItem.state === COMMENT_STATE_PENDING ||
        copiedItem.children.length
      ) {
        return [...carry, copiedItem];
      }
      return carry;
    }, []);
  }

  return (
    <DashboardLayouts>
      <Helmet>
        <title>CommentsPage</title>
        <meta name="description" content="Description of CommentsPage" />
      </Helmet>
      <FilterComments
        filter={filter}
        values={filterValues}
        onChangeFilter={setFilter}
      />
      {!comments.data ||
        (!comments.data.length && <NoItemFound title="دیدگاهی یافت نشد" />)}
      {comments.data && <CommentList comments={renderComments()} />}
      {comments.loading && <Loading text="در حال دریافت دیدگاه ها..." />}
    </DashboardLayouts>
  );
}

CommentsPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    getComment: () => dispatch(getCommentsAction()),
  };
}
const mapStateToProps = createStructuredSelector({
  comments: makeSelectGetComments(),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(CommentsPage);
