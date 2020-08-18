# Lazy Loading and Code Splitting
## Code splitting
Theo [tài liệu của webpack](https://webpack.js.org/guides/code-splitting/)
> Code splitting là một trong những tính năng rất hữu ích của webpack cho phép chúng ta chia source code thành từng file để load cùng 1 lần. Tính năng được dùng để tạo các file với kích thước nhỏ và quản lý việc ưu tiên tải các tài nguyên. Nếu được sử dụng hợp lý, chức năng này có thể giúp cải thiện tốc độ tải trang web.

### Code splitting with Laravel-mix
Laravel-mix hỗ trợ [code splitting](https://laravel-mix.com/docs/master/extract) bằng hàm `mix.extract()`, bạn có thể tìm thấy ở file [`webpack.mix.js`](https://github.com/tuandm/laravue/blob/master/webpack.mix.js):
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

Với setting này, file vendor.js (chủ yếu là các library ít khi thay đổi) sẽ được tạo ra và cache ở phía client (trình duyệt).

## Lazy loading route
Theo [tài liệu của Vue](https://router.vuejs.org/guide/advanced/lazy-loading.html)
> Khi xây dựng ứng dụng với bundler (là trình quản lý các thư viện theo version, ở Laravue là npm/yarn), JavaScript code sẽ trở nên nặng nề và ảnh hưởng đến thời gian tải trang. Nếu chúng ta có thể tách các component ra các file nhỏ và tải nó khi component đó cần được hiển thị, thì sẽ tăng hiệu suất của ứng dụng.

### Lazy loading route in Laravue
Laravue đã hỗ trợ import động các component:
```
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true,
  },
```

đồng thời webpack cũng đã được cấu hình để tạo các chunks (file component riêng biệt)
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

Bằng cách này, các component sẽ được tạo ra thành các file js riêng biệt và chỉ được load khi user mở page chứa component đó

Để cấu hình tên các chunk file (và các cấu hình khác), bạn có thể tham khảo thêm ở [đây](https://webpack.js.org/configuration/output/#outputchunkfilename)

### Disable lazy loading
Vì một số lý do nào đó bạn không muốn sử dụng lazy-loading, bạn có thể tắt nó đi bằng cách thêm `dynamic-import-node` vào file [`.babelrc`](https://github.com/tuandm/laravue/blob/master/.babelrc) > plugins
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
Khi chạy lệnh `npm run dev/watch/production`, bạn có thể thấy các file js được sinh ra (vendor.js, app.js, chunks...)
```
                          Asset       Size       Chunks
                /js/manifest.js   3.02 KiB           11  [emitted] 
                 js/8.354d7a.js   10.8 KiB            8  [emitted] 
                 js/9.6c5c36.js   26.8 KiB            9  [emitted] 
                      js/app.js   1.81 MiB           10  [emitted]   /js/app
                   js/vendor.js   4.43 MiB  0, 1, 3, 12  [emitted]   /js/vendor
```
