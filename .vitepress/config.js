const fs = require("fs");

module.exports = {
	title: 'Pixelfed Documentation',
	description: 'Documentation for pixelfed',
	base: '/',

	head: [
		[
			'link',
			{
				rel: 'icon',
				href: 'https://avatars0.githubusercontent.com/u/38410642?s=200&v=4',
			},
		],
	],

	themeConfig: {
		logo: 'https://avatars0.githubusercontent.com/u/38410642?s=200&v=4',
		outlineTitle: 'Outline',
		editLink: {
			pattern: 'https://github.com/pixelfed/docs/edit/main/:path',
			text: 'Edit this page on Github'
		},

		nav: [
			{text: 'pixelfed.org', link: 'https://pixelfed.org'},
		],

		sidebar: [
			{
				text: 'Run your own Pixelfed website',
				items: makeItems('running-pixelfed',
					{
					'prerequisites': 'Prerequisites',
					'installation': 'Generic installation',
					'administration': 'Post-install setup',
					'troubleshooting': 'Troubleshooting'
					}
				)
			},
			{
				text: 'Additional configuration',
				items: makeItems('running-pixelfed',
					[
					'livestreaming',
					'websockets',
					'ldap-authentication'
					]
				)
			},
			{
				text : 'Distro-specific deployment guides',
				items: makeItems('install-guides',
					{
						'arch': 'Arch Linux'	
					}
				)
			},
		],
	},
};

function getTitle(filename) {
	return fs
		.readFileSync(filename, 'utf-8')
		.match(/(^.*)/)[1] // get first line
		.slice(2) // strip markdown h1
}

function makeItems(prefix, children) {
	let items = []
	if (Array.isArray(children)) {
		children.forEach(
			(page) => {
				items.push(
					{
						text: getTitle(`${__dirname}/../${prefix}/${page}.md`),
						link: `${prefix}/${page}`
					}
				)
			}
		)
	} else {
		Object.entries(children).forEach(
			([key, value]) => {
				if (!value) {
					value = getTitle(`${__dirname}/../${prefix}/${page}.md`)
				}
				items.push({text: value, link: `${prefix}/${key}`});
			}
		);
	}
	
	return items;
}

