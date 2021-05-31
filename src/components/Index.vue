<template>

  <div class="index">
    <div class="nav">
      <ul>
      	<li >
          <router-link to="/Discovery"><span class="iconfont icon-yinle"></span>发现音乐</router-link>
        </li>
        <li>
          <router-link to="/Playlists"><span class="iconfont icon-huaban"></span>推荐歌单</router-link>
        </li>
        <li>
          <router-link to="/Songs"><span class="iconfont icon-yinle1"></span>最新音乐</router-link>
        </li>
        <li>
          <router-link to="/Mvs"><span class="iconfont icon-m-video"></span>最新MV</router-link>
        </li>
      </ul>
    </div>

    <div class="main">
     <!-- <Discovery></Discovery> -->
      <router-view></router-view>
    </div>

    <div class="player">
      <audio :src="musicUrl" controls :autoplay="isNo" ></audio>
    </div>

  </div>

</template>

<script>
  // import Discovery from './Discovery.vue'

  export default{
    name:'Index',
    data(){
      return{
        musicUrl:'',
        isNo:false
      }
    }
  }

</script>

<style>

  .index{
    display: flex;
    padding-top:60px;
  }
  .index .nav{
    width:200px;
    background:#ededed;
    min-height:100vh;
  }
  .index .nav li{
    text-align: center;
    font-size:18px;
  }

  .index .nav li:hover{
    background-color:#ddd
  }

  .index .nav li a{
    text-decoration: none;
    color:#555;
    display: block;
    padding:20px 10px;
  }

  .index .nav li a span{
    margin-right:10px;
  }
  .index .main{
    flex:1;
    padding:60px 100px;

  }
  .index .nav li a.router-link-active{
    color:goldenrod
  }

  .index .player{
    position: fixed;
    width:100%;
    bottom:0;
  }

  .index .player audio{
    width: 100%;
    outline:none;
  }

  .index .nav li span.iconfont{
    font-size:20px;
    position: relative;
    top:1px;
  }


</style>
