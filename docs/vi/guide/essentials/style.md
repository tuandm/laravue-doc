# Style

## CSS Modules

Khi làm việc với css style, thường có 2 vấn đề chính:

- Global pollution - gọi nôm na là đụng độ selector. Selector trong các file CSS là biến toàn cục, nếu bạn dùng chung selector ở các file khác nhau, khi compile các selector này sẽ ghi đè lên nhau.
- Selector complex - gọi nôm na là selector phức tạp. Vấn đề này khá dễ hiểu, đại loại là selector nhiều tầng nhiều lớp. Thực chất lý do phát sinh vấn đề này là khi chúng ta giải quyết vấn đề đụng độ selector bằng cách chia lớp hay giới hạn các components theo tên gọi hay tiền tố, điều này giúp cho các members trong team dễ thêm bớt css class ứng với components của mình đang làm, vô hình dung làm css class càng lúc càng dài và cuối cùng là khó quản lý.

May mắn là Vue cung cấp cho chúng ta khái niệm [scoped](https://vue-loader.vuejs.org/guide/scoped-css.html#mixing-local-and-global-styles) để giải quyết vấn đề trên. Giống như tên gọi, Vue thêm khái niệm `scoped` vào css.

```css
/* Compile before */
.example {
  color: red;
}

/* Compile after */
.example[_v-f3f3eg9] {
  color: red;
}
```

Nếu bạn sử dụng `<style scoped>` ở vue component, css chỉ có tác dụng với component đó。Bạn có thể xem thêm tài liệu về [vue-loader](https://vue-loader.vuejs.org/guide/scoped-css.html#mixing-local-and-global-styles)

::: tip
Với scoped, styles của component cha sẽ không ảnh hưởng đến các components con trừ root node. Root node của component con sẽ nhận style scoped của cả component cha và của chính nó. Thiết kế này giúp component cha có thể tác động đến style của root note  component con cho mục đích tổ chức layout.
:::

<br/>

## Tổ chức style trong dự án

Các style toàn cục được khai báo trong thư mục `/resources/js/styles`.

```bash
├── styles
│   ├── btn.scss                 # button css
│   ├── element-ui.scss          # global custom element-ui style
│   ├── element-variables.scss   # global variables for customizing element-ui style
│   ├── index.scss               # global common style - to sync with vendor (vue-element-admin project)
│   ├── laravue.scss             # custom common style will be put here
│   ├── mixin.scss               # global sass mixin
│   ├── sidebar.scss             # sidebar css
│   ├── transition.scss          # vue transition animation
│   └── variables.scss           # global variables
```

Tương tự cách thức làm việc của Vue components, styles toàn cục được viết trong `/resources/js/styles` và mỗi page sẽ tự định nghĩa style riêng của mình trong file `.vue`.

```css
<style>
/* global styles */
</style>

<style scoped>
/* local styles */
</style>
```

## Custom element-ui style

Bây giờ chúng ta sẽ nói về việc thay đổi style của thư viện `element-ui`. Vì `element-ui` style được import toàn cục, nên bạn không thể thay đổi nó bằng `scoped` trong các trang con, nhưng bạn có thể ghi đè style của element bằng cách thêm 1 css class vào component cha, rồi dùng namespace để giải quyết..

```css
.article-page {
  /* you namespace*/
  .el-tag {
    /* element-ui element tag*/
    margin-right: 0px;
  }
}
```

**Bạn có thể sử dụng deep selectors.**

## Deep Selectors

**Component cha thay đổi style của component con.**

Nếu bạn muốn 1 selector trong `scoped` style là "deep", ví dụ ảnh hưởng components con, bạn có thể dùng `>>>`:

```css
<style scoped>
.a >>> .b { /* ... */ }
</style>
```
Sẽ được compile thành

```css
.a[data-v-f3f3eg9] .b {
  /* ... */
}
```

Một vài pre-processors, ví dụ SASS, có thể không parse `>>>` chính xác, bạn có thể dùng `/deep/` để thay thế

```css
.xxx-container >>> .el-button{
  xxxx
}
```

[Tài liệu chính chủ](https://vue-loader.vuejs.org/en/features/scoped-css.html)

## Postcss

Tiếp theo sẽ là cấu hình của `postcss`. Sau khi phiên bản mới của [vue-cli webpack template](https://github.com/vuejs-templates/webpack) ra đời, nó sử dụng file `.postcssrc.js` trong thư mục root. Mặc định `vue-loader` sẽ đọc thông số cấu hình của postcss từ file này. Vì vậy chúng ta có thể cấu hình postcss trực tiếp ở đây. Thông số tương tự [postcss](https://github.com/postcss/postcss).

```javascript
//.postcssrc.js
module.exports = {
  "plugins": {
    // to edit target browsers: use "browserslist" field in package.json
    "autoprefixer": {}
  }
}
//package.json
"browserslist": [
    "> 1%",
    "last 2 versions",
    "not ie <= 8"
  ]
```

Với cấu hình ở trên, autoprefixer sẽ đọc các thông số của browserslist trong file package.json.

- `> 1%` Tương thích với tất cả browers mà có thị phần sử dụng > 1%
- `last 2 versions` Tương thích với 2 phiên bản mới nhất trên mỗi loại browser
- `not ie <= 8` Không chơi với ie8 và ie cũ hơn

Thông tin chi tiết ở [browserslist](https://github.com/ai/browserslist)

`postcss` có rất nhiều tính năng, bạn có thể [khám phá thêm](https://www.postcss.parts/)

## Mixin

Mixin không được import tự động, bạn phải tự làm lấy trong file vue/js.

```scss
<style rel="stylesheet/scss" lang="scss">
  @import "src/styles/mixin.scss";
</style>
```

Nếu bạn muốn tự động hóa công đoạn này, bạn có thể dùng [sass-resources-loader](https://github.com/shakacode/sass-resources-loader).
