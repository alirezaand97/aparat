import { Grid, Menu } from '@material-ui/core';
import styled from 'styled-components';

export const StyledMainLayout = styled(Grid)`
  background: #fff;
  min-height: 100vh;
`;

export const StyledMainContainer = styled(Grid)`
  padding: 1rem;
`;

export const StyledSideBar = styled(Grid)`
  padding: 1rem;
`;

export const StyledVideoInfo = styled.div`
  .videoTitle {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }
  .videoTitle h3 {
    padding-left: 1em;
  }
  .videoTitle .views {
    font-size: 1rem;
    min-width: 50px;
  }
  .videoTitle .views .MuiSvgIcon-root {
    margin: 0 5px 0 0;
  }

  .videoActionContainer {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
  }
  .actionWrapper {
    flex-grow: 1;
    display: flex;
    justify-content: flex-end;
    margin-top: 0.9rem;
  }
  .channelNameContainer {
    display: flex;
    align-items: center;
  }
  .channelNameContainer img {
    width: 48px;
    height: 48px;
    border-radius: 100%;
    cursor: pointer;
  }
  .channelNameContainer .channelInfo span {
    font-size: 0.9em;
    font-weight: 300;
    color: #6f7285;
  }
  .channelNameContainer .channelInfo b {
    display: block;
    font-size: 1rem;
    line-height: 1.6;
    cursor: pointer;
  }
  .channelInfo {
    padding: 0 1rem;
  }

  .followButton {
    padding: 0.4em 1.5em;
    border-radius: 25px;
  }

  .followButton .MuiSvgIcon-root {
    font-size: 1.2em;
    margin-left: 5px;
  }

  .buttonWrapper {
    position: relative;
    margin-left: 10px;
  }
  .buttonWrapper .downloadLink {
    color: #6f7285;
  }

  .settingButton,
  .settingButton:hover {
    padding: 0.3em 1em;
    background: #05a3e8;
    border-radius: 25px;
    color: #fff;
  }
  .settingButton .MuiSvgIcon-root {
    font-size: large;
    margin-left: 0.2rem;
  }
  .buttonWrapper .MuiButton-root {
    padding: 6px;
    border-radius: 100%;
    color: #6f7285;
    margin: 0 0.7rem;
    min-width: auto;
  }
  .buttonWrapper .MuiSvgIcon-root {
    font-size: 1.3rem;
  }
  .likeCount {
    display: inline-block;
    margin-right: 3px;
  }
  .likeButton {
    padding: 3px 6px !important;
    border-radius: 5px !important;
  }
  @media (max-width: 350px) {
    .buttonWrapper .MuiButton-root {
      margin: 0 0.2rem;
    }
  }
`;

export const StyledDropDown = styled(Menu)`
  margin-top: 40px;
  .MuiMenuItem-root {
    color: #6f7285;
    font-size: 0.9rem;
  }
  .MuiSvgIcon-root {
    margin-left: 6px;
  }
`;

export const StyledMoreInfo = styled.div`
  margin-top: 2rem;
  width: 100%;
  padding: 1.3rem 0;
  border-top: 1px solid #eee;

  .cursorPointer {
    cursor: pointer;
  }

  .videoDescription {
    color: #6f7285;
    font-size: 0.9rem;
    line-height: 2;
  }

  .tagContainer {
    margin: 1rem 0;
    color: #6f7285;
    font-size: 0.8rem;
  }
  .tagContainer span {
    display: inline-block;
    margin-left: 0.5rem;
  }
  .tagContainer .MuiSvgIcon-root {
    font-size: 1rem;
    margin-left: 0.1em;
  }
`;

export const StyledSimularVideos = styled.div`
  width: 100%;

  .relatedVideoWrapper {
    display: flex;
    margin-bottom: 0.9rem;
  }

  .relatedBanner {
    width: 240px;
    height: 115px;
    max-width: 50%;
    max-height: 115px;
    cursor: pointer;
    position: relative;
  }
  .relatedBanner img {
    width: 100%;
    height: 100%;
  }

  .duration {
    position: absolute;
    top: 80%;
    left: 4px;
    color: #fff;
    background-color: rgba(0, 0, 0, 0.7);
    border-radius: 3px;
    padding: 0 4px;
  }

  .relatedVideoInfo {
    min-width: 50%;
    max-width: 50%;
    display: flex;
    flex-direction: column;
    padding: 0.25em 1em;
  }
  .relatedVideoTitle {
    font-size: 0.8rem;
    margin: 0;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    margin-bottom: 1rem;
    cursor: pointer;
  }
  .relatedVideoUser {
    color: #6f7285;
    display: inline-block;
    font-size: 0.8rem;
    font-weight: 600;
    margin-bottom: 0.6rem;
  }
  .relatedVideoViews span {
    margin-left: 0.5rem;
    font-size: 0.7rem;
  }
`;

export const StyledPlaylistHeader = styled.div`
  background: #e6e7ef;
  padding: 0.6rem 1rem;
  display: flex;
  justify-content: space-between;

  .playlistTitle {
    margin: 0;
    padding: 0;
  }
  .playlistSize {
    font-size: 0.8rem;
    display: inline-block;
    margin-top: 0.5rem;
  }
  .MuiSvgIcon-root {
    font-size: xx-large;
  }
`;

export const StyledPlaylistVideos = styled.div`
  background: #f5f5f9;
  padding: 1rem;
  max-height: 300px;
  overflow-y: auto;
  ::-webkit-scrollbar {
    width: 4px;
    height: 4px;
  }

  ::-webkit-scrollbar-thumb {
    background: #8689a2;
    border-radius: 10px;
  }

  .playlistVideoWrapper {
    display: flex;
    margin-bottom: 0.5rem;
    align-items: center;
    padding: 0.4rem 0;
  }
  .playIcon {
    width: 1.5rem;
    color: #6f7285;
  }

  .playlistBanner {
    width: 120px;
    height: 70px;
    max-width: 50%;
    max-height: 115px;
    cursor: pointer;
    position: relative;
  }
  .playlistBanner img {
    width: 100%;
    height: 100%;
  }

  .duration {
    position: absolute;
    top: 70%;
    left: 4px;
    color: #fff;
    background-color: rgba(0, 0, 0, 0.7);
    border-radius: 3px;
    padding: 0 4px;
  }

  .playlistVideoInfo {
    min-width: 50%;
    max-width: 50%;
    display: flex;
    flex-direction: column;
    padding: 0.25em 1em;
  }
  .playlistVideoTitle {
    font-size: 0.8rem;
    margin: 0;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    margin-bottom: 1rem;
    cursor: pointer;
  }
  .playlistVideoUser {
    color: #6f7285;
    display: inline-block;
    font-size: 0.8rem;
    font-weight: 600;
    margin-bottom: 0.6rem;
  }
  .playlistVideoViews span {
    margin-left: 0.5rem;
    font-size: 0.7rem;
  }
  .activeVideo {
    background: #e6e7ef;
  }
`;
