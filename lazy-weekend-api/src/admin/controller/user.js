const Base = require('./base.js');

module.exports = class extends Base {
  indexAction() {
    return this.display();
  }

  /**
   * 获取列表
   * @returns {Promise<*|boolean>}
   */
  async listAction() {
    const page = this.get('page') || 1;
    const size = this.get('size') || 5;
    const keyword = this.get('keyword'); // 搜索的数据库字段
    const value = this.get('value'); // 搜索的内容
    return this.success(await this.model('user').getUserList({
      page: page,
      size: size,
      keyword: keyword,
      value: value
    }), '数据获取成功');
  }

  /**
   * 添加用户
   */
  async addAction() {
    const email = this.post('email');
    const password = this.post('password');
    const isVerification = this.post('is_verification');
    const cover = this.post('cover');
    const name = this.post('name');
    const sex = this.post('sex');
    const lifeStatus = this.post('life_status');

    const id = await this.model('user').add({
      email: email,
      password: password,
      is_verification: isVerification,
      cover: cover,
      name: name,
      sex: sex,
      life_status: lifeStatus
    });
    if (!id) {
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
    const info = await this.model('user')
      .where({'id': id})
      .find();
    if (!info) {
      this.fail('获取数据失败');
    }
    return this.success(info, '获取数据成功');
  }

  /**
   * 修改数据
   * @returns {Promise<*|boolean>}
   */
  async updateAction() {
    const id = this.post('id');
    const email = this.post('email');
    const password = this.post('password');
    const isVerification = this.post('is_verification');
    const cover = this.post('cover');
    const name = this.post('name');
    const sex = this.post('sex');
    const lifeStatus = this.post('life_status');

    const affectedRows = await await this.model('user')
      .where({'id': id})
      .update({
        email: email,
        password: password,
        is_verification: isVerification,
        cover: cover,
        name: name,
        sex: sex,
        life_status: lifeStatus
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
    await this.model('user')
      .where({'id': id})
      .delete();

    return this.success('删除成功');
  }
};
