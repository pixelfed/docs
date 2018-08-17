module.exports = {
  title: 'Pixelfed',
  description: 'Documentation for pixelfed',
  base: '/docs/',

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

  themeConfig: {
    logo: 'https://pixelfed.social/img/pixelfed-icon-color.svg',
    repo: 'pixelfed/pixelfed',
    displayAllHeaders: true,
    sidebarDepth: 1,

    nav: [
      {text: 'Home', link: 'https://pixelfed.org'},
       {text: 'Version', link: '/', items: [{text: '1.0', link: '/1.0/'}]},
    ],

    sidebar: {
      '/1.0/': require('./1.0'),
    },
  },
};