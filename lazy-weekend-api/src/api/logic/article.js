module.exports = class extends think.Logic {
  indexAction() {

  }

  likeAction() {
    this.allowMethods = 'get';
    this.rules = {
      article_id: {required: true, trim: true}
    };
  }

  listAction() {
    this.allowMethods = 'get';
    this.rules = {
      popular: {int: true}
    };
  }

  detailAction() {
    this.allowMethods = 'get';
    this.rules = {
      id: {required: true, trim: true}
    };
  }
};
