# Layout

Layout là cấu trúc về bố cục của 1 webpage, thường bao gồm các thành phần như là navigation, sidebar, breadcrumbs, phần nội dung chính. Layout cơ bản được mô tả như sau

![Laravue layout](https://cp5.sgp1.cdn.digitaloceanspaces.com/zoro/laravue-layout.jpg)

::: tip Code
[@/views/layout](https://github.com/tuandm/laravue/tree/master/resources/js/views/layout)
:::

`@` được gọi là webpack's [alias](https://webpack.js.org/configuration/resolve/#resolve-alias) và nó trỏ vào thư mục `resource/js`. Điều này có nghĩa là khi bạn sử dụng `@` trong source code để import thì webpack sẽ hiểu bạn đang nói tới `resource/js`

```js
import router from '@/router';
// tương đương với
import router from 'resources/js/router';
```


Bạn có thể thay đổi điều này trong  `webpack.config.js`.

```js
    alias: {
      vue$: 'vue/dist/vue.esm.js',
      '@': path.join(__dirname, '/resources/js'),
    },
```

<br>

Hầu hết các trang trong `laravue` đều sử dụng `<layout>`, ngoại trừ một số ngoại lệ như: `trang đăng nhập`, `lỗi 401` , v.v... Bạn có thể tạo nhiều layout trong 1 project, chỉ cần đặt `<app-main>` tag vào layout bạn tạo ra.

```js
// Không sử dụng Layout
{
  path: '/401',
  component: () => import('error-page/401'),
}

// Sử dụng layout
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

Laravue sử dụng vue-router [routing nesting](https://router.vuejs.org/guide/essentials/nested-routes.html), do đó thêm hay chỉnh sửa 1 trang chỉ có tác dụng với phần nội dung trong `<app-main>`. Các phần khác như `<navbar>`, `<sidebar>`, `<tags-view>` sẽ không bị ảnh hưởng.

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

Sơ đồ phía trên mô tả cách `vue-router` hoạt động

Nếu bạn chưa quen thuộc với `vue-router`, vui lòng xem [tài liệu chính chủ](https://router.vuejs.org/) để biết thêm chi tiết. Lời khuyên là bạn nên đọc kỹ tài liệu để hiểu rõ cách thức `vue-router` hoạt động và các cấu hình cần thiết.

<br>

## app-main

::: tip Code
[@/layout/components/AppMain](https://github.com/tuandm/laravue/blob/master/resources/js/layout/components/AppMain.vue)
:::

```
<template>
  <section class="app-main">
    <transition name="fade-transform" mode="out-in">
      <keep-alive :include="cachedViews">
        <router-view :key="key" />
      </keep-alive>
    </transition>
  </section>
</template>
```

`<app-main>` sử dụng `<router-view>` để hiển thị nội dung được trả về từ component đăng ký trong route item. Điều này có nghìa là khi bạn đăng ký một route (tham khảo ở [Tạo một trang mới](/vi/guide/development/new-page.md)), bạn sẽ khai báo component cho route đó, và component này sẽ đưa kết quả cho `<router-view>` và hiển thị trong `<app-main>`.

`<router-view>` được đặt trong tag `<keep-alive>` với mục đích `cache` lại nội dung. Xin vui lòng xem thêm [router and navigration](router-and-nav.md).

`transition` mô tả hiệu ứng khi chuyển trang, bạn có thể chỉnh sửa theo ý bạn (ví dụ fade, slide...)

<br>

## router-view

**Router khác nhau cho cùng một vue component。** 

Trong thực tế, có nhiều trường hợp giống như sau:

```js
    { path: 'create', component: () => import('@/views/ArticleForm') },
    { path: 'edit/:id(\\d+)', component: () => import('@/views/ArticleForm') },
```

Một component `ArticleForm` xài chung cho `create` và `edit`. Mặc định khi chuyển đổi giữa 2 trang trên, `created` hay `mounted` hooks sẽ không chạy lại bởi vì nó đã được chạy trước đó một lần rồi. Bạn có thể cho các hooks đó chạy lại bằng cách theo dõi `$route` (xem [tài liệu chi tiết](https://router.vuejs.org/guide/essentials/dynamic-matching.html#reacting-to-params-changes)) nhưng nó khá là bât tiện vì nó khó để quản lý code, dễ tạo ra các lỗi. Giải pháp đơn giản là chúng ta có thể gắn 1 chuỗi ngẫu nhiên (hash string) vào `route-view` để chắc chắn các hooks sẽ chạy khi chuyển trang (vì URL đã thay đổi).

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
**Hoặc** bạn có thể khởi tạo 2 views khác nhau (ví dụ `Create` hay `Edit`) và render một component với các params khác nhau

Code：[@/views/articles](https://github.com/tuandm/laravue/tree/master/resources/js/views/articles)
:::

```html
<!-- Create.vue -->
<template>
  <article-detail :is-edit='false'></article-detail> //create
</template>
<script>
  import ArticleDetail from './components/ArticleDetail'
</script>

<!-- Edit.vue -->
<template>
   <article-detail :is-edit='true'></article-detail> //edit
</template>
<script>
  import ArticleDetail from './components/ArticleDetail'
</script>
```

## Layout cho điện thoại

`element-ui` được thiết kế chủ yếu dành cho máy tính, sử dụng trong các dự án phức tạp như ứng dụng doanh nghiệp hay các hệ thống quản trị. Điều này không đơn giản để phục vụ cho người dùng trên điện thoại. Với `Laravue`, chúng tôi cố gắng điều chỉnh reponsive layout ở mức tối đa có thể, nhưng chúng tôi không bảo đảm sẽ làm cho mọi người hài lòng khi sử dụng trên điện thoại.
