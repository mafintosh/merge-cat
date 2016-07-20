#!/usr/bin/env node

var cat = require('./')
var fs = require('fs')
var from = require('from2')
var minimist = require('minimist')

var argv = minimist(process.argv.slice(2), {
  alias: {
    follow: 'f',
    tail: 't'
  }
})

if (!argv._.length) {
  console.error('Usage: merge-cat file1 file2 ... [options]')
  console.error('  --follow, -f  to keep reading the files')
  console.error('  --tail, -t    to only tail and keep reading')
}

var stream = argv._
  .map(function (name) {
    return (argv.follow || argv.tail) ? tail(name) : fs.createReadStream(name)
  })
  .reduce(function (a, b) {
    return cat(a, b)
  })

stream.pipe(process.stdout)

function tail (name) {
  var fd = -1
  var pos = 0

  return from(read)

  function open (size, cb) {
    fs.open(name, 'r', function (err, res) {
      if (err) return cb(err)
      fd = res
      fs.fstat(fd, function (err, st) {
        if (err) return cb(err)
        if (argv.tail) pos = st.size
        read(size, cb)
      })
    })
  }

  function read (size, cb) {
    if (fd === -1) return open(size, cb)

    var buf = Buffer(size)

    fs.read(fd, buf, 0, size, pos, function (err, n) {
      if (err) return cb(err)
      if (!n) return setTimeout(read.bind(null, size, cb), 200)
      pos += n
      cb(null, buf.slice(0, n))
    })
  }
}
