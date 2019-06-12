# Roles and Permissions

Roles and permission have been introduced in this article [Laravue part 2 - Permissions and Roles](https://dev.to/tuandm/laravue-part-2-acl-authentication-permissions-and-roles-49fe-temp-slug-7192660?preview=9ab5016c9f635b4d2fbf501b9aa55fc4b932c74e05d0d2a31a377384dc536c4b90754b534601c6ccb1cc23aa281b279073040c1eb2a2004b96760f04).

## Introduction
Laravue's permissions system is based on [spatie/laravel-permission](https://github.com/spatie/laravel-permission). As the design, a user can belong to many roles. However, in the scope of demo project, Laravue allows creating user with only one role. You can custom source code to support multi-roles.

![Creating user with only one role can be assigned](https://cp5.sgp1.cdn.digitaloceanspaces.com/zoro/laravue-cdn/add-user.png)

## How it works
After logged-in, server returns all the permissions of authenticated user, then generates the routing table accessible by them, and dynamically mount it to `router` through `router.addRoutes`. 
User's permissions contain the permissons of user's role and extra permissions assigning to that user.

::: tip permission in UserResource
[app/Http/Resources/UserResource.php](https://github.com/tuandm/laravue/blob/master/app/Http/Resources/UserResource.php)
:::

## Logical modification

The control code of the routing level right now is in `@/permission.js`. If you want to change the logic, you can release the hook `next()` directly in the appropriate judgment logic.

## Directives
Laravue provides [v-permission](https://github.com/tuandm/laravue/blob/master/resources/js/directive/permission) and [v-role](https://github.com/tuandm/laravue/blob/master/resources/js/directive/role) directives to easily and quickly work with roles and permissions.

**How to use**

```html
<template>
  <!-- Only user who has 'manage user' or 'list user' permission can see it -->
  <el-tag v-permission="['manage user', 'list user']">Users</el-tag>

  <!-- Only user who has 'view menu table' permission can see it -->
  <el-tag v-permission="['view menu table']">Tables</el-tag>

  <!-- Admin can see this -->
  <el-tag v-role="['admin']">admin</el-tag>

  <!-- Editor can see this -->
  <el-tag v-role="['editor']">editor</el-tag>

  <!-- Editor can see this -->
  <el-tag v-role="['admin', 'editor']">Both admin or editor can see this</el-tag>
  <!-- Admin has permission 'manage user' can see this -->  
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

**Note**

When using `v-role` and `v-permission` together, it will use AND operation.

::: tip Examples
You can find more examples [here](https://laravue.dev/#/permission/directive)
:::

### Limitation

In some cases it is not suitable to use `v-permission` or `v-role`, for instance the element Tab component which can only be achieved by manually setting the v-if.

You can use the global permission/role checking methods. The usage is similar to the instruction `v-permission`/`v-role`.

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
