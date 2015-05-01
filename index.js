module.exports = reduceReadable


// Reduce the readable stream `readable` with optional reducer and
// initial value. Defaults to concatenating stream as string.
// Returns promise of the reduced value

function reduceReadable(readable, reduce, initial) {
    reduce = reduce || concat
    var val = initial || ''
    var resolved = false;

    return new Promise(function (resolve, reject) {
        function finish(err) {
            if (resolved) return
            resolved = true
            if (err) {
                reject(err)
            } else {
                resolve(val)
            }
        }
        readable.on('data', function (data) {
            val = reduce(val, data);
        })
        readable.on('end', function () {
            finish()
        })
        readable.on('error', function (err) {
            finish(err)
        })
    })
}

function concat (acc, cur) {
    return acc + cur;
}