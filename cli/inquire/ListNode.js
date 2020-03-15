
var inquire = require('inquirer');

class ListNode {
  constructor (title, choices) {
    this.title = title;
    this.choices = choices;
  }

  async run() {
    const { title, choices } = this;
    const { value } = await inquire.prompt([{
      type: 'list',
      name: 'value',
      message: title,
      choices: choices,
    },]);

    return value;
  }

}

module.exports = ListNode;