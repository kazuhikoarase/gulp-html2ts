gulp-html2ts
===
This plugin make html to typescript.

Before

```html
<div>
</div>
```

After

```typescript
namespace a.b.c { export var `<div></div>` }
```

## Usage

With merge-stream and gulp-rename plugin, append htmls to typescript source set.

```typescript
gulp.src('src/main/ts/**/*.ts')
```

```typescript
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
