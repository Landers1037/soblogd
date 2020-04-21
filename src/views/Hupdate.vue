<template>
    <div class="hupdate">
        <el-badge>确保文章的POSTS目录存在</el-badge>
        <el-input placeholder="要更新的UV值" v-model="num" style="margin-top: 40px">
            <template slot="prepend"><i class="el-icon-paperclip"></i></template>
        </el-input>
        <el-row style="margin-top: 50px">
            <el-col style="margin-bottom: 15px"><el-button icon="el-icon-lollipop" plain @click="updateuv">更新UV</el-button></el-col>
            <el-col style="margin-bottom: 15px"><el-button icon="el-icon-lollipop" plain @click="updatepost">更新文章</el-button></el-col>
            <el-col><el-button icon="el-icon-lollipop" plain @click="updatetag">更新标签</el-button></el-col>
        </el-row>
    </div>
</template>

<script>
    const cmd = require('node-cmd');
    const app = require('electron').remote.app;
    let appPath = app.getPath("exe").replace("soblogd.exe","");
    let exe = '"'+appPath + "utils/soblogtool.exe" + '"';
    export default {
        name: "Hupdate",
        data(){
            return{
                num: ''
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
            updateuv(){
                let that = this;
                let num = that.num;
                if(num!==''){
                    that.loadlingPage();
                    cmd.get(exe+' update '+num+' -u',function (err,data) {
                        if(err){
                            that.loading.close();
                            that.$notify.error({
                                title: '错误',
                                message: '更新UV失败',
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
                        message: '请输入UV值',
                        position: 'bottom-right'
                    });
                }
            },
            updatepost(){

            },
            updatetag(){

            }
        }
    }
</script>

<style scoped>
    .hupdate{
        padding-top: 20px;
    }
    .hupdate /deep/ .el-input__inner{
        border: 1px solid #DCDFE6
    }
    .hupdate /deep/ .el-input__inner:focus{
        outline: none;
        border: 1px solid #DCDFE6;
    }
</style>