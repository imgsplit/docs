import i18next, {changeLanguage, i18n} from 'i18next';
import {DefaultTheme} from "vitepress";

export async function i18nInit() {
    await i18next.init({
        resources: {
            zh: {
                translation: {
                    "quickstart": "快速开始",
                    "advanced": "进阶",
                    "Guide": "指南",

                    "Enumerations": "枚举",
                    "Classes": "类",
                    "Interfaces": "接口",
                    "Functions": "函数",
                    "Type Aliases": "类型",

                    "source image":"原图像",
                    "Split the image by a height of 128px":"按128px高度分割图像",
                }
            }
        }
    });
}

export const t: i18n['t'] = i18next.t;


const guideSideBar: { [key: string]: DefaultTheme.SidebarItem } = {}

export async function getGuideSideBar(lang: string = 'en') {
    if (guideSideBar[lang]) {
        return guideSideBar[lang];
    }

    await changeLanguage(lang);

    let urlPrefix = '';
    if (lang !== 'en') urlPrefix = `/${lang}`;

    guideSideBar[lang] = {
        text: t('Guide'),
        collapsed: false,
        items: [
            {text: t('quickstart'), link: `${urlPrefix}/guide/`},
            {text: t('advanced'), link: `${urlPrefix}/guide/advanced`},
        ]
    };
    return guideSideBar[lang];
}


import dataJSON_8x from '../../api/doc.json';

const sidebar_8x: { [key: string]: DefaultTheme.SidebarItem } = {
    'en': {text: 'API', link: "/api/", items: []},
    'zh': {text: 'API', link: "/zh/api/", items: []}
};

export async function getAPISideBar(lang: string = 'en') {
    await changeLanguage(lang);

    let urlPrefix = '';
    if (lang !== 'en') urlPrefix = `/${lang}`;

    dataJSON_8x.groups.forEach(group => {
        const obj = {text: t(group.title), items: []};
        sidebar_8x[lang].items.push(obj);

        group.children.forEach(childId => {
            const child = getPageById(dataJSON_8x.children, childId);

            obj.items.push({
                text: child.name,
                link: `${urlPrefix}/api/` + group.title.toLowerCase().replace(/\s/ig,'-') + "/" + child.name
            });
        });
    });

    return sidebar_8x[lang];
}


function getPageById(obj: any[], childId: number): any {
    for (let i = 0; i < obj.length; i++) {
        if (obj[i].id !== childId) continue;
        return obj[i];
    }
}
