# buffer 缓冲
> 在 ECMAScript 2015 (ES6) 引入 TypedArray 之前，JavaScript 语言没有读取或操作二进制数据流的机制。 Buffer 类被引入作为 Node.js API 的一部分，使其可以在 TCP 流或文件系统操作等场景中处理二进制数据流。
> Buffer 类的实例类似于整数数组，但 Buffer 的大小是固定的、且在 V8 堆外分配物理内存。 Buffer 的大小在被创建时确定，且无法调整。
> Buffer 类在 Node.js 中是一个全局变量，因此无需使用 require('buffer').Buffer。
> 在 Node.js v6 之前的版本中，Buffer 实例是通过 Buffer 构造函数创建的，它根据提供的参数返回不同的 Buffer
> 因为 new Buffer() 的行为会根据所传入的第一个参数的值的数据类型而明显地改变，所以如果应用程序没有正确地校验传给 new Buffer() 的参数、或未能正确地初始化新分配的 Buffer 的内容，就有可能在无意中为他们的代码引入安全性与可靠性问题。
> 为了使 Buffer 实例的创建更可靠、更不容易出错，各种 new Buffer() 构造函数已被 废弃，并由 Buffer.from()、Buffer.alloc()、和 Buffer.allocUnsafe() 方法替代。
**buffer对象不同于其他对象，不经过V8的内存分配机制，所以也不会有堆内存的大小限制**
**buffer对象内存分配不是在V8的堆内存中，在node的c++层面实现内存的申请**
```js
// 创建一个长度为 10、且用 0 填充的 Buffer。
const buf1 = Buffer.alloc(10);

// 创建一个长度为 10、且用 0x1 填充的 Buffer。 
const buf2 = Buffer.alloc(10, 1);

// 创建一个长度为 10、且未初始化的 Buffer。
// 这个方法比调用 Buffer.alloc() 更快，
// 但返回的 Buffer 实例可能包含旧数据，
// 因此需要使用 fill() 或 write() 重写。
const buf3 = Buffer.allocUnsafe(10);

// 创建一个包含 [0x1, 0x2, 0x3] 的 Buffer。
const buf4 = Buffer.from([1, 2, 3]);

// 创建一个包含 UTF-8 字节 [0x74, 0xc3, 0xa9, 0x73, 0x74] 的 Buffer。
const buf5 = Buffer.from('tést');

// 创建一个包含 Latin-1 字节 [0x74, 0xe9, 0x73, 0x74] 的 Buffer。
const buf6 = Buffer.from('tést', 'latin1');
```
* Buffer.from(array) 返回一个新建的包含所提供的字节数组的副本的 Buffer。
* Buffer.from(arrayBuffer[, byteOffset [, length]]) 返回一个新建的与给定的 ArrayBuffer 共享同一内存的 Buffer。
* Buffer.from(buffer) 返回一个新建的包含所提供的 Buffer 的内容的副本的 Buffer。
* Buffer.from(string[, encoding]) 返回一个新建的包含所提供的字符串的副本的 Buffer。
* Buffer.alloc(size[, fill[, encoding]]) 返回一个指定大小的被填满的 Buffer 实例。 这个方法会明显地比 Buffer.allocUnsafe(size) 慢，但可确保新创建的 Buffer 实例绝不会包含旧的和潜在的敏感数据。alloc翻译是分配安置
  1. size<integer>新建buffer期望长度,size大于buffer.contants.MAX_LENGTH或小于0则rangeError错误，size为0，创建长度为0的Buffer。size非数据，typeError错误。
  2. fill<string>|<buffer>|<integer>用来填充新建buffer的值。默认为0。指定了fill,则调用buf.fill(fill)初始化分配buffer
  3. encoding<string>如果fill是字符串，则改值是它的字符编码，默认'utf-8'.指定了encoding,调用buf.fill(fill,encoding)初始化分配的buffer
  **调用比buffer.allocUnsafe慢，但是保证新建的buffer实例不包含敏感数据**
* Buffer.allocUnsafe(size) 与 Buffer.allocUnsafeSlow(size) 返回一个新建的指定 size 的 Buffer，但它的内容必须被初始化，可以使用 buf.fill(0) 或完全写满。
* Buffer.allocUnsafeSlow(size)
  >注意，Buffer 模块会预分配一个大小为 Buffer.poolSize 的内部 Buffer 实例作为快速分配池， 用于使用 Buffer.allocUnsafe() 新创建的 Buffer 实例，以及废弃的 new Buffer(size) 构造器， 仅限于当 size 小于或等于 Buffer.poolSize >> 1 （Buffer.poolSize 除以2后的最大整数值）。
  >对这个预分配的内部内存池的使用，是调用 Buffer.alloc(size, fill) 和 Buffer.allocUnsafe(size).fill(fill) 的关键区别。 具体地说，如果 size 小于或等于 Buffer.poolSize 的一半，则 Buffer.alloc(size, fill) 不会使用这个内部的 Buffer 池，而 Buffer.allocUnsafe(size).fill(fill) 会使用这个内部的 Buffer 池。 当应用程序需要 Buffer.allocUnsafe() 提供额外的性能时，这个细微的区别是非常重要的。
> 如果 size 小于或等于 Buffer.poolSize 的一半，则 Buffer.allocUnsafe() 返回的 Buffer 实例可能会被分配进一个共享的内部内存池。
* --zero-fill-buffers 命令行选项
>Node.js 可以在一开始就使用 --zero-fill-buffers 命令行选项强制所有使用 new Buffer(size) 、Buffer.allocUnsafe() 、Buffer.allocUnsafeSlow() 或 new SlowBuffer(size) 新分配的 Buffer 实例在创建时自动用 0 填充。 使用这个选项会改变这些方法的默认行为，且对性能有明显的影响。 建议只在需要强制新分配的 Buffer 实例不能包含潜在的敏感数据时才使用 --zero-fill-buffers 选项。
* 是什么令 Buffer.allocUnsafe() 和 Buffer.allocUnsafeSlow() 不安全？
>当调用 Buffer.allocUnsafe() 和 Buffer.allocUnsafeSlow() 时，被分配的内存段是未初始化的（没有用 0 填充）。 虽然这样的设计使得内存的分配非常快，但已分配的内存段可能包含潜在的敏感旧数据。 使用通过 Buffer.allocUnsafe() 创建的没有被完全重写内存的 Buffer ，在 Buffer 内存可读的情况下，可能泄露它的旧数据。虽然使用 Buffer.allocUnsafe() 有明显的性能优势，但必须额外小心，以避免给应用程序引入安全漏洞。
## Buffer与字符编码
>Buffer 实例一般用于表示编码字符的序列，比如 UTF-8 、 UCS2 、 Base64 、或十六进制编码的数据。 通过使用显式的字符编码，就可以在 Buffer 实例与普通的 JavaScript 字符串之间进行相互转换。目前支持的字符编码：
  * 'ascii' - 仅支持 7 位 ASCII 数据。如果设置去掉高位的话，这种编码是非常快的。
  * 'utf8' - 多字节编码的 Unicode 字符。许多网页和其他文档格式都使用 UTF-8 。
  * 'utf16le' - 2 或 4 个字节，小字节序编码的 Unicode 字符。支持代理对（U+10000 至 U+10FFFF）。
  * 'ucs2' - 'utf16le' 的别名。
  * 'base64' - Base64 编码。当从字符串创建 Buffer 时，按照 RFC4648 第 5 章的规定，这种编码也将正确地接受“URL 与文件名安全字母表”。
  * 'latin1' - 一种把 Buffer 编码成一字节编码的字符串的方式（由 IANA 定义在 RFC1345 第 63 页，用作 Latin-1 补充块与 C0/C1 控制码）。
  * 'binary' - 'latin1' 的别名。
  * 'hex' - 将每个字节编码为两个十六进制字符。
**现代浏览器遵循 WHATWG 编码标准 将 'latin1' 和 ISO-8859-1 别名为 win-1252。 这意味着当进行例如 http.get() 这样的操作时，如果返回的字符编码是 WHATWG 规范列表中的，则有可能服务器真的返回 win-1252 编码的数据，此时使用 'latin1' 字符编码可能会错误地解码数据。**
## Buffer 与 TypedArray
>Buffer 实例也是 Uint8Array 实例。 但是与 ECMAScript 2015 中的 TypedArray 规范还是有些微妙的不同。 例如，当 ArrayBuffer#slice() 创建一个切片的副本时，Buffer#slice() 的实现是在现有的 Buffer 上不经过拷贝直接进行创建，这也使得 Buffer#slice() 更高效。
>遵循以下注意事项，也可以从一个 Buffer 创建一个新的 TypedArray 实例：
  1. Buffer 对象的内存是拷贝到 TypedArray 的，而不是共享的。
  2. Buffer 对象的内存是被解析为一个明确元素的数组，而不是一个目标类型的字节数组。 也就是说，new Uint32Array(Buffer.from([1, 2, 3, 4])) 会创建一个包含 [1, 2, 3, 4] 四个元素的 Uint32Array，而不是一个只包含一个元素 [0x1020304] 或 [0x4030201] 的 Uint32Array 。
>也可以通过 TypeArray 对象的 .buffer 属性创建一个新建的且与 TypedArray 实例共享同一分配内存的 Buffer 。
```js
const arr = new Uint16Array(2);

arr[0] = 5000;
arr[1] = 4000;

// 拷贝 `arr` 的内容
const buf1 = Buffer.from(arr);

// 与 `arr` 共享内存
const buf2 = Buffer.from(arr.buffer);

// 输出: <Buffer 88 a0>
console.log(buf1);

// 输出: <Buffer 88 13 a0 0f>
console.log(buf2);

arr[1] = 6000;

// 输出: <Buffer 88 a0>
console.log(buf1);

// 输出: <Buffer 88 13 70 17>
console.log(buf2);
```
**注意，当使用 TypedArray 的 .buffer 创建 Buffer 时，也可以通过传入 byteOffset 和 length 参数只使用 ArrayBuffer 的一部分。**
```js
const arr = new Uint16Array(20);
const buf = Buffer.from(arr.buffer, 0, 16);

// 输出: 16
console.log(buf.length);
```
## Buffer 与 ES6 迭代器
>Buffer 实例可以使用 ECMAScript 2015 (ES6) 的 for..of 语法进行遍历。
```js
const buf = Buffer.from([1, 2, 3]);

// 输出:
//   1
//   2
//   3
for (const b of buf) {
  console.log(b);
}
```
>此外，buf.values() 、buf.keys() 和 buf.entries() 方法可用于创建迭代器。
