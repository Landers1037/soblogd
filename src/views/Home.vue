<template>
  <div class="home">
    <div class="menu">
      <span id="title">SoBlogd 博客工具</span>
      <el-button icon="el-icon-minus" size="mini" @click="minisize"></el-button>
      <el-button icon="el-icon-full-screen" size="mini" @click="fullscreen"></el-button>
      <el-button type="danger" icon="el-icon-close" size="mini" @click="close"></el-button>
    </div>
    <el-container style="height: calc(100% - 40px)">
      <el-aside class="left-aside" width="220px">
        <el-menu default-active="1" text-color="white" active-text-color="white" align="left">
          <el-menu-item index="1" @click="current = 'Hdb'">
            <i class="el-icon-s-tools"></i>
            <span slot="title">数据库工具</span>
          </el-menu-item>
          <el-menu-item index="2" @click="current = 'Hupdate'">
            <i class="el-icon-upload"></i>
            <span slot="title">更新工具</span>
          </el-menu-item>
          <el-menu-item index="3" @click="current = 'Hview'">
            <i class="el-icon-document"></i>
            <span slot="title">本地预览</span>
          </el-menu-item>
          <el-menu-item index="4" @click="current = 'Hview'">
            <i class="el-icon-data-analysis"></i>
            <span slot="title">在线预览</span>
          </el-menu-item>
          <el-menu-item index="5" @click="current = 'Hsetting'">
            <i class="el-icon-s-tools"></i>
            <span slot="title">设置</span>
          </el-menu-item>
        </el-menu>
      </el-aside>
      <el-main style="position: relative">
        <keep-alive>
          <component :is="current"></component>
        </keep-alive>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import {ipcRenderer,remote} from 'electron';
// let appPath = remote.app.getPath("exe").replace("electron.exe","");
import Hdb from "./Hdb";
import Hupdate from "./Hupdate";
import Hview from "./Hview";
import Hsetting from "./Hsetting";

export default {
  name: 'Home',
  components: {Hdb,Hupdate,Hview,Hsetting},
  data(){
    return{
      current: 'Hdb'
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
  }
}
</script>
<style scoped>
  .home{
    color: white;
    height: 100%;
    font-family: '55s','Avenir', Helvetica, Arial, sans-serif!important;
  }
  .home /deep/  .el-button,.home /deep/ .el-input__inner{
    font-family: '55s',sans-serif;
  }
  .home .menu{
    position: relative;
    height: 35px;
    padding-top: 5px;
    padding-right: 10px;
    background-color: #0a0c23;
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
    color: white;
    position: absolute;
    left: 10px;
    top: 10px;
  }
  .home .menu .el-button{
    -webkit-app-region: no-drag;
  }
  .home .left-aside{
    padding-top: 20px;
    border-right: white;
    background-color: #0a0c23;
  }
</style>
<style>
  /*重写样式*/
  .el-notification__group{
    font-family: '55s',sans-serif;
  }
  .home /deep/ .el-menu{
    background-color: #0a0c23;
    border-right: none;
  }
  .home /deep/ .el-menu-item:hover,.home /deep/ .el-menu-item:focus{
    background-color: #2f343f;
  }
</style>