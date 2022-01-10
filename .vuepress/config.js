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
    docsBranch: 'main',
    editLinks: true,
    displayAllHeaders: false,
    sidebarDepth: 1,

    nav: [
       {text: 'pixelfed.org', link: 'https://pixelfed.org'},
    ],

    sidebar: {
      '/': require('./sidebar')
    },
  },
};