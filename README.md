# merge-cat

Cat tool that does a streaming merge sort on the input and outputs the lines of files concatenated in sort order.
Expects the input files to be sorted as well

```
npm install -g merge-cat
```

## Usage

``` sh
npm install -g merge-cat
# will stream out the sorted concatenation of the two files
merge-cat sorted-file-1 sorted-file-2
```

If you want to keep reading the files (useful if you are catting logs) use `--follow`

``` sh
merge-cat sorted-file-1 sorted-file-2 --follow
```

If you only want to read from the end of the files use `--tail`

``` sh
merge-cat sorted-file-1 sorted-file-2 --tail
```

## JS API

There is a js api available as well

``` js
var merge = require('merge-cat')
var stream = merge(sortedStream1, sortedStream2)
stream.pipe(process.stdout)
```

## License

MIT
