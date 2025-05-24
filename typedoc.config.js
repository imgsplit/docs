/** @type {Partial<import("typedoc").TypeDocOptions>} */
const config = {
    name: 'API',
    logLevel:'Error',
    cleanOutputDir:true,
    plugin: ["typedoc-plugin-markdown",'./plugin/typedoc-markdown-plugin.mjs','./plugin/typedoc-language-plugin.mjs'],
    entryPoints: ["./node_modules/@imgsplit/core/lib/index.d.ts"],
    readme: 'none',
    router: "member",
    entryFileName: "index",
    hidePageHeader: true,
    useCodeBlocks: true,
    disableSources: true,
    excludePrivate: true,
    excludeProtected: true,
    excludeExternals: false,
    expandObjects: true,
    expandParameters: true,
    indexFormat:'table',
    parametersFormat:'table',
    typeDeclarationFormat:'table',
    typeAliasPropertiesFormat:'table',
    enumMembersFormat:'table',
    tableColumnSettings: {
        hideSources: true,
        hideOverrides: true,
        hideInherited: true,
    },
    jsDocCompatibility:{

    }
};

export default config;