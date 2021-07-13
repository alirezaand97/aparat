export const RESTART_ON_REMOUNT = '@@saga-injector/restart-on-remount';
export const DAEMON = '@@saga-injector/daemon';
export const ONCE_TILL_UNMOUNT = '@@saga-injector/once-till-unmount';

export const BASE_URL = 'http://aparat.test/';

export const VIDEO_STATE_PENDING = 'pending';
export const VIDEO_STATE_PENDING_TITLE = 'در حال بررسی';
export const VIDEO_STATE_CONVERTED = 'converted';
export const VIDEO_STATE_CONVERTED_TITLE = 'در انتظار تایید';
export const VIDEO_STATE_ACCEPTED = 'accepted';
export const VIDEO_STATE_ACCEPTED_TITLE = 'تایید شده';
export const VIDEO_STATE_BLOCKED = 'blocked';
export const VIDEO_STATE_BLOCKED_TITLE = 'عدم انتشار';

export const FOLLOWING_TYPE = 'following';
export const FOLLOWER_TYPE = 'follower';

export const VIDEO_STATES = [
  VIDEO_STATE_PENDING,
  VIDEO_STATE_CONVERTED,
  VIDEO_STATE_ACCEPTED,
  VIDEO_STATE_BLOCKED,
];

export const VIDEO_STATES_TITLES = {
  [VIDEO_STATE_PENDING]: VIDEO_STATE_PENDING_TITLE,
  [VIDEO_STATE_CONVERTED]: VIDEO_STATE_CONVERTED_TITLE,
  [VIDEO_STATE_ACCEPTED]: VIDEO_STATE_ACCEPTED_TITLE,
  [VIDEO_STATE_BLOCKED]: VIDEO_STATE_BLOCKED_TITLE,
};

export const COMMENT_STATE_PENDING = 'pending';
export const COMMENT_STATE_ACCEPTED = 'accepted';
export const COMMENT_STATE_READ = 'read';

export const COMMENT_STATES = [
  COMMENT_STATE_PENDING,
  COMMENT_STATE_ACCEPTED,
  COMMENT_STATE_READ,
];
