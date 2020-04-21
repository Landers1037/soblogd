<template>
    <div class="hsetting">
        <el-badge style="margin-bottom: 25px">全局设置</el-badge>
        <el-row>
            <el-col style="margin-bottom: 20px">
                <el-button type="primary" icon="el-icon-s-platform" @click="openpath">本地目录</el-button>
                <el-button type="primary" icon="el-icon-delete" @click="clean">清空缓存</el-button>
            </el-col>
            <el-col style="margin-bottom: 20px">
                <el-button type="info" icon="el-icon-circle-plus" @click="openblog">打开博客</el-button>
                <el-button type="danger" icon="el-icon-error" @click="close">退出程序</el-button>
            </el-col>
            <el-col>
                <el-input placeholder="指定博客地址" v-model="blog">
                    <template slot="prepend">http://</template>
                </el-input>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    const { shell } = require('electron');
    const ipcRenderer = require('electron').ipcRenderer;
    const app = require('electron').remote.app;
    let appPath = app.getPath("exe").replace("soblogd.exe","");
    export default {
        name: "Hsetting",
        data(){
            return{
                blog: ''
            }
        },
        methods:{
            openblog(){
                if(this.blog !== '' && this.blog.indexOf('http://') === -1){
                    shell.openExternal('http://' + this.blog)
                }
                else if(this.blog !== '' && this.blog.indexOf('http://') !== -1){
                    shell.openExternal(this.blog);
                }
                else{
                    shell.openExternal('https://blog.lrenj.top');
                }
            },
            openpath(){
                shell.showItemInFolder(appPath);
            },
            clean(){
                ipcRenderer.send('clean');
            },
            close(){
                ipcRenderer.send('close');
            }
        }
    }
</script>

<style scoped>
    .hsetting{
        text-align: left;
        padding-top: 20px;
    }
    .hsetting /deep/ .el-input__inner{
        border: 1px solid #DCDFE6
    }
    .hsetting /deep/ .el-input__inner:focus{
        outline: none;
        border: 1px solid #DCDFE6;
    }
</style>