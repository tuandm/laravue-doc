var nav = require('./nav.js')
var { EcosystemNav, ComponentNav } = nav

var utils = require('./utils.js')
var { genNav, getComponentSidebar, deepClone } = utils

module.exports = {
  logo: "/assets/laravue_logo_36_36.png",
  title: "Laravue",
  description:
    "A magical administrative interface for Laravel built by Vue and Element UI",
  base: "/",
  head: [
    [
      "link",
      {
        rel: "icon",
        href: "/favicon.ico"
      }
    ]
  ],
  themeConfig: {
    repo: "tuandm/laravue",
    docsRepo: "tuandm/laravue-doc",
    docsDir: "docs",
    editLinks: true,
    sidebarDepth: 5,
    locales: {
      "/": {
        label: "English",
        selectText: "Languages",
        editLinkText: "Edit this page on GitHub",
        nav: [
          {
            text: "Documentation",
            link: "/guide/"
          },
          {
            text: "Components",
            items: genNav(deepClone(ComponentNav), "EN")
          },
          {
            text: "Extensions",
            items: genNav(deepClone(EcosystemNav), "EN")
          }
        ],
        sidebar: {
          "/guide/": [
            {
              title: "Basic",
              collapsable: false,
              children: genEssentialsSidebar()
            },
            {
              title: "Advanced",
              collapsable: true,
              children: genAdvancedSidebar()
            },
            {
              title: "Development guides",
              collapsable: true,
              children: [
                "/guide/development/new-page.md",
              ]
            },
            {
              title: "Other",
              collapsable: true,
              children: [
                // "/guide/other/gitter.md",
                "/guide/other/release-notes.md"
              ]
            }
          ],
          "/feature/component/": getComponentSidebar(
            deepClone(ComponentNav),
            "EN"
          ),
          "/feature/script/": ["/feature/script/svgo.md"]
        }
      },
      "/vi/": {
        label: "Tiếng Việt",
        selectText: "Ngôn ngữ",
        editLinkText: "Chỉnh sửa trên Github",
        nav: [
          {
            text: "Tài liệu",
            link: "/vi/guide/"
          },
          {
            text: "Thành phần",
            items: genNav(deepClone(ComponentNav), "VI")
          },
          {
            text: "Liên kết",
            items: genNav(deepClone(EcosystemNav), "VI")
          }
        ],
        sidebar: {
          "/vi/guide/": [
            {
              title: "Cơ bản",
              collapsable: false,
              children: genEssentialsSidebar("/vi")
            },
            {
              title: "Nâng cao",
              collapsable: true,
              children: genAdvancedSidebar("/vi")
            },
            {
              title: "Hướng dẫn lập trình",
              collapsable: true,
              children: [
                "/vi/guide/development/new-page.md",
              ]
            },
            {
              title: "Các mục khác",
              collapsable: true,
              children: [
                "/vi/guide/other/faq.md",
                "/vi/guide/other/release-notes.md"
              ]
            }
          ],
          "/vi/feature/component/": getComponentSidebar(deepClone(ComponentNav), "VI"),
          "/vi/feature/script/": ["/vi/feature/script/svgo.md"]
        }
      }
    }
  },
  locales: {
    "/": {
      lang: "en-US",
      description:
        "A magical administrative interface for Laravel built by VueJS and Element UI"
    },
    "/vi/": {
      lang: "vi-VN",
      description: "Giao diện quản trị cho Laravel sử dụng VueJS và Element UI"
    }
  },
  configureWebpack: {
    resolve: {
      alias: {
        "@public": "./public"
      }
    }
  },
  ga: "UA-136773850-2"
};

function genEssentialsSidebar(type = '') {
  const mapArr = [
    '/guide/',
    '/guide/essentials/layout.md',
    '/guide/essentials/router-and-nav.md',
    '/guide/essentials/permission.md',
    '/guide/essentials/tags-view.md',
    '/guide/essentials/style.md',
    '/guide/essentials/api.md',
    '/guide/essentials/import.md',
  ]
  return mapArr.map(i => {
    return type + i
  })
}

function genAdvancedSidebar(type = '') {
  const mapArr = [
    '/guide/advanced/coding-convention.md',
    '/guide/advanced/git-hook.md',
//    '/guide/advanced/lazy-loading.md',
    '/guide/advanced/chart.md',
    '/guide/advanced/icon.md',
    // '/guide/advanced/theme.md',
    '/guide/advanced/i18n.md',
    '/guide/advanced/error.md',
    // '/guide/advanced/webpack.md'
  ]
  return mapArr.map(i => {
    return type + i
  })
}
