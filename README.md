# Paperless-Checkinとは？

Paperless-Checkinとは、宿泊施設がゲストに伝えるべき情報をWebを利用して伝えるためのWebアプリケーションです。
[https://paperless-checkin-ah.herokuapp.com/](https://paperless-checkin-ah.herokuapp.com/)

【テストアカウント】  
email: "test@test.com"  
pass: "test"  

以下、特に力を入れた署名機能を体験できますので、是非お試し下さい。  
[https://paperless-checkin-ah.herokuapp.com/signExample](https://paperless-checkin-ah.herokuapp.com/signExample)

# 使用技術

### バックエンド
- express 4.17.1
- graphql 15.5.0
- mongoose 5.11.14
- passport 0.3.2

### フロントエンド
- react 16.13.1
- next.js 10.0.8
- @apollo/client 3.3.11

# 機能一覧
- ユーザー登録、ログイン機能(passport)
- 画像アップロード(fs)
- メール送信(sendgrid)


