const Base = require('./base.js');

module.exports = class extends Base {
  indexAction() {
    return this.display();
  }

  /**
   * 获取分类列表
   * @returns {Promise<*|boolean>}
   */
  async listAction() {
    return this.success(await this.model('type').select(), '数据获取成功');
  }
};
