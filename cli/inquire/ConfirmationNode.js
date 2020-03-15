
var inquire = require('inquirer');

class ConfirmNode {
  constructor (title) {
    this.title = title;
  }

  async run() {
    const {title} = this; 
    const value = await inquire.prompt([{
      type: 'confirm',
      name: 'value',
      message: title,
    },]);
    return value;
  }

}

module.exports = ConfirmNode;