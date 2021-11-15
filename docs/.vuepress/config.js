const path = require('path')

module.exports = {
  /**
   * Ref：https://v1.vuepress.vuejs.org/config/#title
   */
  title: "cloudv",
  /**
   * Ref：https://v1.vuepress.vuejs.org/config/#description
   */
  description: "cloudv 前端组件库",

  /**
   * Extra tags to be injected to the page HTML `<head>`
   *
   * ref：https://v1.vuepress.vuejs.org/config/#head
   */
  // head: [
  //   ['meta', { name: 'theme-color', content: '#3eaf7c' }],
  //   ['meta', { name: 'apple-mobile-web-app-capable', content: 'yes' }],
  //   ['meta', { name: 'apple-mobile-web-app-status-bar-style', content: 'black' }]
  // ],

  /**
   * Theme configuration, here is the default theme configuration for VuePress.
   *
   * ref：https://v1.vuepress.vuejs.org/theme/default-theme-config.html
   */

  themeConfig: {
    logo: '/img/logo.jpeg',
    nav: [
      {
        text: '文档',
        items: [
          { text: '组件说明', link: '/guide/using-components' },
        ]
      },
      { text: '线上地址', link: 'nothing to deploy' },
    ],
    sidebar: {
      '/guide/': [
        '', // 文档说明
        'hello-world', // hello-world 组件
        'cloudv-map', // cloudv-map 组件
      ]
    },
    sidebarDepth: 2,
    nextLinks: true,
    prevLinks: true,
  },

  chainWebpack: webpackConfig => {
    webpackConfig.resolve.alias.set(
      'vgc',
      path.resolve(__dirname, '../../src')
    )
  },
  markdown: {
    extendMarkdown: (md) => {
      md.use(require("markdown-it-task-lists"));
    },
  },

  /**
   * Apply plugins，ref：https://v1.vuepress.vuejs.org/zh/plugin/
   */
  plugins: [
    // '@vuepress/plugin-back-to-top', // 自底向上的返回按钮
    // '@vuepress/plugin-medium-zoom', // 字体放大
    // "vuepress-plugin-code-box", // 隐藏代码块
    "vuepress-plugin-demo-container"
  ]
}
