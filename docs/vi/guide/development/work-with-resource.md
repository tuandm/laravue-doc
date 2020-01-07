# Làm việc với resource

Trong tài liệu này, chúng ta sẽ tìm hiểu cách làm việc với resource trong Laravue thông qua một ví dụ đơn giản. 

Bạn có thể đã biết Laravue sử dụng [Laravel Resources](https://laravel.com/docs/6.x/eloquent-resources) ở backend và [RESTful Request đơn giản với axios](https://github.com/tuandm/laravue/blob/master/resources/js/api/resource.js) ở frontend. Bây giờ chúng ta sẽ tạo một resource mới và hiển thị nó ở frontend.

## Getting started
Chúng ta sẽ tạo một chức năng đơn giản để quản lý danh mục (category). Bạn có thể tạo các resource khác phức tạp hơn như news/blog/products v.v...

### Backend

#### `categories` table
Chúng ta sẽ bắt đầu từ database, cấu trúc của bảng `categories` như sau:

| Column       | Type      | option                     | Description                                                                           |
| ------------ | --------- | -------------------------- | ------------------------------------------------------------------------------------- |
| id           | int       | NOT NULL AUTO_INCREMENT    | Primary ID 																			|
| name         | varchar   | NOT NULL                   | Name of catetory                                                                      |
| code         | varchar   | NOT NULL, UNIQUE           | Code of category, should be unique                                                    |
| description  | varchar   | NULLABLE                   | Describe this category                                                                |
| created_at   | timestamp | CURRENT_TIMESTAMP          | Created date                                                                          |
| updated_at   | timestamp | DEFAULT CURRENT_TIMESTAMP  | Updated date                                                                          |

#### Create migration
Để tạo file migration, chúng ta dùng lệnh sau:
```
php artisan make:migration create_categories_table
```

Sau đó mở file XXXX_XX_XX_XXXXXX_create_categories_table.php file và thay đổi method `up()` như sau:
```php
    public function up()
    {
        Schema::create('categories', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('name');
            $table->string('code')->unique();
            $table->string('description');
            $table->timestamp('created_at')->nullable();
            $table->timestamp('updated_at')->useCurrent();
        });
    }
```

Save file, sau đó chạy lệnh `php artisan migrate` để tạo bảng `categories` trong database.

#### Create resources
Tiếp theo chúng ta sẽ tạo Model, Controller, Resource cho category

```
# Model
php artisan make:model Laravue\\Models\\Category
# Resource
php artisan make:resource CategoryResource
# Controller 
php artisan make:controller CategoryController --resource --model=Laravue\\Models\\Category
```

Sau khi chạy các lệnh trên, chúng ta sẽ có thêm 3 file mới:
```
app/Laravue/Models/Category.php
app/Http/Controllers/CategoryController.php
app/Http/Resources/CategoryResource.php
```

#### Create api resource
Chúng ta sẽ cần phải khai báo CategoryController vào api request, ví dụ `api/category`, bằng cách mở file `routes/api.php` và thêm dòng sau:
```
    Route::apiResource('categories', 'CategoryController');
```
Kiểm tra lại bằng cách chạy `php artisan route:list`, API requests cho category resource sẽ hiển thị giống như sau:

```
+--------+-----------+------------------------------+---------------------+-------------------------------------------------------+----------------------------------+
| Domain | Method    | URI                          | Name                | Action                                                | Middleware                       |
+--------+-----------+------------------------------+---------------------+-------------------------------------------------------+----------------------------------+
|        | POST      | api/categories               | categories.store    | App\Http\Controllers\CategoryController@store         | api                              |
|        | GET|HEAD  | api/categories               | categories.index    | App\Http\Controllers\CategoryController@index         | api                              |
|        | DELETE    | api/categories/{category}    | categories.destroy  | App\Http\Controllers\CategoryController@destroy       | api                              |
|        | PUT|PATCH | api/categories/{category}    | categories.update   | App\Http\Controllers\CategoryController@update        | api                              |
|        | GET|HEAD  | api/categories/{category}    | categories.show     | App\Http\Controllers\CategoryController@show          | api                              |
```

Ok, đến bước này thì các API cần thiết đã sẵn sàng.

Chúng ta sẽ chỉnh sửa method `CategoryController::index()` để trả về danh sách các categories khi có API request đến `/api/categories`.

```php
// File: app/Http/Controllers/CategoryController.php
use App\Http\Resources\CategoryResource;
use App\Laravue\Models\Category;
...
    public function index()
    {
        return CategoryResource::collection(Category::all());
    }
```

```js
curl localhost:8000/api/categories

{
  "data": [] // Because there is no category in database
}
```
Có vẻ category list API đã hoạt động, `"data": []` bởi vì chúng ta chứ tạo category nào trong hệ thống. Bạn có thể dùng [Database Seeding](https://laravel.com/docs/master/seeding) để tạo 1 số dummy category và test lại.

Bước tiếp theo chúng ta sẽ qua frontend để hiển thị danh sách category.

### Frontend

Trong [hướng dẫn](new-page.md) này, chúng ta đã biết cách tạo một trang mới trong Laravue với VueJS. Chúng ta sẽ theo các bước trong tài liệu đó để tạo một component cho việc hiển thị danh sách category.

Tạo menu mới trong `Sidebar -> Administrator`:
```js
// File: resources/js/router/modules/admin.js
    {
      path: 'categories',
      component: () => import('@/views/categories/List'),
      name: 'CategoryList',
      meta: { title: 'categoryList', icon: 'list' },
    },
```

![](https://cdn.laravue.dev/category-menu.png)

Bạn có thể thêm phần dịch vào file ngôn ngữ để hiển thị chữ nghĩa đúng đắn hơn (Xem thêm [I18n](new-page.md#i18n)).

Bước tiếp theo chúng ta sẽ tạo các chức năng list/create/edit/delete resource.

### List resources

#### Component
Để hiển thị danh sách resource, chúng ta sẽ tạo một component cho danh sách category và sử dụng `el-table` component để tạo một table element với các cột tương ứng cho các thuộc tính của category (ID, name, code, description).

```vue
<!-- File: resources/js/views/categories/List.vue -->
<template>
  <div class="app-container">
    <el-table :data="list" border fit highlight-current-row>
      <el-table-column align="center" label="ID" width="80">
        <template slot-scope="scope">
          <span>{{ scope.row.id }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="Name" width="200">
        <template slot-scope="scope">
          <span>{{ scope.row.name }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="Code" width="200">
        <template slot-scope="scope">
          <span>{{ scope.row.code }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="Description">
        <template slot-scope="scope">
          <span>{{ scope.row.description }}</span>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: 'CategoryList',
  data() {
    return {
      list: [],
    };
  },
};
</script>
```

- Biến cục bộ `list` để giữ danh sách category.

Đến đây, khi chúng ta click vào Category menu thì một table trống sẽ được hiển thị như sau:

![](https://cdn.laravue.dev/category-list.png)

#### Requests
Bước tiếp theo chúng ta sẽ gửi API request lên backend để lấy danh sách category. Để làm được điều này, chúng ta sẽ dùng Resource object và "kết nối" vào đường dẫn `/categories`. Sau đó chúng ta sẽ gọi tới `/categories` khi List component khởi tạo xong. 
Mở file `resources/js/views/categories/List.vue` và chỉnh sửa như dưới đây (bên trong tag `<script>...</script>`)


```vue
<!-- File: resources/js/views/categories/List.vue -->
<script>
import Resource from '@/api/resource';
const categoryResource = new Resource('categories');

export default {
  name: 'CategoryList',
  data() {
    return {
      list: [],
    };
  },
  created() {
    this.getList();
  },
  methods: {
    async getList() {
      const { data } = await categoryResource.list({});
      this.list = data;
    },
  },
};
</script>
```

Với đoạn code này, khi component khởi tạo xong, method `getList()` sẽ được gọi để thực thi `categorResource.list({})`, `categorResource.list({})` sẽ API request lên backend tại địa chỉ `/categories`. Sau khi backend trả về dữ liệu, chúng ta sẽ lưu lại vào biến `list` và hiển thị. Bạn có thể thêm category trực tiếp vào database để xem kết quả.

#### Loading state
Thường các ứng dụng SPA sẽ hiển thị một "loading" icon trong khi đợi kết quả từ server trả về. `el-table` có một thuộc tính `loading` để làm công việc này. Chúng ta sẽ sử dụng nó bằng cách chỉnh sửa code như sau:
```vue
<!-- File: resources/js/views/categories/List.vue -->
<el-table v-loading="loading" :data="list" border fit highlight-current-row>
...
</el-table>
<script>
import Resource from '@/api/resource';
const categoryResource = new Resource('categories');

export default {
  name: 'CategoryList',
  data() {
    return {
      list: [],
      loading: true, // Ban đầu sẽ hiển thị loading icon
    };
  },
  created() {
    this.getList();
  },
  methods: {
    async getList() {
      this.loading = true;
      const { data } = await categoryResource.list({});
      this.list = data;
      this.loading = false; // Ẩn loading icon khi dữ liệu được load xong
    },
  },
};
</script>
```

Reload lại page, chúng ta sẽ thấy loading icon hiển thị trước khi category list hiện ra.

### Create a resource

Tiếp theo chúng ta sẽ cùng nhau tạo một resource bằng cách build form đơn giản để khởi tạo các thuộc tính cần thiết cho category. Bởi vì category resource không có quá nhiều property (chỉ có name, code, description) nên chúng ta sẽ sử dụng popup form cho đơn giản. Chúng ta sẽ thêm đoạn HTML code để tạo các elements sau:
- Một button để hiển thị category form khi được click vào - chúng ta sẽ có 1 event handle `handleCreateForm` để hiển thị category form.
- Một dialog chứa category form
- Một category form với 2 fields và 2 buttons: 
  + 1 textbox cho category name
  + 1 textarea cho category description
  + 1 button để hủy thao tác (ẩn form)
  + 1 button để gửi thông tin category từ form lên backend để tạo category resource - khi click vào button này, event handle `handleSubmit()` sẽ được gọi.

```vue
<!-- File: resources/js/views/categories/List.vue -->
<template>
  <div class="app-container">
    <div class="filter-container">
      <el-button class="filter-item" type="primary" icon="el-icon-plus" @click="handleCreate">
        {{ $t('table.add') }}
      </el-button>
    </div>
    <el-table v-loading="loading" :data="list" border fit highlight-current-row>
      ...
    </el-table>
    <el-dialog :title="'Create new Category'" :visible.sync="categoryFormVisible">
      <div class="form-container">
        <el-form ref="categoryForm" :model="currentCategory" label-position="left" label-width="150px" style="max-width: 500px;">
          <el-form-item label="Name" prop="name">
            <el-input v-model="currentCategory.name" />
          </el-form-item>
          <el-form-item label="Description" prop="description">
            <el-input v-model="currentCategory.description" type="textarea" />
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="categoryFormVisible = false">
            Cancel
          </el-button>
          <el-button type="primary" @click="handleSubmit()">
            Confirm
          </el-button>
        </div>
      </div>
    </el-dialog>
  </div>
</template>
```

Ngoài ra, chúng ta sẽ thêm 2 biến:
- `categoryFormVisible`: dùng để hiện/ẩn category form. Khi click vào "Add" button, giá trị biến này sẽ chuyển thành `true`, và sẽ chuyển lại về `false` khi Cancel button được click.
- `currentCategory`: Dùng để chứa dữ liệu của category mới. Ngay trước khi category form được hiện ra, giá trị của biến này sẽ được reset về mặt định `{name: '', description: ''}`.

Chúng ta sẽ có 2 methods `handleCreateForm` và `handlesubmit()` để handle click event trên 2 nút "Add" và "Submit". Chúng ta sẽ chỉnh sửa code JS như sau:
```vue
<!-- File: resources/js/views/categories/List.vue -->
<template>
...
</template>
<script>
...
export default {
  name: 'CategoryList',
  data() {
    return {
      ...
      categoryFormVisible: false,
      currentCategory: {},
    };
  },
  methods: {
  	...
    handleSubmit() {
    },
    handleCreateForm() {
      this.categoryFormVisible = true;
      this.currentCategory = {
        name: '',
        description: '',
      };
    },
  },
};
</script>
```

Reload webpage, và kiểm tra các nút "Add", "Submit".

![](https://cdn.laravue.dev/category-add.png)

Tiếp theo chúng ta sẽ thêm phần xử lý việc tạo category. Quy trình thông thường sẽ là:
1. Frontend lấy dữ liệu từ form (đã bind data vào biến `currentCategory`) gửi lên `categories.store` route
2. Backend nhận dữ liệu, kiểm tra dữ liệu và thực hiện tạo category, sau đó trả về kết quả
3. Frontend nhận kết quả, cập nhật danh sách caegory và hiển thị thông báo.

Đầu tiên, chúng ta thay đổi method `handleSubmit()` ở view file:
```js
// File: resources/js/views/categories/List.vue
handleSubmit() {
  categoryResource
    .store(this.currentCategory)
    .then(response => {
      this.$message({
        message: 'New category ' + this.currentCategory.name + ' has been created successfully.',
        type: 'success',
        duration: 5 * 1000,
      });
      this.currentCategory = {
        name: '',
        description: '',
      };
      this.categoryFormVisible = false;
      this.getList();
    })
    .catch(error => {
      console.log(error);
    });
},
```

Sau đó chúng ta sẽ cập nhật Category model để các thuộc tính `name`, `code`, `description` [fillable ](https://laravel.com/docs/5.8/eloquent#mass-assignment)

```php
// File: app/Laravue/Models/Category.php
<?php

namespace App\Laravue\Models;

use Illuminate\Database\Eloquent\Model;

class Category extends Model
{
    protected $fillable = [
        'name',
        'code',
        'description',
    ];
}
```
Tiếp theo, thay đổi method `CategoryController::store()` để lấy category data từ request và lưu vào database.

```php
// File: app/Http/Controllers/CategoryController.php
public function store(Request $request)
{
    $validator = Validator::make(
        $request->all(),
        [
            'name' => ['required']
        ]
    );

    if ($validator->fails()) {
        return response()->json(['errors' => $validator->errors()], 403);
    } else {
        $params = $request->all();
        $category = Category::create([
            'name' => $params['name'],
            'code' => strtolower($params['name']) . time(), // Chỗ này tạo cái dữ liệu duy nhất cho trường code - chủ yếu là cho vui.
            'description' => $params['description'],
        ]);
        
        return new CategoryResource($category);
    }
}

```

Save source code, kiểm tra lại bằng cách tạo category từ frontend, nhập dữ liệu, submit. Bạn sẽ thấy category mới được thêm vào danh sách sau khi submit.


### Delete resource
Để xóa một resource, chúng ta cần thêm nút xóa vào mỗi dòng category bằng cách thay đổi file `List.vue` như sau:

```vue
<!-- File: resources/js/views/categories/List.vue -->
<template>
  <div class="app-container">
  ...
    <el-table v-loading="loading" :data="list" border fit highlight-current-row>
      ...
      <el-table-column align="center" label="Actions" width="350">
        <template slot-scope="scope">
          <el-button type="danger" size="small" icon="el-icon-delete" @click="handleDelete(scope.row.id, scope.row.name);">
            Delete
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
...
export default {
  ...
  methods: {
  	...
    handleDelete(id, name) {
      this.$confirm('This will permanently delete category ' + name + '. Continue?', 'Warning', {
        confirmButtonText: 'OK',
        cancelButtonText: 'Cancel',
        type: 'warning',
      }).then(() => {
        categoryResource.destroy(id).then(response => {
          this.$message({
            type: 'success',
            message: 'Delete completed',
          });
          this.getList();
        }).catch(error => {
          console.log(error);
        });
      }).catch(() => {
        this.$message({
          type: 'info',
          message: 'Delete canceled',
        });
      });
    },
  },  	
}
</script>
```

Phía backend, chúng ta sẽ thay đổi method `CategoryController::destroy()` để xóa category

```php
// File: app/Http/Controllers/CategoryController.php
public function destroy(Category $category)
{
    try {
        $category->delete();
    } catch (\Exception $ex) {
        response()->json(['error' => $ex->getMessage()], 403);
    }

    return response()->json(null, 204);
}
```

Reload website, category bây giờ có thể xóa được với nút "Delete".

### Update resource

Để thay đổi thông tin cho một resource, we cần thêm "Edit" button và hiển thị dữ liệu của category được chọn vào category form khi click vào nó. Chúng ta sẽ thay đổi file `List.vue` để làm các công việc sau:
1. Thay đổi dialog và category form để hỗ trợ thêm việc chỉnh sửa thông tin category
2. Tiêu đề của dialog cần được làm động: Ví dụ title sẽ là "Create new category" khi thêm mới category và "Edit category" khi thay đổi thông tin category.
3. Thêm event handle `handleEditForm` để xử lý khi click vào "Edit" button.
4. Thay đổi `handleSubmit()` để xử lý thêm phần thay đổi category

```vue
<!-- File: resources/js/views/categories/List.vue -->
<template>
  <div class="app-container">
  ...
    <el-table v-loading="loading" :data="list" border fit highlight-current-row>
      ...
      <el-table-column align="center" label="Actions" width="350">
        <template slot-scope="scope">
          <el-button type="primary" size="small" icon="el-icon-edit" @click="handleEditForm(scope.row.id, scope.row.name);">
            Edit
          </el-button>
          <el-button type="danger" size="small" icon="el-icon-delete" @click="handleDelete(scope.row.id, scope.row.name);">
            Delete
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog :title="formTitle" :visible.sync="categoryFormVisible">
      ...
    </el-dialog>
  </div>
</template>
<script>
...
export default {
  ...
  data() {
  	return {
  	  ...
  	  formTitle: '',
  	  ...
  	};
  },
  methods: {
  	...
    handleSubmit() {
      if (this.currentCategory.id !== undefined) {
        categoryResource.update(this.currentCategory.id, this.currentCategory).then(response => {
          this.$message({
            type: 'success',
            message: 'Category info has been updated successfully',
            duration: 5 * 1000,
          });
          this.getList();
        }).catch(error => {
          console.log(error);
        }).finally(() => {
          this.categoryFormVisible = false;
        });
      } else {
        categoryResource
          .store(this.currentCategory)
          .then(response => {
            this.$message({
              message: 'New category ' + this.currentCategory.name + ' has been created successfully.',
              type: 'success',
              duration: 5 * 1000,
            });
            this.currentCategory = {
              name: '',
              description: '',
            };
            this.categoryFormVisible = false;
            this.getList();
          })
          .catch(error => {
            console.log(error);
          });
      }
    },
    ...
    handleEditForm(id) {
      this.formTitle = 'Edit category';
      this.currentCategory = this.list.find(category => category.id === id);
      this.categoryFormVisible = true;
    },
  },  	
}
</script>
```

Phía backend, chúng ta cũng phải chỉnh sửa method `CategoryController::update()` để thay đổi thông tin category
```php
// File: app/Http/Controllers/CategoryController.php
    public function update(Request $request, Category $category)
    {
        if ($category === null) {
            return response()->json(['error' => 'Category not found'], 404);
        }

        $validator = Validator::make(
            $request->all(),
            [
                'name' => ['required']
            ]
        );

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 403);
        } else {
            $params = $request->all();
            $category->name = $params['name'];
            $category->description = $params['description'];
            $category->save();
        }

        return new CategoryResource($category);
    }
```

Lưu tất cả các file đã chỉnh sửa, bây giờ chúng ta đã có thể thay đổi thông tin của 1 category.

### Notes
1. Trong tài liệu này, source code chỉ mang tính hướng dẫn nên không bao gồm phần kiểm tra lỗi và các logic phức tạp khác.
2. Bạn hoàn toàn có thể dùng giải pháp của bạn, miễn là code của bạn phải tuân theo các [rules của linter](../advanced/coding-convention.md#javascript-vue-eslint).
3. Nếu resource của bạn có nhiều xử lý phức tạp mà Resource class (@/api/resource.js) hiện tại không đáp ứng được, bạn có thể extend Resource class và thêm các logic riêng của bạn (Ví dụ: https://github.com/tuandm/laravue/blob/master/resources/js/api/user.js)
4. Toàn bộ code ví dụ cho bài hướng dẫn này có thể tìm thấy ở: [How to work with resource](https://github.com/tuandm/laravue/commit/838aab5ada5667b5c79e4d7974bba7735bd02b1d)

### Conclusion
Làm việc với resource ở Laravue tương đối dễ dàng và thuận tiện, hầu hết công việc mà bạn phải làm là kết nối (pair) Laravel Resource ở backend với RESTful request ở frontend.
