
var inquire = require('inquirer');

class CheckboxNode {
  constructor (boxname, boxList) {
    this.boxname = boxname;
    this.boxList = boxList;

    return this.run.bind(this);
  }

  async run() {
    const {value} =  await inquire.prompt([{
      type: 'checkbox',
      name: 'value',
      message: this.boxname,
      choices: this.boxList,
    }]);

    return value;
  }

}

module.exports = CheckboxNode;