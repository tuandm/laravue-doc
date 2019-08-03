---
sidebarDepth: 3
---

# Rich text editor

Rich text editor is a core part of management system. We have gone through many rich texts and decided using [Tinymce](https://github.com/tinymce/tinymce).

Reasons
- `tinymce` is one of the most popular rich texts (with `ckeditor`, is also famous, the new version is very good), widely used in market, and it has detailed documentation and rich configuration. One of the keys to using rich text is to copy formatting. We tried using Korean text rich `summernote` before and tt wasted a lot of time on doing some normal tasks, very unfriendly. But `tinymce`'s formatting is pretty good. It also has a value-added feature is powerpaste which is extremely powerful, support for copying everything from word or any other place. Extensibility is also important and with `tinymce`, writing plugins is easy. The last point is that the documentation is very good, it is easy to get the configuration item or customize plugins though the official website.

Lets go though some other rich texts on the market:

- **[summernote](https://github.com/summernote/summernote)** We definitely would not recommend. It is inconsistent with many recognized default behaviors between others. For the use of a dialog feature, they import the bootstrap. Formatting is also very bad.

- **[ckeditor](https://github.com/galetahub/ckeditor)** Ckeditor is also a good rich text, highly recommended.

- **[quill](https://github.com/quilljs/quill)** Is also a very hot rich text, the skin is very elegant. Writing a plug-in based on it is also very simple. The API design is very cool. But it is not too convenient for operation picture and hard to change. It's still recommended if there is no operation of the picture

- **[medium-_editor_](https://github.com/yabwe/medium-editor)** The famous medium rich text (unofficial product), is a nice rich text, easy to use, simple and clean, easy to write extensions. If you want to have a light and simple editor, this would be suitable. But in term of rich texts which can handle rich content (complex HTML, embeded media, support HTML mode...), this editor is not recommended.

- **[Squire](https://github.com/neilj/Squire)** A relatively light, rich text, only 11.5kb after compression, relative to other rich text is very small, recommended features is not complicated suggestion.

- **[slate](https://github.com/ianstormtaylor/slate)** A completely customizable framework for building rich text editors. Slate lets you build rich, intuitive editors like those in Medium, Dropbox Paper or Google Docs which are becoming table stakes for applications on the web without your codebase getting mired in complexity. This looks cool and potential.

Above rich editors are not related to vue, but they are easy to wrap into vue component, and in fact encapsulation vue components is very convenient, flexible and controllable. In addition vue really doesn't have any good rich text, unlike react has [draft](https://github.com/facebook/draft-js) produced by facebook, [editor](https://github.com/ory/editor) produced by ory. Vue doesn't have this product from a big company.

Of course, you can also choose some paid rich text editors, like [froala-editor](https://www.froala.com/wysiwyg-editor). There are many benefits of using commercial products, in fact, it may save a lot of cost compared to the development price.

## Tinymce

Here to briefly talk about the use of Tinymce in you own projects.

The current method of using the global reference. Code in: `public/static/tinymce4.7.5` (The files in the `public/static` directory will not be built by webpack), import directly in blade template file. And make sure it's in the order before your `app.js`!
```php
    <script src=/static/tinymce4.7.5/tinymce.min.js></script>
    <script src="{{ mix('js/vendor.js') }}"></script>
    <script src="{{ mix('js/manifest.js') }}"></script>
    <script src="{{ mix('js/app.js') }}"></script>
```

> The current use of the npm installation 'Tinymce' method is more complex and has some problems (which may be used in the future). :space_invader:

**Usage**
Because rich text is not suitable for two-way data, so only watch the content changes once, and then will not be watch again. If later you need to change the rich text content, you can set by `this.refs.xxx.setContent()`.

The source code is also very simple, any other needs can be modified in `@/components/Tinymce/index.vue`.

```html
<tinymce :height="300" v-model="content" id='tinymce'></tinymce>
```
