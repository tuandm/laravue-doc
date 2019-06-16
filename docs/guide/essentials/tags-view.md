# Tags View

This is one of interesting features. It allows to visit previous views with historical navigation bar implemented by [tags](https://element.eleme.io/#/en-US/component/tag)

This is implemented as a combination of `keep-alive` and `router-view`.

Code: `@/layout/components/AppMain.vue`

```html
<keep-alive :include="cachedViews">
  <router-view></router-view>
</keep-alive>
```

The actual action of the tags view navigation is equivalent to another nav display mode. In fact, it is a `router-link`, and click-to-jump to the corresponding page. Then we are listening changes in the route `$route` to determine if the current page needs to be reloaded or cached.

## visitedViews && cachedViews

The current tag-view maintains two arrays.

- visitedViews : All pages which user has visited, stored in tag arrays and displayed in the tags bar navigation.
- cachedViews : The actual keep-alive route. You can set whether or not you want to cache the route by configuring the route with `meta.noCache`. [See Router and Nav](router-and-nav.md)

## Precautions

`keep-alive` and `router-view` are strongly coupled. Please make sure the names of both are exactly the same. (Keep in mind that the naming of the name is as unique as possible. Remember not to duplicate the naming of some components, or to refer to the last memory overflow issue recursively.)

**DEMO:**

```js
//Define routes
{
  path: 'create-form',
  component: ()=>import('@/views/form/create'),
  name: 'createForm',
  meta: { title: 'createForm', icon: 'table' }
}
```

```js
//The corresponding view of the route. such as: form/create
export default {
  name: 'createForm'
}
```

Make sure that the two names are the same. Remember not to write duplicates or mistakes. **By default, if you do not write name, it will not be cached**.

For details, see
[issue](https://github.com/vuejs/vue/issues/6938#issuecomment-345728620).

## Cache is not suitable for the scene

Currently cached solutions are not suitable for certain services, such as the article details page such as `/article/1`、`/article/2`, their routes are different but the corresponding components are the same, so their component name is the same, As mentioned earlier, the `keep-alive` :include can only be cached based on the component name, so this is a problem. There are two solutions for this issue:

- Instead of using keep-alive's :include, keep-alive caches all components directly. This way, it supports the aforementioned business situation.
  To [@/layout/components/AppMain.vue](https://github.com/tuandm/laravue/blob/master/resources/js/layout/components/AppMain.vue) remove the `:include` related code. Of course, using keep-alive directly also has disadvantages. It can't dynamically delete the cache. You can only help it to set a maximum cache instance limit.
  [issue](https://github.com/vuejs/vue/issues/6509)

- Use a browser cache scheme such as localStorage, you have to control the cache yourself.

## Affix

If the Affix attribute is added to the route, the current `tag` will be fixed in `tags-view` (cannot be removed).

![](https://user-images.githubusercontent.com/8121621/52840303-cd5c9280-3133-11e9-928f-e2825eaab51b.png)

```js {14}
 {
    path: '',
    component: Layout,
    redirect: 'dashboard',
    children: [
      {
        path: 'dashboard',
        component: () => import('@/views/dashboard/index'),
        name: 'Dashboard',
        meta: {
          title: 'dashboard',
          icon: 'dashboard',
          noCache: true,
          affix: true
        }
      }
    ]
  }
```

## Remove

In fact, keep-alive [source code](<(https://github.com/vuejs/vue/blob/dev/src/core/components/keep-alive.js)>) is not complicated, but the logic is still quite around. Before the vue author himself fixed a bug, he was not careful, he made two versions to fix it, so if there is no user who needs the navigation bar, it is recommended Remove this feature.

First find
`@/layout/components/AppMain.vue` and remove `keep-alive`

```html
<template>
  <section class="app-main" style="min-height: 100%">
    <transition name="fade-transform" mode="out-in">
      <router-view></router-view> <!-- or <router-view :key="key"/> -->
    </transition>
  </section>
</template>
```

Remove the entire file `@/layout/components/TagsView.vue`. Then, remove the reference to `TagsView` in `@/layout/components/index` and in `@/layout/Layout.vue`. Finally, remove the file `@/store/modules/tags-view.js`.
