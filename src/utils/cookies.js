const tokenName = 'hexToken';

const Cookies = {
  setCookie(cname, token, expired) {
    const cookieName = cname ? cname : tokenName;
    document.cookie = `${cookieName}=${token};expires=${new Date(
      expired
    )}; path=/`;
  },

  getCookie() {
    const token = document.cookie.replace(
      /(?:(?:^|.*;\s*)hexToken\s*=\s*([^;]*).*$)|^.*$/,
      '$1'
    );

    return token;
    // console.log(cname);
    // let name = cname + '=';
    // let ca = document.cookie;
    // let ca = document.cookie.split(';');
    // for (let i = 0; i < ca.length; i++) {
    //   let c = ca[i];
    //   while (c.charAt(0) == ' ') c = c.substring(1);
    //   if (c.indexOf(name) != -1) {
    //     return c.substring(name.length, c.length);
    //   }
    // }
    // return '';
  },

  clearCookie(cname) {
    let d = new Date();
    d.setTime(-1);
    let expires = 'expires=' + d.toUTCString();
    document.cookie = cname + "=''; " + expires;
  },
};
export { Cookies, tokenName };
