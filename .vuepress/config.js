module.exports = {

  head: [

  ],

  serviceWorker: false,
  themeConfig: {
    logo: 'https://avatars0.githubusercontent.com/u/38410642?s=200&v=4',
    repo: 'pixelfed/docs',
    editLinks: true,
    displayAllHeaders: false,
    sidebarDepth: 2,

    nav: [
       {text: 'pixelfed.org', link: 'https://pixelfed.org'},
    ],

    sidebar: {
      '/': require('./sidebar')
    },
  },
  locales: {
    '/': {
      lang: 'en-US',
      title: 'Pixelfed Documentation',
      description: 'Documentation for pixelfed',
    },
    '/pl/': {
      lang: 'pl-PL',
      title: 'Dokumentacja Pixelfed',
      description: 'Dokumentacja projektu Pixelfed'
    }
  }
};