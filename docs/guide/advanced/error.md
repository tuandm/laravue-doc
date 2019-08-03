# Error Handling

## Page

**404**

Page-level error handling is handled uniformly by the `vue-router`. All pages that do not match the configured routes will redirect to the `404` page.

```js
{ path: '*', redirect: '/404' }
```

::: warning

Please note that the `404` page must be loaded last. If you put `404` in the `constantRoutes` , then the next routes will be blocked to `404`. For more details please see [addRoutes when you've got a wildcard route for 404s does not work](https://github.com/vuejs/vue-router/issues/1176)
:::

**401**

Permission control is implemented in `@/permission.js`. All users who do not have permission to access this route will be redirected to the `401` page.

<br/>

## Request

All the requests in the project will go through the axios instance created in `@/utils/request.js`. [code](https://github.com/tuandm/laravue/blob/master/resources/js/utils/request.js)。

You can use the `service.interceptors.response`, the response interceptor, to perforrm handling error according to HTTP status codes. Such as:

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

Since all requests return a `promise`, you can also pass a `catch` error for each request, which allows for separate processing.

```js
getInfo()
  .then(res => {})
  .catch(err => {
    xxxx
  })
```

## Coding

This project also does code-level error handling. If you enable `eslint`, you will be prompted for errors when writing code. Such as:
![](https://cdn.laravue.dev/error.png)
