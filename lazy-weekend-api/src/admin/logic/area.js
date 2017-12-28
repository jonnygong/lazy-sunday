module.exports = class extends think.Logic {
  indexAction() {

  }

  listAction() {
    this.allowMethods = 'get';
  }

  addAction() {
    this.allowMethods = 'post';
    this.rules = {
      area_name: {required: true, string: true}
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
      area_name: {required: true, string: true}
    };
  }

  deleteAction() {
    this.allowMethods = 'post';
    this.rules = {
      id: {required: true, trim: true}
    };
  }
};
