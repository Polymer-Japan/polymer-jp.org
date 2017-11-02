const functions = require('firebase-functions');
const admin = require('firebase-admin');
const serviceAccount = require('./polymer-japan-firebase-adminsdk-a8xev-5e8e96bd69.key.json');
admin.initializeApp({ credential: admin.credential.cert(serviceAccount) });
const db = admin.firestore();
const GoogleSpreadsheet = require('google-spreadsheet');
const gs = new GoogleSpreadsheet('1x-hd157IdPdAp8_U9JS_VsM3IPAa42kkbw0Hf5fOOuI');

exports.saveSpreadSheet = functions.firestore.document('/inquiries/{inqId}')
  .onCreate(event => {
    const data = event.data.data();
    console.log('data',data);
    gs.useServiceAccountAuth(serviceAccount, err => {
      gs.addRow(1, data, err => {
        if (err) {
          console.log('err:addRow',err)
        }
      })
    });
    return true;
  });

exports.app = functions.https.onRequest((req, res) => {

  if(req.url=="/favicon.ico"){
    console.log("no favicon");
    return;
  }

  // KLUDGE: 末尾/を削除
  const url = req.url[req.url.length-1] == '/' ? req.url.slice(0,-1) : req.url;
  const id = url.split('/').slice(1).join("/_childs/");

  // const id = req.url.split("/")[1];
  console.log(req.url, id);

  db.collection('docs').doc(id).get()
    .then( sn => {

      const doc = sn.data();

      // KLUDGE: polymer-cliでbuildされたindex.htmlをそのまま使う
      const html = `<!doctype html>
<html lang="ja">
  <head>
    <meta charset="utf-8">
    <base href="/">
    <meta name="viewport" content="width=device-width, minimum-scale=1.0, initial-scale=1.0, user-scalable=yes">

    <title>Polymer Japan - ${doc.title}</title>

    <meta name="theme-color" content="#fff">
     <link rel="manifest" href="/manifest.json">

    <meta name="description" content="${doc.desc}">

    <meta property="og:type" content="article">
    <meta property="og:title" content="Polymer Japan - ${doc.title}">
    <meta property="og:site_name" content="Polymer Japan">
    <meta property="og:description" content="${doc.desc}">
    <meta property="og:url" content="https://polymer-jp.org/${id}">
    <meta property="og:image" content="https://polymer-jp.org/assets/logos/polymer-jp-logo-og.png">
    <meta property="article:author" content="https://github.com/Polymer-Japan/polymer-jp.org">

    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:site" content="@polymer_jp">

    <link rel="shortcut icon" href="/assets/logos/polymer-jp-logo-32.png">
    <link rel="apple-touch-icon" sizes="192x192" href="/assets/logos/polymer-jp-logo-192.png">
    <meta name="apple-mobile-web-app-capable" content="yes">
    <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">
    <meta name="apple-mobile-web-app-title" content="PolymerJP">

  </head>
  <body>

    <polymer-jp>
      <svg viewBox="0 0 24 30" fill="#eee" width="128"
           style="position: absolute; top: 0px; right: 0px; bottom: 0px; left: 0px; margin: auto;">
        <path d="M19 4h-4L7.11 16.63 4.5 12 9 4H5L.5 12 5 20h4l7.89-12.63L19.5 12 15 20h4l4.5-8z"></path>
      </svg>
      <noscript>Polymer Japan</noscript>
    </polymer-jp>

    <script>!function(e){var r=e.babelHelpers={};r.typeof="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},r.classCallCheck=function(e,r){if(!(e instanceof r))throw new TypeError("Cannot call a class as a function")},r.createClass=function(){function e(e,r){for(var t=0;t<r.length;t++){var n=r[t];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(r,t,n){return t&&e(r.prototype,t),n&&e(r,n),r}}(),r.defineEnumerableProperties=function(e,r){for(var t in r){var n=r[t];n.configurable=n.enumerable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,t,n)}return e},r.defaults=function(e,r){for(var t=Object.getOwnPropertyNames(r),n=0;n<t.length;n++){var o=t[n],i=Object.getOwnPropertyDescriptor(r,o);i&&i.configurable&&void 0===e[o]&&Object.defineProperty(e,o,i)}return e},r.defineProperty=function(e,r,t){return r in e?Object.defineProperty(e,r,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[r]=t,e},r.extends=Object.assign||function(e){for(var r=1;r<arguments.length;r++){var t=arguments[r];for(var n in t)Object.prototype.hasOwnProperty.call(t,n)&&(e[n]=t[n])}return e},r.get=function e(r,t,n){null===r&&(r=Function.prototype);var o=Object.getOwnPropertyDescriptor(r,t);if(void 0===o){var i=Object.getPrototypeOf(r);return null===i?void 0:e(i,t,n)}if("value"in o)return o.value;var a=o.get;if(void 0!==a)return a.call(n)},r.inherits=function(e,r){if("function"!=typeof r&&null!==r)throw new TypeError("Super expression must either be null or a function, not "+typeof r);e.prototype=Object.create(r&&r.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),r&&(Object.setPrototypeOf?Object.setPrototypeOf(e,r):e.__proto__=r)},r.instanceof=function(e,r){return null!=r&&"undefined"!=typeof Symbol&&r[Symbol.hasInstance]?r[Symbol.hasInstance](e):e instanceof r},r.newArrowCheck=function(e,r){if(e!==r)throw new TypeError("Cannot instantiate an arrow function")},r.objectDestructuringEmpty=function(e){if(null==e)throw new TypeError("Cannot destructure undefined")},r.objectWithoutProperties=function(e,r){var t={};for(var n in e)r.indexOf(n)>=0||Object.prototype.hasOwnProperty.call(e,n)&&(t[n]=e[n]);return t},r.possibleConstructorReturn=function(e,r){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!r||"object"!=typeof r&&"function"!=typeof r?e:r},r.set=function e(r,t,n,o){var i=Object.getOwnPropertyDescriptor(r,t);if(void 0===i){var a=Object.getPrototypeOf(r);null!==a&&e(a,t,n,o)}else if("value"in i&&i.writable)i.value=n;else{var u=i.set;void 0!==u&&u.call(o,n)}return n},r.slicedToArray=function(){function e(e,r){var t=[],n=!0,o=!1,i=void 0;try{for(var a,u=e[Symbol.iterator]();!(n=(a=u.next()).done)&&(t.push(a.value),!r||t.length!==r);n=!0);}catch(e){o=!0,i=e}finally{try{!n&&u.return&&u.return()}finally{if(o)throw i}}return t}return function(r,t){if(Array.isArray(r))return r;if(Symbol.iterator in Object(r))return e(r,t);throw new TypeError("Invalid attempt to destructure non-iterable instance")}}(),r.taggedTemplateLiteral=function(e,r){return Object.freeze(Object.defineProperties(e,{raw:{value:Object.freeze(r)}}))},r.temporalRef=function(e,r,t){if(e===t)throw new ReferenceError(r+" is not defined - temporal dead zone");return e},r.temporalUndefined={},r.toArray=function(e){return Array.isArray(e)?e:Array.from(e)},r.toConsumableArray=function(e){if(Array.isArray(e)){for(var r=0,t=Array(e.length);r<e.length;r++)t[r]=e[r];return t}return Array.from(e)}}("undefined"==typeof global?self:global);</script>


    <script>if (!window.customElements) { document.write('<!--'); }</script>
    <script type="text/javascript" src="components/webcomponentsjs/custom-elements-es5-adapter.js"></script>
    <!--! do not remove -->

    <script src="components/webcomponentsjs/webcomponents-loader.js"></script>
    <link rel="import" href="src/polymer-jp.html">

    <script>
      if ('serviceWorker' in navigator) {
        window.addEventListener('load', function() {
          navigator.serviceWorker.register('/service-worker.js');
        });
      }
    </script>

  </body>
</html>
`;

      res.send(html);

    })
    .catch((err) => {
      console.log(err);
      res.send('error');
    });

})
