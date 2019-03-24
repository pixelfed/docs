module.exports = {
  title: 'Pixelfed Documentation',
  description: 'Documentation for pixelfed',
  base: '/',

  head: [
    [
      'link',
      {
        href:
          'https://fonts.googleapis.com/css?family=Nunito:200,200i,300,300i,400,400i,600,600i,800,800i,900,900i',
        rel: 'stylesheet',
        type: 'text/css',
      },
    ],
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