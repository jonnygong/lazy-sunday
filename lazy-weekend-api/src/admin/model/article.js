module.exports = class extends think.Model {
  /**
   * 获取文章列表，按发布时间降序
   */
  async getArticleList({page, size, type, area, keyword, value}) {
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
    if (!think.isEmpty(keyword) && !think.isEmpty(value)) {
      whereMap[value] = ['like', `%${keyword}%`];
    }
    const count = await this.model('article')
      .order('article.creat_time DESC') // 排序
      .where(whereMap)
      .count('*');
    const data = await this.model('article')
      .order('article.creat_time DESC') // 排序
      .where(whereMap)
      .page(page, size)
      .select();
    return {
      list: data,
      count: count
    };
  }
};