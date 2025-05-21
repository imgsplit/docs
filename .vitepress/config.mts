import {defineConfig} from 'vitepress';
import vueJsx from '@vitejs/plugin-vue-jsx'
import {groupIconMdPlugin, groupIconVitePlugin} from 'vitepress-plugin-group-icons';
import container from 'markdown-it-container';
import {renderSandbox} from 'vitepress-plugin-sandpack';

import {getAPISideBar, getGuideSideBar, i18nInit} from "./i18n";

await i18nInit();

// const isDev = process.env.NODE_ENV === 'development';
const base = '/';

// https://vitepress.dev/reference/site-config
export default defineConfig({
    title: "imgsplit",
    description: "image split",
    cleanUrls: true,
    lang: 'en-US',
    base: base,
    lastUpdated: true,
    mpa: false,
    locales: {
        root: {
            label: 'English',
        },
        zh: {
            label: '简体中文',
            lang: 'zh-CN',
            themeConfig: {
                nav: [
                    {text: '首页', link: '/zh/'},
                    {text: '指南', link: '/zh/guide/'},
                    {text: 'API', link: '/zh/api/'}
                ],
                sidebar: {
                    "/zh/guide": [await getGuideSideBar('zh'), {
                        text: 'API',
                        link: '/zh/api/'
                    }],
                    "/zh/api": [
                        {...await getGuideSideBar('zh'), collapsed: true},
                        await getAPISideBar('zh')
                    ],
                },
            }
        }
    },
    head: [
        ['meta', {name: 'description', content: 'image splitter'}],
        ['meta', {name: 'keywords', content: 'image,split,imgsplit'}],
        ['meta', {name: 'author', content: 'h1ve2'}],
        ['meta', {name: 'google-site-verification', content: 'rUeF22MNNzMhe5S8sOS5k50Km-zLsFQAG777yjXW61U'}],
        ['link', {rel: 'icon', type: 'image/png', href: base + 'images/logo.png'}],
        [
            'script',
            {},
            `
              (function(w, d, s, q, i) {
                    w[q] = w[q] || [];
                    var f = d.getElementsByTagName(s)[0],j = d.createElement(s);
                    j.async = true;
                    j.id = 'beacon-aplus';
                    j.src = 'https://d.alicdn.com/alilog/mlog/aplus/' + i + '.js';
                    f.parentNode.insertBefore(j, f);
                })(window, document, 'script', 'aplus_queue', '203467608');
              window.aplus_queue.push({
                    action: 'aplus.setMetaInfo',
                    arguments: ['appKey', '682c86c3bc47b67d836c2d7e']
                });
      `,
        ],
    ],
    themeConfig: {
        // https://vitepress.dev/reference/default-theme-config
        logo: "/images/logo.png",
        siteTitle: 'ImgSplit',
        nav: [
            {text: 'Home', link: '/'},
            {text: 'Guide', link: '/guide/'},
            {text: 'API', link: '/api/'}
        ],

        sidebar: {
            "/guide": [await getGuideSideBar('en'),  {text: 'API', link: '/api/'}],
            "/api": [
                {...await getGuideSideBar('en'), collapsed: true},
                await getAPISideBar()
            ],
        },

        socialLinks: [
            {icon: 'github', link: 'https://github.com/imgsplit/imgsplit'},
            {icon: 'npm', link: 'https://www.npmjs.com/package/@imgsplit/core'}
        ],
        footer: {
            message: 'Released under the MIT License.',
            copyright: 'Copyright © 2025-present <a href="https://h1v.cn" target="_blank">h1ve2</a>'
        },
        outline: [2, 3],
        editLink: {
            pattern: ({filePath}) => {
                return `https://github.com/imgsplit/docs/tree/main/${filePath}`
            }
        },
        search: {
            provider: 'local',
            options: {
                locales: {
                    zh: {
                        translations: {
                            button: {
                                buttonText: '搜索文档',
                                buttonAriaLabel: '搜索文档'
                            },
                            modal: {
                                noResultsText: '无法找到相关结果',
                                resetButtonTitle: '清除查询条件',
                                footer: {
                                    selectText: '选择',
                                    navigateText: '切换'
                                }
                            }
                        }
                    }
                }
            }
        }
    },
    markdown: {
        config(md) {
            md
                // .use(container, 'sandbox', {
                //     render(tokens, idx) {
                //         return renderSandbox(tokens, idx, 'sandbox');
                //     },
                // })
                .use(container, 'sandpack', {
                    render(tokens, idx) {
                        return renderSandbox(tokens, idx, 'sandpack');
                    },
                })
                .use(groupIconMdPlugin);
        },
    },
    vite: {
        plugins: [
            vueJsx(),
            groupIconVitePlugin()
        ],
    },
    sitemap: {
        hostname: 'https://imgsplit.github.io/',
        lastmodDateOnly: false
    }
})
