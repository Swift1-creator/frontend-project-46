import _ from 'lodash'

const buildDiff = (obj1, obj2) => {
  const keys1 = Object.keys(obj1)
  const keys2 = Object.keys(obj2)
  const allKeys = _.sortBy(_.uniq([...keys1, ...keys2]))

  return allKeys.map(key => {
    const has1 = Object.hasOwn(obj1, key)
    const has2 = Object.hasOwn(obj2, key)
    const val1 = obj1[key]
    const val2 = obj2[key]

    if (!has2) {
      return { key, type: 'removed', value: val1 }
    }

    if (!has1) {
      return { key, type: 'added', value: val2 }
    }

    if (_.isPlainObject(val1) && _.isPlainObject(val2)) {
      return {
        key,
        type: 'nested',
        children: buildDiff(val1, val2),
      }
    }

    if (_.isEqual(val1, val2)) {
      return { key, type: 'unchanged', value: val1 }
    }

    return {
      key,
      type: 'updated',
      value1: val1,
      value2: val2,
    }
  })
}

export default buildDiff
