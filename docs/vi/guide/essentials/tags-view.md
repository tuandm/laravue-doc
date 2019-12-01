# Tags View

![](https://cdn.laravue.dev/tags-view.jpg)

Đây là một tính năng khá là thú vị dùng để liệt kê các trang đã truy cập - tương tự lịch sử truy cập của browser - được hiển thị dưới dạng tabs. Chức năng này được hiện thực bởi [tags](https://element.eleme.io/#/en-US/component/tag)

Về mặt kỹ thuật, chức năng này sử dụng `keep-alive` kết hợp với `router-view`.

Code: `@/layout/components/AppMain.vue`

```html
<keep-alive :include="cachedViews">
  <router-view></router-view>
</keep-alive>
```

Trên thực tế, tags view là danh sách các `router-link`, khi được click vào thì nó sẽ load view tương ứng. Hệ thống sẽ kiểm tra để quyết định sử dụng trang hiện tại từ cache hay phải load lại.

## visitedViews && cachedViews

Tags view quản lý 2 array:

- visitedViews : Tất cả các trang mà user đã duyệt, được lưu trong một array và hiển thị dạng tags bar.
- cachedViews : Các route được cache lại (`keep-alive`). Bạn có thể cấu hình cho 1 route được cache hay không bằng `meta.noCache`. [Xem thêm Router and Nav](router-and-nav.md)

## Lưu ý

`keep-alive` và `router-view` có mối quan hệ rất chặt chẽ. Hãy chắn chắn rằng bạn sử dụng cùng 1 tên cho 2 thành phần này. Tên của các views/components nên là duy nhất, tránh trùng lặp vì sẽ gây ra nhiều lỗi - ví dụ leak memory.

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

Tên khai báo giống nhau (createForm), và không được trùng lặp (khai báo ở chỗ khác). *Nếu bạn không cung cấp tên cho view, nó sẽ không được cache*
Chi tiết ở đây: 
[issue](https://github.com/vuejs/vue/issues/6938#issuecomment-345728620).

<!--
## Một số trường hợp không nên cache.

Hiện tại giải pháp cache không thực sự thích hợp cho một số component, ví dụ trang article chi tiết `/article/1`, `article/2`. Các trang này khác nhau nhưng sử dụng chung các components (bản chất là 1 page nhưng khác param truyền vào). Như đã nói ở trên `<keep-alive :include...>` sẽ cache dựa trên component name, điều này sẽ gây ra lỗi: article/1 sẽ được cache và article/2 dùng lại cache.

- Instead of using keep-alive's :include, keep-alive caches all components directly. This way, it supports the aforementioned business situation.
  To [@/layout/components/AppMain.vue](https://github.com/tuandm/laravue/blob/master/resources/js/layout/components/AppMain.vue) remove the `:include` related code. Of course, using keep-alive directly also has disadvantages. It can't dynamically delete the cache. You can only help it to set a maximum cache instance limit.
  [issue](https://github.com/vuejs/vue/issues/6509)

- Use a browser cache scheme such as localStorage, you have to control the cache yourself.
-->
## Cố định Tags view

Nếu thuộc tính `affix` được sử dụng cho route, `tag` hiện tại sẽ cố định (fixed, hay pinned) trên `tags-view` (không thể bị xóa).

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

## Gỡ bỏ Tags view

Trên thực tế, `keep-alive` [source code](<(https://github.com/vuejs/vue/blob/dev/src/core/components/keep-alive.js)>) không quá phức tạp, nhưng logic thì hơi bị lằng nhằng. Bạn có thể xóa nó bằng cách sau:

Đầu tiên, tìm đến file
`@/layout/components/AppMain.vue` và xóa `keep-alive`

```html
<template>
  <section class="app-main" style="min-height: 100%">
    <transition name="fade-transform" mode="out-in">
      <router-view></router-view> <!-- or <router-view :key="key"/> -->
    </transition>
  </section>
</template>
```

Xóa file `@/layout/components/TagsView.vue`, sau đó xóa reference đến `TagsView` trong `@/layout/components/index` và `@/layout/Layout.vue`. Sau đó, xóa file `@/store/modules/tags-view.js`.
