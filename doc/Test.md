#Test
##Flow
- 如果你想让 Flow 忽略下一行代码，你可以用上面的注释方法；它的用法和 eslint-disable 很像

- // @flow 注释告诉 Flow： 这个文件需要进行类型检查。为了测试，我们的注释基本上就是在参数或方法名后加一个冒号，关于 Flow 注释的更多使用方法，请查看 文档 。

npm test 不光进行规范检查, 还进行类型检查

##jest
--coverage 让 Jest 自动生成测试覆盖率信息。观察覆盖率信息，就能知道哪些文件缺乏测试了。覆盖率信息保存在 coverage 文件夹下。

把 /coverage/ 添加到 .gitignore


在 .eslintrc.json 加入如下内容之后，你就不用再在测试文件里引用 Jest 包了。

"env": {
  "jest": true
}

.babelrc

"ignore": [],
ß"env": {
  "test": {
    "presets":[
      ["es2015", { "modules": false }],
      "react",
      "stage-1",
      "flow"
    ],
    "plugins": [
      "syntax-dynamic-import",
      "transform-runtime",
      "transform-es2015-modules-commonjs",
      "dynamic-import-node"
    ]
  }
},
