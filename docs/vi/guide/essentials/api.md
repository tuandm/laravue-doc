# Hướng dẫn về API

Làm việc với API trong Laravue khá là dễ dàng. Laravue sử dụng [Laravel API Resources](https://laravel.com/docs/6.x/eloquent-resources) để tạo RESTful API phía backend và [RESTful Request](https://github.com/tuandm/laravue/blob/master/resources/js/api/resource.js) đơn giản phía frontend. 

## Luồng thực hiện API từ phía frontend

Trong một dự án SPA (Single Page Application), API thường được tương tác từ phía frontend lên backend như sau:
1. Phát sinh thao tác ở UI component nào đó (click chuột lên button hay menu)
2. UI component gọi RESTful APIs từ thư viện resource.js hoặc các lớp kế thừa (ví dụ role.js)
3. resource.js sẽ gởi API lên backend sử dụng thư viện đóng gói [request.js](https://github.com/tuandm/laravue/blob/master/resources/js/utils/request.js)
4. Kết quả được trả về từ Laravel API resources
5. Xử lý két quả và cập nhật dữ liệu (thay đổi UI hay thực hiện tác vụ liên quan)

Với luồng xử lý như vậy, để dễ quản lý và bảo trì code, tất cả các phần xử lý liên quan đến API request được đặt ở thư mục `@/api` và được đặt tên tương ứng theo đối tượng mà (resource) mà API làm việc. Ví dụ:

```
api/
  order.js
  role.js
  user.js
  ...
```

## request.js

`@/utils/request.js` sử dụng [axios](https://github.com/axios/axios) để giúp cho việc gởi HTTP requests kèm theo các thông số (parameters) được thuận tiện và dễ dàng, hỗ trợ tốt phần tùy biến request headers, và xử lý lỗi. Bạn có thể xem thêm ở [@/utils/request.js](https://github.com/tuandm/laravue/blob/master/resources/js/utils/request.js).

Trong file `@/request.js`, các thông số `request interceptor`, `response interceptor`,`unified error handling`, `unified timeout, baseURL settings, v.v...` của `axios` được đóng gói lại dể dễ dàng quản lý. Bạn có thể thay đổi các thông số này tùy theo nhu cầu của bạn (ví dụ hiển thị thông báo lỗi ứng với các http error code).

## resource.js and Route::apiResource()

Như giới thiệu ở trên, `laravue` sử dụng RESTful API requests theo đúng chuẩn thiết kế của Laravel API resources với `Route::apiResource()`, đồng thời `@/api/resource.js` là một class đơn giản để thực hiện các API cơ bản như là get/list/store/update/destroy. 

```js
  list(query) {...}
  get(id) {...}
  store(resource) {...}
  update(id, resource) {...}
  destroy(id) {...}
````

Thiết kế này giúp chúng ta liên kết frontend-backend theo 1 "cặp đôi" - 1 file js ở frontend extend từ `@/api/resource.js` và 1 API Resource Controller ở phía backend. Cụ thể ở trong `/routes/api.php`, chúng ta sẽ định nghĩa các API routes cần thiết cho 1 resource nào đó với `Router::apiResource()` để tạo ra các routes cơ bản theo đúng chuẩn RESTful. Ví dụ để tạo API routes cho permission resource:
```php
// File /routes/api.php
Route::apiResource('permissions', 'PermissionController')
```

Và kiểm tra lại các routes được tạo ra (dĩ nhiên `laravue` đã tạo sẵn 1 [Resource Controller](https://laravel.com/docs/master/controllers#resource-controllers) có tên là PermissionController với lệnh `php artisan make:controller PermissionController --resource`)
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
Bạn có thể thấy file `@api/resource.js` có sẵn các methods tương ứng với các routes trên. Ví dụ nếu chúng ta xài `list` method, nó sẽ gởi api trực tiếp đến `permission.index` route, hoặc chúng ta có thể update 1 object với method `update(id resource)`, nó sẽ gởi `id resource` lên route `permission.update` và Laravel sẽ map nó vào Resource object có id tương ứng. Rất thuận tiện.

Ví dụ cụ thể: [Laravel permision resource controller](https://github.com/tuandm/laravue/blob/master/app/Http/Controllers/PermissionController.php)
