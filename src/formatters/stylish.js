import _ from 'lodash'

const indentSize = 4

const getIndent = depth => ' '.repeat(depth * indentSize - 2)
const getBracketIndent = depth => ' '.repeat((depth - 1) * indentSize)

const stringify = (value, depth) => {
  if (!_.isPlainObject(value)) {
    return String(value)
  }

  const currentIndent = ' '.repeat(depth * indentSize)
  const bracketIndent = getBracketIndent(depth)

  const lines = Object
    .entries(value)
    .map(([key, val]) => `${currentIndent}${key}: ${stringify(val, depth + 1)}`)

  return `{\n${lines.join('\n')}\n${bracketIndent}}`
}

const iter = (tree, depth) => {
  const currentIndent = getIndent(depth)
  const bracketIndent = getBracketIndent(depth)

  const lines = tree.flatMap((node) => {
    const {
      key, type, value, value1, value2, children,
    } = node

    switch (type) {
      case 'added':
        return `${currentIndent}+ ${key}: ${stringify(value, depth + 1)}`
      case 'removed':
        return `${currentIndent}- ${key}: ${stringify(value, depth + 1)}`
      case 'unchanged':
        return `${currentIndent}  ${key}: ${stringify(value, depth + 1)}`
      case 'updated': {
        const line1 = `${currentIndent}- ${key}: ${stringify(value1, depth + 1)}`
        const line2 = `${currentIndent}+ ${key}: ${stringify(value2, depth + 1)}`
        return [line1, line2]
      }
      case 'nested': {
        const childrenStr = iter(children, depth + 1)
        return `${currentIndent}  ${key}: ${childrenStr}`
      }
      default:
        throw new Error(`Unknown node type: ${type}`)
    }
  })

  return `{\n${lines.join('\n')}\n${bracketIndent}}`
}

const stylish = tree => iter(tree, 1)

export default stylish
