# Work with API
Working with API in Laravue is very easy. Laravue uses RESTful API with [Laravel API Resources](https://laravel.com/docs/5.8/eloquent-resources) in backend and simple [RESTful Request](https://github.com/tuandm/laravue/blob/master/resources/js/api/resource.js) in frontend. 
## Front-end request flow

A complete front-end UI interacts to the server-side processing flow as follows:

1.  UI component interaction
2.  Call RESTful api requests via resource.js or inheritances
3.  Send requests using encapsulated request.js
4.  Get server return from Laravel resource
5.  Process response and update data

As you can see from the above flow, in order to facilitate management and maintenance, unified request processing is placed in the `@/api` folder and the files are generally split according to the model/resource object name, such as:

```
api/
  order.js
  role.js
  user.js
  ...
```

## request.js

`@/utils/request.js` is based on the [axios](https://github.com/axios/axios), to facilitate the uniform handling of POST, GET and other request parameters, request headers, and error messages. Please see [@/utils/request.js](https://github.com/tuandm/laravue/blob/master/resources/js/utils/request.js) for more details.

It encapsulates the global `request interceptor`, `response interceptor`,`unified error handling`, `unified timeout, baseURL settings, etc.`

## resource.js and Route::apiResource()

`@/api/resource.js` is a simple class to perform basic RESTful API requests such as get/list/store/update/destroy.
```js
  list(query) {...}
  get(id) {...}
  store(resource) {...}
  update(id, resource) {...}
  destroy(id) {...}
````

In `/routes/api.php`, when we define API routes for one resource with `Router::apiResource()`, it will create basic routes based on RESTful standard. Here is the routing table of permission routes
```php
// File /routes/api.php
Route::apiResource('permissions', 'PermissionController')
```

Double check generated routes with predefined [Resource Controller](https://laravel.com/docs/master/controllers#resource-controllers) named PermissionController which was generated with command `php artisan make:controller PermissionController --resource`
```
$php artisan route:list
...
+-----------+------------------------------+---------------------+-------------------------------------------------------+
| Method    | URI                          | Name                | Action                                                |
+-----------+------------------------------+---------------------+-------------------------------------------------------+
...
| POST      | api/permissions              | permissions.store   | App\Http\Controllers\PermissionController@store       |
| GET|HEAD  | api/permissions              | permissions.index   | App\Http\Controllers\PermissionController@index       |
| DELETE    | api/permissions/{permission} | permissions.destroy | App\Http\Controllers\PermissionController@destroy     |
| PUT|PATCH | api/permissions/{permission} | permissions.update  | App\Http\Controllers\PermissionController@update      |
| GET|HEAD  | api/permissions/{permission} | permissions.show    | App\Http\Controllers\PermissionController@show        |
...
```
You can see the APIs which `@api/resource.js` provides are mapped to Laravel's API resource routes correspondingly. For example, if we use `list` API, it will call to `permission.index` route, or if we update object with `update(id resource)` api, it will call to `permission.update` route.

Example: [Laravel permision resource controller](https://github.com/tuandm/laravue/blob/master/app/Http/Controllers/PermissionController.php)
