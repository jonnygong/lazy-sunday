module.exports = class extends think.Model {
  /**
   * 获取用户列表
   */
  async getUserList({page, size, keyword, value}) {
    // 搜索条件
    const whereMap = {};
    // 标题搜索
    if (!think.isEmpty(keyword) && !think.isEmpty(value)) {
      whereMap[value] = ['like', `%${keyword}%`];
    }
    const count = await this.model('user')
      .where(whereMap)
      .count('*');
    const data = await this.model('user')
      .where(whereMap)
      .page(page, size)
      .select();
    return {
      list: data,
      count: count
    };
  }
};