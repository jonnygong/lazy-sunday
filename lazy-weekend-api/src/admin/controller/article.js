const Base = require('./base.js');

module.exports = class extends Base {
  indexAction() {
    return this.display();
  }

  /**
   * 获取文章列表，按发布时间降序
   * @returns {Promise<*|boolean>}
   */
  async listAction() {
    const page = this.get('page') || 1;
    const size = this.get('size') || 5;
    const keyword = this.get('keyword'); // 搜索的数据库字段
    const value = this.get('value'); // 搜索的内容
    const type = this.get('type') || 0;
    const area = this.get('area'); // 杭州 - 2222
    return this.success(await this.model('article').getArticleList({
      page: page,
      size: size,
      keyword: keyword,
      value: value,
      type: type,
      area: area
    }), '数据获取成功');
  }

  /**
   * 添加文章
   */
  async addAction() {
    const title = this.post('title');
    const cover = this.post('cover');
    const place = this.post('place');
    const price = this.post('price');
    const time = this.post('time');
    const content = this.post('content');
    const typeId = this.post('type_id');
    const area = this.post('area');
    const isTop = this.post('is_top');
    const createTime = new Date().getTime();

    const articelId = await this.model('article').add({
      title: title,
      cover: cover,
      place: place,
      price: price,
      time: time,
      content: content,
      area: area,
      is_top: isTop,
      type_id: typeId,
      create_time: createTime
    });
    if (!articelId) {
      return this.fail('数据添加失败');
    }
    return this.success('添加数据成功');
  }

  /**
   * 获取单篇文章详情
   * @returns {Promise<*|boolean>}
   */
  async detailAction() {
    const id = this.get('id');
    const articleInfo = await this.model('article')
      .where({'article.id': id})
      .find();
    if (!articleInfo) {
      this.fail('获取文章数据失败');
    }
    return this.success(articleInfo, '获取文章数据成功');
  }

  /**
   *
   * @returns {Promise<*|boolean>}
   */
  async updateAction() {
    const id = this.post('id');
    const title = this.post('title');
    const cover = this.post('cover');
    const place = this.post('place');
    const price = this.post('price');
    const time = this.post('time');
    const typeId = this.post('type_id');
    const content = this.post('content');
    const area = this.post('area');
    const isTop = this.post('is_top');
    const createTime = new Date().getTime();

    const affectedRows = await await this.model('article')
      .where({'article.id': id})
      .update({
        title: title,
        cover: cover,
        place: place,
        price: price,
        time: time,
        content: content,
        area: area,
        is_top: isTop,
        type_id: typeId,
        create_time: createTime
      });
    if (affectedRows === 0) {
      return this.fail('数据修改失败');
    }
    return this.success('修改数据成功');
  }

  /**
   * 删除单篇文章
   * @returns {Promise<*|boolean>}
   */
  async deleteAction() {
    const id = this.post('id');
    await this.model('article')
      .where({'article.id': id})
      .delete();

    return this.success('删除文章成功');
  }
};
