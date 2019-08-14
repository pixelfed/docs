module.exports = [
  {
    title: 'Installing Pixelfed',
    collapsable: false,
    children: prefix('installing-pixelfed', [
      'prerequisites',
      'installation',
      prefix('guides', [
          'arch',
        ]),
      ]),
  },
  {
    title: 'Running Pixelfed',
    collapsable: false,
    children: prefix('running-pixelfed', [
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
