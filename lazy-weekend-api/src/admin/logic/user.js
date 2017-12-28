module.exports = class extends think.Logic {
  indexAction() {

  }

  listAction() {
    this.allowMethods = 'get';
  }

  addAction() {
    this.allowMethods = 'post';
    this.rules = {
      email: {required: true, string: true},
      password: {required: true, string: true},
      is_verification: {required: true, int: true},
      cover: {required: true, string: true, trim: true},
      name: {required: true, string: true},
      sex: {required: true, int: true},
      life_status: {required: true, int: true, trim: true}
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
      email: {required: true, string: true},
      password: {required: true, string: true},
      is_verification: {required: true, int: true},
      cover: {required: true, string: true, trim: true},
      name: {required: true, string: true},
      sex: {required: true, int: true},
      life_status: {required: true, int: true, trim: true}
    };
  }

  deleteAction() {
    this.allowMethods = 'post';
    this.rules = {
      id: {required: true, trim: true}
    };
  }
};
