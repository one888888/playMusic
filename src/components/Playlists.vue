<template>
  <div class="playlist-cont">
    <section>
      <div class="playlist-top">
        <div class="pic">
          <img :src="topList.coverImgUrl">
        </div>
        <div class="txt">
          <div class="t">精品歌单</div>
          <h3>{{topList.name}}</h3>
          <p>{{topList.description}}</p>
        </div>
        <img :src="topList.coverImgUrl" class="bg-img">
      </div>
    </section>


    <div class="tab-cont">
      <div class="tab-bar">
          <span class="item" :class="{active:tag=='全部'}" @click="get">全部</span>
          <span class="item" :class="{active:tag=='欧美'}" @click="get">欧美</span>
          <span class="item" :class="{active:tag=='华语'}" @click="get">华语</span>
          <span class="item" :class="{active:tag=='流行'}" @click="get">流行</span>
          <span class="item" :class="{active:tag=='说唱'}" @click="get">说唱</span>
          <span class="item" :class="{active:tag=='摇滚'}" @click="get">摇滚</span>
          <span class="item" :class="{active:tag=='民谣'}" @click="get">民谣</span>
          <span class="item" :class="{active:tag=='电子'}" @click="get">电子</span>
          <span class="item" :class="{active:tag=='轻音乐'}" @click="get">轻音乐</span>
          <span class="item" :class="{active:tag=='影视原声'}" @click="get">影视原声</span>
          <span class="item" :class="{active:tag=='ACG'}" @click="get">ACG</span>
          <span class="item" :class="{active:tag=='怀旧'}" @click="get">怀旧</span>
          <span class="item" :class="{active:tag=='治愈'}" @click="get">治愈</span>
          <span class="item" :class="{active:tag=='旅行'}" @click="get">旅行</span>
      </div>
    </div>


    <div class="items">
      <div class="item" v-for="item in list" @click="toPlayInfo(item.id)">
        <section>
          <img :src="item.coverImgUrl">
          <div class="top">播放量：{{item.playCount}}</div>
        </section>
        <div class="mask">{{item.name}}</div>
      </div>
    </div>

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

  export default{
    data(){
      return {
        total:0,
        page:1,
        topList:{},
        list:[],
        tag:'全部'
      }
    },
    created(){
      this.topData()
      this.listData()
    },
    methods:{
      toPlayInfo(id){
        this.$router.push('/PlayInfo?q='+id)
      },
      topData(){
        axios({
          url:'https://autumnfish.cn/top/playlist/highquality',
          method:'get',
          params:{
            limit:10,
            cat:this.tag
          }
        }).then(res=>{
          this.topList=res.data.playlists[0]
        })
      },
      listData(){
        axios({
          url:'https://autumnfish.cn/top/playlist/',
          method:'get',
          params:{
            limit:10,
            //offset (页码-1)*每页多少条数据
            offset:(this.page-1)*10,
            cat:this.tag
          }
        }).then(res=>{
          this.list=res.data.playlists;
          this.total=res.data.total;
        })
      },
      get(e){
        let activeValue=e.srcElement.innerHTML
        this.tag=activeValue;
        this.topData()
        this.listData()
        this.page=1;
      },
      handleCurrentChange(e){
        this.page=e;
        this.listData()
      }
    }
  }

</script>

<style>
  .playlist-cont section{
    width:1100px;
    height:200px;
    margin:0 auto;

  }

  .playlist-cont .tab-cont{
    max-width:1100px;
    margin:0 auto;
    line-height:80px;
  }

  .playlist-cont .tab-bar{
    float:right
  }

  .playlist-cont .tab-bar span{
    margin-left:20px;
    color:#666;
    cursor: pointer;
    font-size:14px
  }

  .playlist-cont .tab-bar span.active{
    color:orange
  }

  .playlist-cont .tab-cont::after{
    content: '';
    display: block;
    clear:both
  }

  .playlist-cont .playlist-top{
    position: relative;
    display: flex;
    width:100%;
    height:200px;
    border-radius: 5px;
    padding:10px;
    overflow: hidden;
    box-sizing: border-box;
  }
  .playlist-cont .playlist-top .pic{
    width:180px;
    height:180px;
    background:#eee;
    float:left;
    overflow:hidden;
    z-index: 1;
  }

  .playlist-cont .playlist-top img{
    width:100%;
  }

  .playlist-cont .playlist-top .txt{
    float:left;
    margin-left:10px;
    margin-top:10px;
    width:850px;
    color:#fff;
    z-index: 1;
  }

  .playlist-cont .playlist-top .txt p{
    text-align: justify;
    font-size:14px;
    margin-top:10px;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 5;
    -webkit-box-orient: vertical;
  }

  .playlist-cont .playlist-top img.bg-img{
    width: 120%;
    position: absolute;
    left: -10%;
    top: -10%;
    right: 0;
    bottom: 0;
    z-index: 0;
    filter:brightness(70%) blur(10px)
  }

  .playlist-cont .items{
    display: flex;
    justify-content:center;
    flex-flow:wrap;
    max-width: 1100px;
    margin:0 auto;
  }

  .playlist-cont .items .item{
    margin:10px;
    width:200px;
  }
  .playlist-cont .items .item img{
    width:100%;
  }
  .playlist-cont .items .item section{
    overflow:hidden;
    width:200px;
    height:200px;
    position: relative;
  }
  .playlist-cont .items .item .top{
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
  .playlist-cont .items .item .mask{
     line-height:30px;
     height:30px;
     overflow: hidden;
     text-overflow: ellipsis;
     display: -webkit-box;
     -webkit-line-clamp: 1;
     -webkit-box-orient: vertical;
  }
  .playlist-cont .items .item .down{
    color:#666
  }
  .playlist-cont .items .item:hover .top{
    top:0
  }

  /*分页*/
  .playlist-cont .el-pagination{
    text-align: center;
    margin:30px 0;
  }

  .playlist-cont .el-pagination.is-background .el-pager li:not(.disabled).active{
    background:orange
  }

</style>
