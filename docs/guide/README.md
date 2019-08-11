---
pageClass: getting-started
---

# Introduction

[![Laravel](https://img.shields.io/badge/laravel-5.8-brightgreen.svg)](https://laravel.com)
[![vue](https://img.shields.io/badge/vue-2.6.8-brightgreen.svg)](https://github.com/vuejs/vue)
[![element-ui](https://img.shields.io/badge/element--ui-2.6.1-brightgreen.svg)](https://github.com/ElemeFE/element)
[![Build Status](https://gitlab.com/bacduong/laravue/badges/master/build.svg)](https://gitlab.com/bacduong/laravue)
[![license](https://img.shields.io/github/license/mashape/apistatus.svg)](https://github.com/tuandm/laravue/blob/master/LICENSE)
[![GitHub release](https://img.shields.io/github/release/tuandm/laravue.svg)](https://github.com/tuandm/laravue/releases)
[![GitHub stars](https://img.shields.io/github/stars/tuandm/laravue.svg?style=social&label=Stars)](https://github.com/tuandm/laravue)

[Laravue](https://laravue.dev) is a beautiful dashboard for Laravel inspired by [vue-element-admin](http://laravue.dev) but beyond that. With the powerful Laravel framework as backend, Laravue appears to be a full-stack solution for an enterprise administrative application.

:::tip
The project is positioned as an enterprise solution and it's highly recommended to start from scratch. You should start project from simple layout and add components one by one depending on your system. This is to avoid redundant code as this project provides lot of features that you may not use.
- Laravel package: [laravel-core](https://github.com/tuandm/laravue-core)
  :::

<br/>

## Features

```
- Login / Logout

- ACL - Access Control List
  - Users management
  - Roles and permissions management
  - Directives for permission and role
  
- Global Features
  - I18n
  - Dynamic sidebar with ACL integration (supports multi-level routing)
  - Dynamic breadcrumb
  - Historical bar using Tags-view with right-click supported
  - Svg Sprite
  - Responsive Sidebar

- Editor
  - Rich Text Editor
  - Markdown Editor
  - JSON Editor

- Excel
  - Export Excel
  - Export zip
  - Upload Excel
  - Visualization Excel

- Table
  - Dynamic Table
  - Drag And Drop Table
  - Tree Table
  - Inline Edit Table

- Error Page
  - 401
  - 404

- Components
  - Avatar Upload
  - Back To Top
  - SplitPane
  - Dropzone
  - Sticky
  - BackToTop button
  - CountTo
  - Kanban board
  - Draggable list
  - Draggable popup dialog
  - And more... (https://laravue.dev/#/dashboard)

- Advanced Example
- Dashboard
- Guide Page
- ECharts
- Clipboard
- Layout elements (Form, Tab, Icons...)
```

<br/>

## Preparation
Your machine need to be ready for the latest [Laravel](https://laravel.com/docs/5.8/installation) and [Node.js](https://nodejs.org). [Git](https://git-scm.com/) and [composer](https://getcomposer.org/) are required too.

Besides, the project is based on [ES2015+](https://babeljs.io/docs/en/learn/), [vue](https://vuejs.org), [vuex](https://vuex.vuejs.org/), [vue-router](https://router.vuejs.org/), [axios](https://github.com/axios/axios) and [element-ui](https://github.com/ElemeFE/element), all API will be served by Laravel. Understanding and learning this knowledge in advance will greatly help the use of this project.

::: tip
**This project does not support low-level browsers (such as ie). If you need to, please add polyfills yourself.**
:::

## Project Structure

This project has built with following structure.

```bash
├── app                        // Laravel app folder
├── boostrap                   // Laravel boostrap folder
├── database                   // Laravel database folder
├── public                     // Laravel public folder
│   ├── fonts
│   │   └── css                
│   │       └── vendor         // Vendor fonts (element-ui...)
│   └── static                 // Configuration file for Laravue project
│       └── Tinymce            // rich text editor
├── resources                  // Laravel resources
│   ├── js                     // Main laravue source code
│   │   ├── api                // api service
│   │   ├── assets             // module assets like fonts,images (processed by webpack)
│   │   ├── components         // global components
│   │   ├── directive          // global directive
│   │   ├── filters            // global filter
│   │   ├── icons              // svg icons
│   │   ├── lang               // i18nlanguage
│   │   ├── router             // router
│   │   ├── store              // store
│   │   ├── styles             // global css
│   │   ├── utils              // global utils
│   │   ├── vendor             // vendor libraries (excels...)
│   │   ├── views              // views
│   │   ├── App.vue            // main app component
│   │   ├── app.js             // app entry file
│   │   └── permission.js      // permission authentication
│   └── views                  // Laravel blade templates
│       └── laravue.blade.php  // Main view for Laravue application
├── tests                      // Laravue tests
├── .babelrc                   // babel config
├── .eslintrc.js               // eslint config
├── .gitignore                 // sensible defaults for gitignore
└── package.json               // package.json
```

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

# Build for development
npm run dev # or npm run watch

# Start local development server
php artisan serve
```
<br/>

Now you can open Laravel at http://localhost:8000. After login with provided email/password, you should be able to see the Laravue dashboard

Login page:

![](https://cp5.sgp1.cdn.digitaloceanspaces.com/zoro/laravue-cdn/laravue-login.png)

Laravue has already setup for standard components, state management, i18n, global router, linter,.... You can continue exploring other documents for more details on those topics.

<br/>

::: tip
**Suggestion：** You should try [laravue-core](https://github.com/tuandm/laravel-core) package if you want to integrate Laravue to your current Laravel projects. Laravue itself will be a good guideline for you.
:::

### Build for production
```
npm run production
```
### Analyze the build file size
If your build file is large, you can optimize your code by building and analyzing the size distribution of dependent modules using the `webpack-bundle-analyzer`.
```
npm run report
```
After running you can see the specific size distribution at http://127.0.0.1:8888 (it will automatically open).

![](https://cdn.laravue.dev/webpack-bundle-report.jpg)

## Contribution

The repository of documentation is [laravue-doc](https://github.com/tuandm/laravue-doc) based on [vuepress](https://github.com/vuejs/vuepress) development.

There will be many errors related to spelling or translation from [original project](https://github.com/PanJiaChen/vue-element-admin). It is welcome to point out by issue or PR. My English is not too good.

This project is still on development to provide more and more awesome features, integrate with high-quality Laravel packages and apply the best practices of development to build an enterprise solution for back office. We are looking forward to your contribution and [feedback](https://github.com/tuandm/laravue/issues).

## Browsers Support

Modern browsers and Internet Explorer 10+.

<!-- prettier-ignore -->
| [<img class="no-margin" src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/edge/edge_48x48.png" alt="IE / Edge" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>IE / Edge | [<img class="no-margin" src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/firefox/firefox_48x48.png" alt="Firefox" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Firefox | [<img class="no-margin" src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/chrome/chrome_48x48.png" alt="Chrome" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Chrome | [<img class="no-margin" src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari/safari_48x48.png" alt="Safari" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Safari |
| --------- | --------- | --------- | --------- |
| IE10, IE11, Edge| last 2 versions| last 2 versions| last 2 versions
