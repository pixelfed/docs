module.exports = [
  {
    title: 'Run your own Pixelfed website',
    collapsable: false,
    children: prefix('running-pixelfed', [
      'prerequisites',
      'installation',
      'administration',
      'troubleshooting',
      'ldap-authentication'
      ]),
  },
  {
    title: 'Technical documentation',
    collapsable: false,
    children: prefix('technical-documentation', [
      'activitypub',
      'api-v1',
      'artisan',
      'env',
      ]),
  },
  {
    title: 'Distro-specific deploy guides',
    collapsable: true,
    children: prefix('install-guides', [
      'arch',
      'ubuntu20',
    ]),
  },

]

function prefix(prefix, children) {
  return children.map(child => `${prefix}/${child}`)
}
