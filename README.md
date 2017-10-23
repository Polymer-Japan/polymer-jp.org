## Install & Start

```bash
$ git clone https://github.com/Polymer-Japan/polymer-jp.org
$ cd polymer-jp.org
$ npm install
$ cd functions
$ npm install
$ cp [somewhere]/service-account.key.json ./
# edit serviceAccount.key.json file name
$ emacs index.js
$ cd ../
# firebase-auth minify のバグ回避 https://github.com/Polymer/polymer-cli/issues/701
$ patch -p0 < polymer-cli-issue-701.patch
$ npm start
```

- polymer-cli, bower, firebase-toolsはプロジェクト内のものを使用。

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
