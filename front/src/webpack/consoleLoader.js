const parser = require('@babel/parser');
const traverse = require('@babel/traverse').default;
const generator = require('@babel/generator').default;
const types = require('@babel/types')

const { urlToRequest } = require('loader-utils');
const { validate } = require('schema-utils');

const schema = {
  type: 'object',
  properties: {
    test: {
      type: 'string',
    },
  },
};



exports.default = function (source) {
  const options = this.getOptions();

  validate(schema, options, {
    name: 'Example Loader',
    baseDataPath: 'options',
  });

  const filePath = urlToRequest(this.resourcePath);

  const ast = parser.parse(source, {
    locations: true, // 显示索引
    ranges: true,
    sourceType: 'module', // es语法
    ecmaVersion: 7,
    plugins: ['typescript', 'jsx'],
  })

  // walker 遍历树节点
  traverse(ast, {
    // 访问者
    CallExpression(path) {
      const calleeStr = generator(path.node.callee).code;
      if (['console.log', 'console.error', 'console.warn', 'console.info'].includes(calleeStr)) {
        const { line, column } = path.node.loc.start;
        path.node.arguments.unshift(types.stringLiteral(`🚀🚀🚀 ~ ${filePath}(${line}, ${column}) Here is Console:`));
      }
    }
  })

  const { code } = generator(ast, {
    sourceMaps: true,
  })

  return code;
}
