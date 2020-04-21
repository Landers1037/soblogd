<template>
    <div class="hdb">
        <el-button type="primary" icon="el-icon-folder-opened" style="margin-bottom: 40px" @click="choose">选择数据文件</el-button>
        <el-input placeholder="本地的xml文件" v-model="xmlfile" style="margin-bottom: 15px">
            <template slot="prepend"><i class="el-icon-paperclip"></i></template>
        </el-input>
        <el-input placeholder="本地的JSON文件" v-model="jsonfile" style="margin-bottom: 15px">
            <template slot="prepend"><i class="el-icon-paperclip"></i></template>
        </el-input>

        <div style="margin-top: 30px">
            <el-button icon="el-icon-toilet-paper" type="primary" @click="json">生成JSON</el-button>
            <el-button icon="el-icon-ship" type="info" @click="db">生成数据库</el-button>
            <el-row style="margin-top: 20px">
                <el-button icon="el-icon-lollipop" plain @click="deletedb">删除数据库</el-button>
                <el-button icon="el-icon-lollipop" plain @click="py">生成PY文件</el-button>
            </el-row>
        </div>
        <p style="position: absolute;left: 10px;bottom: 20px;font-size: 12px">使用：选择xml文件->生成json文件->生成数据库/生成py文件</p>
    </div>
</template>

<script>
    import {remote} from 'electron';
    const cmd = require('node-cmd');
    const app = require('electron').remote.app;
    let appPath = app.getPath("exe").replace("soblogd.exe","");
    let exe = '"'+appPath + "utils/soblogtool.exe" + '"';
    export default {
        name: "Hdb",
        data(){
            return{
                loading: null,
                xmlfile: '',
                jsonfile: '',
            }
        },
        methods:{
            loadlingPage(){
                this.loading = this.$loading({
                    lock: true,
                    text: 'Loading',
                    spinner: 'el-icon-loading',
                    background: 'rgba(0, 0, 0, 0.8)'
                });
            },
            choose(){
                let that = this;
                remote.dialog.showOpenDialog({
                    title:'选择数据文件',
                    filters:[
                        { name: 'File', extensions: ['xml','json'] }
                    ]
                }).then(s=>{
                    let cf;
                    cf = s.filePaths[0];
                    if(cf.indexOf('xml')!==-1){
                        that.xmlfile = cf;
                    }else if(cf.indexOf('json')!==-1){
                        that.jsonfile = cf;
                    }
                })
            },
            json(){
                try {
                    let xmlpath = this.xmlfile;
                    let that = this;
                    if(xmlpath.length>=1){
                        that.loadlingPage();
                        cmd.get(exe+' json '+xmlpath,function (err,data) {
                            if(err){
                                console.log(err);
                                that.loading.close();
                                that.$notify.error({
                                    title: '错误',
                                    message: '生成JSON文件失败',
                                    position: 'bottom-right'
                                });
                            }else {
                                that.loading.close();
                                if(data.indexOf('done')!==-1){
                                    that.$notify({
                                        title: '成功',
                                        message: '操作已完成',
                                        type: 'success'
                                    });
                                }else {
                                    that.$notify.error({
                                        title: '错误',
                                        message: '出现错误，检查文件路径是否正确',
                                        position: 'bottom-right'
                                    });
                                }
                            }
                        });
                    }else {
                        that.$notify.error({
                            title: '错误',
                            message: '请指定xml文件',
                            position: 'bottom-right'
                        });
                    }
                }catch (e) {
                    console.log(e)
                }
            },
            db(){
                let that = this;
                that.$notify.info({
                    title: '注意',
                    message: '确保首先执行生成JSON文件'
                });
                that.loadlingPage();
                cmd.get(exe+' newdb',function (err,data) {
                    if(err){
                        that.loading.close();
                        that.$notify.error({
                            title: '错误',
                            message: '生成数据库文件失败',
                            position: 'bottom-right'
                        });
                    }else {
                        that.loading.close();
                        if(data.indexOf('done')!==-1){
                            that.$notify({
                                title: '成功',
                                message: '操作已完成',
                                type: 'success'
                            });
                        }else {
                            that.$notify.error({
                                title: '错误',
                                message: '出现错误，检查文件路径是否正确',
                                position: 'bottom-right'
                            });
                        }
                    }
                });
            },
            deletedb(){
                let that = this;
                that.loadlingPage();
                cmd.get(exe+' rmdb',function (err,data) {
                    if(err){
                        that.loading.close();
                        that.$notify.error({
                            title: '错误',
                            message: '删除数据库文件失败',
                            position: 'bottom-right',
                        });
                    }else {
                        that.loading.close();
                        if(data.indexOf('done')!==-1){
                            that.$notify({
                                title: '成功',
                                message: '操作已完成',
                                type: 'success'
                            });
                        }else {
                            that.$notify.error({
                                title: '错误',
                                message: '出现错误，检查文件路径是否正确',
                                position: 'bottom-right'
                            });
                        }
                    }
                });
            },
            py(){
                let that = this;
                let xmlpath = that.xmlfile;
                if(xmlpath.length>=1){
                    that.loadlingPage();
                    cmd.get(exe+' py '+xmlpath,function (err,data) {
                        if(err){
                            that.loading.close();
                            that.$notify.error({
                                title: '错误',
                                message: '生成PY文件失败',
                                position: 'bottom-right'
                            });
                        }else {
                            that.loading.close();
                            if(data.indexOf('done')!==-1){
                                that.$notify({
                                    title: '成功',
                                    message: '操作已完成',
                                    type: 'success'
                                });
                            }else {
                                that.$notify.error({
                                    title: '错误',
                                    message: '出现错误，检查文件路径是否正确',
                                    position: 'bottom-right'
                                });
                            }
                        }
                    });
                }else {
                    that.$notify.error({
                        title: '错误',
                        message: '请指定xml文件',
                        position: 'bottom-right'
                    });
                }

            },
        }
    }
</script>

<style scoped>
    .hdb{
        text-align: center;
        padding-top: 20px;
    }
    .hdb /deep/ .el-input__inner{
        border: 1px solid #DCDFE6
    }
    .hdb /deep/ .el-input__inner:focus{
        outline: none;
        border: 1px solid #DCDFE6;
    }
</style>