import _ from 'lodash';

const stringifyValue = (value) => {
  if (_.isPlainObject(value)) {
    return '[complex value]';
  }
  if (typeof value === 'string') {
    return `'${value}'`;
  }
  if (value === null) {
    return 'null';
  }
  return String(value);
};

const iter = (tree, parentPath) => {
  const lines = tree.flatMap((node) => {
    const {
      key, type, value, value1, value2, children,
    } = node;

    const propertyPath = parentPath ? `${parentPath}.${key}` : key;

    switch (type) {
      case 'added':
        return `Property '${propertyPath}' was added with value: ${stringifyValue(value)}`;
      case 'removed':
        return `Property '${propertyPath}' was removed`;
      case 'updated':
        return `Property '${propertyPath}' was updated. From ${stringifyValue(value1)} to ${stringifyValue(value2)}`;
      case 'unchanged':
        return []; // в plain-формате такие узлы не выводятся
      case 'nested':
        return iter(children, propertyPath);
      default:
        throw new Error(`Unknown node type: ${type}`);
    }
  });

  return lines.join('\n');
};

const plain = (tree) => iter(tree, '');

export default plain;
