---
home: true
heroImage: /home.png
title: a
actionText: Bắt đầu →
actionLink: /vi/guide/
features:
  - title: Nhiều chức năng
    details: Giao diện tiêu chuẩn cho hệ thống quản lý với nhiều thành phần mở rộng
  - title: Chuẩn mực
    details: Sử dụng các framework và library hợp lý cùng với tiêu chuẩn cao trong việc xây dựng và phát triển
  - title: Công nghệ cập nhật
    details: Luôn luôn sử dụng các version mới nhất từ các công nghệ tiên tiến của Laravel, Vue...
  - title: Hệ thống quân quyền
    details: Phân quyền theo chức vụ và tự động hiển thị menu theo quyền hạn
  - title: Đa ngôn ngữ
    details: Tích hợp sẵn hệ thống đa ngôn ngữ, chuyển đổi ngôn ngữ linh hoạt
  - title: Tích hợp dễ dàng
    details: Thích hợp cho các hệ thống phát triển trên nền tảng API như SaaS, Micro-services
footer: MIT Licensed | Copyright © 2019 Tuan Duong
---

## Getting Started

```bash
# Clone the project with composer
composer create-project tuandm/laravue
cd laravue

# Migration and DB seeder (after changing your DB settings in .env)
php artisan migrate --seed

# Generate JWT secret key
php artisan jwt:secret

# install dependency
npm install

# develop
npm run dev # or npm run watch
```
