# Auto Reloading

Auto reloading là chức năng cho phép browser tự động refresh webpage khi có sự thay đổi ở JS/Vue files. Chức năng này rất tiện lợi và giúp tăng tốc độ phát triển sản phẩm.

Có một số cách để config auto reloading cho Laravue

## Dùng Browsersync
[BrowserSync](https://browsersync.io/) có thể tự động kiểm tra thay đổi ở các files và cập nhật thay đổi đó vào browser mà không cần phải refresh bằng tay.

Để có thể dùng Browsersync, bạn phải cài đặt `browser-sync` và `browser-sync-webpack-plugin`
```
yarn add browser-sync browser-sync-webpack-plugin --save-dev
```

Sau đó thêm vào file `webpack.mix.js` dòng sau:
```
mix.browserSync(YOUR_VHOST_NAME);
```

- YOUR_VHOST_NAME là vhost name bạn cấu hình cho Laravue app (`http://localhost:8000/` nếu bạn xài local development server với `php artisan serve`)

Bây giờ bạn có thể bắt đầu Laravel như bình thường
```
yarn run watch
```

Laravue sẽ tự động được mở lên và webpage sẽ reload nếu có thay đổi ở JS/Vue files.

Bạn có thể xem thêm [tài liệu chính chủ](https://laravel.com/docs/6.x/mix#browsersync-reloading).

## Dùng Hot Module Replacemen
> Hot Module Replacement (HMR - hay Hot Reloading) cho phép browser không chỉ tự động refresh khi có thay đổi ở JavaScript mà công cụ này còn giữ nguyên trạng thái hiện tại của webpage (ví dụ như khi đang điền thông tin form, hay state của variable bị thay đổi).

### HMR với built-in development server
HMR được hỗ trợ mặc định với Laravel và built-in development server, bạn có thể dùng command sau để sử dụng HMR
```
yarn run hot
```

Sau đó mở server bằng
```
php artisan serve
```

Bây giờ nếu bạn mở Laravue tại http://localhost:8000, ở browser console bạn sẽ thấy như sau:

![](https://cdn.laravue.dev/hot-reload.png)

Lưu ý: Ở browser console sẽ xuất hiện error `manifest.js:786 Uncaught TypeError: Cannot read property 'call' of undefined`, tuy nhiên bạn có thể bỏ qua lỗi này do index.scss được compile bởi webpack và link trực tiếp trong mix.config.js không thông qua Vue components. Nếu bạn muốn sửa lỗi này, bạn có thể import `index.scss` trực tiếp vào `@resources/js/views/App.vue`:
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
Đồng thời xóa dòng khai báo`app.scss` trong `webpack.mix.js`
Bạn có thể tìm hiểu thêm ở [đây](https://github.com/JeffreyWay/laravel-mix/issues/2228)

### HMR với vhosts (Nginx/Apache...)

Nếu bạn đã cài đặt webserver riêng cho bạn (không xài `php artisan serve`) và cấu hình Laravue với vhost, sau khi chạy `yarn run hot` bạn sẽ gặp lỗi CORS do mặc định Laravel-mix sẽ phục vụ "hot resources" thông qua http://localhost:8080 trong khi Laravue app thì chạy trên vhost. Bạn có thể cấu hình để Laravel-mix phục vụ "hot resources" ở hostname khác bằng cách thêm những dòng sau vào `webpack.mix.js`:

```
  mix.options({
    hmrOptions: {
      host: {YOUR_VHOST_NAME},
      port: 8080,
    },
  });
```

## Với LiveReload
### Cài đặt webpack-livereload-plugin
```
yarn add webpack-livereload-plugin@1 --save-dev
```
### Cấu hình webpack.config.js
Mở file `webpack.config.js`, thêm `LiveReloadPlugin()` vào `plugins` như sau:
```js
...
var LiveReloadPlugin = require('webpack-livereload-plugin');
...

let plugins = [new LiveReloadPlugin()];
```

### Cài đặt LiveReload.js vào blade template
Mở `resources/views/laravue.blade.php`, thêm LiveReload.js trước khi đóng tag </body>
```
    @if(config('app.env') == 'local')
        <script src="http://localhost:35729/livereload.js"></script>
    @endif
```

Bây giờ bạn có thể chạy Laravue app bằng:
```
yarn run watch
```

LiveReload sẽ tự động quan sát các files và refresh webpage khi cần thiết.



