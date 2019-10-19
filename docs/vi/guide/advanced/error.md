# Error Handling

## Page

**404**

Xử lý lỗi ở page-level được thực hiện bởi `vue-router`. Tất cả các page không đáp ứng được các routes khai báo sẽ tự động chuyển về trong lỗi 404.

```js
{ path: '*', redirect: '/404' }
```

::: warning

Lưu ý là trang `404` phải được khai báo cuối cùng trong `constantRoutes`, để cho các routes trước đó sẽ được "chặn" bởi trang `404`. Bạn có thể xem thảo luận chi tiết về vấn dề này tại thread [addRoutes when you've got a wildcard route for 404s does not work](https://github.com/vuejs/vue-router/issues/1176)
:::

**401**

Quản lý quyền truy cập được hiện thực tại `@/permission.js`. Người dùng không có quyền truy cập vào route hiện tại sẽ được chuyển đến trang `401`.

## Request

Tất cả request trong hệ thống Laravue sẽ được gọi thông qua instance của axios - được tạo trong `@/utils/request.js`. [code](https://github.com/tuandm/laravue/blob/master/resources/js/utils/request.js)。

Bạn có thể tùy biến `service.interceptors.response` để handle lỗi phụ thuộc vào HTTP status code hoặc code tùy biến mà bạn đã implement phía backend. Ví dụ:

```js
service.interceptors.response.use(
  ...
  error => {
    let statusCode = error.response.status;
    if (statusCode === 401) {
      // Process your 401-error handler here, 
    }
    if (statusCode === 403) {
      // Process your 403-error handler here, 
    }
    ...
    return Promise.reject(error);
  },
);

```

Tất cả requests đều trả về 1 `promise`, bạn cũng có thể `cache` error cho mỗi request để xử lý lỗi riêng biệt cho request đó.

```js
getInfo()
  .then(res => {})
  .catch(err => {
    xxxx
  })
```

## Coding

Ngoài ra, với các lỗi ở code-level (trong quá trình code), nếu bạn enable `eslint`, bạn sẽ được thông báo khi eslint tìm thấy lỗi trong quá trình code:
![](https://cdn.laravue.dev/error.png)
