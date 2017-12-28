module.exports = class extends think.Logic {
  regAction() {
    this.allowMethods = 'post';
    this.rules = {
      email: {required: true, string: true, trim: true},
      password: {required: true, string: true, trim: true},
      repassword: {required: true, string: true, trim: true}
    };
  }

  loginAction() {
    this.allowMethods = 'post';
    this.rules = {
      email: {required: true, string: true, trim: true},
      password: {required: true, string: true, trim: true}
    };
  }

  updateAction() {
    this.allowMethods = 'post';
    this.rules = {
      sex: {required: true, int: true, trim: true},
      life_status: {required: true, int: true, trim: true}
    };
  }
};
