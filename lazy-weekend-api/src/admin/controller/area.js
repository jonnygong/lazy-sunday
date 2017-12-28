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
    const page = this.get('page') || 1;
    const size = this.get('size') || 5;
    const keyword = this.get('keyword'); // 搜索的数据库字段
    const value = this.get('value'); // 搜索的内容
    return this.success(await this.model('area').getAreaList({
      page: page,
      size: size,
      keyword: keyword,
      value: value
    }), '数据获取成功');
  }

  /**
   * 获取列表
   * @returns {Promise<*|boolean>}
   */
  async selectAction() {
    return this.success(await this.model('area').select(), '数据获取成功');
  }

  /**
   * 添加地区
   */
  async addAction() {
    const areaName = this.post('area_name');

    const areaId = await this.model('area').add({
      area_name: areaName
    });
    if (!areaId) {
      return this.fail('数据添加失败');
    }
    return this.success('添加数据成功');
  }

  /**
   * 获取数据详情
   * @returns {Promise<*|boolean>}
   */
  async detailAction() {
    const id = this.get('id');
    const areaInfo = await this.model('area')
      .where({'id': id})
      .find();
    if (!areaInfo) {
      this.fail('获取数据失败');
    }
    return this.success(areaInfo, '获取数据成功');
  }

  /**
   * 修改数据
   * @returns {Promise<*|boolean>}
   */
  async updateAction() {
    const id = this.post('id');
    const areaName = this.post('area_name');

    const affectedRows = await await this.model('area')
      .where({'id': id})
      .update({
        area_name: areaName
      });
    if (affectedRows === 0) {
      return this.fail('数据修改失败');
    }
    return this.success('修改数据成功');
  }

  /**
   * 删除单条数据
   * @returns {Promise<*|boolean>}
   */
  async deleteAction() {
    const id = this.post('id');
    await this.model('area')
      .where({'id': id})
      .delete();

    return this.success('删除成功');
  }
};
