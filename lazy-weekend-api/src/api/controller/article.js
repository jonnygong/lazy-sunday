const Base = require('./base.js');

module.exports = class extends Base {
  indexAction() {

  }

  /**
   * 首页轮播图
   * @returns {Promise<*|boolean>}
   */
  async topAction() {
    const model = this.model('article');
    const data = await model.field('id, cover, title').where({is_top: 1}).select()
    return this.success(data, '数据获取成功');
  }

  /**
   * 获取文章列表，按发布时间降序
   * @returns {Promise<*|boolean>}
   */
  async listAction() {
    const page = this.get('page') || 1;
    const size = this.get('size') || 5;
    const keyword = this.get('keyword');
    const type = this.get('type') || 0;
    const area = this.get('area'); // 杭州 - 2222
    const popular = this.get('popular') || 0; // 杭州 - 2222
    return this.success(await this.model('article').getArticleList({
      page: page,
      size: size,
      type: type,
      area: area,
      keyword: keyword,
      popular: popular
    }), '数据获取成功');
  }

  /**
   * 获取单篇文章详情
   * @returns {Promise<*|boolean>}
   */
  async detailAction() {
    const id = this.get('id');
    return this.success(await this.model('article')
      .join('type ON article.type_id=type.id')
      .where({'article.id': id})
      .find());
  }

  /**
   * 设置文章喜欢状态
   * @returns {*|boolean}
   */
  async likeAction() {
    const articleId = this.get('article_id');
    const result = await this.model('article').toggleArticleLiked(articleId);
    const isLiked = await this.model('liked').where({a_id: articleId, user_id: think.userId}).count();
    if (result.value <= 0) {
      return this.fail('设置喜欢的文章失败');
    }

    if (result.type === 'add') {
      return this.success({is_like: isLiked}, '成功添加喜欢的文章');
    } else {
      return this.success({is_like: isLiked}, '成功取消喜欢的文章');
    }
  }

  /**
   * 我喜欢的文章列表
   * @returns {Promise<*|boolean>}
   */
  async likelistAction() {
    const data = await this.model('liked')
      .where({user_id: think.userId})
      .join('article ON article.id=liked.a_id')
      .join('type ON type.id = article.type_id')
      .join('area ON article.area=area.id') // LEFT JOIN
      .select();
    return this.success(data, '获取数据成功');
  }
};
