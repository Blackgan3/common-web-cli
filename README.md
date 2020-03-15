### 安装流程
安装y-cli，依赖Node.js，最低版本要求为8.x

### bin入口文件
package.json文件是包配置文件，很多工具都是基于此提供入口程序，比如Node请求package.json中的main
字段，npm请求scripts字段，而Commander请求的是bin字段
```js
"bin": {
    "y-h5-cli": "y-h5.js"
}
```
### commander的使用
TJ大神所做，用来开发命令行命令的组件，

### inquirer.js
给node.js开发这提供一个可嵌入式的美观的命令行界面
* 提供错误回调
* 询问操作这问题
* 获取并解析用户输入
* 检测用户回答是否合法
* 管理多层级的提示


### cli脚本命令

#### y-cli init

#### y-cli add

#### y-cli test

#### y-cli dev 

#### y-cli build

#### y-cli publish

#### y-cli list 
列出脚手架支持的模版列表

#### y-cli help
查看帮助命令