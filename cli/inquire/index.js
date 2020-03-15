
var CheckboxNode = require('./CheckboxNode');
var InputNode = require('./InputNode');
var ListNode = require('./ListNode');
var ConfirmationNode = require('./ConfirmationNode');

class inquirer{
  constructor(run){
    this.run = run;
  }
  /**
   * 确认框
   */
  ConfirmationNode(title){
    var node =  new ConfirmationNode(title);
    return node.run();
  }

  /**
   * 输入框
   */
  InputNode(title, config){
    var node =  new InputNode(title, config);
    return node.run();
  }

  CheckboxNode(){

  }

  /**
   * 列表节点
   * @param {string} title 
   * @param {Array} choices 
   */
  ListNode(title, choices){
    var node = new ListNode(title, choices);
    return node.run();
  }

}

module.exports = inquirer;