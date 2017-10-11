# console 简单的调试控制台，类似于web浏览器提供的javascript控制台
1. console (控制台)
* 一个 Console 类，包含 console.log() 、 console.error() 和 console.warn() 等方法，可以被用于写入到任何 Node.js 流。
* 一个全局的 console 实例，可被用于写入到 process.stdout 和 process.stderr。 全局的 console 使用时无需调用 require('console')。
**全局的 console 对象的方法既不总是同步的（如浏览器中类似的 API），也不总是异步的（如其他 Node.js 流）。**
```js
console.log('你好世界');
// 打印: '你好世界'到 stdout。
console.log('你好%s', '世界');
// 打印: '你好世界'到 stdout。
console.error(new Error('错误信息'));
// 打印: [Error: 错误信息]到 stderr。

const name = '描述';
console.warn(`警告${name}`);
// 打印: '警告描述'到 stderr。
```
2. Console 类
* Console 类可用于创建一个具有可配置的输出流的简单记录器，可以通过 require('console').Console 或 console.Console 使用
```js
const output = fs.createWriteStream('./stdout.log');
const errorOutput = fs.createWriteStream('./stderr.log');
// 自定义的简单记录器
const logger = new Console(output, errorOutput);
// 像 console 一样使用
const count = 5;
logger.log('count: %d', count);
// stdout.log 中打印: count 5
```
**全局的 console 是一个特殊的 Console 实例，它的输出会发送到 process.stdout 和 process.stderr。**
```js
new Console(process.stdout,process.stderr)
```
* console.count 8.3  维护一个指定 label 的内部计数器并且输出到 stdout 指定 label 调用 console.count() 的次数。
* console.countReset 8.3  搭配上面这个方法使用，重置计数器 
```js
> console.count()
default: 1
undefined
> console.count('default')
default: 2
undefined
> console.count('abc')
abc: 1
undefined
> console.count('xyz')
xyz: 1
undefined
> console.count('abc')
abc: 2
undefined
> console.count()
default: 3
undefined
>
```
* console.log（console.info是别名） console.error(console.warn别名) 没什么好说，打印
* console.dir(obj[, options]) 能把对象分层次打印出来，还能带颜色，option设置如下：
  1. showHidden - 如果为 true，则该对象中的不可枚举属性和 symbol 属性也会显示。默认为 false。
  2. depth - 告诉 util.inspect() 函数当格式化对象时要递归多少次。 这对于检查较大的复杂对象很有用。 默认为 2。 设为 null 可无限递归。
  3. colors - 如果为 true，则输出会带有 ANSI 颜色代码。 默认为 false。 颜色是可定制的，详见定制 util.inspect() 颜色。
* console.time(label)  启动一个定时器，用以计算一个操作的持续时间。 定时器由一个唯一的 label 标识。 当调用 console.timeEnd() 时，可以使用相同的 label 来停止定时器，并以毫秒为单位将持续时间输出到 stdout。 定时器持续时间精确到亚毫秒。
* console.timeEnd(label) 配合console.time使用，打印时间
* console.trace([message][, ...args]) 打印字符串 'Trace :' 到 stderr ，并通过 util.format() 格式化消息与堆栈跟踪在代码中的当前位置。
```js
console.trace('Show me');
// 打印: (堆栈跟踪会根据被调用的跟踪的位置而变化)
//  Trace: Show me
//    at repl:2:9
//    at REPLServer.defaultEval (repl.js:248:27)
//    at bound (domain.js:287:14)
//    at REPLServer.runBound [as eval] (domain.js:300:12)
//    at REPLServer.<anonymous> (repl.js:412:12)
//    at emitOne (events.js:82:20)
//    at REPLServer.emit (events.js:169:7)
//    at REPLServer.Interface._onLine (readline.js:210:10)
//    at REPLServer.Interface._line (readline.js:549:8)
//    at REPLServer.Interface._ttyWrite (readline.js:826:14)
```