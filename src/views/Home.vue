<template>
  <div class="home">
    <div class="menu">
      <span id="title">SoBlogd 博客工具</span>
      <el-button icon="el-icon-minus" size="mini" @click="minisize"></el-button>
      <el-button icon="el-icon-full-screen" size="mini" @click="fullscreen"></el-button>
      <el-button type="danger" icon="el-icon-close" size="mini" @click="close"></el-button>
    </div>
    <div style="padding: 40px 10px">
      <el-button type="primary" icon="el-icon-folder-opened" style="margin-bottom: 40px" @click="choose">选择数据文件</el-button>
      <el-input placeholder="本地的xml文件" v-model="xmlfile" style="margin-bottom: 15px">
        <template slot="prepend"><i class="el-icon-paperclip"></i></template>
      </el-input>
      <el-input placeholder="本地的JSON文件" v-model="jsonfile" style="margin-bottom: 15px">
        <template slot="prepend"><i class="el-icon-paperclip"></i></template>
      </el-input>
      <el-input placeholder="要更新的UV值" v-model="num">
        <template slot="prepend"><i class="el-icon-paperclip"></i></template>
      </el-input>
      <div style="margin-top: 30px">
        <el-button icon="el-icon-toilet-paper" type="primary" @click="json">生成JSON</el-button>
        <el-button icon="el-icon-ship" type="info" @click="db">生成数据库</el-button>
        <el-row style="margin-top: 20px">
          <el-button icon="el-icon-lollipop" plain @click="deletedb">删除数据库</el-button>
          <el-button icon="el-icon-lollipop" plain @click="py">生成PY文件</el-button>
          <el-button icon="el-icon-lollipop" plain @click="updateuv">更新数据库UV</el-button>
        </el-row>
      </div>
    </div>
  </div>
</template>

<script>
import {ipcRenderer,remote} from 'electron';
const cmd = require('node-cmd');
const app = require('electron').remote.app;
let appPath = app.getPath("exe").replace("soblogd.exe","");
let exe = '"'+appPath + "utils/soblogtool.exe" + '"';
// let appPath = remote.app.getPath("exe").replace("electron.exe","");
export default {
  name: 'Home',
  data(){
    return{
      loading: null,
      xmlfile: '',
      jsonfile: '',
      num: ''
    }
  },
  methods:{
    minisize(){
      ipcRenderer.send('min');
    },
    fullscreen(){
      ipcRenderer.send('full');
    },
    close(){
      ipcRenderer.send('close');
    },
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
                  { name: 'File', extensions: ['xml','json'] },
                  { name: 'All Files', extensions: ['*'] }
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
    }
  }
}
</script>
<style scoped>
  .home{
    color: white;
    font-family: '55s','Avenir', Helvetica, Arial, sans-serif!important;
  }
  .home /deep/  .el-button,.home /deep/ .el-input__inner{
    font-family: '55s',sans-serif;
  }
  .home .menu{
    position: relative;
    text-align: right;
    -webkit-user-select: none;
    -webkit-app-region: drag
  }
  .home /deep/ .menu .el-button:focus{
    border-color: transparent;
    background-color: white;
  }
  .home /deep/ .menu .el-button:hover{
    background-color: #13ce66;
    color: white;
    border-color: transparent;
  }
  .home .menu #title{
    position: absolute;
    left: 10px;
  }
  .home .menu .el-button{
    -webkit-app-region: no-drag;
  }
</style>
<style>
  /*重写样式*/
  .el-notification__group{
    font-family: '55s',sans-serif;
  }
</style>