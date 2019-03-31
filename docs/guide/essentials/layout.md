# Layout

Layout is the outermost frame structure of the page and usually includes navigation, sidebars, breadcrumbs and main content. Below image is the basic layout

![Laravue layout](https://cp5.sgp1.cdn.digitaloceanspaces.com/zoro/laravue-layout.jpg)

::: tip Code
[@/views/layout](https://github.com/tuandm/laravue/tree/master/resources/js/views/layout)
:::

`@` is webpack's [alias](https://webpack.js.org/configuration/resolve/#resolve-alias) and point to `resource/js`, this alias can be changed in `webpack.mix.js`.

<br>

Most of the pages in `laravue` extend from `<layout>`, except special pages such as: `login`, `401` , etc... You can have multiple layout in the project - just create a layout with placeholder `<app-main>`

```js
//No layout
{
  path: '/401',
  component: () => import('errorPage/401'),
}

//Has layout
{
  path: '/documentation',

  // You can choose different layout components - remember to import Layout first
  component: Layout,

  // Here the route is displayed in app-main
  children: [{
    path: 'index',
    component: () => import('documentation/index'),
    name: 'documentation',
  }]
}
```

Laravue uses vue-router [routing nesting](https://router.vuejs.org/guide/essentials/nested-routes.html), therefore adding or modifying a page will only affect the main body of `<app-main>`. Other parts of layout such as `<navbar>`, `<sidebar>`, `<tags-view>` won't be affected.

```
/foo                                  /bar
+------------------+                  +-----------------+
| layout           |                  | layout          |
| +--------------+ |                  | +-------------+ |
| | foo.vue      | |  +------------>  | | bar.vue     | |
| |              | |                  | |             | |
| +--------------+ |                  | +-------------+ |
+------------------+                  +-----------------+
```
This describes how `vue-router` works in general. 

If you don't get familiar with `vue-router`, Please refer to [official document](https://router.vuejs.org/) for more details

<br>

## app-main

::: tip Code
[@/views/layout/components/AppMain](https://github.com/tuandm/laravue/blob/master/resources/js/views/layout/components/AppMain.vue)
:::
`<app-main>` uses `<router-view>` to render the content which is returned from the main component registering in route item. `<router-view>` is put inside `<keep-alive>` in order to be cacheable. Please check [router and navigration](router-and-nav.md) for more details.

The `transition` defines the switching animation between pages, you can modify the transition animation according to your own needs.

<br>

## router-view

**Different router the same component vue。** In a real work, there are many situations. such as:

![](https://wpimg.wallstcn.com/ac5047c9-cb75-4415-89e3-9386c42f3ef9.jpeg)

The same component is used to create pages and edit pages. By default, when these two pages are switched, it will not trigger the created or mounted hooks of vue. Officials say that you can do this through the change of watch $route. To tell the truth it's still very troublesome. Later I discovered that I could simply add a unique key to the router-view to ensure that the routing hooks are re-rendered when the route is switched. This is much simpler.

```js
<router-view :key="key"></router-view>

computed: {
  key() {
    // Or :key="route.fullPath" Just make sure the key is the unique
    return this.$route.name !== undefined? this.$route.name + +new Date(): this.$route + +new Date()
  }
 }
```

::: tip
**Or** You can declare two different views like the `editForm` and `createForm` in this project but introduce the same component.

Code：[@/views/form](https://github.com/PanJiaChen/vue-element-admin/tree/master/src/views/form)
:::

```html
<!-- create.vue -->
<template>
  <article-detail :is-edit='false'></article-detail> //create
</template>
<script>
  import ArticleDetail from './components/ArticleDetail'
</script>

<!-- edit.vue -->
<template>
   <article-detail :is-edit='true'></article-detail> //edit
</template>
<script>
  import ArticleDetail from './components/ArticleDetail'
</script>
```

>

## Mobile

The `element-ui` official position is the desktop-side framework, and for the management of such a complex project in the background, it is impossible to meet the desktop-side and mobile-side interactions through simple adaptation. Therefore, the interaction between the two ends must be different. Make a mobile version of the background, it is recommended to re-do a system.

So, this project will not adapt to the mobile terminal. It just does a simple response and you can modify it yourself.
