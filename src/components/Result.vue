<template>

  <div class="result-container">
    <h1 class="title">{{$route.query.q}}<span>找到{{count}}结果</span></h1>

    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="歌曲" name="songs">
        <ul class="music-list">
          <li>
            <div class="num"></div>
            <div class="title">音乐标题</div>
            <div class="singer">歌手</div>
            <div class="album">专辑</div>
            <div class="time">时长</div>
          </li>

          <li v-for="(item,index) in songList" :key="index" @click="playMusic(item.id)">
            <div class="num">{{index+1}}</div>
            <div class="title">{{item.name}}<span class="el-icon-video-play" v-if="item.mvid!=0"  @click="toMv(item.mvid)" @click.stop="playMusic"></span></div>
            <div class="singer">{{item.artists[0].name}}</div>
            <div class="album">{{item.album.name}}</div>
            <div class="time">{{toMinutes(item.duration)}}</div>
          </li>
        </ul>
      </el-tab-pane>
      <el-tab-pane label="歌单" name="lists">
        <div class="mvs">
          <div class="items">
            <div class="item" v-for="(item,index) in playList" :key="index" style="width:200px;margin-right:20px;" @click="toPlayInfo(item.id)">
              <div class="img-wrap"><img :src="item.coverImgUrl+'?param=200y200'"
                  alt="">
                <div class="num-wrap">
                  <div class="iconfont el-icon-caret-right"></div>
                  <div class="num">{{item.playCount}}</div>
                </div>
              </div>
              <div class="info-wrap">
                <div class="name">{{item.name}}</div>
                <!-- div class="singer">{{item.artistName}}</div> -->
              </div>
            </div>
          </div>
        </div>
      </el-tab-pane>
      <el-tab-pane label="MV" name="mv">
        <div class="mvs">
          <div class="items">
            <div class="item" v-for="(item,index) in mvList" :key="index" @click="toMv(item.id)">
              <div class="img-wrap"><img :src="item.cover+'?param=250y150'"
                  alt="">
                <div class="num-wrap">
                  <div class="iconfont el-icon-caret-right"></div>
                  <div class="num">{{item.playCount}}</div>
                </div>
                <div class="time">{{toMinutes(item.duration)}}</div>
              </div>
              <div class="info-wrap">
                <div class="name">{{item.name}}</div>
                <div class="singer">{{item.artistName}}</div>
              </div>
            </div>
          </div>
        </div>
      </el-tab-pane>
    </el-tabs>



    <el-pagination
      @current-change="handleCurrentChange"
      background
      layout="prev, pager, next"
      :total="total"
      :current-page="page"
      :page-size="10"
    >
    </el-pagination>

  </div>

</template>

<script>

  import axios from 'axios'
  import sch from '../router/siblings.js'

  export default{

    data(){
      return {
        activeName:'songs',
        songList:[],
        playList:[],
        mvList:[],
        count:0,
        str:'',
        total:0,
        page:1
      }
    },
    watch:{
      str(){
        this.getSong()
      },
      activeName(){
        this.getSong()
      }
    },
    created(){
      this.getSong()
    },
    methods:{
      //去mv页面
      toMv(id,event){
        this.$router.push('/Mv?q='+id);
      },
      handleClick(){
        this.page=1
      },
      handleCurrentChange(val){
        this.page=val;
        this.getSong()
      },
      toPlayInfo(id){
        this.$router.push('/PlayInfo?q='+id)
      },
      toMinutes(num){
        let m=Math.floor((num/60000));
        let s=Math.floor((num/1000)%60);
        return ''+(m>=10?m:'0'+m)+':'+(s>=10?s:'0'+s)
      },
      playMusic(id){
        axios({
          url:'https://autumnfish.cn/song/url',
          method:'get',
          params:{
            id
          }
        }).then(res=>{
          let url=res.data.data[0].url;
          this.$parent.musicUrl=url
          this.$parent.isNo=true;
        })
      },

      getSong(){
        let type=1;
        let limit=10;

        switch(this.activeName){
          case 'songs':
            type=1;
            limit=10;
            break;
          case 'lists':
            type=1000;
            limit=10;
            break;
          case 'mv':
            type=1004;
            limit=8;
            break;
        }

        axios({
          url:'https://autumnfish.cn/search',
          method:'get',
          params:{
            keywords:this.$route.query.q,
            type,
            limit,
            offset:(this.page-1)*10
          }
        }).then(res=>{

          if(type==1){   //歌曲
            this.songList=res.data.result.songs;
            this.count=res.data.result.songCount;
          }else if(type==1000){
            this.playList=res.data.result.playlists;
            this.count=res.data.result.playlistCount;
            for(let i=0;i<this.playList.length;i++){
              if(this.playList[i].playCount>100000){
                this.playList[i].playCount=parseInt(this.playList[i].playCount/10000)+'万'
              }
            }
          }else{
            this.mvList=res.data.result.mvs
            this.count=res.data.result.mvCount;
            for(let i=0;i<this.mvList.length;i++){
              if(this.mvList[i].playCount>100000){
                this.mvList[i].playCount=parseInt(this.mvList[i].playCount/10000)+'万'
              }
            }
          }

          this.total=this.count

        })
      }

    },
    mounted(){
      // var self=this;
      sch.$on('event',(str)=>{
        this.str=str
      })
    }
  }

</script>

<style>
  *{margin:0;padding:0;}
  li{list-style:none;}

  .result-container{
    width:1100px;
    margin:0 auto;
  }

  .result-container h1.title{
    font-size:20px;
    margin-bottom:30px;
  }

  .result-container h1.title span{
    font-size:14px;
    color:#666;
    margin-left:10px;
    font-weight: normal;
  }

  .result-container .el-tabs__item{
    font-size:16px;
  }

  .result-container .music-list{
    margin:0; padding:0;
    list-style: none;
  }

  .result-container .music-list li{
    line-height:40px;
    color:#666;
    font-size:15px;
    transition:.3s;
    cursor: pointer;
  }

  .result-container .music-list li:nth-of-type(1){
    color:#999;
    font-size:15px;
    margin-bottom:10px;
  }

  .result-container .music-list li::after{
    content:"";
    display: block;
    clear: both;
  }

  .result-container .music-list li>div{
    float:left;
    height:40px;
  }

  .result-container .music-list li>div:nth-of-type(1){
    width:50px;
    text-indent:10px;
  }

  .result-container .music-list li>div:nth-of-type(2){
    width:300px;
  }

  .result-container .music-list li>div:nth-of-type(3){
    width:200px;
  }

  .result-container .music-list li>div:nth-of-type(4){
    width:495px;
  }

  .result-container .music-list li>div:nth-of-type(5){
    width:55px;
  }

  .result-container .music-list li.li-list{
    transition:.3s;
  }

  .result-container .music-list li.li-list:hover{
    background:#f6f6f6;
  }

  .result-container .music-list li .title span{
    color: orange;
    margin-left:5px;
    vertical-align: middle;
  }

  .result-container .music-list li:nth-of-type(2n){
    background:#f6f6f6
  }

  .result-container .music-list li:hover{
    background:#f8f8f8;
  }

  .result-container .music-list li:nth-of-type(1):hover{
    background:none
  }


  .result-container .mvs .items .item {
    width: 250px;
    cursor: pointer;
    margin-right: 25px;
    margin-bottom: 30px;
  }

  .result-container .mvs .items {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-pack: start;
    -ms-flex-pack: start;
    justify-content: flex-start;
    -ms-flex-wrap: wrap;
    flex-wrap: wrap;
   }

   .result-container .mvs .items .item {
    width: 250px;
    cursor: pointer;
    margin-right: 25px;
    margin-bottom: 30px;
   }
   .result-container .mvs .items .item .img-wrap {
      width: 100%;
      position: relative;
    }

    .result-container .mvs .items .item .img-wrap img {
        width: 100%;
        border-radius: 5px;
    }
    .result-container .mvs .items .item .img-wrap .num-wrap {
        position: absolute;
        color: #fff;
        top: 0;
        right: 0;
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        -ms-flex-line-pack: center;
        align-content: center;
        font-size: 15px;
        padding-right: 5px;
        padding-top: 2px;
     }
     .result-container .mvs .items .item .info-wrap .name {
         font-size: 15px;
         overflow: hidden;
         text-overflow: ellipsis;
         display: -webkit-box;
         -webkit-line-clamp: 1;
         -webkit-box-orient: vertical;
     }
     .result-container .mvs .items .item .info-wrap .singer {
         font-size: 14px;
         color: #666;
      }

      .result-container .mvs .time{
         position: absolute;
         right:10px;
         bottom:10px;
         color:#fff;
      }

      .mvs-container .el-pagination{
        text-align: center;
      }

      .el-pagination.is-background .el-pager li:not(.disabled).active{
        background:orange
      }

      .el-icon-caret-right{
        margin-top:2px;
        margin-right:5px
      }

      .el-pagination{
        text-align: center;
        margin-top: 30px;
      }



</style>
