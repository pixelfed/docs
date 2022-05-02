module.exports = {

  head: [

  ],

  markdown: {
    lineNumbers: true
  },

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