module.exports = {
  title: 'Lisk-GraphQL',
  tagline: 'A GraphQL api on top of the Lisk blockchain',
  url: 'https://github.com/cryptobaguette/lisk-graphql',
  baseUrl: '/',
  favicon: 'img/favicon.ico',
  organizationName: 'cryptobaguette',
  projectName: 'Lisk-GraphQL',
  themeConfig: {
    navbar: {
      title: 'Lisk-GraphQL',
      logo: {
        alt: 'Lisk-GraphQL Logo',
        src: 'img/logo.png',
      },
      links: [
        { to: 'docs/introduction', label: 'Docs', position: 'left' },
        {
          href: 'https://github.com/cryptobaguette/lisk-graphql',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Docs',
          items: [
            {
              label: 'Docs',
              to: 'docs/introduction',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} cryptobaguette.`,
    },
  },
  presets: [
    [
      '@docusaurus/preset-classic',
      {
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      },
    ],
  ],
};
