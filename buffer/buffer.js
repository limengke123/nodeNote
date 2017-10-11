const test1 = () => {
    const buf = Buffer.from('hello world', 'ascii');

    // 输出 68656c6c6f20776f726c64
    console.log(buf.toString('hex'));

    // 输出 aGVsbG8gd29ybGQ=
    console.log(buf.toString('base64'));

    //输出hello world
    console.log(buf.toString('ascii'))
}

// test1()

const test2 = () => {
    const buf = Buffer.from([1, 2, 3]);

    // 输出:
    //   1
    //   2
    //   3
    for (const b of buf) {
        console.log(b);
    }
}

// test2()

const test3 = () => {
    const str = "深入浅出node.js"
    const buf = Buffer.from(str, 'utf-8')
    console.log(buf)
    console.log(buf.length)
    console.log(buf.toString('utf-8'))
}
// test3()

const test4 = () => {
    const buf1 = Buffer.alloc(10);
    const buf2 = Buffer.alloc(14);
    const buf3 = Buffer.alloc(18);
    const totalLength = buf1.length + buf2.length + buf3.length;

    // 输出: 42
    console.log(totalLength);

    const bufA = Buffer.concat([buf1, buf2, buf3], totalLength);

    // 输出: <Buffer 00 00 00 00 ...>
    console.log(bufA);

    // 输出: 42
    console.log(bufA.length);
}
// test4()

