# Work with resource

In this guide, we will learn how to work with resource in Laravue with a simple example. 

You may know that Laravue uses [Laravel Resources](https://laravel.com/docs/6.x/eloquent-resources) on backend and simple [RESTful Request by axios](https://github.com/tuandm/laravue/blob/master/resources/js/api/resource.js) in frontend. Now we are going to create new Resource show it in frontend.

## Getting started
We will create a simple feature to manage categories.

### Backend

#### `categories` table

| Column       | Type      | option                     | Description                                                                           |
| ------------ | --------- | -------------------------- | ------------------------------------------------------------------------------------- |
| id           | int       | NOT NULL AUTO_INCREMENT    | Primary ID 																			|
| name         | varchar   | NOT NULL                   | Name of catetory                                                                      |
| code         | varchar   | NOT NULL, UNIQUE           | Code of category, should be unique                                                    |
| description  | varchar   | NULLABLE                   | Describe this category                                                                |
| created_at   | timestamp | CURRENT_TIMESTAMP          | Created date                                                                          |
| updated_at   | timestamp | DEFAULT CURRENT_TIMESTAMP  | Updated date                                                                          |

#### Create migration
```
php artisan make:migration create_categories_table
```

Then XXXX_XX_XX_XXXXXX_create_categories_table.php file to change `up()` method as below
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

Save that file, then run `php artisan migrate` to create this table.

#### Create resources
We will create Model, Controller, Resource

```
# Model
php artisan make:model Laravue\\Models\\Category
# Resource
php artisan make:resource CategoryResource
# Controller 
php artisan make:controller CategoryController --resource --model=Laravue\\Models\\Category
```

Now we will have 3 new files: 
```
app/Laravue/Models/Category.php
app/Http/Controllers/CategoryController.php
app/Http/Resources/CategoryResource.php
```

#### Create api resource
We need to bind CategoryController to api, such as `api/category`, to do so we will open `routes/api.php` to add this line:
```
    Route::apiResource('categories', 'CategoryController');
```
Then we can double check by running `php artisan route:list`, it should show basic URIs for category

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

Ok, now API calls are ready.

Now we will modify the `CategoryController::index()` method to return list of categories.

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

Now we can get all categories by sending request to `/api/categories`.
```js
curl localhost:8000/api/categories

{
  "data": [] // Because there is no category in database
}
```
Yes, it works!
You can create sample category data using [Database Seeding](https://laravel.com/docs/master/seeding) and try again

Next step we setup frontend to show category list.

### Frontend

In [this guide](new-page.md), we already know how to create new page in Laravue with VueJS. We will follow that document to create a component for listing categories.

New menu will be created in `Administrator`:
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

You can change your language files to change `categoryList` key to show the meaningful words instead.

Ok, lets go to next step to list/create/edit/delete resource.

### List resources

#### Component
To list resource, we will create a component for Category list, and use `el-table` component to initialize a table with columns [ID, name, code, description]

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

- `list` variable to hold the category list.

Great! Now we can see the category list page as below:

![](https://cdn.laravue.dev/category-list.png)

#### Requests
Next step we will send request to backend to get list of categories. To do so, we will use Resource object and bind to `categories` URI, then we will request to `/categories` when List component created. Please modify `List.vue` as below (inside `<script>...</script>` tag)


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

With the above code, when component is created, the `getList()` method will be executed and request to server for getting category list with `categoryResource.list({})`. After server returns real data, we will assign to the variable `list` for rendering.

Now we can see all categories are listed. 

#### Loading state
Sometimes we want a loading icon will show before data is returned and displayed. `el-table` has a `loading` property to do this job. We will use it and change the JS code as below:
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
      loading: true,
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
      this.loading = false;
    },
  },
};
</script>
```

Now we can reload the page to see the loading state before category list showing.

### Create a resource

Now we are going to create simple form to create Category resource. Because this form is simple, so we can show them all in the popup window. Let add some HTML code to the List component.
- A button to show category form - when clicking to this button, `handleCreateForm` will be called to popup the category form.
- A dialog contains category form
- A category form with 2 fields and 2 buttons: 
  + 1 textbox for category name
  + 1 textarea for category description
  + 1 button to cancel (hide the form)
  + 1 button to send form to backend to create category resource - when clicking to this button, `handleSubmit()` method will be called.

```vue
<!-- File: resources/js/views/categories/List.vue -->
<template>
  <div class="app-container">
    <div class="filter-container">
      <el-button class="filter-item" type="primary" icon="el-icon-plus" @click="handleCreateForm">
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

Additionally, we will define 2 variables:
- `categoryFormVisible`: To show/hide the category form. Clicking to Add button will turn this to `true`, and will be switched to `false` if Cancel button is clicked.
- `currentCategory`: An object to hold data of new category. When the category form is shown, this object will be reset to default value `{name: '', description: ''}`
And we will add 2 methods `handlesubmit()` and `handleCreateForm`. The JS code will be changed as follow:
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

We can reload the page and test clicking on buttons.

![](https://cdn.laravue.dev/category-add.png)

Next, we will add code to process creating category. The happy case will be:
1. Frontend gets data from the form and send to `categories.store` route
2. Backend receives data, do validating and process creating category, then return the result
3. Frontend gets result, reload the list and show notification

First, change `handleSubmit()` method on view file:
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

Then we need to update Category model to make some fields fillable

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
Next, change `CategoryController::store()` method to get data from request and insert new category to database.

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
            'code' => strtolower($params['name']) . time(), // Just to make sure this value is unique
            'description' => $params['description'],
        ]);
        
        return new CategoryResource($category);
    }
}

```

Now save all files, then try to add new category from the frontend. It should works.


### Delete resource
To delete a resource, we need to have a button on each row. We will change file `List.vue` as follow:

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

Then we will update `CategoryController::destroy()` to delete category

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

Now we can delete a category by clicking "Delete" button on selected row.

### Update resource

To update a resource, we need to add "Edit" button and load the category form with selected category when clicking on it. We will change the `List.vue` as follow:
1. Change dialog and form to support updating category
2. Make dialog's title dynamic - "Create new category" or "Edit category" depends on situation.
3. Add `handleEditForm` to handle click event on "Edit" button.
4. Change `handleSubmit()` to handle updating category

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

We also change the `CategoryController::update()` method to update category
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

Save all files, we are able to edit category now.

### Notes
1. The code we provided is just example, please ignore the business logic and validation if possible.
2. You can go with your solution, just make sure that your code will be passed with linter.
3. If your resource has complicated behaviour that the current Resource class could not resolve, you can extend from Resource class and add your logic (Example: https://github.com/tuandm/laravue/blob/master/resources/js/api/user.js)
4. You can check sample code here: [How to work with resource](https://github.com/tuandm/laravue/commit/838aab5ada5667b5c79e4d7974bba7735bd02b1d)

### Conclusion
Working with resource on Laravue is quite easy and convenient, all you need is to pair Laravel Resource on backend with RESTful request on frontend.
