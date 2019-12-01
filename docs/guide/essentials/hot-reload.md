# Auto Reloading
Auto reloading is the functionality to reload webpage automatically when there are some JS/Vue files changed without pressing "Reload" button (F5/Cmd + R/...)

There are some ways to setup this tool in Laravue

## With Browsersync
[BrowserSync](https://browsersync.io/) can automatically monitor your files for changes, and inject your changes into the browser without requiring a manual refresh.

You have to install `browser-sync` and `browser-sync-webpack-plugin`
```
yarn add browser-sync browser-sync-webpack-plugin --save-dev
```

Then add this line to your webpack.mix.js
```
mix.browserSync(YOUR_VHOST_NAME);
```

Now you can start Laravue as usual:
```
yarn run watch
```

Laravue app will be opened automatically and the page is reloaded once saving your changes on JS/Vue files.

Please visit the [official document](https://laravel.com/docs/6.x/mix#browsersync-reloading) for more detail.

## With Hot Module Replacement
> Hot Module Replacement (HMR - or Hot Reloading) allows you to, not just refresh the page when a piece of JavaScript is changed, but it will also maintain the current state of the component in the browser. As an example, consider a simple counter component. When you press a button, the count goes up. Imagine that you click this button a number of times, and then update the component file. Once you do, the webpage will refresh to reflect your change, but the count will remain the same. It won't reset. This is the beauty of hot reloading!


### With built-in development server
By default, you can start hot reloading module by running this command:
```
yarn run hot
```
Then start built-in development server with 
```
php artisan serve
```
Now you can open http://localhost:8000. In console you can see as image below

![](https://cdn.laravue.dev/hot-reload.png)

Note: You can see there is a `manifest.js:786 Uncaught TypeError: Cannot read property 'call' of undefined` error on the console, but it can be ignored since index.scss is compiled by default by webpack and it linked as resource in mix.config.js. To fix this, you can import `index.scss` directly in `@resources/js/views/App.vue`:
```vuejs
<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App',
};
</script>
<style lang="scss">
  @import '../styles/index.scss';
</style>
```
and also remove app.scss compilation from your `webpack.mix.js`.

For more detail, please check [this thread](https://github.com/JeffreyWay/laravel-mix/issues/2228)

### With vhosts (Nginx/Apache...)

If you use default hot loading (`yarn run hot`) with vhosts, you will get CORS because Laravel mix serve "hot" resources via http://localhost:8080 by default. You can ask Laravel mix serve resources by other hostname by adding these line to your `webpack.mix.js`:

```
  mix.options({
    hmrOptions: {
      host: {YOUR_VHOST_NAME},
      port: 8080,
    },
  });
```

## With LiveReload
### Install webpack-livereload-plugin
```
yarn add webpack-livereload-plugin@1 --save-dev
```
### Configure webpack.config.js
Open `webpack.config.js` file, add `LiveReloadPlugin()` to `plugins` as below:
```js
...
var LiveReloadPlugin = require('webpack-livereload-plugin');
...

let plugins = [new LiveReloadPlugin()];
```

### Install LiveReload.js to blade template
Open `resources/views/laravue.blade.php`, add LiveReload.js before closing </body> tag
```
    @if(config('app.env') == 'local')
        <script src="http://localhost:35729/livereload.js"></script>
    @endif
```

Now you can start Laravue app by:
```
yarn run watch
```

LiveReload will automatically monitor your files and refresh the page when necessary.



