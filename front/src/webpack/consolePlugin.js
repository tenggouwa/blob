const { validate } = require('schema-utils');


const schema = {
  type: 'object',
  properties: {
    test: {
      type: 'string',
    },
  },
};


class ConsolePlugin {
  static defaultOptions = {
    outputFile: 'assets.md',
  };
  constructor(options = {}) {
    validate(schema, options, {
      name: 'Console Plugin',
      baseDataPath: 'options',
    });
    this.options = {
      ...ConsolePlugin.defaultOptions,
      ...options,
    }
  }
  apply(compiler) {
    compiler.hooks.emit.tapAsync(
      'MyExampleWebpackPlugin',
      (compilation, callback) => {
        console.log("🚀 ~ file: consolePlugin.js:32 ~ ConsolePlugin ~ apply ~ compilation", compilation.assets)

        callback();
      }
    );
  }
}

module.exports = ConsolePlugin;