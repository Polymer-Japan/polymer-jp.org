## Install & Start

```bash
$ git clone https://github.com/Polymer-Japan/polymer-jp.org
$ cd polymer-jp.org
$ npm install
$ npm start
```

## Develop

```bash
$ npm serve
```

## Deploy

```
$ firebase login
$ firebase use [project-id]
$ npm deploy
```

## Note
- 流れ
  * / の場合はServiceWorker経由のindex.htmlで応答
  * / 以外のファイルじゃない場合は functions/app で応答
- いけてないところ
  * `/functions/index.js` は build された `index.html` の内容に合わせる
  
