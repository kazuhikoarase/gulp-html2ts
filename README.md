gulp-html2ts
===
This plugin filter html to typescript.

### Input

MyView.html

```html
<div>
</div>
```

### Output

```typescript
namespace a.b.c { export var MyView = `<div></div>` }
```

## Usage

With merge-stream and gulp-rename plugin, append htmls to typescript source set.

```javascript
gulp.src('src/main/ts/**/*.ts')
```

In this case, FooBar.html filtered to _FooBar.html.ts

```javascript
const mergeStream = require('merge-stream');
const rename = require('gulp-rename');
const html2ts = require('gulp-html2ts');

  ...

mergeStream(
  gulp.src('src/main/ts/**/*.ts'),
  gulp.src('src/main/ts/**/*.html')
    .pipe(html2ts() )
    .pipe(rename(function(path) {
      path.basename = '_' + path.basename;
      path.extname += '.ts';
    }) )
)
```
