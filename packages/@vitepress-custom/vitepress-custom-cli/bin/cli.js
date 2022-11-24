#!/usr/bin/env node

import fs from "fs-extra";
import path from "path";
import chalk from 'chalk';
import figlet from 'figlet';

// create
import create from '../lib/create.js';

// "commander" is a complete solution for node.js command-line interfaces.
import { Command } from 'commander';
const program = new Command();
program
    // 定义命令和参数
    .command('create <app-name>')
    .description('create a new project')
    // -f or --force 为强制创建，如果创建的目录存在则直接覆盖
    .option('-f, --force', 'overwrite target directory if it exist')
    .action((name, options) => {
        create(name, options);
    });

// function getPackage() {
//     return JSON.parse(fs.readFileSync(path.join(process.cwd(), 'package.json')));
// }
// program
//     // 配置版本信息
//     .version(`v${getPackage().version}`, '-v, --version', 'output the current version')
//     .usage('<command> [option]');// 帮助信息提示

program
    .on('--help', () => {
        // print logo
        console.log('\r\n' + chalk.hex('#41B883').bgHex('#35495E').bold(figlet.textSync(' vitepress-custom  ', {
            font: 'Standard',
            horizontalLayout: 'default',
            verticalLayout: 'default',
            width: 90,
            whitespaceBreak: false
        })));
        // 新增说明信息
        console.log(`\r\nRun ${chalk.blue.bold(`vitepress-custom <command> --help`)} for detailed usage of given command\r\n`);
    });

// 解析用户执行命令传入参数
program.parse(process.argv);