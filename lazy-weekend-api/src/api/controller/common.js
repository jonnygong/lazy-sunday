const Base = require('./base.js');
const helper = require('think-helper');
const path = require('path');
const fs = require('fs');

module.exports = class extends Base {
  indexAction() {
    return this.display();
  }

  uploadAction() {
    const file = this.file('upfile');
    const filepath = file.path;
    const nameArr = file.name.split('.');
    const basename = path.basename(filepath) + '.' + nameArr[nameArr.length - 1];
    const YYYYMMDD = helper.datetime(Date.now(), 'YYYYMMDD');
    const staticPath = path.resolve(think.ROOT_PATH, 'www/static');
    const uploadPath = path.resolve(staticPath, 'upload');
    const relativePath = path.resolve(uploadPath, YYYYMMDD);

    // 文件夹不存在则创建
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath);
    }

    if (!fs.existsSync(relativePath)) {
      fs.mkdirSync(relativePath);
    }

    fs.renameSync(filepath, path.resolve(relativePath, `${basename}`));
    this.success({
      url: `/www/static/upload/${YYYYMMDD}/${basename}`
    }, '上传成功');
  }
};
