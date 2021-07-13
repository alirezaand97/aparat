import React, { memo, useState, useEffect } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import styled from 'styled-components';
import {
  ReportProblemOutlined,
  AddOutlined,
  EditOutlined,
  CloseOutlined,
} from '@material-ui/icons';
import { Button, TextField } from '@material-ui/core';
import ConfirmModal from 'components/ConfirmModal';
import {
  unRegisterUserAction,
  getChannelCategoriesAction,
  addChannelCategoriesAction,
  editChannelCategoriesAction,
} from 'containers/App/actions';
import { createStructuredSelector } from 'reselect';
import {
  makeSelectUnRegisterUser,
  makeSelectUserMe,
  makeSelectChannelCategories,
  makeSelectAddChannelCategories,
  makeSelectEditChannelCategories,
} from 'containers/App/selectors';
import { GET_CHANNEL_CATEGORIES } from 'containers/App/constants';

const StledUnCategoryWrapper = styled.div`
  width: 100%;
  margin-top: 3em;
  background: #fff;
  box-shadow: 0 2px 6px 0 rgba(0, 0, 0, 0.04);
  padding: 1.5rem;

  .topBar {
    width: 100%;
    padding-bottom: 1em;
    border-bottom: 1px solid #eee;
    margin-bottom: 2em;
  }

  .topBar .topBarRight {
    display: flex;
    justify-content: right;
    align-items: center;
    float: right;
  }
  .topBar .topBarRight h4 {
    margin: 0.5em;
  }
  .topBar .topBarRight span {
    display: inline-block;
    font-size: 0.7rem;
  }
  .topBar .topBarRight .userAvatar {
    width: 36px;
    height: 36px;
    border-radius: 100%;
  }

  .topBar .topBarLeft {
    float: left;
    display: block;
  }
  .topBar .topBarLeft .addButton {
    border-radius: 20px;
    color: #6f7285;
  }
  .clearFloat {
    clear: both;
  }

  .newCategoryWrapper {
    width: 100%;
    height: 155px;
    background: #f5f5f9;
    border-radius: 2px;
    padding: 1rem;
    margin: 1rem 0;
    overflow: hidden;
    box-sizing: border-box;
    transition: all 200ms ease;
  }
  .newCategoryWrapper h5 {
    font-size: 0.8rem;
    margin: 1em;
  }

  .newCategoryWrapper .btnWrapper {
    margin-top: 0.8em;
  }
  .btn {
    border-radius: 20px;
    padding: 0.2em 1em;
  }
  .accept {
    color: #fff;
    background-color: #05a3e8;
    border-color: transparent;
    margin-left: 0.2em;
  }
  .accept:hover {
    background: #05a3e8a6;
  }
  .hide {
    height: 0;
    padding-top: 0;
    padding-bottom: 0;
  }

  .newCategoryInput {
    background: #fff;
  }
`;

const CategoryItem = styled.div`
  padding: 1rem 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;

  &:hover {
    background-color: #fbfbfc;
  }
  .categoryContainer {
    display: flex;
    padding: 0 0.7rem;
  }
  .categoryContainer h4 {
    margin: 0;
  }
  .categoryContainer span {
    margin-right: 1.2em;
  }
  .editContainer span:hover {
    background: #f5f5f9;
    cursor: pointer;
  }
  .editContainer span {
    display: inline-block;
    padding: 0.5em;
    border-radius: 100%;
    margin: 0 4px;
    color: #6f7285;
  }

  .editBox {
    position: absolute;
    left: 0;
    right: 0;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    padding: 0 0.7rem;
    background: #fff;
  }
  .editBox .MuiSvgIcon-root {
    color: #6f7285;
    font-size: 1.3rem;
    cursor: pointer;
  }
  .editBox .MuiSvgIcon-root:hover {
    color: red;
  }
  .editBox .editInput {
    margin: 0 1em;
  }

  .hideEditBox {
    opacity: 0;
    right: 50%;
    transform: scale(0, 0);
    transition: all 200ms ease;
  }
`;
function Categoriestab({
  userData,
  getCategories,
  categories,
  addNewCategory,
  newCategory,
  editCategory,
  editedCategory,
}) {
  let newCategoryWrapperElement = null;
  let newCategoryTitleInput = null;

  useEffect(() => {
    getCategories(categories.data);
  }, []);

  useEffect(() => {
    if (newCategory.data) {
      newCategoryWrapperElement.classList.toggle('hide');
      newCategoryTitleInput.value = '';
    }
  }, [newCategory.data]);

  const userInfo = userData && userData.data;

  function handleOpenAddNewCategory() {
    newCategoryWrapperElement.classList.toggle('hide');
  }
  function submitNewCategory() {
    addNewCategory(newCategoryTitleInput.value);
  }

  function handleShowEditBox(e) {
    e.currentTarget.nextElementSibling.classList.remove('hideEditBox');
  }

  function handleCloseEditBox(e) {
    e.currentTarget.parentElement.classList.add('hideEditBox');
  }

  function submitEditCategory(e) {
    const title = e.currentTarget.parentElement.querySelector(
      '.editInput input',
    ).value;
    const id = e.currentTarget.dataset.catid;
    handleCloseEditBox(e);
    editCategory(id, title);
  }

  return (
    <StledUnCategoryWrapper>
      <div className="topBar">
        <div className="topBarRight">
          <img src={userInfo.avatar} className="userAvatar" />
          <h4>{userInfo.channel.name}/</h4>
          <span>دسته بندی ها</span>
        </div>
        <div className="topBarLeft">
          <Button
            variant="outlined"
            className="addButton"
            onClick={() => handleOpenAddNewCategory()}
          >
            <AddOutlined />
            افزودن
          </Button>
        </div>
        <div className="clearFloat" />
      </div>

      <div
        className="newCategoryWrapper hide"
        ref={el => {
          newCategoryWrapperElement = el;
        }}
      >
        <h5>نام دسته بندی جدید را وارد کنید</h5>
        <TextField
          id="outlined-basic"
          variant="outlined"
          fullWidth
          size="small"
          inputProps={{
            ref: el => {
              newCategoryTitleInput = el;
            },
          }}
          className="newCategoryInput"
        />
        <div className="btnWrapper">
          <Button
            variant="outlined"
            className="btn accept"
            onClick={() => submitNewCategory()}
            disabled={!!newCategory.category}
          >
            افزودن
          </Button>
          <Button
            variant="outlined"
            className="btn"
            onClick={() => handleOpenAddNewCategory()}
          >
            انصراف
          </Button>
        </div>
      </div>
      {categories.data &&
        categories.data.map(category => (
          <CategoryItem key={category.id}>
            <div className="categoryContainer">
              <h4>{category.title}</h4>
              <span>تعداد ویدیوها (0)</span>
            </div>
            <div className="editContainer" onClick={handleShowEditBox}>
              <span>
                <EditOutlined />
              </span>
            </div>
            <div className="editBox hideEditBox">
              <CloseOutlined
                onClick={handleCloseEditBox}
                className="closeEditBtn"
              />
              <TextField
                id="outlined-basic"
                variant="outlined"
                size="small"
                className="editInput"
                defaultValue={category.title}
              />
              <Button
                variant="outlined"
                className="btn accept"
                onClick={e => submitEditCategory(e, category.id)}
                data-catId={category.id}
              >
                ویرایش{' '}
              </Button>
            </div>
          </CategoryItem>
        ))}
    </StledUnCategoryWrapper>
  );
}

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    getCategories: () => dispatch(getChannelCategoriesAction()),
    addNewCategory: title => dispatch(addChannelCategoriesAction(title)),
    editCategory: (id, title) =>
      dispatch(editChannelCategoriesAction(id, title)),
  };
}

const mapStateToProps = createStructuredSelector({
  userData: makeSelectUserMe(),
  categories: makeSelectChannelCategories(),
  newCategory: makeSelectAddChannelCategories(),
  editedCategory: makeSelectEditChannelCategories(),
});
const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(Categoriestab);
