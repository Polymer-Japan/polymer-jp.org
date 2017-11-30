[![Build Status](https://travis-ci.org/Polymer-Japan/polymer-jp.org.svg?branch=master)](https://travis-ci.org/Polymer-Japan/polymer-jp.org)
![Polymer2.0](https://img.shields.io/badge/Polymer-2.0-blue.svg)
[![Firebase](https://img.shields.io/badge/server-Firebase-orange.svg)](https://firebase.google.com/)

# Polymer Japan

https://polymer-jp.org/

## Check requirements

- Node LTS, Current  
  ただし、DeployはFunctionsがv.6.11.1限定

## Install & Start

```bash
$ git clone https://github.com/Polymer-Japan/polymer-jp.org
$ cd polymer-jp.org
# - polymer-cli, bower, firebase-toolsはプロジェクト内のものを使用。
$ npm install
# - functions のインストール
$ (cd functions && npm install)
# - firebase-auth minify のバグ回避 https://github.com/Polymer/polymer-cli/issues/701
$ patch -p0 < polymer-cli-issue-701.patch
# - (できれば) DevToolでWarningが表示されるのでソースマップを消す
$ perl -pi -e 's/\/\/# sourceMappingURL.*//' bower_components/firebase/firebase-auth.js
$ npm start
```
(travisと合わせておくこと)

## Develop

```bash
$ npm serve
```

### For Customize

- src/polymer-jp.html  
  Tag Manager, firebase-appの設定を修正
- sw-precache-config.js  
  ファイルの読み込み元の修正
- functions/index.js  
  サービスアカウントの設定(管理者のみ)、FCMの下記参照
- SpreadSheetにサービスアカウントユーザ追加
- firebase-messaging-sw.js  
  messagingSenderIdを修正
- sitemapのURLを修正  
  robots.txt

```
# 参考(テストサイト)
$ patch -p1 < polymer-jp-test.patch
```

### FCM & WebSub

```
# Push通知用のサーバキーを設定(URLは/で終るのに注意)
$ firebase functions:config:set server.url="https://FIREBASE.SERVER.URL/" server.verify_token="PUBSUBHUBBUB_VERIFY_TOKEN" server.hmac_secret="PUBSUBHUBBUB_HMAC_SECRET"
# ローカルデバック用に
$ firebase functions:config:get > functions/.runtimeconfig.json
# subscribe設定
$ curl -XPOST https://pubsubhubbub.appspot.com/subscribe -d 'hub.mode=subscribe&hub.verify=sync&hub.callback=https://FIREBASE.SERVER.URL/subs&hub.topic=https://FIREBASE.SERVER.URL/feed.xml&hub.verify_token=PUBSUBHUBBUB_VERIFY_TOKEN&hub.hmac_secret=PUBSUBHUBBUB_HMAC_SECRET'
```

### To create images

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

## CI

```
$ gem install travis
$ travis login
# - .travis.ymlが編集されて、open-sslのコマンドが挿入される
$ travis encrypt-file [somewhere]/polymer-japan-firebase-adminsdk-a8xev-5e8e96bd69.key.json functions/polymer-japan-firebase-adminsdk-a8xev-5e8e96bd69.key.json.enc -a
$ firebase login:ci
# - .travis.ymlが編集され、secureのトークンが挿入される
$ travis encrypt -r "FIREBASE_TOKEN" -a
# - 崩れた内容を修正
$ emacs .travis.yml
```
