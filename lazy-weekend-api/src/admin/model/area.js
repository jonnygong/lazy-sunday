module.exports = class extends think.Model {
  /**
   * 获取地区列表
   */
  async getAreaList({page, size, keyword, value}) {
    // 搜索条件
    const whereMap = {};
    // 标题搜索
    if (!think.isEmpty(keyword) && !think.isEmpty(value)) {
      whereMap[value] = ['like', `%${keyword}%`];
    }
    const count = await this.model('area')
      .where(whereMap)
      .count('*');
    const data = await this.model('area')
      .where(whereMap)
      .page(page, size)
      .select();
    return {
      list: data,
      count: count
    };
  }
};