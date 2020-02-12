module.exports = [
  {
    title: 'Installation',
    collapsable: false,
    children: prefix('installing-pixelfed', [
      'prerequisites',
      'installation',
      'configuring-mail',
      'configuring-queue',
      'configuring-scheduler',
      'postinstall',
      ]),
  },
  {
    title: 'Admin Guide',
    collapsable: false,
    children: prefix('running-pixelfed', [
      'administration',
      'troubleshooting',
      ]),
  },
  {
    title: 'Technical documentation',
    collapsable: false,
    children: prefix('technical-documentation', [
      'api-v1',
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
