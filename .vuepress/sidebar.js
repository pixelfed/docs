module.exports = [

  {
    title: 'Running Pixelfed',
    collapsable: false,
    children: prefix('running-pixelfed', [
      'installation',
      'administration',
      ]),
  },
  {
    title: 'Technical documentation',
    collapsable: false,
    children: prefix('technical-documentation', [
      'api',
      'env',
      ]),
  },

]

function prefix(prefix, children) {
  return children.map(child => `${prefix}/${child}`)
}