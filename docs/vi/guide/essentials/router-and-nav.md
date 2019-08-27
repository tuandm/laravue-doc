# Router và Navigation

Router và navigation là thành phần quan trọng để tổ chức hệ thống.

Trong dự án này, router và navigation đi chung với nhau. Bạn chỉ cần cấu hình router ở `@/router/index.js` rồi menu ở sidebar sẽ tự động được tạo ra. Điều này rất tiện lợi và giảm thời gian chỉnh sửa sidebar navigation. Dĩ nhiên bạn sẽ phải cấu hình theo đúng yêu cầu của 1 route

## Config

Sau đây là các tùy chọn cho một route

```js
// Nếu là true, route này sẽ không hiện ra trên sidebar menu
// Ví dụ trang đăng nhập hay trang lỗi
hidden: true

// Nếu noredirect, route này sẽ không click được
redirect: noredirect

// Khi 1 route cha có nhiều hơn 1 route con, tất cả các route con sẽ hiển thị dưới dạng nested (menu con)
// Nhưng khi 1 route cha chỉ có 1 route con, thì menu sẽ hiển thị route con thay cho route cha (menu con chỉ có 1 link, thì sẽ thay thế menu cha)
// Nếu bạn vẫn muốn hiển thị menu cha - con trong khi menu con chỉ có 1 link, thì bạn thiết lập alwaysShow: true
alwaysShow: true

// Tên của route, luôn luôn yêu cầu nếu không chúng ta sẽ có vấn đề với <keep-alive>.
name: 'router-name'

meta: {
  // Nhóm người dùng được phép truy cập vào route này, nếu không thiết lập, tất cả các nhóm đều truy cập được
  roles: ['admin', 'editor'],
  // Quyền hạn để được phép truy cập vào route này, nếu không thiết lập, tất cả người dùng đề truy cập được
  permissions: ['view menu zip', 'manage user'],

  // Tên xuất hiện trên layout (ở Sidebar, Breadcrumbs,...)
  title: 'title'

  // svg icon class
  icon: 'svg-name'

  // Nếu là true, route này sẽ không được "cache" bởi <keep-alive>. Mặc định là false (tất cã route đểu được cache)
  noCache: true

  // Nếu là false, route này sẽ không xuất hiện ở breadcrumb (mặc định là true)
  breadcrumb: false
}
```

::: tip Code
[@/router/index.js](https://github.com/tuandm/laravue/blob/master/resources/js/router/index.js)
:::

<br/>

**Ví dụ:**

```js
{
  path: '/permission',
  component: Layout,
  redirect: '/permission/index',
  alwaysShow: true, // will always show the root menu
  meta: {
    title: 'permission',
    icon: 'lock',
    permissions: ['view menu permission'], // Chỉ cho phép truy cập với những user có quyền 'view menu permission'
  },
  children: [...],
}
```

## Router

Có 2 loại routes: `constantRoutes` and `asyncRoutes`.

**constantRoutes:** bao gồm các routes mà không yêu cầu xác thực truy cập ví dụ như trang login hay các trang lỗi - tóm lại là ai vào cũng được.

**asyncRoutes:** bao gồm các routes mà yêu cầu xác thực quyền hay nhóm người dùng, và được thêm vào bằng `addRoutes`. Chi tiết xem thêm ở [Quyền và nhóm người dùng](permission.md).

::: tip
Tất cả các trang của Laravue đều sử dụng `router lazy loading`, chi tiết có thể xem ở [đây](/vi/guide/advanced/lazy-loading.md)

Nếu bạn muốn biết thêm về `browserHistory` và `hashHistory`, vui lòng xem [Build & Deploy](deploy.md).
:::

Các cấu hình khác của [vue-router](https://router.vuejs.org/en/) đều được giữ nguyên, bạn có thể tham khảo trực tiếp từ tài liệu của vue-router

::: tip Chú ý
Trang lỗi 404 phải được khai báo cuối cùng trong `constantRoutes` vì các routes khai báo sau 404 sẽ bị chặn bởi 404 và không có tác dụng. Chi tiết có thể tham khảo ở [addRoutes when you've got a wildcard route for 404s does not work](https://github.com/vuejs/vue-router/issues/1176)
:::

## Sidebar

Sidebar trong Laravue được thiết kế dựa trên `el-menu` của element-ui.

Như đã nói ở các tài liệu trước, sidebar được sinh ra tự động bằng cách duyệt các routes và kiểm tra chéo với hệ thống phân quyền, đồng thời hỗ trợ menu "đa cấp".

> Code: [@/layout/components/Sidebar](https://github.com/tuandm/laravue/tree/master/resources/js/layout/components/Sidebar)


Styles mặc định của `element-ui` đã thay được thay đổi khá nhiều, các bạn có thể vào [@/styles/sidebar.scss](https://github.com/tuandm/laravue/blob/master/resources/js/styles/sidebar.scss) để xem và thay đổi nếu muốn.

**Chú ý quan trọng**. Sidebar có 2 loại: `submenu` (menu con) và `el-menu-item` (menu trực tiếp). Xem hình dưới đây:

![](https://cp5.sgp1.cdn.digitaloceanspaces.com/zoro/laravue-cdn/nested-menu.png)

Như đã nói ở trên, sidebar hỗ trợ menu con bằng cách tạo nhiều routes trong `children`, các routes đó sẽ tự động chuyển thành menu con. Nếu `children` chỉ có 1 route, thì route đó sẽ thay thế menu cha trừ khi chúng ta bắt buộc nó hiện ở menu con bằng cách đặt `alwaysShow: true`. Ví dụ:

```js
// Không có sub-menu: children.length===1
{
  path: '/icon',
  component: Layout,
  children: [{
    path: 'index',
    component: ()=>import('svg-icons/index'),
    name: 'icons',
    meta: { title: 'icons', icon: 'icon'},
  }],
},

// Có sub-menu: children.length===1, và alwaysShow===true
{
  path: '/icon',
  component: Layout,
  alwaysShow: true,
  children: [{
    path: 'index',
    component: ()=>import('svg-icons/index'),
    name: 'icons',
    meta: { title: 'icons', icon: 'icon'},
  }],
},

// Có sub=menu: children.length > 1
{
  path: '/components',
  component: Layout,
  name: 'component-demo',
  meta: {
    title: 'components',
    icon: 'component',
  },
  children: [
    { path: 'tinymce', component: () =>import('components-demo/tinymce'), name: 'tinymce-demo', meta: { title: 'tinymce' }},
    { path: 'markdown', component: () =>import('components-demo/markdown'), name: 'markdown-demo', meta: { title: 'markdown' }},
  ],
}
```

## Click vào sidebar để refresh route hiện tại

Với cách làm web truyền thống (trước khi có SPA - Single Page Application), khi người dùng click vào menu trên sidebar, webpage sẽ được load lại. Tuy nhiên với VueJS thì điều này thay đổi, `vue-router` sẽ kiểm tra danh sách routes, nếu URL không đổi thì không có hook nào được trigger, webpage sẽ không thay đổi. Xem thêm thảo luận ở [đây](https://github.com/vuejs/vue-router/issues/296).

![](https://wpimg.wallstcn.com/5d0b0391-ea6a-45f2-943e-aff5dbe74d12.png)

Chúng ta có thể thay đổi điều này bằng cách thay đổi URL để bắt buộc các hook được trigger và webpage sẽ được reload lại. Ví dụ:

```js
clickLink(path) {
  this.$router.push({
    path,
    query: {
      //Ensure that each click, query is not the same
      //to ensure that refresh the view
      t: +new Date(),
    }
  })
}
```

Lưu ý: Đừng quên thêm `key` duy nhất vào `router-view`, ví dụ: `<router-view :key="$route.path"></router-view>`.

Với ví dụ trên, chúng ta thêm vào URL một chuỗi số duy nhất, ví dụ `xxx.com/article/list?t=1496832345025` để bảo đảm URL sẽ khác URL hiện tại khi click vào sidebar.

Một cách khác nữa là chúng ta so sánh route hiện tại với route được click, nếu giống nhau thì chúng ta sử dụng `redirect` để nhảy tới cùng trang.

**Ví dụ**

![](https://cp5.sgp1.cdn.digitaloceanspaces.com/zoro/laravue-cdn/change-font.jpg)

Click vào nút đổi cỡ chữ trên thanh công cụ, bạn sẽ thấy nguyên `app-main` được reload lại. Nó sử dụng phương pháp redirecting nói trên.


Ví dụ redirect trang đến `/redirect` khi click chuột

```js
const { fullPath } = this.$route
this.$nextTick(() => {
  this.$router.replace({
    path: '/redirect' + fullPath,
  });
});
```

Trang `redirect` được chuyển ngược lại trang trước đó.

```js
// redirect.vue
// https://github.com/tuandm/laravue/blob/master/resources/js/views/redirect/index.vue
export default {
  beforeCreate() {
    const { params, query } = this.$route;
    const { path } = params;
    this.$router.replace({ path: '/' + path, query });
  },
  render: function(h) {
    return h(); // avoid warning message
  },
};
```

<br>

## Breadcrumb

Breadcrumbs là các thẻ (label)/link điều hướng tập hợp nhiều liên kết phân cấp, giúp cho người dùng biết được mình đang ở vị trí nào (theo phân cấp) trong trang web. Ví dụ:

```
Trang chủ > Chuyên Mục (hoặc thẻ Tag) > Trang con
Quản trị > Quản lý người dùng > Thêm người dùng
```

Breadcrumbs trong laravue được sinh tự động bằng cách theo dõi thay đổi của `$route`. tương tự như menu, bạn cũng có thể cấu hình breadcrumb trong routing. Ví dụ: bạn có thể khai báo `breadcrumb:false` trong route để route đó không hiển thị ở breadcrumbs.

> Source code: [@/components/Breadcrumb](https://github.com/tuandm/laravue/blob/master/resources/js/components/Breadcrumb/index.vue)

## Liên kết ngoài

Bạn có thể thêm vào các liên kết ngoài (external links) ở sidebar, đơn giản là khai báo đường dẫn của liên kết vào `path`. Khi người dùng click vào liên kết hợp lệ, browser sẽ mở liên kết đó.

Ví dụ

```json
{
  path: 'external-link',
  component: Layout,
  children: [
    {
      path: 'https://github.com/tuandm/laravue',
      meta: { title: 'externalLink', icon: 'link' },
    },
  ],
},
```
