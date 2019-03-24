module.exports = [
  {
    title: 'Getting Started',
    collapsable: true,
    children: ['requirements', 'installation', 'configuration', 'deployment', 'updating'],
  },

  {
    title: 'Running an Instance',
    collapsable: true,
    children: prefix('running-an-instance', [
      'artisan-command',
      'job-queue',
      ]),
  },

  {
    title: 'API',
    collapsable: true,
    children: ['api'],
  }

]

function prefix(prefix, children) {
  return children.map(child => `${prefix}/${child}`)
}