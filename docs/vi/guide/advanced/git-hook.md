# Git Hooks
Lập trình viên có kinh nghiệm (senior level) thường sẽ giữ các tiêu chuẩn trong quá trình code, nhưng điều này tương đối khó khăn đối với các lập trình viên mới vào nghề. Do vậy Code Linting (Lint) rất quan trong để bảo đảm sự thống nhất trong các tiêu chuẩn về code.

Vậy sử dụng Lint có lợi ích gì?
- Giảm lỗi: Lint sẽ kiểm tra và "dự đoán" 1 số lỗi có thể xảy ra.
- Phát hiện các lỗi đơn giản như syntax hay các lỗi thấy được liền (ví dụ undefined hay type mismatched...)
- Nâng cao chất lượng code
- Readability and consistency: Tính dễ đọc và đồng nhất.

Trước đây, `lint` được tích hợp trong CI (Continuous Integration):

> Push Code --> Run CI find problem(remote) --> Fix in local --> Push Again --> Pass CI(remote)

Nhưng điều này không thực sự hợp lý khi mà `CI` không chỉ đơn giản là chạy `lint` mà còn chạy nhiều tác vụ khác và tốn thời gian. Vì vậy `lint` nên được thực thi chỗ khác để giảm tải cho CI.

Bằng cách sử dụng *git hooks* để chạy `link` trước khi push code, chúng ta có thể tiết kiệm thời gian cho CI. Có một vài công cụ khá tiện dụng để làm điều này, ví dụ [husky](https://github.com/typicode/husky) hay [pre-commit](https://github.com/observing/pre-commit). Ở Laravue, chúng tôi sử dụng `husky`.

## husky

Cài đặt husky bằng lệnh sau: 
```bash
yarn install husky -D -S
```

Sau đó thêm đoạn code vào file package.json:

```json
{
  "scripts": {
    "precommit": "eslint resources/**/*.js"
  }
}
```

Bây giờ chúng ta có thể kiểm tra lệnh `git commit` để thấy husky hoạt động như thế nào.

```
git commit -m "Keep calm and commit"
```

Sau khi tích hợp `husky` vào git hooks, `eslint` sẽ được chạy khi chúng ta xài git commands (commit, push). Nhưng lúc này `eslint` sẽ kiểm tra tất cả các file `*.js` trong thư mục `resources` (kể cả thư mục con). Điều này là không cần thiết vì chúng ta chỉ cần kiểm tra những đoạn code được thay đổi cuối cùng (code để commit) vì các code cũ đã được chính `husky` kiểm tra trong các commit trước rồi. Để giải quyết vấn đề này, chúng ta sử dụng `lint-staged`

## lint-staged

[lint-staged](https://github.com/okonet/lint-staged) dùng để kiểm tra những đoạn code mà chúng ta đang thay đổi và commit. Để cài đặt `lint-staged` chúng ta chạy lệnh sau:

```bash
yarn install lint-staged -D -S
```

Sau đó thay đổi file package.json: :

```json
"precommit": "lint-staged"
...
"lint-staged": {
    "resources/**/*.{js,vue}": [
      "eslint --fix",
      "git add"
    ]
  }
```

Với tùy chỉnh ở trên, hệ thống sẽ kiểm tra code mà bạn đang submit theo `eslint` theo các rules của ([ESLint](coding-convention.md#javascript-vue-eslint)). Nếu các rules đều được đáp ứng, hệ thống sẽ tiếp tục chạy `git commit` như bình thường, nếu có 1 rule nào đó không thỏa mãn, hệ thống sẽ cố gắng sửa chữa bằng cách chạy `eslint --fix` xong rồi tiếp tục submit code. Nếu `eslint --fix` không sửa được lỗi, hệ thống sẽ trả về thông báo kèm theo lỗi chi tiết, lúc này các bạn sẽ phải tự fix rồi chạy `git commit` lại.

## Tổng kết

Quy trình tốt nhất là đề nghị mọi người trong dự án cấu hình `eslint` vào IDE/editor của họ, cài đặt `eslint-loader` trong webpack để IDE/editor có thể giúp lập trình viên chỉnh sửa một số lỗi đơn giản về syntax, formatting,... nhắc nhở một số code không đúng với rule `lint` cũng như thông báo các lỗi ở command line. Các bạn có thể xem chi tiết hơn ở [ESLint](coding-convention.md#javascript-vue-eslint).

Điều này nên được khuyến khích, nhưng không cần phải bắt buộc vì các lập trình viên mới thường không có thói quen cấu hình IDE/editor hoặc không quan sát command line. Lúc này chúng ta nên cài trực tiếp `eslint` vào `precommit` hook để bảo đảm code commit lên phải theo đúng các tiêu chuẩn của dự án.
