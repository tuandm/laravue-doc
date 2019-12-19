# Tạo trang mới

Trong tài liệu này, chúng ta sẽ tìm hiểu làm sao đễ tạo 1 page mới trong laravuel. Nếu bạn đã quen thuộc với `vue-router` thì việc tạo một trang mới ở `laravue` khá là đơn giản.

## Tạo route

Đầu tiên, chúng ta sẽ tạo 1 route vào file `@/router/index.js`. Ví dụ:

**Tạo trang `foo`**

```js
{
  path: '/foo',
  component: Layout,
  redirect: '/foo/index',
  name: 'foo',
  meta: {
    title: 'foo',
    icon: 'star',
  },
}
```

::: tip Icon
Laravue cung cấp 2 loại icon (IconFont và ElementUI). Bạn có thể xem tất cả icon ở [đây](https://laravue.dev/#/element-ui/icons), và tài liệu chi tiết ở [đây](/guide/advanced/icon.md)
:::

Tiếp theo, chúng ta phải thêm 1 route và `children`:
```js
{
  path: '/foo',
  component: Layout,
  redirect: '/foo/index',
  meta: {
    title: 'foo', // This title will show on the breadcrumb before submenu's title
    icon: 'star', // Use star icon
  },
  children: [
    {
      path: 'index', // When clicking on this menu, it will redirect to /#/foo/index
      name: 'foo',
      meta: { title: 'foo' }, // Show `foo` on the sidebar
    },
  ],
}
```

**Lúc này sidebar sẽ hiển thị `foo` menu giống như sau**

![](https://cp5.sgp1.cdn.digitaloceanspaces.com/zoro/laravue-cdn/foo.png)

Click vào menu này sẽ redirect tới `/#/foo/index` và hiển thị trang trắng (vì chúng ta chưa khai báo view). Icon cho submenu cũng không hiển thị vì nó chưa được khai báo.
<br/>

:::tip
Vì `children` chỉ chứa một route, nên menu không hiển thị theo dạng cha-con, bạn cần phải tạo nhiều hơn 1 route con để có thể thấy nó như ví dụ dưới đây.

Trong trường hợp bạn vẫn muốn hiển thị dạng menu cha-con khi chỉ có 1 route, bạn có thể xài `alwaysShow: true`. Xem thêm ở [Router and Navigation](/guide/essentials/router-and-nav.md) để biết thêm chi tiết.
:::

```js
{
  path: '/foo',
  component: Layout,
  redirect: '/foo/index',
  name: 'foo',
  meta: {
    title: 'foo',
    icon: 'star',
  },
  children: [
    { 
      path: 'index', // When clicking this submenu, it will redirect to /#/foo/index
      name: 'foo', 
      meta: { title: 'foo' }, // foo submenu
    },
    { 
      path: 'bar', // When clicking this submenu, it will redirect to /#/foo/bar 
      name: 'bar',
      meta: { title: 'bar' }, // bar submenu
    },
  ],
}
```

![](https://cp5.sgp1.cdn.digitaloceanspaces.com/zoro/laravue-cdn/foo-bar.png)

<br/>

## Nested Routes

Nếu bạn có nested route, ví dụ [@/views/nested](https://github.com/tuandm/laravue/blob/master/resources/js/views/nested), đừng quên thêm `<router-view>` vào layout thứ 2 (sử dụng cho các route con của nested route).

Ví dụ: [@/views/nested/menu1/index.vue](https://github.com/tuandm/laravue/blob/master/resources/js/views/nested/menu1/index.vue).

**Note:** Mỗi cấp của nested route sẽ có thêm một `<router-view>`.

![](https://cp5.sgp1.cdn.digitaloceanspaces.com/zoro/laravue-cdn/nested.png)

<br/>

## Tạo view

Sau khi tạo route, chúng ta sẽ tiếp tục tạo file view ở thư mục `@/views`. Nếu các component hay util (các hàm tiện ích phục vụ cho component) chỉ sử dụng trong 1 view nào đó, thì chúng nên được chứa trong thư mục thuộc view đó. Điều này giúp thuận tiện hơn trong việc quản lý source code của 1 view và các "tiện ích" phục vụ cho riêng nó.

![](https://cp5.sgp1.cdn.digitaloceanspaces.com/zoro/laravue-cdn/view-components.png)

Chúng ta sẽ tạo thư mục `foo` trong `@views`, với 2 file như sau:

```bash
├── app                        
├── resources                  
│   └── js                     
│       └── views              // views
│           └── foo            
│               ├── Foo.vue    // Foo view
│               └── Bar.vue    // Bar view
```

Chỉnh sửa file `@/views/foo/Foo.vue` để thêm component đơn giản như sau:

```
<template>
  <div class="app-container">
    <div class="row justify-content-center">
      <div class="col-md-8">
        <div class="card card-default">
          <h3 class="card-header">Foo Component</h3>
          <div class="card-body">
            I'm a foo component.
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  mounted() {
    console.log('Foo component mounted.');
  },
};
</script>

```

Sau đó chúng ta sẽ khai báo Foo component với route bằng cách chỉnh sửa foo route trong `@/router/index.js`:
```js
{
  path: '/foo',
  component: Layout,
  redirect: '/foo/index',
  meta: {
    title: 'foo', // This title will show on the breadcrumb before submenu's title
    icon: 'star', // Use star icon
  },
  children: [
    {
      path: 'index', // When clicking on this menu, it will redirect to /#/foo/index
      component: () => import('@/views/foo/Foo.vue'),
      name: 'foo',
      meta: { title: 'foo' }, // Show `foo` on the sidebar
    },
  ],
}
```

Sau khi lưu file và reload page, click vào `foo` menu sẽ hiển thị Foo component.

![](https://cp5.sgp1.cdn.digitaloceanspaces.com/zoro/laravue-cdn/foo-component.png)

Bạn có thể tiếp tục tạo Bar component và import vào bar submenu.

<br/>

## I18n

Bây giờ chúng ta đã có foo menu ở sidebar, nhưng khi chúng ta chuyển ngôn ngữ thì `foo` vẫn không thay đổi. Để làm được điều này, chúng ta cần thêm phần dịch cho `foo` vào `@/lang/en.js` và các file ngôn ngữ khác (ví dụ `@/lang/vi.js`) ở phần `router`.

```js
// @/lang/en.js
export default {
  route: {
    ...
    foo: 'Foo',

// @/lang/vi.js
export default {
  route: {
    ...
    foo: 'Foo in VI',
```
Bây giờ khi các bạn chuyển qua ngôn ngữ tiếng Việt, foo menu sẽ hiển thị là `Foo in VI`, tương tự `Foo` cho tiếng Anh.

:::tip
Bạn có thể xem code ví dụ cho tài liệu này ở: [How to create new page](https://github.com/tuandm/laravue/compare/guide/how-to-add-new-page?expand=1)
:::
