module.exports = [
  {
    title: 'Installing Pixelfed',
    collapsable: false,
    children: prefix('installing-pixelfed', [
      'prerequisites',
      'installation',
      'postinstall',
      ]),
  },
  {
    title: 'Running Pixelfed',
    collapsable: false,
    children: prefix('running-pixelfed', [
      'administration',
      'migration',
      'troubleshooting',
      ]),
  },
  {
    title: 'Technical documentation',
    collapsable: false,
    children: prefix('technical-documentation', [
      'api',
      'artisan',
      'env',
      ]),
  },
  {
    title: 'Distro-specific Guides',
    collapsable: true,
    children: prefix('installing-pixelfed/guides', [
      'arch',
    ]),
  },

]

function prefix(prefix, children) {
  return children.map(child => `${prefix}/${child}`)
}
