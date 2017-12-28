module.exports = class extends think.Model {
  /**
   * 获取文章列表，按发布时间降序
   */
  async getArticleList({page, size, type, area, keyword, popular}) {
    // 搜索条件
    const whereMap = {};
    // 文章分类
    if (type !== 0) {
      whereMap.type_id = type;
    }
    // 地区
    if (!think.isEmpty(area)) {
      whereMap.area = area;
    }
    // 标题搜索
    if (!think.isEmpty(keyword)) {
      whereMap.title = ['like', `%${keyword}%`];
    }
    const data = await this.model('article')
      .order('article.creat_time DESC') // 排序
      .where(whereMap)
      .page(page, size)
      .select();

    for (let i = 0; i < data.length; i++) {
      data[i].like = await this.model('liked').where({a_id: data[i].id}).count();
      if (think.userId > 0) {
        data[i].is_like = await this.model('liked').where({a_id: data[i].id, user_id: think.userId}).count();
      } else {
        data[i].is_like = 0;
      }
    }
    if (popular === 1) {
      return this._orderASC(data);
    } else {
      return data;
    }
  }

  _orderASC(arra) {
    let temp;
    for (let i = 0; i < arra.length; i++) { // 比较多少趟，从第一趟开始
      for (let j = 0; j < arra.length - i - 1; j++) { // 每一趟比较多少次数
        if (arra[j].like < arra[j + 1].like) {
          temp = arra[j];
          arra[j] = arra[j + 1];
          arra[j + 1] = temp;
        }
      }
    }
    return arra;
  }

  /**
   * 设置文章的是否喜欢状态
   * @param articleId 文章ID
   * @returns {Promise<*>}
   */
  async toggleArticleLiked(articleId) {
    const hasLiked = await this.model('liked').where({a_id: articleId, user_id: think.userId}).find();

    if (think.isEmpty(hasLiked)) {
      const addRows = await this.model('liked').add({a_id: articleId, user_id: think.userId});
      return {
        type: 'add',
        value: addRows
      };
    } else {
      const deleteRows = await this.model('liked').where({a_id: articleId, user_id: think.userId}).delete();
      return {
        type: 'delete',
        value: deleteRows
      };
    }
  }
};
