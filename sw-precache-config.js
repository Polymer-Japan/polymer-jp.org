module.exports = {
  staticFileGlobs: [
    '/index.html',
    '/manifest.json',
    '/bower_components/webcomponentsjs/*.js'
  ],
  navigateFallback: 'index.html',
  navigateFallbackWhitelist: [/^(?!\/__)/]
};
