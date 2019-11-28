getUrlParam = () => JSON.parse('{"' + decodeURI(window.location.search.replace(/\?/, '').replace(/&/g, "\",\"").replace(/=/g, "\":\"")) + '"}');

module.exports = {
  getUrlParam
};
