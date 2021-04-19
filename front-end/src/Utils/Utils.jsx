/* eslint-disable import/prefer-default-export */

// this function return an array of path elements
// without domain name
export const getPath = (window) => {
  const path = window.location.pathname
    .split("/")
    .filter((elem) => elem.length > 0);
  return path;
};
