module.exports = {
  staticFileGlobs: [
    '/index.html',
    '/manifest.json',
    '/components/webcomponentsjs/*.js'
  ],
  navigateFallback: 'index.html',
  navigateFallbackWhitelist: [/^(?!\/__)/],
  runtimeCaching: [{
    urlPattern: /^https:\/\/images\.unsplash\.com/,
    handler: 'networkFirst'
  }, {
    urlPattern: /^https:\/\/cdn\.rawgit\.com/,
    handler: 'networkFirst'
  }, {
    urlPattern: /^https:\/\/firebasestorage\.googleapis\.com\/v0\/b\/polymer-jp-ffc4c\.appspot\.com\/o/,
    handler: 'networkFirst'
  }]
};
