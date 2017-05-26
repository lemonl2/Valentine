# 七夕快乐

#### 导语
***
> 七夕动画展示，是基于css3动画属性，与精灵图实现的，也是本人在学习了慕课网关于css/html实战后（有兴趣的孩子可以去[慕课网](http://www.imooc.com/learn/453)学习），重写了这个动画的代码，在此将其发布与此，希望对喜欢动画的你有一点点帮助。

## 一、第三方库
* [jquery](https://github.com/jquery/jquery)
* [jquery-transit](https://github.com/rstacruz/jquery.transit) 基于jquery，支持css3动画的js库

## 二、HTTP服务器
http服务器主要使用的是[Caddy](https://caddyserver.com/)，Caddy是一款使用Go语言编写的简单易用的单文件网页服务器，原生支持HTTP/2，自动创建Let’s Encrypt证书，支持反向代理，rewrite，git，REST，API，ipfilter，jsonp等，非常适合轻量级的网页应用。
具体配置请参考官网。

## 三、运行
* clone git@github.com:lemonl2/Valentine.git
* npm i
* 运行caddy目录下的caddy， ``./caddy/caddy``
* 打开网站 localhost:7777
