<template>

  <div class="play-info">
    <div class="top-info clear-both">
      <div class="pic">
        <img :src="playlist.coverImgUrl">
      </div>
      <div class="txt">
        <h1>{{playlist.name}}</h1>
        <section>
          <span class="img">
            <img :src="playlist.creator.avatarUrl">
          </span>
          <span class="name">{{playlist.creator.nickname}}</span>
          <time>{{toDate(playlist.createTime)}}</time>
        </section>
        <button>播放全部</button>
        <mark>标签:
          <i v-for="(item,index) in playlist.tags" :kay="index">{{item}}</i>
        </mark>
        <p>简介：{{playlist.description}}</p>
      </div>
    </div>


    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="歌曲列表" name="songlist">
        <ul class="music-list">
          <li>
            <div class="num"></div>
            <div class="pic"></div>
            <div class="title">音乐标题</div>
            <div class="singer">歌手</div>
            <div class="album">专辑</div>
            <div class="time">时长</div>
          </li>
          <li v-for="(item,index) in musicList" :key="index">
            <div class="num">{{index+1}}</div>
            <div class="pic">
              <section>
                <img :src="item.al.picUrl" @click="playMusic(item.id)">
              </section>
            </div>
            <div class="title">{{item.name}}<span class="el-icon-video-play" v-if="item.mv!=0" @click="toMv(item.mv)"></span></div>
            <div class="singer">{{item.ar[0].name}}</div>
            <div class="album">{{item.al.name}}</div>
            <div class="time">{{toMinutes(item.dt)}}</div>
          </li>
        </ul>
      </el-tab-pane>
      <el-tab-pane :label=" '评论('+total+')' " name="say">
        <h1 class="say-title" v-if="hotCount!=0">精彩评论 ({{hotCount}})</h1>
        <ul class="say-list">
        	<li v-for="(item,index) in hotComment" :key="index">
            <div class="pic">
              <img :src="item.user.avatarUrl">
            </div>
            <div class="txt">
              <div class="user">
                <span class="name">{{item.user.nickname}}:</span>
                <span class="comment">{{item.content}}</span>
              </div>

              <div class="re-cont" v-if="item.beReplied.length!=0">
                <span class="name">{{item.beReplied[0].user.nickname}}:</span>
                <span class="comment">{{item.beReplied[0].content}}</span>
              </div>

              <div class="time">{{toDate(item.time)}}</div>
            </div>
          </li>
        </ul>

        <h1 class="say-title">最新评论 ({{total}})</h1>
        <ul class="say-list">
        	<li v-for="(item,index) in comments" :key="index">
            <div class="pic">
              <img :src="item.user.avatarUrl">
            </div>
            <div class="txt">
              <div class="user">
                <span class="name">{{item.user.nickname}}:</span>
                <span class="comment">{{item.content}}</span>
              </div>

              <div class="re-cont" v-if="item.beReplied.length!=0">
                <span class="name">{{item.beReplied[0].user.nickname}}:</span>
                <span class="comment">{{item.beReplied[0].content}}</span>
              </div>

              <div class="time">{{toDate(item.time)}}</div>
            </div>
          </li>
        </ul>


        <el-pagination
          @current-change="handleCurrentChange"
          background
          layout="prev, pager, next"
          :total="total"
          :current-page="page"
          :page-size="10"
        >
        </el-pagination>

      </el-tab-pane>
    </el-tabs>







  </div>

</template>

<script>
  import axios from 'axios'

  export default{
    name:'PlayInfo',
    data(){
      return {
        playlist:{},
        activeName: 'songlist',
        musicList:{},
        tag:0,
        hotComment:[],
        hotCount:0,
        total:0,
        page:1,
        comments:[]
      }
    },
    created(){
      //获取歌单详情
      axios({
        url:'https://autumnfish.cn/playlist/detail',
        method:'get',
        params:{
          id:this.$route.query.q
        }
      }).then(res=>{
        this.playlist=res.data.playlist;
      })

      //获取评论
      axios({
        url:'https://autumnfish.cn/comment/hot',
        method:'get',
        params:{
          id:this.$route.query.q,
          type:2,
        }
      }).then(res=>{
        this.hotComment=res.data.hotComments;
        this.hotCount=res.data.total;
      })

      ////获取 最新评论
      axios({
        url:'https://autumnfish.cn/comment/playlist',
        method:'get',
        params:{
          id:this.$route.query.q,
          limit:10,
          offset:0
        }
      }).then(res=>{
        this.total=res.data.total;
        this.comments=res.data.comments   //评论数
      })


      this.getListData()
    },
    methods:{
      toMv(id){
        this.$router.push('/Mv?q='+id);
      },
      toMinutes(num){
        let m=Math.floor((num/60000));
        let s=Math.floor((num/1000)%60);
        return ''+(m>=10?m:'0'+m)+':'+(s>=10?s:'0'+s)
      },
      toDate(timestamp){
        var date =  new Date(timestamp);
        var y = 1900+date.getYear();
        var m = "0"+(date.getMonth()+1);
        var d = "0"+date.getDate();
        var h = "0"+date.getHours();
        var min = "0"+date.getMinutes();
        var sec = "0"+date.getSeconds()
        return y+"-"+m.substring(m.length-2,m.length)+"-"+d.substring(d.length-2,d.length)+'\xa0\xa0\xa0'+h.substring(h.length-2,h.length)+':'+min.substring(min.length-2,min.length)+':'+sec.substring(sec.length-2,sec.length);
      },
      handleClick(){

      },
      getListData(){
        axios({
          url:'https://autumnfish.cn/playlist/detail',
          method:'get',
          params:{
           id:this.$route.query.q,

          },
        }).then(res=>{
           this.musicList=res.data.playlist.tracks
           //this.musicList.splice(5)
        })
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
      handleCurrentChange(val){
        this.page=val
        axios({
          url:'https://autumnfish.cn/comment/playlist',
          method:'get',
          params:{
            id:this.$route.query.q,
            limit:10,
            offset:(this.page-1)*10,//根据页码计算
          }
        }).then(res=>{
          this.total=res.data.total;
          this.comments=res.data.comments   //评论数
        })
      }

    }
  }


</script>

<style>
  *{margin:0;padding:0}
  li{list-style: none;}

  .el-pagination{
    text-align: center;
  }

  .el-pagination.is-background .el-pager li:not(.disabled).active{
    background:orange
  }

  .play-info{
    width:1100px;
    margin:0 auto;
  }
  .clear-both::after{
    content:"";
    display:block;
    clear:both;
  }

  .play-info .top-info .pic{
    width:230px;
    height:230px;
    /* background:#ccc; */
    float: left;
    overflow: hidden;
  }

  .play-info img{
    width: 100%;
  }

  .play-info .top-info .txt{
    width:840px;
    float:right;
  }

  .play-info .top-info .txt h1{
    font-weight: normal;
    font-size:16px;
    margin-bottom:15px;
    margin-top:8px;
    color:#333;
  }

  .play-info .top-info .txt section{
    font-size:15px;
  }

  .play-info .top-info .txt span.img{
    width:36px;
    height:36px;
    display:inline-block;
    background:#ccc;
    border-radius:50%;
    vertical-align: middle;
    overflow: hidden;
  }

  .play-info .top-info .txt span.name{
    margin:0 10px;
  }

  .play-info .top-info .txt button{
    display: block;
    width: 120px;
    height: 36px;
    border-radius: 4px;
    background: linear-gradient(90deg,#e85e4d,#c6483c);
    margin: 15px 0;
    border:none;
    outline: none;
    color:#fff;
    cursor: pointer;
  }

  .play-info .top-info .txt mark{
    background:none;
    font-size:15px;
    color:#333;
  }

  .play-info .top-info .txt mark i{
    font-style: normal;
  }

  .play-info .top-info .txt mark i::after{
    content:"/";
    margin:0 3px;
    font-size:12px;
    position: relative;
    top:-1px;
  }

  .play-info .top-info .txt mark i:last-of-type::after{
    content:"";
  }

  .play-info .top-info .txt p{
    margin-top:15px;
    color:#333;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }

  .el-tabs{
    margin-top:15px;
  }

  .play-info .music-list{
    margin:0; padding:0;
    list-style: none;
  }

  .play-info .music-list li{
    line-height:90px;
    color:#666;
    font-size:15px
  }

  .play-info .music-list li:nth-of-type(1){
    color:#999;
    font-size:15px;
  }

  .play-info .music-list li::after{
    content:"";
    display: block;
    clear: both;
  }

  .play-info .music-list li>div{
    float:left;
    height:90px;
  }

  .play-info .music-list li>div:nth-of-type(1){
    width:50px;
    text-indent:10px;
  }

  .play-info .music-list li>div:nth-of-type(2){
    width:130px;
  }
  .play-info .music-list li>div:nth-of-type(3){
    width:300px;
  }

  .play-info .music-list li>div:nth-of-type(4){
    width:200px;
  }

  .play-info .music-list li>div:nth-of-type(5){
    width:360px;
  }

  .play-info .music-list li>div:nth-of-type(6){
    width:60px;
  }

  .play-info .music-list li section{
    width:70px;
    height:70px;
    background:#ccc;
    margin-top:10px;
    cursor: pointer;
    overflow:hidden
  }

  .play-info .music-list li section img{
    width:100%;
    display: block;
  }

  .play-info .music-list li.li-list{
    transition:.3s;
  }

  .play-info .music-list li.li-list:hover{
    background:#f6f6f6;
  }
  .el-icon-video-play{
    color:orange;
    margin-left:5px;
    position: relative;
    top:1px;
    cursor: pointer;
  }

  .el-tab-pane .say-title{
    font-weight: normal;
    font-size:20px;
    color:#333;
  }

  .play-info .say-list{
    margin-bottom: 80px;
  }

  .play-info .say-list li{
    margin-top:20px;
    display:flex;
    font-size:14px;
  }

  .play-info .say-list li .pic{
    width:50px;
    height:50px;
    border-radius:50%;
    background:#ccc;
    margin-right:15px;
    overflow: hidden;
  }

  .play-info .say-list li .txt{
    flex:1;
  }

  .play-info .say-list li .user{
    margin-bottom:15px;
  }

  .play-info .say-list li .re-cont{
    padding: 10px;
    background-color: #e6e5e6;
    border-radius: 5px;
    margin-bottom:15px;

  }

  .play-info .say-list li .name{
    color:#517eaf;
    margin-right:5px;
  }

  .play-info .say-list li .time{
    color:#999
  }
</style>
