module.exports = {
  staticFileGlobs: [
    '/index.html',
    '/manifest.json',
    '/assets/**/*',
    "firebase-messaging-sw.js",
    '/bower_components/webcomponentsjs/*.js'
  ],
  navigateFallback: 'index.html',
  navigateFallbackWhitelist: [/^(?!\/__)/],
  runtimeCaching: [{
    urlPattern: /^https:\/\/images\.unsplash\.com/,
    handler: 'networkFirst'
  }, {
    urlPattern: /^https:\/\/fonts\.googleapis\.com/,
    handler: 'networkFirst'
  }, {
    urlPattern: /^https:\/\/fonts\.gstatic\.com/,
    handler: 'networkFirst'
  }, {
    urlPattern: /^https:\/\/cdn\.rawgit\.com/,
    handler: 'networkFirst'
  }, {
    urlPattern: /^https:\/\/firebasestorage\.googleapis\.com\/v0\/b\/polymer-japan\.appspot\.com\/o/,
    handler: 'networkFirst'
  }]
};
