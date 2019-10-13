# Coding coventions

Khi tham gia vào các dự án lớn với nhiều lập trình viên, coding conventions (tạm dịch là quy ước viết mã) đóng một vai trò rất quan trọng, giúp mọi người tiết kiệm thời gian trong việc đọc hiểu code, trao đổi, tránh các lỗi do syntax, giảm thiểu các vấn đề về security và performance, và rất nhiều các lợi ích khác. Về mặt lập trình, coding conventions như một nấc thang giữa junior và các level ở trên (mid-level hay senior), cũng là một trong các tiêu chí quan trọng để đánh giá một người lập trình viên có thực sự nghiêm túc với chuyện "viết code" hay không. 

Laravue là sự kết hợp của PHP và JS/Vue. Nếu các bạn làm việc nhiều với 2 hệ thống ngôn ngữ này, các bạn sẽ thấy chuẩn mực viết code khá là khác nhau. Do đó chúng tôi giữ các tiêu chuẩn đó để "nhà nhà đều vui". Điều này sẽ gây khó khăn trong việc cấu hình trình soạn thảo dùng chung cho cả PHP và JS/Vue - chúng ta sẽ đề cập ở dưới.

Lưu ý: Coding conventions là các chuẩn mực được đề nghị bởi các cộng đồng có uy tín, không thật sự bắt buộc cho 1 tập thể riêng nào - do đó bạn có thể thay đổi tùy theo mô hình hay quy định của dự án hay công ty.

## IDE & Editor

IDE (Integrated Development Environment) và Editor đều có thể hiểu là trình soạn thảo, nhưng thực chất là nằm ở 2 level khác nhau. Editor nói chung là trình soạn thảo nhẹ cho phép chúng ta thao tác nhanh, cung cấp 1 số chức năng cơ bản để lập trình ví dụ như auto-completion (cho hàm mặc định 1 số ngôn ngữ thông dụng), syntax highlight... trong khi đó IDE sẽ cho bạn nhiều tính năng xịn hơn (ví dụ debugging), tích hợp các service của máy tính như web server, compiler... Lựa chọn IDE/Editor thích hợp sẽ giúp cho việc lập trình trở nên thú vị hơn và mang lại nhiều lợi ích cho phát triển dự án. Với Laravue, chúng tôi sử dụng

- [PHPStorm](https://www.jetbrains.com/phpstorm/) khi làm việc với PHP phía backend, và có thể chỉnh sửa trên các file frontend.
- [VSCode](https://code.visualstudio.com/) khi làm việc với Vue/JS và các tác vụ ở frontend, và có thể chỉnh sửa nho nhỏ trên backend.

## Javascript/Vue - ESLint
Ở Laravue, JS/Vue coding standard áp dụng theo [Airbnb JavaScript Style](https://github.com/airbnb/javascript) và [official VueJS Style](https://vuejs.org/v2/style-guide/).

### Settings

Các quy định về coding conventions được định nghĩa trong file [.eslintrc.js](https://github.com/tuandm/laravue/blob/master/.eslintrc.js).
Trên cơ bản, các rules eslint trong dự án này đều dựa theo [cấu hình đề nghị của eslint](https://eslint.org/docs/rules/) và [eslint-plugin-vue](https://eslint.vuejs.org/) với một số thay đổi nhỏ.

### Các quy định quan trọng

Các rules quan trọng mặc định được lấy từ `eslint:recommended` và `plugin:vue/recommended`. Bạn có thể tùy chỉnh các rules này tùy theo quy định của công ty bạn.

```js
// https://github.com/tuandm/laravue/blob/master/.eslintrc.js
module.exports = {
  extends: ['plugin:vue/recommended', 'eslint:recommended'],
  //You can change it to  extends: ['plugin:vue/essential', 'eslint:recommended']
}
```

Dưới đây là các quy định quan trọng dành cho file JS/Vue (trong thư mục `resources/js` - alias `@`).

#### Naming
- JS/CSS/SCSS files MUST be in kebab-case.
- Vue files MUST be in PascalCase, except `index.vue`
- Folders MUST be kebab-case, except global components inside `resources/js/components/`. Folders for global components MUST be in PascalCase
- Variables MUST be in camelCase

```
    'camelcase': [0, {
      'properties': 'always'
    }],
```

#### Indentation

Laravue sử dụng 2 khoảng trắng cho indentation (https://eslint.org/docs/rules/indent)
```
    'indent': [2, 2, {
      'SwitchCase': 1
    }],
```

#### Trailing comma
Trailing comma là bắt buộc (https://eslint.org/docs/rules/comma-dangle)
```
    'comma-dangle': ['error', 'always-multiline'],
```

#### Newline at EOL
Trailing newlines là bắt buộc (https://eslint.org/docs/rules/eol-last) - tức là 1 dòng cuối cùng ở mỗi file
```
    'eol-last': 2,
```

#### Strict equality operator (===)
`===` MUST be used instead of `==` (https://eslint.org/docs/rules/eqeqeq) - Luôn luôn dùng `===` để so sánh, không được dùng `==`

```
    'eqeqeq': ["error", "always", {"null": "ignore"}],
```

## Tắt ESLint

Nếu bạn không muốn sử dụng ESLint, chỉ cần tìm đến `LARAVUE_USE_ESLINT` trong file môi trường [.env](https://github.com/tuandm/laravue/blob/master/.env.example), đổi giá trị thành `false`

## Cấu hình ESLint với VSCode

![eslintGif.gif](https://wpimg.wallstcn.com/e94a76df-6dc0-4c15-9785-28b553a163e9.png)

<br />
Mỗi khi bạn lưu lại code đang chỉnh sửa, VSCode sẽ cố gắng hiển thị cảnh báo hay lỗi ở những chỗ không theo các quy định eslint, và VSCode sẽ cố gắng tự động sửa chữa một số lỗi cơ bản - ví dụ như thêm dấu `;`, chỉnh lại indentation, xóa khoảng trắng dư thừa... Để làm được điều này, chúng ta cần làm những bước sau:

Đầu tiên phải cài [eslint plugin](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)

![eslint.png](https://cdn.laravue.dev/eslint.png)

Sau đó vào `Code` > `Preferences` > `Settings` (JSON mode) và thêm vào những cấu hình sau:

```json
{
  "files.autoSave": "off",
  "eslint.validate": [
    "javascript",
    "javascriptreact",
    "vue-html",
    {
      "language": "vue",
      "autoFix": true
    }
  ],
  "eslint.run": "onSave",
  "eslint.autoFixOnSave": true
}
```

Bạn và team bạn cũng có thể tạo ra các quy chuẩn riêng cho mình để các thành viên cùng xài chung ở các dự án bằng cách upload rules của các bạn lên [NPM](npmjs.com). Ví dụ : ElementFE [config](https://www.npmjs.com/package/eslint-config-elemefe) hay Vue [config](https://github.com/vuejs/eslint-config-vue).

[Một số plugin và cấu hình đề nghị cho vscode](https://github.com/varHarrie/Dawn-Blossoms/issues/10)

## Auto fix

Lệnh dưới đây sẽ tìm tất cả các chỗ chưa theo đúng rules eslint và "cố gắng sửa chửa":
```bash
yarn run lint -- --fix
```

## PHP - PSR
Với PHP thì đơn giản hơn, Laravel sử dụng chuẩn [PSR](https://www.php-fig.org/psr/) - giống như [Laravel](https://laravel.com/docs/5.8/contributions#coding-style)