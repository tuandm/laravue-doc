var EcosystemNav = [
  {
    textEN: "Packages",
    textVI: "Packages",
    items: [
      {
        text: "laravue-core",
        link: "https://github.com/tuandm/laravue-core"
      }
    ]
  },
  {
    textEN: "Help",
    textVI: "Hỗ trợ",
    items: [
      {
        text: "Git issues",
        textVI: "Git issues",
        link: "https://github.com/tuandm/laravue/issues"
      },
      {
        text: "Changelog",
        textVI: "Lưu trữ",
        link: "https://github.com/tuandm/laravue/releases"
      }
    ]
  }
];

var ComponentNav = [
  {
    text: 'Component',
    textVI: 'Phần mở rộng',
    items: [
      {
        text: 'Rich Text Editor',
        textVI: 'Trình soạn thảo',
        link: '/feature/component/rich-editor.md'
      },
      {
        text: 'Markdown Editor',
        textVI: 'Trình soạn thảo Markdown',
        link: '/feature/component/markdown-editor.md'
      },
      {
        text: 'Svg Icon',
        textVI: 'Svg Icon',
        link: '/feature/component/svg-icon.md'
      },
      {
        text: 'Clipboard',
        textVI: 'Chức năng sao chép',
        link: '/feature/component/clipboard.md'
      },
      {
        text: 'Excel',
        textVI: 'Excel',
        link: '/feature/component/excel.md'
      },
      {
        text: 'Pagination',
        textVI: 'Phân trang',
        link: '/feature/component/pagination.md'
      },
      {
        text: 'Tree Table',
        textVI: 'Bảng dạng cây',
        link: '/feature/component/tree-table.md'
      }
    ]
  },
  {
    text: 'Script',
    items: [
      {
        text: 'Svgo',
        link: '/feature/script/svgo.md'
      }
    ]
  }
]

module.exports = {
  EcosystemNav,
  ComponentNav
}
