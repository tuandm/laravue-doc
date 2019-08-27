# Roles and Permissions
<!---
Roles and permission have been introduced in this article [Laravue part 2 - Permissions and Roles](https://dev.to/tuandm/laravue-part-2-acl-authentication-permissions-and-roles-49fe-temp-slug-7192660?preview=9ab5016c9f635b4d2fbf501b9aa55fc4b932c74e05d0d2a31a377384dc536c4b90754b534601c6ccb1cc23aa281b279073040c1eb2a2004b96760f04).
-->

## Giới thiệu hệ thống phân quyền
Hệ thống phân quyền của Laravue được dựa trên package [spatie/laravel-permission](https://github.com/spatie/laravel-permission) khá phổ biến với cộng đồng Laravel. Theo đó, 1 người dùng có thể thuộc nhiều nhóm (groups hay roles) và ngược lại, 1 nhóm có thể có nhiều người dùng (hiển nhiên). Tuy nhiên trong giới hạn của code demo dự án, Laravue chỉ cho phép tạo người dùng thuộc 1 nhóm duy nhất. Bạn có thể chỉnh sửa điều này tùy theo yêu cầu dự án của bạn.

![Creating user with only one role can be assigned](https://cp5.sgp1.cdn.digitaloceanspaces.com/zoro/laravue-cdn/add-user.png)

## Phương thức hoạt động
Sau khi đăng nhập, server sẽ trả về danh sách tất cả các quyền của người dùng hiện tại, sau đó tạo danh sách các routing có thể truy cập và cung cấp cho `router` bằng `router.addRoutes`.

**Quyền hạn của user = Quyền hạn của các nhóm mà user tham gia + Quyền hạn được cấp phát riêng cho user đó.**

::: tip permission in UserResource
[app/Http/Resources/UserResource.php](https://github.com/tuandm/laravue/blob/master/app/Http/Resources/UserResource.php)
:::

## Điều chỉnh hay thay đổi

Logic hiện tại được thể hiện trong `@/permission.js`, bạn có thể điều chỉnh hoặc thay đổi ở trong này - ví dụ nhét hàm `next()` vào chỗ nào bạn muốn `router` đi tiếp.

## Directives

**Bạn có thể đọc thêm về directives ở [đây](https://vuejs.org/v2/guide/custom-directive.html)**

Laravue cung cấp 2 directives [v-permission](https://github.com/tuandm/laravue/blob/master/resources/js/directive/permission) và [v-role](https://github.com/tuandm/laravue/blob/master/resources/js/directive/role) để giúp cho việc quản lý quyền và nhóm dễ dàng hơn.

**Hướng dẫn sử dụng**

```html
<template>
  <!-- Chỉ có người dùng có quyền 'manage user' hoặc 'list user' mới thấy được -->
  <el-tag v-permission="['manage user', 'list user']">Users</el-tag>

  <!-- Chỉ có người dùng có quyền 'view menu table' mới thấy được -->
  <el-tag v-permission="['view menu table']">Tables</el-tag>

  <!-- Chỉ có nhóm Admin mới có thể thấy được -->
  <el-tag v-role="['admin']">admin</el-tag>

  <!-- Chỉ có nhóm Editor mới có thể thấy được -->
  <el-tag v-role="['editor']">editor</el-tag>

  <!-- Nhóm Admin hoặc Editor có thể thấy được -->
  <el-tag v-role="['admin', 'editor']">Both admin or editor can see this</el-tag>
  <!-- Người dùng thuộc nhóm Admin VÀ có quyền 'manage user' mới có thể -->  
  <el-tag v-role="['admin']" v-permission="['manage user']">Manage users</el-tag>
</template>

<script>
// Of course you have to register them by importing directives
import permission from '@/directive/permission/index.js'
import role from '@/directive/role/index.js'
export default {
  directives: { permission, role }
}
</script>
```

**Lưu ý**

Khi sử dụng chung `v-role` và `v-permission` với nhau trong cùng 1 element, hệ thống sẽ dùng phương thức so sánh `AND`

::: tip Ví dụ
Bạn có thể xem thêm nhiều ví dụ [ở đây](https://laravue.dev/#/permission/directive)
:::

### Giới hạn

Trong 1 số trường hợp, `v-permission` và `v-role` không thích hợp để sử dụng, ví dụ ẩn/hiện các Tab component. Trong trường hợp này chúng ta sẽ kiểm tra trực tiếp với `v-if` như ví dụ sau:


```html
<template>
  <el-tab-pane v-if="checkPermission(['manage user'])" label="Manage user">User who has 'manage user' permission can see this</el-tab-pane>
  <el-tab-pane v-if="checkRole(['admin'])" label="Admin">Admin can see this</el-tab-pane>
  <el-tab-pane v-if="checkRole(['editor'])" label="Editor">Editor can see this</el-tab-pane>
  <el-tab-pane v-if="checkRole(['admin','editor'])" label="Admin-OR-Editor">Both admin or editor can see this</el-tab-pane>
</template>

<script>
import checkPermission from '@/utils/permission';
import checkRole from '@/utils/role';

export default{
  methods: {
    checkPermission, 
    checkRole,
  }
}
</script>
```

`checkPermission` và `checkRole` là 2 phương thức để kiểm tra quyền và nhóm - cách sử dụng giống như `v-permission` và `v-role`.

