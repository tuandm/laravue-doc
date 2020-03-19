---
pageClass: getting-started
---

# Giới thiệu

[![Laravel](https://img.shields.io/badge/laravel-6.2-brightgreen.svg)](https://laravel.com)
[![vue](https://img.shields.io/badge/vue-2.6.10-brightgreen.svg)](https://github.com/vuejs/vue)
[![element-ui](https://img.shields.io/badge/element--ui-2.12.0-brightgreen.svg)](https://github.com/ElemeFE/element)
[![Build Status](https://gitlab.com/bacduong/laravue/badges/master/build.svg)](https://gitlab.com/bacduong/laravue)
[![license](https://img.shields.io/github/license/mashape/apistatus.svg)](https://github.com/tuandm/laravue/blob/master/LICENSE)
[![GitHub release](https://img.shields.io/github/release/tuandm/laravue.svg)](https://github.com/tuandm/laravue/releases)
[![GitHub stars](https://img.shields.io/github/stars/tuandm/laravue.svg?style=social&label=Stars)](https://github.com/tuandm/laravue)

[Laravue](https://laravue.dev) là giao diện quản trị được phát triển trên nền tảng Laravel, sử dụng thư viện [vue-element-admin](http://laravue.dev) và nhiều tính năng tích hợp sẵn. Với sự hỗ trợ mạnh từ Laravel, Laravue là một giải pháp toàn diện cho một ứng dụng quản trị doanh nghiệp.

:::tip
Laravue được xây dựng cho một giải pháp toàn diện, vì vậy Laravue nên được sử dụng từ khi bắt đầu dự án bằng cách tạo ra các layout đơn giản từ đầu và phát triển từ từ các tính năng phù hợp với yêu cầu hệ thống. Điều này sẽ tránh làm cho source code bị dư thừa vì Laravue có rất nhiều các tính năng mà doanh nghiệp của bạn chưa hoặc không dùng đến.
- Package cho Laravel : [laravue-core](https://github.com/tuandm/laravue-core)
:::

<br/>

## Chức năng chính

```
- Login / Logout

- ACL - Quản lý quyền truy cập
  - Quản lý người dùng
  - Quản lý nhóm và quyền hạn theo nhóm
  - Hỗ trợ directives cho quyền và nhóm (v-permission/v-role)

- Tính năng chung
  - I18n (đa ngôn ngữ)
  - Sidebar linh hoạt theo quyền hạn người dùng
  - Breadcrumb động
  - Lịch sử truy cập (sử dụng Tags-view), hỗ trở right-click
  - Svg Sprite
  - Responsive layout

- Editor
  - Rich Text Editor
  - Markdown Editor
  - JSON Editor

- Excel
  - Export/Upload Excel
  - Export zip
  - Visualization Excel

- Bảng dữ liệu
  - Bảng dữ liệu động
  - Bảng dữ liệu hỗ trợ kéo thả
  - Bảng dữ liệu dạng cây
  - Bảng dữ liệu hỗ trợ chỉnh sửa trực tiếp (inline-editing)

- Trang thông báo lỗi
  - 401
  - 404

- Components
  - Avatar Upload
  - Back To Top
  - SplitPane
  - Dropzone
  - Sticky
  - BackToTop button
  - CountTo
  - Kanban board
  - Draggable list
  - Draggable popup dialog
  - And more... (https://laravue.dev/#/dashboard)

- Các ví dụ tham khảo
- Dashboard
- Guide Page
- Biểu đồ (ECharts)
- Clipboard
- Layout elements (Form, Tab, Icons...)
```

<br/>

## Yêu cầu hệ thống
Để chạy được Laravue, máy của bạn phải chạy được [Laravel](https://laravel.com/docs/5.8/installation) mới nhất [Node.js](https://nodejs.org). Ngoài ra, bạn cũng phải biết về [Git](https://git-scm.com/) và [composer](https://getcomposer.org/).

Bên cạnh đó, Laravue sử dụng [ES2015+](https://babeljs.io/docs/en/learn/), [vue](https://vuejs.org), [vuex](https://vuex.vuejs.org/), [vue-router](https://router.vuejs.org/), [axios](https://github.com/axios/axios) and [element-ui](https://github.com/ElemeFE/element). Nếu bạn đã có sẵn kiến thức cơ bản về những thư viện này, nó sẽ giúp cho các bạn tiếp cận Laravue dễ dàng hơn.

::: tip
**Laravue không hỗ trợ cho các trình duyệt cũ như IE 8... Bạn có thể thêm polyfills trong trường hợp cần thiết.**
:::

## Cấu trúc của dự án

Laravue được tổ chức theo phân cấp thư mục như bên dưới: (Laravel cơ bản và resources cho VueJS/ElementUI)

```bash
├── app                        // Laravel app folder
├── boostrap                   // Laravel boostrap folder
├── config                     // Laravel boostrap
│   └── laravue.php            // Configuration file for Laravue project
├── database                   // Laravel database folder
├── public                     // Laravel public folder
│   ├── fonts
│   │   └── vendor             // Vendor fonts (element-ui...)
│   └── static                 // Configuration file for Laravue project
│       └── Tinymce            // rich text editor
├── resources                  // Laravel resources
│   ├── js                     // Main laravue source code
│   │   ├── api                // api service
│   │   ├── assets             // module assets like fonts,images (processed by webpack)
│   │   ├── components         // global components
│   │   ├── directive          // global directive
│   │   ├── filters            // global filter
│   │   ├── icons              // svg icons
│   │   ├── lang               // i18nlanguage
│   │   ├── router             // router
│   │   ├── store              // store
│   │   ├── styles             // global css
│   │   ├── utils              // global utils
│   │   ├── vendor             // vendor libraries (excels...)
│   │   ├── views              // views
│   │   ├── App.vue            // main app component
│   │   ├── app.js             // app entry file
│   │   └── permission.js      // permission authentication
│   └── views                  // Laravel blade templates
│       └── laravue.blade.php  // Main view for Laravue application
├── .babelrc                   // babel config
├── .eslintrc.js               // eslint config
├── .gitignore                 // sensible defaults for gitignore
└── package.json               // package.json
```

## Bắt đầu

```bash
# Clone the project with composer
composer create-project tuandm/laravue
cd laravue

# Migration and DB seeder (after changing your DB settings in .env)
php artisan migrate --seed

# Install passport
php artisan passport:install

# install dependency
yarn install

# Build for development
yarn run dev # or yarn run watch

# Start local development server
php artisan serve
```

<br/>

Bạn đã có thể dùng trình duyệt mở Laravue ở http://localhost:8000 (hoặc tại port mà câu lệnh `php artisan serve` trả về). Sau khi đăng nhập với email và mật khẩu có sẵn, bạn sẽ nhìn thấy toàn bộ ứng dụng.

Trang đăng nhập:

![](https://cp5.sgp1.cdn.digitaloceanspaces.com/zoro/laravue-cdn/laravue-login.png)

Laravue đã cài đặt sẵn các components tiêu chuẩn, quản lý [state](https://vuejs.org/v2/guide/state-management.html), đa ngôn ngữ, định tuyến (https://router.vuejs.org/),... Bạn có thể đọc thêm về các components đó ở tài liệu chi tiết.

<br/>

::: tip
**Đề nghị：** Bạn nên sử dụng [laravue-core](https://github.com/tuandm/laravue-core) package nếu bạn muốn đem Laravue vào trong các dự án Laravel có sẵn, và Laravue khi đó sẽ trở thành tài liệu rất hữu ích.
:::


### Build for production
```
yarn run production
```

### Thay đổi đường dẫn
Bạn có thể thay đổi đường dẫn cho Laravue dashboard bằng cách khai báo trong `.env`, ví dụ `LARAVUE_PATH=admin`. Nếu `LARAVUE_PATH` để trống, Laravue sẽ hiện thị tại trang chủ, nếu `LARAVUE_PATH` có giá trị, thì trang landing page mặc định của Laravel sẽ xuất hiện với đường dẫn vào Laravue dashboard

![Landing page](https://cdn.laravue.dev/landing-page.png)

::: warning
Changing .env requires running `yarn run ...` again to be affected.
:::

### Kiểm tra kích thước build files
Nếu bạn cảm thấy ứng dụng quá nặng (vendor.js, app.js quá lớn), bạn có thể kiểm tra lại bằng `webpack-bundle-analyzer` để optimize.
```
yarn run report
```
Sau khi chạy command ở trên, trình duyệt sẽ tự động mở lên ở địa chỉ http://127.0.0.1:8888 và hiện report về kích thước các module js đang sử dụng.

![](https://cdn.laravue.dev/webpack-bundle-report.jpg)

Với bảng demo hiện tại, kích thước file js sau khi minifying:
```
      /css/app.css   215 KiB       0  [emitted]         /js/app
        /js/app.js   2.9 MiB       0  [emitted]  [big]  /js/app
   /js/manifest.js  1.46 KiB       1  [emitted]         /js/manifest
     /js/vendor.js  4.17 MiB       2  [emitted]  [big]  /js/vendor
```
Và sau khi "nén" với nginx:
![](https://cp5.sgp1.digitaloceanspaces.com/zoro/laravue-cdn/js-sizes.png)

### Docker
```sh
docker-compose up -d
```
Chạy database migration/seeding:
```sh
# Get laravel docker container ID from containers list
docker ps

docker exec -it <container ID> php artisan migrate --seed 
# Where <container ID> is the "laravel" container name, ex: docker_laravel_1
```

Bạn cũng có thể chạy các lệnh `yarn` bằng cách trên:
```sh
docker exec -it <container ID> yarn run watch 
# Where <container ID> is the "laravel" container name, ex: docker_laravel_1
...
```
Port mặc định cho docker là 8000 (http://localhost:8000). Hãy chắc chắn rằng không có ứng dụng nào đang chiếm port này, hoặc bạn có thể thay đổi nó ở https://github.com/tuandm/laravue/blob/master/docker-compose.yml

## Đóng góp và cộng đồng

Tài liệu này được open-source tại [laravue-doc](https://github.com/tuandm/laravue-doc) dựa trên [vuepress](https://github.com/vuejs/vuepress).

Laravue vẫn đang được phát triển để cung cấp nhiều tình năng hay, tích hợp các package Laravel chất lượng và hữu ích, đồng thời áp dụng các chuẩn mực tốt nhất trong lập trình để phát triển một giải pháp toàn diện cho doanh nghiệp. Chúng tôi mong đợi sẽ có nhiều đóng góp từ cộng đồng để dự án ngày một hoàn thiện hơn. Mọi ý kiến đóng góp xin gởi về email [bacduong@gmail.com] hoặc tạo trực tiếp tại [github issues](https://github.com/tuandm/laravue/issues).


::: tip
**Chúng tôi mong muốn Laravue không chỉ là một giải pháp cho quản trị doanh nghiệp, mà còn là nơi hướng dẫn mọi người lập trình với Laravel/VueJS qua các ví dụ trực quan nhằm hỗ trợ cộng đồng lập trình viên Laravel**
:::

## Trình duyệt

Các trình duyệt hiện đại và Internet Explorer 10+.

<!-- prettier-ignore -->
| [<img class="no-margin" src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/edge/edge_48x48.png" alt="IE / Edge" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>IE / Edge | [<img class="no-margin" src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/firefox/firefox_48x48.png" alt="Firefox" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Firefox | [<img class="no-margin" src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/chrome/chrome_48x48.png" alt="Chrome" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Chrome | [<img class="no-margin" src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari/safari_48x48.png" alt="Safari" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Safari |
| --------- | --------- | --------- | --------- |
| IE10, IE11, Edge| hai phiên bản gần nhất | hai phiên bản gần nhất| hai phiên bản gần nhất


## Lưu ý
:::tip Lưu ý
**Chúng tôi cố gắng tránh dịch các thuật ngữ chuyên ngành tiếng anh để bảo đảm sự trong sáng của tài liệu (ví dụ responsive layout hay component...), vì vậy rất mong các bạn thông cảm và cùng tìm hiểu thêm ý nghĩa của các thuật ngữ - điều này sẽ giúp cho các bạn rất nhiều trong quá trình tiếp cận thuật ngữ chuyên ngành.**
:::

