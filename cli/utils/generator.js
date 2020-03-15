

const fs = require('fs');
const rm = require('rimraf').sync;
const download = require('download-git-repo');
const path = require('path');
const chalk = require('chalk');
const { home } = require('user-path');
const execSync = require('child_process').execSync;

const TEMP_DIR = path.join(home(), '/template');
const exists = fs.existsSync;


module.exports = class Generator {

  constructor(options = {}){
    this.url = options.url || '';
    this.projectName = options.projectName;
    this.projectDesc = options.projectDesc || 'an web app';
    this.tmpDir = TEMP_DIR;
  }

  /**
   * 从代码仓库下载模板
   * @param  {String} url 
   * @return {String}     下载后路径
   */
  downloadTemplate() {
    return new Promise((resolve, reject) => {
      if (exists(this.url)) {
        // 本地模板
        shell.exec(`cp -r ${this.url} ${this.tmpDir}`);
        if (exists(path.resolve(this.tmpDir, '.gitignore'))) {
          let ignoreFile = fs.readFileSync(path.resolve(this.tmpDir, '.gitignore'), 'utf-8');
          rm(path.resolve(this.tmpDir, '.git'));
          ignoreFile = ignoreFile.split('\n').filter(str => {
            str.replace(/^(\s+)?#/g, '#');
            return str.length > 0 && str[0] !== '#';
          });
          ignoreFile.forEach(file => {
            rm(path.resolve(this.tmpDir, file));
          });
        }
        resolve();
      } else {
        // 远程模板
        let cmdStr = `git clone ${this.url} ${this.projectName}`;
        execSync(cmdStr, (error, stdout, stderr) => {
          if (error) {
            console.error(`${chalk.red(JSON.stringify(error))}`);
            reject()
          }
          resolve();
        })
      
      }
    });
  }

  async init(callback) {
    process.on('exit', () => {
      rm(this.tmpDir);
    });
    if (!this.url || !this.projectName) {
      console.error('generator Function: 参数有误，请检查');
      return;
    }

    this.downloadTemplate().then(function(res){
      console.log(res);
      // 成功回调
      callback && callback();
    }).catch(function(err){
      console.log(err);
    })

    
  }
}
