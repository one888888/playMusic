<template>
  <div class="discovery-cont">
    <section class="banner">
      <el-carousel :interval="4000" type="card">
        <el-carousel-item v-for="data in imgUrl" :key="index">
          <img class="lbt" :src=" data.imageUrl ">
        </el-carousel-item>
      </el-carousel>
    </section>

    <h2 class="title">推荐歌单</h2>

    <div class="items">
      <div class="item" v-for="item in list" :key="index" @click="toPlayInfo(item.id)">
        <section>
          <img :src="item.picUrl">
          <div class="top">{{item.copywriter}}</div>
        </section>
        <div class="mask">{{item.name}}</div>
      </div>
    </div>

    <h2 class="title">发现音乐</h2>

    <div class="items">
      <div class="item-02" v-for="item in songs" :key="index">
        <div class="pic">
          <img :src="item.picUrl" @click="playMusic(item.id)">
        </div>
        <div class="txt">
          <h2>{{item.name}}</h2>
          <p>{{item.song.artists[0].name}}</p>
        </div>
      </div>
    </div>

    <h2 class="title">推荐MV</h2>

    <div class="items mvs">
      <div class="item" v-for="item in mvs" :key="index" @click="toMv(item.id)">
        <section class="mv-s">
          <img :src="item.picUrl">
          <div class="top">播放:{{item.playCount}}</div>
        </section>
        <div class="mask">{{item.name}}</div>
        <div class="down">{{item.artistName}}</div>
      </div>
    </div>

  </div>
</template>

<script>
  import axios from 'axios'
  export default{
    name:'Discovery',
    data(){
      return {
        imgUrl:[],
        list:[],
        songs:[],
        mvs:[]
      }
    },
    methods:{
      toMv(id){
        this.$router.push('/Mv?q='+id);
      },
      toPlayInfo(id){
        this.$router.push('/PlayInfo?q='+id)
      },
      clickMe(){
        this.$message({
          message:'警告...',
          type:'warning'
        })
      },
      playMusic(id){
        axios({
          url:'https://autumnfish.cn/song/url',
          method:'get',
          params:{
            //获取数据量
            //limit:10
            id
          }
        }).then(res=>{
          let url=res.data.data[0].url;
          this.$parent.musicUrl=url
          this.$parent.isNo=true
        })
      }
    },
    created(){
      axios({
        url:'https://autumnfish.cn/banner',
        method:'get'
      }).then(res=>{
         this.imgUrl=res.data.banners
      })

      axios({
        url:'https://autumnfish.cn/personalized',
        method:'get',
        params:{
          //获取数据量
          limit:10
        }
      }).then(res=>{
        this.list=res.data.result
      })

      //发现音乐
      axios({
        url:'https://autumnfish.cn/personalized/newsong',
        method:'get',
        params:{
          //获取数据量
          //limit:10
        }
      }).then(res=>{
        this.songs=res.data.result
      })

      //最新mv
      axios({
        url:'https://autumnfish.cn/personalized/mv',
        method:'get',
        params:{
          //获取数据量
          //limit:10
        }
      }).then(res=>{
        this.mvs=res.data.result
      })

    }

  }
</script>

<style>


  .discovery-cont section.banner{
    margin:0 auto;
    width:1100px;
    height:230px;
  }

  .discovery-cont section.banner .el-carousel__item{
    border-radius:10px;

  }

  .discovery-cont .el-carousel__container{
    height:230px;
  }

  .discovery-cont .title{
    max-width:1100px;
    margin:30px auto;
    color:#666;
    font-size:20px;
  }

  .discovery-cont .items{
    display: flex;
    justify-content:center;
    flex-flow:wrap;
    max-width:1100px;
    margin:0 auto
  }

  .discovery-cont .items .item{
    margin:10px;
    width:200px;
  }

  .discovery-cont .mvs{
    justify-content:space-between
  }

  .discovery-cont .mvs .item section.mv-s{
    height: 120px;
  }

  .discovery-cont .items .item img{
    width:100%;
  }

  .discovery-cont .items .item section{
    overflow:hidden;
    width:200px;
    height:200px;
    position: relative;
  }

  .discovery-cont .items .item .top{
    position: absolute;
    width:100%;
    line-height:30px;
    height:30px;
    top:-30px;
    background:rgba(0,0,0,.5);
    border-bottom: 0;
    color:#fff;
    padding:0 10px;
    box-sizing: border-box;
    transition:.3s;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
  }

  .discovery-cont .mvs .item .top{
    transition:none;
    top:0;
    text-align: right;
  }

  .discovery-cont .items .item .mask{
     line-height:30px;
     height:30px;
     overflow: hidden;
     text-overflow: ellipsis;
     display: -webkit-box;
     -webkit-line-clamp: 1;
     -webkit-box-orient: vertical;
  }

  .discovery-cont .items .item .down{
    color:#666
  }

  .discovery-cont .items .item:hover .top{
    top:0
  }

  .discovery-cont .item-02{
    width:500px;
    height:100px;
    box-sizing: border-box;
    background:#eee;

  }

  .discovery-cont .item-02:nth-of-type(2n+1){
    margin-right:100px;
    margin-bottom: 20px;
  }

  .discovery-cont .item-02:hover{
    background:#ddd
  }

  .discovery-cont .item-02 .pic{
    width:100px;
    height:100px;
    overflow:hidden;
    cursor: pointer;
    background:#ccc;
    float:left;
  }

  .discovery-cont .item-02 .pic img{
    width:100%;
  }

  .discovery-cont .item-02 .txt{
    float: left;
    margin-top:20px;
    margin-left:10px;
  }

  .discovery-cont .item-02 .txt h2{
    color:#333;
    font-size:18px;
  }

  .discovery-cont .item-02 .txt p{
    margin-top:10px;
    font-size:14px;
  }
</style>
