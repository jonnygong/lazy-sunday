const Base = require('./base.js');

module.exports = class extends Base {
  indexAction() {
    return this.display();
  }

  /**
   * 获取地区列表
   * @returns {Promise<*|boolean>}
   */
  async listAction() {
    return this.success(await this.model('area').select(), '数据获取成功');
  }
};
