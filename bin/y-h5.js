#!/usr/bin/env node

const initAction = require("../cli/command/init");
const program = require('commander');
const chalk = require('chalk');
const pkg = require('../package.json');

process.env.NODE_PATH = __dirname + '/../node_modules/';

// 定义当前版本
program
    .version(require('../package').version );

// 定义使用方法
program
    .usage('<command>')

program.command("init")
    .alias("i")
    .description("init a new project")
    .action(async function(){
        await initAction();
    })
    .on('--help', () => {
        console.log();
        console.log('Examples:');
        console.log('  # create a new project');
        console.log();
    });


program.command("add")
    .alias("a")
    .description("添加项目模块")
    .action(function(){
        console.log("add page");
    });

program.command("dev")
    .alias("d")
    .description("dev 构建")
    .action(function(){
        console.log("dev project");
    });

program.command("version")
    .alias("v")
    .description("获取版本号")
    .action(function(){
        console.log("获取版本号");
    });

program.parse(process.argv);

if(!program.args.length){
    program.help()
}