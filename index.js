#!/usr/bin/env node

/*
 * @Description:
 * @Author: lqzh
 * @Date: 2022-04-09 00:03:46
 * @LastEditTime: 2022-04-26 11:01:59
 */

const fs = require('fs-extra');
const path = require('path');
const { program } = require('commander');
const download = require('download-git-repo');
const handlebars = require('handlebars');
const inquirer = require('inquirer');
const ora = require('ora');
const logSymbols = require('log-symbols');
const chalk = require('chalk');
const exec = require('child_process').execSync;

const templates = require('./template.js');

program.version('1.0.0'); // -v 或者 --versions输出版本号

program
    .command('init <template>')
    .description('初始化项目模版')
    .action(templateName => {
        // 下载之前做loading提示
        const spinner = ora('正在下载模版...').start();

        const tmpl = templates.find(v => v.key === templateName);
        if (!tmpl) {
            spinner.fail();
            console.log(logSymbols.error, chalk.red('未找到模板'));
            return;
        }

        const { downloadUrl } = tmpl;
        //download
        // 第一个参数： 仓库地址
        // 第二个参数： 下载路径
        download(downloadUrl, './', { clone: true }, err => {
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

            if (!fs.existsSync('./tmpl')) return;

            const prompt =  require(path.resolve('./tmpl/prompt.js'));
            const files  =  require(path.resolve('./tmpl/files.js'));

            inquirer
                .prompt(prompt)
                .then(answers => {
                    for (let i = 0; i < files.length; i++) {
                        const f = files[i];
                        const content = fs.readFileSync(f, 'utf8');
                        const result = handlebars.compile(content)({
                            ...answers,
                            nodeVersion: process.version,
                            npmVersion: exec('npm -v').toString(),
                        });
                        fs.writeFileSync(f, result);
                    }
                    console.log(chalk.yellow('初始化模版成功'));
                })
                .then(() => {
                    fs.removeSync('./tmpl');
                    exec(tmpl.script?.post, { stdio: 'inherit' });
                });
        });
    });

program
    .command('list')
    .description('查看所有可用的模版')
    .action(() => {
        console.log(
            '\nkey\tdescription\n======================\n' +
                templates.map(v => `${v.key}\t${v.description}`).join('\n'),
        );
    });

program.parse(process.argv);
