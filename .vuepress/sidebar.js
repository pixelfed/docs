module.exports = [
  {
    title: 'Pokrenite svoju web lokaciju sa Pixelfed-om',
    collapsable: false,
    children: prefix('running-pixelfed', [
      'preduvjeti',
      'instalacija',
      'administracija',
      'rješavanje-problema',
      ]),
  },
  {
    title: 'tehnička dokumentacija',
    collapsable: false,
    children: prefix('technical-documentation', [
      'api-v1',
      'artisan',
      'env',
      ]),
  },
  {
    title: 'Vodiči za postavljanje na specifični Distro',
    collapsable: true,
    children: prefix('install-guides', [
      'arch',
    ]),
  },

]

function prefix(prefix, children) {
  return children.map(child => `${prefix}/${child}`)
}
