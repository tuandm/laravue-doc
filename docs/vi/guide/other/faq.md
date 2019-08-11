# Các vấn đề thường gặp

::: tip
Bạn có thể kiểm tra các vấn đề dưới đây trước khi tạo câu hỏi mới.
:::

## Khác nhau giữa laravue và laravue-core là gì？

*laravue* là một dự án admin dashboard hoàn chỉnh được xây dựng trên Laravel mới nhất, cung cấp các chức năng cần thiết để quản trị. Do đó Laravue thích hợp cho dự án được xây dựng từ đầu.
*laravue-core* là package mở rộng cho Laravel, dùng để tích hợp vào một dự án Laravel đang có sẵn - hoặc cũng có thể dùng để "luyện tập" với laravue. Nếu bạn đã quen với laravue, thì sử dụng *laravue-core* với components thích hợp sẽ rất thích hợp cho dự án của bạn.

<br/>

## Nếu có bất kỳ lỗi nào xuất hiện, trước tiên bạn hãy google để tìm xem giải pháp !!!

[google ở đây](http://lmgtfy.com/?q=tìm+kiếm+vấn+đề)

<br/>

## Thư viện quá lớn?

Bạn nên enable gzip ở server side - bundle size sẽ nén lại trước khi trả về cho client
- [Nginx enable gzip](https://easyengine.io/tutorials/nginx/enable-gzip)
- [Apache enable mod_deflate](https://tecadmin.net/enable-gzip-compression-apache-ubuntu/), hoặc bạn có thể google thêm.

<br/>

## Tại sao URL lại có dấu `#`? Làm sao bỏ nó đi?

[Vue-router](https://router.vuejs.org) mặc định sẽ thêm `#` vào URL để định tuyến và sử dụng view thích hợp. Bạn nên đọc về [history mode](https://router.vuejs.org/guide/essentials/history-mode.html) để biết thêm chi tiết, hặc theo hướng dẫn cài đặt
