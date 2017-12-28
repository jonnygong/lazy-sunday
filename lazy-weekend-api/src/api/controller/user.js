const Base = require('./base.js');

module.exports = class extends Base {
  indexAction() {
    return this.success('OK');
  }

  /**
   * 用户注册
   * @returns {Promise<*|boolean>}
   */
  async regAction() {
    const email = this.post('email');
    const password = this.post('password');

    const model = this.model('user');
    const userInfo = await model.where({email: email}).find();
    if (!think.isEmpty(userInfo)) {
      return this.fail('帐号已经被注册了');
    }

    const insertId = await model.add({email: email, password: think.md5(password), create_time: new Date().getTime()});
    const TokenSerivce = this.service('token', 'api');
    const sessionKey = await TokenSerivce.create({
      user_id: insertId
    });

    if (think.isEmpty(sessionKey)) {
      return this.fail('登录失败');
    }

    return this.success({token: sessionKey}, '用户创建成功');
  }

  /**
   * 用户登录
   * @returns {Promise<*|boolean>}
   */
  async loginAction() {
    const email = this.post('email');
    const password = this.post('password');

    const model = this.model('user');
    const userInfo = await model.where({email: email, password: think.md5(password)}).find();
    if (think.isEmpty(userInfo)) {
      return this.fail('帐号密码错误，请重新登录');
    }

    const TokenSerivce = this.service('token', 'api');
    const sessionKey = await TokenSerivce.create({
      user_id: userInfo.id
    });

    if (think.isEmpty(sessionKey)) {
      return this.fail('登录失败');
    }

    return this.success({userInfo: userInfo, token: sessionKey}, '登录成功');
  }

  /**
   * 获取用户信息
   * @returns {Promise<*|boolean>}
   */
  async infoAction() {
    const userInfo = await this.model('user').where({id: think.userId}).find();

    if (think.isEmpty(userInfo)) {
      return this.fail('用户不存在');
    }
    return this.success(userInfo, '获取用户信息成功');
  }

  /**
   * 更新用户信息
   * todo 用户头像、昵称修改
   * @returns {Promise<*|boolean>}
   */
  async updateAction() {
    const cover = this.post('cover');
    const name = this.post('name');
    const sex = this.post('sex');
    const lifeStatus = this.post('life_status');

    const userModel = this.model('user');
    const affectedRows = await userModel.where({id: think.userId}).update({
      cover: cover,
      name: name,
      sex: sex,
      life_status: lifeStatus
    });
    const userInfo = await userModel.where({id: think.userId}).find();
    if (affectedRows > 0) {
      return this.success(userInfo, '更新用户信息成功');
    } else {
      return this.fail('更新用户信息失败');
    }
  }
};
