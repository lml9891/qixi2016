'use strict';

// Test specific configuration
// ===========================

module.exports = {
  // MongoDB connection options
  mongo: {
    uri: 'mongodb://localhost/qixi2016-test'
  },
  sequelize: {
    uri: 'sqlite://',
    options: {
      logging: false,
      storage: 'test.sqlite',
      define: {
        timestamps: false
      }
    }
  }
};
//# sourceMappingURL=test.js.map
