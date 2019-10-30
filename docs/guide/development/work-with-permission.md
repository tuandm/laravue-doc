# Work with permission

Laravue uses [spatie/laravel-permission package](https://github.com/spatie/laravel-permission) to manage roles and permissions. It's recommended to understand how this package works before starting working with Laravue.
In this guide, we will learn how to work with permission in `Laravue`, how to create "menu" permission and how to assign it to roles/users.

## Getting started

In [How to work with resource document](work-with-resource.md), we already know how to create a simple management feature to manage a resource (category), now we will use it to practice with ACL system.

## Roles
Laravue provides [5 roles](https://laravue.dev/#/administrator/roles), you can add more if you want using [Database Seeding](https://laravel.com/docs/master/seeding) or creating directly on database (`roles` table).
![](https://cdn.laravue.dev/roles.png)

:::warning
- Admin role has full permissions on the system and its permissions should not be allowed to edit.
- Admin users should not be removeable or editable (for both user info and permissions)
:::

### Roles and users
In Laravue, one user can belong to many roles, and one role can have multiple users.

:::tip
With `spatie/laravel-permission`, there is no actual relationship between "User" and "Role". It defines the relationship between "Model" and "Role" instead, and "User" will be seen as "App\Laravue\Models\User". Therefore, if you change the model/table name (ex: App\Laravue\Models\User -> App\Laravue\Models\Account), you have to run db migration/seeding to update role/permission system.
:::

```php
// Assign new role to a user
$user->assignRole('editor');

// Remove all old roles and assign new ones to a user
$user->syncRoles(['admin', 'editor']);

// Remove role from a user
$user->removeRole('admin');
```

## Permisions

**Permissions are stored in database and need source code to be affected, so they should be created via [Database Seeding](https://laravel.com/docs/master/seeding).**

```php
// Create permission
Permission::findOrCreate('manage articles', 'api');
```
> `api` means `api middleware` which handles all API requests. Since Laravue is a SPA (Single Page Application), we just handle api requests. If you want to create permissions for other middlewares like `web`, just change this value.

### Permissions - users - roles

Permissions can be assigned to a role or a specific user. 
:::tip
User's permissions are
- All permissions of all user's roles
- All extra permissions which are assigned directly to that user.
:::

```php
$role->givePermissionTo(['edit articles', 'edit users', 'manage permssions']);
$user->givePermissionTo(['manage articles', 'delete users']);
```

## Work with permissions

To get started with this section, you should know [how to work with resource](work-with-resource.md). Given we already have simple category management, now we will create `view category` and `manage category` permissions

- `view category` allows users to view categories, includes sidebar and category list.
- `manage category` allows users managing categories such as create/edit/delete category

*You can define more complex logic/permission if you want.*

### Create permissions
To create permissions, you can insert directly into database (`permissions` table), or simply use Database Seeding. Run this command to create new seeder:
```
php artisan make:seeder CategoryPermission
```
Then open `database/seeds/CategoryPermission.php` and change `run()` method as below:
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
1. To make the code manageable, it is recommended to define all permissions in one place (Example: [app/Laravue/Acl.php](https://github.com/tuandm/laravue/blob/master/app/Laravue/Acl.php)).
2. In Laravue, admin group has all permissions but this job is not automatic, you have to assign new permissions to admin group.
:::

Then run `php artisan db:seed --class=CategoryPermission` to execute that seeder.

*You may need to regenerate Composer's autoloader using the dump-autoload command*

We will double check by open Laravue application, go to Menu -> Administrator -> Role Permission, click to any `Edit Permission` button to see all permissions:

![](https://cdn.laravue.dev/new-permissions.png)

:::tip note
In `Edit Permissions` popup, there are 2 columns that list `Menus` and `Permissions`.
- `Menus` shows all permissions that start with `view menu`, such as `view menu table`, `view menu permission`,...
- `Permissions` shows others, such as `manage user`, `manage article`...
:::

### Permissions and API Resources
Now we will restrict API calls to category resource with new permissions. 
- List category: users who have `view category` and `manage category` permissions
- Add/Edit/Delete category: Only user who has `manage category` permission

To do so, we will change `routes/api.php` and add these lines:

```php
# File: routes/api.php
// All api requests to categories need "manage category" permission
Route::apiResource('categories', 'CategoryController')->middleware('permission:manage category');
// Listing category will require "view category" and "manage category"
Route::get('categories', 'CategoryController@index')->name('categories.index')->middleware('permission:view category|manage category');

```

Ok, permission is setup. You can run `php artisan route:list` to double check.
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

From now, API requests for category will be under permission check, non-authorized requests will return 403.

Next steps, we will bind permissions to frontend.

### Frontend
In frontend, we will check allowed permissions to show/hide relative elements - such as "Add" button for "manage category".

#### Sidebar
All we need is to show Category menu in sidebar if user has "view category" or "manage category" permisison. We will edit `resources/js/router/modules/admin.js` as below:

```vue
# File: resources/js/router/modules/admin.js
  {
    path: 'categories',
    component: () => import('@/views/categories/List'),
    name: 'CategoryList',
    meta: { title: 'categoryList', icon: 'list', permissions: ['view category', 'manage category'] },
  },
```

#### Buttons
Add/Edit/Delete buttons need to be hidden if user doesn't have "manage category" permission. We will add `v-permission` directive into `<el-button>`:

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

Done, now we can test with admin user non-admin user after assigning permission (via Menu -> Administrator -> Role Permission -> Edit Permission or Menu -> Administrator -> Users -> Edit Permission)

You can add code to hide "Action" column if user doesn't have both `view category` and `manage category` permissions. The `<el-dialog>` for category form should be hidden too.

## Notes
1. Laravue uses [spatie/laravel-permission](https://github.com/spatie/laravel-permission) without any modification, please check the vendor's documentation for more details
2. Please keep in mind that we need to check permissions on both frontend and backend (api route).
3. Admin group will not be assigned new permissions automatically, you have to do it.
4. You can check sample code here: [How to work with permission](https://github.com/tuandm/laravue/commit/166ed0804c17d9c229abc397d952c3f952cb6789)
