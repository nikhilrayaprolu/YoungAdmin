let url = window.location.host;
let url_split = url.match(/[^\.]*\.[^.]*$/);
export let domain, server, LMS, CMS
if (url_split) {
  domain = url_split[0]
  server = window.location.protocol + '//adminback.' + domain;
  LMS = window.location.protocol + '//' + domain;
  CMS = window.location.protocol + '//studio' + domain;

} else {
  server = 'http://localhost:8001';
  LMS = 'http://localhost:18000';
  CMS = 'http://studio.localhost:18010';
}



