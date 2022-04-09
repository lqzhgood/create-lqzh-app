#!/usr/bin/env node

/*
 * @Description:
 * @Author: lqzh
 * @Date: 2022-04-09 00:03:46
 * @LastEditTime: 2022-04-09 10:45:42
 */

console.log('process.version', process.version);
const { program } = require('commander');
const download = require('download-git-repo');
const handlebars = require('handlebars');
const inquirer = require('inquirer');
const ora = require('ora');
const logSymbols = require('log-symbols');
const chalk = require('chalk');
const fs = require('fs');

// const templates = require('./templete');

const templates = {
    'template-vue': {
        url: 'https://gitee.com/RachelZ8/template-vue',
        downloadUrl: 'https://gitee.com:RachelZ8/template-vue#master',
        description: 'vue模版',
    },
    'template-react': {
        url: 'https://gitee.com/RachelZ8/template-react',
        downloadUrl: 'https://gitee.com:RachelZ8/template-react#master',
        description: 'react模版',
    },
};

//create-app init template-vue test-vue基于template-vue模版进行初始化
//create-app init template-react test-react基于template-react模版进行初始化

program.version('1.0.0'); // -v 或者 --versions输出版本号

program
    .command('init <template> <project>')
    .description('初始化项目模版')
    .action((templateName, projectName) => {
        // 下载之前做loading提示
        const spinner = ora('正在下载模版...').start();
        if (!templates[templateName]) {
            spinner.fail();
            console.log(logSymbols.error, chalk.red('未找到模板'));
            return;
        }
        const { downloadUrl } = templates[templateName];
        //download
        // 第一个参数： 仓库地址
        // 第二个参数： 下载路径
        download(downloadUrl, projectName, { clone: true }, err => {
            if (err) {
                spinner.fail();
                console.log(logSymbols.error, chalk.red(err));
                return;
            }
            spinner.succeed(); // 下载成功提示
            // 把项目下的package.json文件读取出来
            // 使用向导的方式采集用户输入的数据解析导
            // 使用模板引擎把用户输入的数据解析到package.json 文件中
            // 解析完毕，把解析之后的结果重新写入package.json 文件中
            inquirer
                .prompt([
                    {
                        type: 'inpute',
                        name: 'name',
                        message: '请输入项目名称',
                    },
                    {
                        type: 'inpute',
                        name: 'description',
                        message: '请输入项目简介',
                    },
                    {
                        type: 'inpute',
                        name: 'author',
                        message: '请输入作者名称',
                    },
                ])
                .then(answers => {
                    const packagePath = `${projectName}/package.json`;
                    const packageContent = fs.readFileSync(packagePath, 'utf8');
                    const packageResult = handlebars.compile(packageContent)(answers);
                    fs.writeFileSync(packagePath, packageResult);
                    console.log(chalk.yellow('初始化模版成功'));
                });
        });
    });

program.parse(process.argv);
