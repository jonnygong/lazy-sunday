module.exports = class extends think.Logic {
  indexAction() {

  }

  listAction() {
    this.allowMethods = 'get';
  }

  addAction() {
    this.allowMethods = 'post';
    this.rules = {
      title: {required: true, string: true},
      cover: {required: true, string: true},
      place: {required: true, string: true},
      price: {required: true, int: true, trim: true},
      time: {required: true, string: true},
      content: {required: true, string: true},
      area: {required: true, int: true, trim: true},
      type_id: {required: true, int: true, trim: true},
      is_top: {required: true, int: true, trim: true}
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
      title: {required: true, string: true},
      cover: {required: true, string: true},
      place: {required: true, string: true},
      price: {required: true, int: true, trim: true},
      time: {required: true, string: true},
      content: {required: true, string: true},
      area: {required: true, int: true, trim: true},
      type_id: {required: true, int: true, trim: true},
      is_top: {required: true, int: true, trim: true}
    };
  }

  deleteAction() {
    this.allowMethods = 'post';
    this.rules = {
      id: {required: true, trim: true}
    };
  }
};
