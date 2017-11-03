## Check requirements

- Node LTS, Current  
  ただし、DeployはFunctionsがv.6.11.1限定

## Install & Start

```bash
$ git clone https://github.com/Polymer-Japan/polymer-jp.org
$ cd polymer-jp.org
# - polymer-cli, bower, firebase-toolsはプロジェクト内のものを使用。
$ npm install
$ cd functions
$ npm install
$ cd ../
# - firebase-auth minify のバグ回避 https://github.com/Polymer/polymer-cli/issues/701
$ patch -p0 < polymer-cli-issue-701.patch
# - (できれば) DevToolでWarningが表示されるのでソースマップを消す
$ perl -pi -e 's/\/\/# sourceMappingURL.*//' components/firebase/firebase-auth.js
$ npm start
```

## Develop

```bash
$ npm serve
```
### Customize

- src/polymer-jp.html  
  Tag Manager, firebase-appの設定を修正
- sw-precache-config.js  
  ファイルの読み込み元の修正
- functions/index.js  
  サービスアカウントの設定(管理者のみ)
- SpreadSheetにサービスアカウントユーザ追加
- firebase-messaging-sw.js__
  messagingSenderIdを修正

### Images

```bash
# Android resize
$ inkscape -f polymer-jp-logo.svg -e polymer-jp-logo-32.svg -w 32
# iPhone Home screen
$ convert polymer-jp-logo-192.png -background white -bordercolor white -border 12x20 -resize 192x192 polymer-jp-logo-iphone-192.png
```

## Deploy

- Node **v6.11.1** 限定
- ローカルで開発しつつ、Cloud Shellでデプロイがやりやすいのかもしれない

```
# - サービスアカウントの設定(管理者のみ)
$ cp [somewhere]/service-account.key.json ./
$ emacs index.js
$ firebase login
$ firebase use [project-id]
$ npm deploy
```
