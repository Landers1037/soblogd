module.exports = {
  productionSourceMap: false,
  css: {
    extract: true
  },
  pluginOptions: {
    electronBuilder: {
      builderOptions: {
        // options placed here will be merged with default configuration and passed to electron-builder
        appId: "liaorenj@gmail.com",
        productName: "soblogd",
        icon: "./utils/favicon.ico",
        nsis:{
          oneClick: false,
          allowToChangeInstallationDirectory: true,
          runAfterFinish: false,
          shortcutName: "SoBlog",
        },
        extraFiles:[
          "./utils/**",
        ]
      }
    }
  },
}