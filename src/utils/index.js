getUrlParam = () => {
  if (window.location.search) {
    return JSON.parse('{"' + decodeURI(window.location.search.replace(/\?/, '').replace(/&/g, "\",\"").replace(/=/g, "\":\"")) + '"}');
  } else {
    return {};
  }
};

module.exports = {
  getUrlParam
};
