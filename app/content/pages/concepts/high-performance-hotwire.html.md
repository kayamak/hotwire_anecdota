---
title: 高性能Hotwire
section: Performance
layout: article
order: 05
---

## ウェブサイトの遅さの原因

ウェブサイトが遅いと感じられる主な原因は、サーバからリソースが届くのに時間がかかることです。そして時間がかかる理由は主に下記の通りです。

* ネットワークが遅い
* サーバでの処理に時間がかかる
* リクエストウォーターフォールが発生している

ネットワークの遅さやサーバの遅さはフロントエンドだけでは如何ともしがたく、またHotwireのようなSSRではリクエストウォーターフォールは最近の技術ではほぼ発生しません。(React SPAはまた別の原因で発生することがあります)

そのためここで紹介するテクニックは真の意味でウェブサイトの遅さを解消するものではなく、すべて見かけ上の施策になります。ただしこの施策によってユーザが感じる体感UI/UXはハッキリと向上しますので、非常に効果的なものになります。

## 基本はキャッシュを使う

見かけ上ウェブサイトを高速化するためにはキャッシュを使います。方法は主に２通りです。

* 前回のリクエストの結果をブラウザに溜め込み、次回訪問時に表示する（プレビューキャッシュ）
* ユーザがクリックする前に、見込み時点でサーバにリクエストを投げて、その結果をブラウザに溜め込む。ユーザが実際にクリックしたときにこれを表示する（プレフェッチキャッシュ）

### プレビューキャッシュ

### プレフェッチキャッシュ

## キャッシュの問題点

下記は[Phil Karlton氏の有名な発言](https://martinfowler.com/bliki/TwoHardThings.html)です

> There are only two hard things in Computer Science: cache invalidation and naming things.
>
> 計算機科学で難しいことは２つしかない。キャッシュの無効化と名前をつけることだ。

実際、Next.jsはv14でリクエストウォーターフォール問題を解消するためにキャッシュをデフォルトでオンにしたものの、表示内容が頻繁に変更されるアプリでは問題になり、v15ではオフにしました。また[キャッシュ設計の変更を強いられましたが](https://nextjs.org/blog/our-journey-with-caching)、まだ実験段階であり、これが一般の開発者に受け入れられるかどうかは未知数です。

## Hotwireは最新情報の正確な表示を最優先

Hotwireの場合はSSRが中心になりますので、Next.jsと異なりリクエストウォーターフォールの問題にはあまり悩まされません。またHotwireを開発した37signalsが提供しているSaaS製品はプロジェクト管理ソフトなので、表示内容が頻繁に変更されるものです。加えてRuby on Railsはサーバ側のキャッシュ機構が発達しているため、同じリクエストが複数回飛んできても、サーバへの負担は最小化できます。この背景があって、Hotwireのキャッシュは古い情報を表示してしまわないように、安全に設計されています。

* 動的なページでもprefetchが行われます
* キャッシュされたページの表示はプレビュー扱いになります。キャッシュされたページを表示し続けることはなく、裏で最新のページを取得します。最新ページを取得後、現在表示しているページと入れ替えます

## Hotwireの高性能化 

ここでは主にユーザがボタンをクリックするなどのイベントを行ってから、フィードバックが得られるまでの高速化を取りか使う。また楽観的UI (Optimistic UI)やローディング画面など、本物のフィードバックではなく、見せかけのフィードバックについても取り扱う。

## TurboはデフォルトでNext.jsより高速に動作する

Turboは元々がRails用に作られている関係もあり、Railsが得意とするタイプのウェブアプリケーションで高速に動作するようにチューニングされています。ユーザによってコンテンツが頻繁に更新されるプロジェクト管理アプリケーションなどがこれに該当します。Next.jsの用語に照らし合わせると、HotwireはSSGでもISRでもなく、SSRを使うウェブアプリケーションに最適化されています。

## Prefetchの効果

Hotwireによるウェブサイトの高速化は、一つにはSPAであることもありますが、Prefetchの効果が圧倒的に大きいです。

ReactはSSRページのprefetchには積極的ではなく、逆にSSGページのprefetchは非常にアグレッシブです。