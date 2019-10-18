# Icon

## Introduction

There are 2 types of icons in `laravue` - [Element-UI icons](https://element.eleme.io/#/en-US/component/icon) and [IconFont.cn](http://iconfont.cn). They are listed [here](https://laravue.dev/#/element-ui/icons) 

If you do not find the suitable icons in the [Icons](https://laravue.dev/#/element-ui/icons) of this project, you can search and download them on [iconfont.cn](http://iconfont.cn/), then generate and use normally. You can also go to other svg icon website, download svg and put it in [this folder](https://github.com/tuandm/laravue/tree/master/resources/js/icons/svg).

## Download and generate icons from [IconFont.cn](http://iconfont.cn)

First, search your suitable icons and download to the `@/icons/svg` folder

<img width="600" src="https://wpimg.wallstcn.com/1f8b1e56-cfd9-4ef7-a0aa-dfb0c2883aa3.gif" />

<br />

They will be imported automatically.

## How to use

```js
<svg-icon icon-class="password" /> // icon-class is the icon's name
```

[Component](/feature/component/svg-icon.md)

## Change color

By default, `svg-icon` uses the parent's color `fill: currentColor;`.

You can change it directly or change the parent's one (which will affect on all children) in [`@/components/SvgIcon/index.vue`](https://github.com/tuandm/laravue/blob/master/resources/js/components/SvgIcon/index.vue)
