# Coding coventions
Coding conventions are very important for working with large projects where multi-developers are working on. Coding standard helps people reducing their time on reading/understanding code, minimizes communicaion and performance pitfalls, avoids basic syntax errors and many many other benefits.
Laravue is a combination of PHP and JS/Vue whose coding standards are different. We keep those standards separately for both PHP and JS/Vue. You can change them according your business.

## IDE & Editor

Great tools make good work! In Laravue, we highly recommend to use :
- [PHPStorm](https://www.jetbrains.com/phpstorm/) for main development in backend with PHP and quick changes on frontend
- [VSCode](https://code.visualstudio.com/) for main development in frontend with VueJS/HTML/CSS and quick changes on backend

## Javascript/Vue - ESLint
In Laravue, JS/Vue coding standard follows [Airbnb JavaScript Style](https://github.com/airbnb/javascript) and [official VueJS Style](https://vuejs.org/v2/style-guide/).

### Settings

All configuration rules are in [.eslintrc.js](https://github.com/tuandm/laravue/blob/master/.eslintrc.js).
The basic eslint rules of this project are based on [the official eslint](https://eslint.org/docs/rules/) and [eslint-plugin-vue](https://eslint.vuejs.org/) with some minor changes.

### Some important points

By default, all rules are from `eslint:recommended` and `plugin:vue/recommended`. You can customize your configuration according to your needs.

```js
// https://github.com/tuandm/laravue/blob/master/.eslintrc.js

module.exports = {
  extends: ['plugin:vue/recommended', 'eslint:recommended'],
  //You can change it to  extends: ['plugin:vue/essential', 'eslint:recommended']
}
```

Below are some important rules applying for JS/Vue files inside `resources/js`.

#### Naming
- JS/CSS/SCSS files MUST be in kebab-case
- Vue files MUST be in PascalCase, except `index.vue`
- Folders MUST be kebab-case, except global components inside `resources/js/components/`. Folders for global components MUST be in PascalCase
- Variables MUST be in camelCase
```
    'camelcase': [0, {
      'properties': 'always'
    }],
```

#### Indentation

Laravue uses 2 spaces indentation (https://eslint.org/docs/rules/indent)
```
    'indent': [2, 2, {
      'SwitchCase': 1
    }],
```

#### Trailing comma
Trailing comma is required (https://eslint.org/docs/rules/comma-dangle)
```
    'comma-dangle': ['error', 'always-multiline'],
```

#### Newline at EOL
Trailing newlines in non-empty files are required (https://eslint.org/docs/rules/eol-last)
```
    'eol-last': 2,
```

#### Strict equality operator (===)
`===` MUST be used instead of `==` (https://eslint.org/docs/rules/eqeqeq)

```
    'eqeqeq': ["error", "always", {"null": "ignore"}],
```

## Cancel ESLint

If you don't want to use ESLint, you just find `LARAVUE_USE_ESLINT` in your [.env](https://github.com/tuandm/laravue/blob/master/.env.example), change it to `false`

## Configure ESLint in VSCode

![eslintGif.gif](https://wpimg.wallstcn.com/e94a76df-6dc0-4c15-9785-28b553a163e9.png)

<br />
Every time you save your code, VSCode will try show warnings/errors for areas that do not follow the eslint rules, and make some simple self-fixes at the same time. The installation steps are as follows:

First install the [eslint plugin](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)

![eslint.png](https://cdn.laravue.dev/eslint.png)

After we have installed ESLint, go to `Code` > `Preferences` > `Settings` (JSON mode) and add the following configuration:

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

People and team have their own code specification, it is good to create their own rules and upload to [NPM](npmjs.com) so everyone can reuse and extend if necessary. For instance: ElemeFE [config](https://www.npmjs.com/package/eslint-config-elemefe) or Vue official [config](https://github.com/vuejs/eslint-config-vue).

[vscode plugin and configuration recommendations](https://github.com/varHarrie/Dawn-Blossoms/issues/10)

## Auto fix

```bash
npm run lint -- --fix
```

## PHP - PSR
Laravue follows strictly [PSR](https://www.php-fig.org/psr/) - same as [Laravel](https://laravel.com/docs/5.8/contributions#coding-style)