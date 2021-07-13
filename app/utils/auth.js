export function setAuth(data) {
  if (data) {
    localStorage.setItem('auth', JSON.stringify(data));
  } else {
    localStorage.removeItem('auth'); // از setAuth برای حذف توکن در خروج هم استفاده می کنیم
  }
}

export function getAuth() {
  try {
    return JSON.parse(localStorage.getItem('auth'));
  } catch (error) {
    // nothing
  }
  return null;
}

export function isLogin() {
  const user = getAuth();
  return user && user.access_token && user.me;
}

export function isAdmin() {
  const user = getAuth();
  return user && user.access_token && user.me.type === 'admin';
}
