module.exports = [
  {
    title: 'Run your own Pixelfed website',
    collapsable: false,
    children: prefix('running-pixelfed', [
      'prerequisites',
      'installation',
      'administration',
      'troubleshooting',
      's3-storage',
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
    collapsable: false,
    children: prefix('install-guides', [
      'arch',
      'ubuntu22',
    ]),
  },

]

function prefix(prefix, children) {
  return children.map(child => `${prefix}/${child}`)
}
