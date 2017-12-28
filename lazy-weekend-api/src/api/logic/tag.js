module.exports = class extends think.Logic {
  indexAction() {

  }

  listAction() {
    this.allowMethods = 'get';
  }
};
