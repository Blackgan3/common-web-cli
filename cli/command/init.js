// 初始化项目

const  InquirerClass = require('../inquire');
const { templateChoiceList, templateIdEnum } = require('../config');
const path = require('path');
const fs = require('fs-extra');
const Generator = require('../utils/generator'); 
const chalk = require('chalk');


var Inquirer = new InquirerClass();


var initObj = {
  getParams: async function () {
    // 选择项目模版
    const { templateId, url, cmd } = await Inquirer.ListNode('请选择项目模版', templateChoiceList);
    let reactTemplateConfig = {};
    if (templateId === templateIdEnum.react) {
      reactTemplateConfig = await this.getReactTemplatePluginConfig();
    }

    // 获取当前用户git信息

    // 输入项目名称(判断名字,仅支持英文)
    const projectName = await Inquirer.InputNode('请输入项目名称', {
      validate: function (value) {
        if (String(value).length > 0) {
          return true;
        }
        return '请输入项目名称';
      }
    });

    const projectDesc = await Inquirer.InputNode('请输入项目描述');

    // 输入仓库地址
    const projectGitUrl = await Inquirer.InputNode('请输入项目git仓库地址');
    if (!projectGitUrl) {
      const needAutuGitUrl = await Inquirer.ConfirmationNode('是否需要自动生成git仓库');
      if (needAutuGitUrl.value) {
        // 根据自己业务自动生成仓库

      }
    }
    const params = {
      templateId,
      templateurl:url,
      templateCmd: cmd,
      reactTemplateConfig,
      projectName,
      projectDesc,
      projectGitUrl
    };

    return params;
  },

  getReactTemplatePluginConfig: async function () {
    const needRedux = await Inquirer.ConfirmationNode('是否需要redux');
    return {
      needRedux
    }
  },

  create: async function ({
    templateId,
    templateurl,
    templateCmd,
    reactTemplateConfig,
    projectName,
    projectDesc,
    projectGitUrl
  }) {
    
    const targetDir = path.resolve(projectName);
    if (fs.existsSync(targetDir)) {
      const overwrite = await Inquirer.ConfirmationNode(`目标文件夹 ${chalk.cyan(targetDir)} 已存在, 是否继续创建?`)

      if (overwrite) {
        await fs.remove(targetDir);
      } else {
        console.log('退出构建');
        return;
      }
    }

    // 根据参数，拉取模版，此处为拉取远程分支模版示例
    const G = new Generator({
      url: templateurl,
      templateCmd,
      projectName,
      projectDesc,
    });
    G.init(async () => {
      console.log(chalk.green(`项目${projectName}创建成功`))
    });

  }

}




async function init() {
  const params = await initObj.getParams();
  await initObj.create(params);
}


module.exports = init;