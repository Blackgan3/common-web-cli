const chalk = require('chalk');

exports.templateIdEnum = {
  'react': 1,
  'reactTypescript': 2,
};

/** 
 * templateId : 模版id
 * url: 模版仓库，可以是远程地址，也可以是本地地址
 * cmd: 模版执行命令
 */
console.log('test')
exports.templateChoiceList = [
  {
    name: `${chalk.green('React')}`,
    value: {
      templateId: this.templateIdEnum.react,
      url: 'https://github.com/Blackgan3/WeChat.git', 
      cmd: 'npm start',
    },
  },
  {
    name: `${chalk.green('React + Typescript')}`,
    value: {
      templateId: this.templateIdEnum.reactTypescript,
      url: '',
      cmd: 'npm run dev',
    },
  },
]