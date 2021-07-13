import React, { memo } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import styled from 'styled-components';
import {
  Facebook,
  FileCopyOutlined,
  LinkedIn,
  Telegram,
  Twitter,
  WhatsApp,
} from '@material-ui/icons';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { notificationShowAction } from 'containers/App/actions';

const StyledShareDialog = styled(Dialog)`
  .dialogTitle .MuiTypography-h6 {
    font-size: 1rem;
  }
  .videoShareLink {
    padding: 0.7rem;
    background: #eee;
    overflow: hidden;
    border-radius: 3px;
    color: #484b62e3;
    margin-bottom: 1rem;
  }
  .videoShareLink .MuiButtonBase-root {
    cursor: pointer;
    margin-left: 1em;
    min-width: auto;
    padding: 0.2rem 0.3rem;
    border-radius: 100%;
  }
  .socialsButton {
    display: flex;
    justify-content: space-between;
    margin-bottom: 2rem;
  }
  .socialsButton .socialLink {
    text-decoration: none;
    display: flex;
    flex-direction: column;
    color: #60647e;
  }
  .socialsButton .socialLink b {
    font-size: 0.7rem;
    display: inline-block;
    margin-top: 5px;
  }

  .socialsButton .socialLink .MuiSvgIcon-root {
    font-size: 2rem;
  }
`;

const links = [
  {
    title: 'فیسبوک',
    icon: <Facebook style={{ color: '#3b5998' }} />,
    link: 'http://www.facebook.com/share.php?u=$LINK$',
  },
  {
    title: 'تویتتر',
    icon: <Twitter style={{ color: '#55acee' }} />,
    link: 'https://www.twitter.com/intent/tweet?url=$LINK$',
  },
  {
    title: 'واتس‌اپ',
    icon: <WhatsApp style={{ color: '#43d854' }} />,
    link: 'https://wa.me/?text=$LINK$',
  },
  {
    title: 'تلگرام',
    icon: <Telegram style={{ color: '#08c' }} />,
    link: 'https://t.me/share/url?url=$LINK$',
  },
  {
    title: 'لینکداین',
    icon: <LinkedIn style={{ color: '#0077b5' }} />,
    link: 'https://www.linkedin.com/shareArticle?mini=true&url=$LINK$',
  },
];

function ShareSocialModal({ open, onCancel, url, dispatch }) {
  let shareLinkRef = null;

  function copyLinkAddres() {
    const range = document.createRange();
    range.selectNode(shareLinkRef);
    window.getSelection().removeAllRanges();
    window.getSelection().addRange(range);
    document.execCommand('copy');
    window.getSelection().removeAllRanges();
    dispatch(notificationShowAction('لینک کپی شد', 'success'));
  }
  return (
    <div>
      <StyledShareDialog
        open={open}
        onClose={() => onCancel(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle className="dialogTitle" id="alert-dialog-title">
          اشتراک گذاری در شبکه های اجتماعی
        </DialogTitle>
        <DialogContent>
          <div className="socialsButton">
            {links.map(item => (
              <a
                key={item.title}
                href={item.link.replace('$LINK$', url)}
                target="_blank"
                onClick={() => onClose()}
                className="socialLink"
              >
                {item.icon}
                <b>{item.title}</b>
              </a>
            ))}
          </div>
          <div className="videoShareLink">
            <Button onClick={() => copyLinkAddres()}>
              <FileCopyOutlined />
            </Button>
            <span
              ref={el => {
                shareLinkRef = el;
              }}
            >
              {url}
            </span>
          </div>
        </DialogContent>
      </StyledShareDialog>
    </div>
  );
}

ShareSocialModal.defaultProps = {};

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(
  null,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(ShareSocialModal);
