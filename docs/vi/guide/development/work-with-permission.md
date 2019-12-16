# Làm việc với hệ thống phân quyền
Laravue sử dụng [spatie/laravel-permission package](https://github.com/spatie/laravel-permission) để quản lý nhóm (roles) và phân quyền (permissions). Các bạn nên tìm hiểu cách thức package này hoạt động trước khi áp dụng nó vào laravue.
Trong tài liệu này, chúng ta sẽ học cách làm việc với phân quyền, làm sao để giới hạn truy cập vào 1 menu và cấp phát quyền cho users hay roles.

## Getting started

Trong hướng dẫn [làm việc với resource](work-with-resource.md), chúng ta đã biết cách tạo một chức năng quản lý đơn giản để quản lý một resource (ví dụ là category). Bây giờ chúng ta sẽ dùng nó để thực hành với hệ thống ACL (Access Control List - tạm dịch là danh sách quản lý quyền truy cập)

## Roles
Trong demo ở https://laravue.dev, Laravue cung cấp [5 nhóm người dùng](https://laravue.dev/#/administrator/roles), bạn có thể dùng [Database Seeding](https://laravel.com/docs/master/seeding) để thêm mới hay xóa 1 nhóm, hoặc can thiệp trực tiếp vào database (bảng `roles`) nếu bạn tự tin.
![](https://cdn.laravue.dev/roles.png)

:::warning
Để bảo đảm quyền cao nhất của hệ thống cho nhóm admin, laravue có các ràng buộc sau:
- Nhóm admin có toàn bộ quyền trong hệ thống, và không thể thay đổi.
- Người dùng trong nhóm admin không thể bị xóa hoặc chỉnh sửa thông tin.
:::

### Roles and users
Trong laravue, một user có thể thuộc nhiều role, và một role có thể có nhiều user - đây là quan hệ n-n.

:::tip
Với  `spatie/laravel-permission`, thực chất không có mối quan hệ giữa "User" và "Role". Thay vào đó, nó sẽ định nghĩa mối quan hệ giữa một "Model" bất kỳ với một "Role", khi này "User" đóng vai trò là một "Model" ("App\Laravue\Models\User"). Do vậy, nếu bạn thay đổi tên model (ví dụ App\Laravue\Models\User -> App\Laravue\Models\Account), bạn phải thay chạy lại DB migration/seeding để chỉnh sửa các reference trong hệ thống role/permission.
:::

```php
// Đưa user vào một role mới
$user->assignRole('editor');

// Xóa hết role của một user và đưa user vào một nhóm mới
$user->syncRoles(['admin', 'editor']);

// Đưa user ra khỏi một nhóm.
$user->removeRole('admin');
```

## Permissions

**Permissions được lưu trực tiếp vào trong database, và cần khai báo hoặc sử dụng trong source code, do đó permissions cần được tạo ra thông qua [Database Seeding](https://laravel.com/docs/master/seeding). Điều này có nghĩa Laravue không cung cấp các chức năng liên quan đến tạo permission trực tiếp trên UI. Permissions phải được tạo ra bởi developer và được cấp phát tới users/roles thông qua UI**

```php
// Create permission
Permission::findOrCreate('manage articles', 'api');
```
> `api` ở đây là `api middleware` - tiếp nhận và xử lý tất cả các API requests. Laravue là một SPA (Single Page Application), mọi request về phía server đều phải thông qua API. Nếu bạn muốn sử dụng các permissions cho middleware khác - ví dụ `web`, bạn có thể đổi giá trị này.

### Permissions - users - roles

Permissions có thể cấp cho một role hoặc 1 user nào đó.

:::tip
Quyền hạn của 1 user bao gồm:
- Các quyền từ các role mà user đó thuộc về.
- Các quyền riêng cấp trực tiếp cho user đó không thông qua nhóm.
:::

```php
$role->givePermissionTo(['edit articles', 'edit users', 'manage permssions']);
$user->givePermissionTo(['manage articles', 'delete users']);
```

## Work with permissions

Bạn nên tìm hiểu về [cách làm việc với resource](work-with-resource.md) trước khi bắt đầu phần này.

Giả sử chúng ta đã có chức năng quản lý category đơn giản, chúng ta sẽ tạo 2 permission là `view category` và `manage category`

- `view category` cho phép users xem thông tin catetory - bao gồm sidebar menu và list các category.
- `manage category` cho phép users quản lý thông tin category ví dụ tạo mới/chỉnh sửa/xóa 1 category.

*Bạn có thể định nghĩa các permission phức tạp hơn nếu bạn muốn - ví dụ "delete category" hay "add user", v.v...*

### Create permissions
Để tạo permissions, bạn có thể thêm trực tiếp vào database (bảng `permissions`), hoặc dùng Database Seeding như ví dụ sau:
Tạo seeder:
```
php artisan make:seeder CategoryPermission
```
Sau đó mở file `database/seeds/CategoryPermission.php` và thay đổi method `run()` như sau:
```php
public function run()
{
    \App\Laravue\Models\Permission::findOrCreate('view category', 'api');
    \App\Laravue\Models\Permission::findOrCreate('manage category', 'api');

    // Assign new permissions to admin group
    $adminRole = App\Laravue\Models\Role::findByName(App\Laravue\Acl::ROLE_ADMIN);
    $adminRole->givePermissionTo(['view category', 'manage category']);
}
```

:::tip note
1. Để dễ quản lý code, tất cả các permissions nên được định nghĩa bằng class constants và để ở một chỗ, ví dụ: [app/Laravue/Acl.php](https://github.com/tuandm/laravue/blob/master/app/Laravue/Acl.php).
2. Trong Lararue, admin group có tất cả quyền nhưng điều này không được làm tự động, bạn phải cấp quyền cho admin group ngay khi tạo permissions.
:::

Sau đó bạn chạy seeder vừa tạo bằng lệnh `php artisan db:seed --class=CategoryPermission`.

*Đôi khi bạn sẽ cần phải chạy "composer dump-autoload" để hệ thống tạo lại classmap*

Chúng ta sẽ kiểm tra lại bằng cách mở ứng dụng Laravue, đăng nhập, vào Menu -> Administrator -> Role Permission và click vào nút `Edit Permission` bất kỳ để thấy tất cả các permissions của hệ thống:

![](https://cdn.laravue.dev/new-permissions.png)

:::tip note
Trong màn hình `Edit Permissions`, có 2 cột hiển thị `Menus` và `Permissions`.
- `Menus` hiện thị tất cả các quyền bắt đầu bằng `view menu`, ví dụ `view menu table`, `view menu permission`,... những quyền này cho phép user hiện tại có được phép nhìn thấy menu tương ứng hay không.
- `Permissions` hiển thị các quyền hạn khác, ví dụ `manage user`, `manage article`...
:::

### Permissions and API Resources

Đến đây chúng ta đã tạo ra được các permissions. Tiếp theo chúng ta sẽ giới hạn quyền cho các API requests tới category resource với permisions được tạo ở trên.
- List category API: chỉ có users có quyền `view category` và `manage category` mới được request
- Add/Edit/Delete category: Chỉ có users có quyền `manage category` mới được request.

Để làm được điều này, chúng ta sẽ thay đổi file `routes/api.php` và thêm các dòng sau:

```php
# File: routes/api.php
// Tất cả API requests đến categories đều phải cần quyền "manage category"
Route::apiResource('categories', 'CategoryController')->middleware('permission:manage category');
// API để lấy dánh sách category sẽ phải cần quyền "view category" hoặc "manage category"
Route::get('categories', 'CategoryController@index')->name('categories.index')->middleware('permission:view category|manage category');

```

Vậy là permissions cho API đã được thiết lập, bạn có thể chạy `php artisan route:list` để kiểm tra lại
```
+-----------+------------------------------+---------------------+-------------------------------------------------------+----------------------------------------------+
| Method    | URI                          | Name                | Action                                                | Middleware                                   |
+-----------+------------------------------+---------------------+-------------------------------------------------------+----------------------------------------------+
| POST      | api/categories               | categories.store    | App\Http\Controllers\CategoryController@store         | api,permission:manage category               |
| GET|HEAD  | api/categories               | categories.index    | App\Http\Controllers\CategoryController@index         | api,permission:view category|manage category |
| DELETE    | api/categories/{category}    | categories.destroy  | App\Http\Controllers\CategoryController@destroy       | api,permission:manage category               |
| PUT|PATCH | api/categories/{category}    | categories.update   | App\Http\Controllers\CategoryController@update        | api,permission:manage category               |
| GET|HEAD  | api/categories/{category}    | categories.show     | App\Http\Controllers\CategoryController@show          | api,permission:manage category               |
```

Từ thời điểm này, API requests cho category sẽ được kiểm soát bởi ACL, các requests không được chấp nhận sẽ trả về HTTP code 403.

Bước tiếp theo chúng ta sẽ giới hạn permissions cho frontend (phần view), nôm na là nếu bạn không có quyền, bạn sẽ không thấy view component tương ứng.

### Frontend
Ở frontend, chúng ta sẽ kiểm tra quyền của user để hiển thị UI elements tương ứng - Ví dụ user có quyền "manage category", chúng ta sẽ hiển thị nút "Add".

#### Sidebar
Logic ở sidebar khá là đơn giản, chúng ta chỉ cần hiển thị Category menu nếu user có quyền "view category" hoặc "manage category". Chúng ta sẽ chỉnh sửa file `resources/js/router/modules/admin.js` như sau:

```vue
# File: resources/js/router/modules/admin.js
  {
    path: 'categories',
    component: () => import('@/views/categories/List'),
    name: 'CategoryList',
    meta: { title: 'categoryList', icon: 'list', permissions: ['view category', 'manage category'] },
  },
```

#### Các buttons
Theo logic ở trên, Add/Edit/Delete buttons chỉ được hiển thị khi và chỉ khi user có quyền "manage category". Chúng ta sẽ dùng directive `v-permission` cho `<el-button>`:

:::tip note
Bạn có thể xem thêm về cách sử dụng directives `v-permission` hay `v-role` ở [hướng dẫn về permissions](../essentials/permission.md).
:::

```vue
# File: resources/js/views/categories/List.vue
<template>
  <div class="app-container">
    <div class="filter-container">
      <el-button v-permission="['manage category']" class="filter-item" type="primary" icon="el-icon-plus" @click="handleCreateForm">
        {{ $t('table.add') }}
      </el-button>
    </div>
    <el-table v-loading="loading" :data="list" border fit highlight-current-row>
      ...
      <el-table-column align="center" label="Actions" width="350">
        <template slot-scope="scope">
          <el-button v-permission="['manage category']" type="primary" size="small" icon="el-icon-edit" @click="handleEditForm(scope.row.id);">
            Edit
          </el-button>
          <el-button v-permission="['manage category']" type="danger" size="small" icon="el-icon-delete" @click="handleDelete(scope.row.id, scope.row.name);">
            Delete
          </el-button>
        </template>
      </el-table-column>      
	</el-table>    
    ...
  </div>
<script>
...
import permission from '@/directive/permission'; // Import permission directive

export {
  name: 'CategoryList',
  directives: { permission }, // use permission directive
}
```

Vậy là permissions đã được thiết lập cho cả API và frontend. Giờ chúng ta có thể kiểm tra bằng cách cấp quyền cho một user nào từ Menu -> Administrator -> Role Permission -> Edit Permission or Menu -> Administrator -> Users -> Edit Permission, xong rồi đăng nhập bằng user đó để xem kết quả.

Bạn có thể chỉnh sửa code để ẩn cột "Action" nếu user không có permission `view category` và `manage category`. Trong trường hợp này, chúng ta cũng nên ẩn `<el-dialog>` cho category form.

## Lưu ý
1. Laravue sử dụng package [spatie/laravel-permission](https://github.com/spatie/laravel-permission) nguyên bản không thêm bất kỳ thay đổi nào, vui lòng kiểm tra document từ tác giả để hiểu thêm cách thức package này hoạt động.
2. Khi làm việc với SPA, luôn luôn phải kiểm tra permissions ở cả frontend và backend (api route, controller,...).
3. Admin không được cấp quyền tự động, bạn phải tự làm điều đó.
4. Toàn bộ code ví dụ cho bài hướng dẫn này có thể tìm thấy ở: [How to work with permission](https://github.com/tuandm/laravue/commit/166ed0804c17d9c229abc397d952c3f952cb6789)
