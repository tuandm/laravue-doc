# Icon

## Introduction

`laravue` users 2 types of icons - [Element-UI icons](https://element.eleme.io/#/en-US/component/icon) and [IconFont.cn](http://iconfont.cn). They are listed [here](https://laravue.dev/#/element-ui/icons) 

If you do not find the desired icon in the [Icons](https://laravue.dev/#/element-ui/icons) of this project, you can search and download your suitable icons on [iconfont.cn](http://iconfont.cn/), then generate and use them. You can also go to other svg icon website, download svg and put it in [this folder](https://github.com/tuandm/laravue/tree/master/resources/js/icons/svg).

## Download and generate icons from [IconFont.cn](http://iconfont.cn)

First, search the icon you need, then download

<img width="600" src="https://wpimg.wallstcn.com/1f8b1e56-cfd9-4ef7-a0aa-dfb0c2883aa3.gif" />

<br />

After the download is complete, the downloaded .svg file is automatically imported after it is placed in the `@/icons/svg` folder.

## How to use

```js
<svg-icon icon-class="password" /> //Icon-class is the icon's name usage
```

[Component](/feature/component/svg-icon.md)

## Change color

`svg-icon` reads its parent's color `fill: currentColor;` by default.

You can change it directly or the the parent's one in [`@/components/SvgIcon/index.vue`](https://github.com/tuandm/laravue/blob/master/resources/js/components/SvgIcon/index.vue)
