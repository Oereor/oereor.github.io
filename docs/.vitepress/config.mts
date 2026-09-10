import { defineConfig } from 'vitepress'
import mathjax3 from 'markdown-it-mathjax3'

export default defineConfig({
  lang: 'zh-CN',
  title: 'oereor',
  description: 'oereor 的个人主页与项目档案。',
  cleanUrls: true,
  sitemap: {
    hostname: 'https://oereor.github.io'
  },
  themeConfig: {
    nav: [
      { text: '首页', link: '/' },
      { text: '项目', link: '/projects/' },
      { text: '随笔', link: '/notes/' },
      { text: '关于', link: '/about' }
    ],
    search: {
      provider: 'local',
      options: {
        translations: {
          button: {
            buttonText: '搜索',
            buttonAriaLabel: '搜索站点'
          },
          modal: {
            displayDetails: '显示详细列表',
            resetButtonTitle: '清除查询',
            backButtonTitle: '返回',
            noResultsText: '没有找到相关结果',
            footer: {
              selectText: '选择',
              selectKeyAriaLabel: '回车键',
              navigateText: '切换',
              navigateUpKeyAriaLabel: '向上箭头',
              navigateDownKeyAriaLabel: '向下箭头',
              closeText: '关闭',
              closeKeyAriaLabel: 'Esc 键'
            }
          }
        }
      }
    },
    socialLinks: [
      { icon: 'github', link: 'https://github.com/Oereor' }
    ],
    outline: {
      level: [2, 3],
      label: '本页内容'
    },
    externalLinkIcon: true,
    darkModeSwitchLabel: '外观',
    lightModeSwitchTitle: '切换至浅色模式',
    darkModeSwitchTitle: '切换至深色模式',
    sidebarMenuLabel: '菜单',
    returnToTopLabel: '返回顶部'
  },
  markdown: {
    config: (md) => {
      md.use(mathjax3)
    }
  }
})
