# Làm việc với thư viện khác

Với `laravue`, chúng tôi mong muốn cung cấp các thư viện cần thiết cho một hệ thống quản trị tiêu chuẩn, nhưng đôi khi (và thường xuyên) trong quá trình phát triển ứng dụng, việc thêm các thư viện hữu ích khác là điều cần thiết.

Trong ví dụ sau đây, chúng ta sẽ thử import thư viện [vue-count-to](https://github.com/PanJiaChen/vue-countTo), 1 ứng dụng nhỏ nhỏ để "đếm" tới một số nào đó.

## Cài đặt thư viện

Để cài đặt 1 thư viện frontend (Vue/JS/CSS...) vào Laravue, bạn sử dụng command sau:

```bash
$ npm install vue-count-to --save-dev
```

> `--save-dev` sẽ khai báo thư viện trên vào devDependencies trong file package.json.

<br/>

## Cách dùng
Tùy vào hướng dẫn của thư viện các bạn muốn sử dụng để đưa vào `laravue`, trong bài viết này chúng tôi sẽ lấy `vue-count-to` làm ví dụ.

### Khai báo component toàn cục (global scope)

**app.js**

```js
import countTo from 'vue-count-to'
Vue.component('countTo', countTo)
```

```html
<template>
  <countTo :startVal='startVal' :endVal='endVal' :duration='3000'></countTo>
</template>
```

### Khai báo component cục bộ (local scope)

```html
<template>
  <countTo :startVal='startVal' :endVal='endVal' :duration='3000'></countTo>
</template>

<script>
import countTo from 'vue-count-to';
export default {
  components: { countTo },
  data () {
    return {
      startVal: 0,
      endVal: 2017
    }
  }
}
</script>
```

![](https://wpimg.wallstcn.com/8b95fac0-6691-4ad6-ba6c-e5d84527da06.gif)

<br/>

## Sử dụng thư viện Javascript với VueJS
Sử dụng thư viện Javascript với VueJS khá là dễ dàng, bạn có thể xem thêm ở bài viết này: https://vuejsdevelopers.com/2017/04/22/vue-js-libraries-plugins/
