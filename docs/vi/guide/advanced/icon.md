# Icon

## Introduction

`laravue` sử dụng 2 hệ thống icons - [Element-UI icons](https://element.eleme.io/#/en-US/component/icon) và [IconFont.cn](http://iconfont.cn). Bạn có thể xem ở [đây](https://laravue.dev/#/element-ui/icons)

Nếu bạn không tìm thấy icons như mong muốn, bạn có thể tìm kiếm vài tải về từ trang [iconfont.cn](http://iconfont.cn/), xong rồi generate và sử dụng như các icon có sẵn. Bạn cũng có thể tìm kiếm svg icon ở các website khác, tải về rồi [thư mục này](https://github.com/tuandm/laravue/tree/master/resources/js/icons/svg).

## Download và generate icons từ website [IconFont.cn](http://iconfont.cn)

> Laravue được phát triển dựa trên frontend framework [vue-element-admin](https://github.com/PanJiaChen/vue-element-admin) của tác giả người Trung Quốc PanJiaChen. Cho nên trong quá trình phát triển cũng như tài liệu hướng dẫn chúng tôi cố gắng giữ nguyên những đóng góp của tác giả, ví dụ một số minh hoa có tiếng Trung. Mong các bạn thông cảm.

Đầu tiên các bạn tìm và tải icon mong muốn vào thư mục `@/icons/svg`, icon sẽ được generate tự động (build bằng `yarn run...`)

<img width="600" src="https://wpimg.wallstcn.com/1f8b1e56-cfd9-4ef7-a0aa-dfb0c2883aa3.gif" />

<br />

## Hướng dẫn sử dụng IconFont

```js
<svg-icon icon-class="password" /> // icon-class là tên của icon
```

[SVG Component](/feature/component/svg-icon.md)

## Thay đổi màu

Mặc định =`svg-icon` thừa kế màu từ parent `fill: currentColor;`. Bạn có thể thay đổi trực tiếp thuộc tính này ở component con, hoặc component cha (có tác dụng cho tất cả các component con) ở [`@/components/SvgIcon/index.vue`](https://github.com/tuandm/laravue/blob/master/resources/js/components/SvgIcon/index.vue)

## Cách sử dụng Element UI icon

Elemnt UI có cung cấp cho chúng ta một số icon cở bảni. Bạn có thể sử dụng như code mẫu bên dưới.

```js
<i class="el-icon-edit"></i>
<i class="el-icon-share"></i>
<i class="el-icon-delete"></i>
<el-button type="primary" icon="el-icon-search">Search</el-button>
```

![Icon Usage](../../../content/icon-usage.png)

## Thay đổi màu cho Element UI icon

Bạn có thể thay đổi màu của các icon này dễ dàng bằng cách sử dụng CSS và thuộc tính `color` cho icon.
