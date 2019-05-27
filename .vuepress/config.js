module.exports = {
  title: 'Pixelfed Documentation',
  description: 'Documentation for pixelfed',
  base: '/',

  head: [

  ],

  serviceWorker: false,
  themeConfig: {
    logo: 'https://avatars0.githubusercontent.com/u/38410642?s=200&v=4',
    repo: 'pixelfed/docs',
    editLinks: true,
    displayAllHeaders: false,
    sidebarDepth: 1,

    nav: [
       {text: 'Version', link: '/', items: [
         {text: 'Master', link: '/master/'}
       ]},
       {text: 'Pixelfed.org', link: 'https://pixelfed.org'},
    ],

    sidebar: {
      '/master/': require('./master')
    },
  },
};