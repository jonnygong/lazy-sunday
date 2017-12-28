module.exports = class extends think.Logic {
  indexAction() {

  }

  listAction() {
    this.allowMethods = 'get';
  }

  addAction() {
    this.allowMethods = 'post';
    this.rules = {
      icon: {required: true, string: true},
      type: {required: true, string: true}
    };
  }

  detailAction() {
    this.allowMethods = 'get';
    this.rules = {
      id: {required: true, trim: true}
    };
  }

  updateAction() {
    this.allowMethods = 'post';
    this.rules = {
      id: {required: true, trim: true},
      icon: {required: true, string: true},
      type: {required: true, string: true}
    };
  }

  deleteAction() {
    this.allowMethods = 'post';
    this.rules = {
      id: {required: true, trim: true}
    };
  }
};
