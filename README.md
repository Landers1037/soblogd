# soblogd
自用的Hexo博客索引转换工具

### 依赖

使用electron6.0+，vueCLI@4.3.0



### 使用

运行安装**soblogd.exe**文件

### 编译

```bash
yarn install
yarn run electron:build
```

### 功能介绍

从Hexo生成的博客索引`xml`文件转换为标准`JSON`

将本地的posts目录的全部markdown文件生成为支持`sqlite3`的数据库文件

更新需要的数据字段，UV，博文，标签

其他功能