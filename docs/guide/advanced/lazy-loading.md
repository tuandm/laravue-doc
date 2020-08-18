# Lazy Loading and Code Splitting
## Code splitting
From [webpack's guide](https://webpack.js.org/guides/code-splitting/)

> Code splitting is one of the most compelling features of webpack. This feature allows you to split your code into various bundles which can then be loaded on demand or in parallel. It can be used to achieve smaller bundles and control resource load prioritization which, if used correctly, can have a major impact on load time.

### Code splitting with Laravel-mix
Laravel-mix supports [code splitting](https://laravel-mix.com/docs/master/extract) by `mix.extract()` method, you can check it in [`webpack.mix.js`](https://github.com/tuandm/laravue/blob/master/webpack.mix.js):
```
mix
  .js('resources/js/app.js', 'public/js')
  .extract([
    'vue',
    'axios',
    'vuex',
    'vue-router',
    'vue-i18n',
    'element-ui',
    'echarts',
    'highlight.js',
    'sortablejs',
    'dropzone',
    'xlsx',
    'tui-editor',
    'codemirror',
  ])
```

With this setting, vendor.js which contains vendor code (3rd party libraries) will be generated and cached by browsers.

## Lazy loading route
From [Vue's document](https://router.vuejs.org/guide/advanced/lazy-loading.html)
> When building apps with a bundler, the JavaScript bundle can become quite large, and thus affect the page load time. It would be more efficient if we can split each route's components into a separate chunk, and only load them when the route is visited.

### Lazy loading route in Laravue
Laravue already imports components dynamically:
```
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true,
  },
```

and webpack is configured to generate assets by chunks
```
module.exports = {
...
  output: {
    filename: '[name].js',
    chunkFilename: 'js/[name].[chunkhash:6].js',
  },
...
}
```

Now components are packed into separated files and will only be loaded when they are visited.

For more details on configuring chunk files, please check [this document](https://webpack.js.org/configuration/output/#outputchunkfilename)

### Disable lazy loading
For some reasons you may want to disable lazy-loading and generate all-in-one js file, just add `dynamic-import-node` to [`.babelrc`](https://github.com/tuandm/laravue/blob/master/.babelrc) > plugins
```
  "plugins": [
    "babel-plugin-syntax-dynamic-import",
    "@babel/plugin-syntax-dynamic-import",
    "@babel/plugin-transform-runtime",
    "babel-plugin-transform-vue-jsx",
    "dynamic-import-node"
  ]
```  

## Combining code splitting and lazy loading
When running `npm run dev/watch/production`, you can see chunk files are generated along with vendor.js
```
                          Asset       Size       Chunks
                /js/manifest.js   3.02 KiB           11  [emitted] 
                 js/8.354d7a.js   10.8 KiB            8  [emitted] 
                 js/9.6c5c36.js   26.8 KiB            9  [emitted] 
                      js/app.js   1.81 MiB           10  [emitted]   /js/app
                   js/vendor.js   4.43 MiB  0, 1, 3, 12  [emitted]   /js/vendor
```
