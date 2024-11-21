---
title: Hotwire思考の順番
layout: article
order: 005
published: true
---

Hotwireには「考える順番」があります。一つのUI/UXを実現するにしても、いろいろなやり方が考えられるものの、この順番で考えていけばうまい具合に選択肢を絞り込め、早く正解に辿り着ける、そういう順番です。私の経験に基づいて、私が考える順番を紹介します

## UIにおけるインタラクションとは？

![interactive-flow-hotwire.webp](content_images/interactive-flow-hotwire.webp "mx-auto max-w-[600px]")

UIにおけるインタラクションとは、ユーザイベントを受け取り、画面を更新するまでの部分を指します。その間に起こり得ることは上図の通りです。ブラウザのネイティブ機能を使うこともあれば、Turboでサーバ通信をすることもあります。これを整理することがHotwire的にものを考えるコツになります。

## サーバ通信の必要性を考える

最初にサーバ通信の必要性を考えます。