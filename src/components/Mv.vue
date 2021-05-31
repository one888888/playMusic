<template>

  <div class="mv-container clear-both">
    <div class="left-cont">
      <h3>mv详情</h3>
      <div class="video">
        <video :src=" url " :autoplay="autoplay" controls=""></video>
      </div>
      <div class="singer">
        <div class="pic">
          <img :src="singerPic">
        </div>
        <div class="sing-name">{{mvInfo.artistName}}</div>
      </div>
      <h2 class="mv-title">{{mvInfo.name}} </h2>
      <section>
        <span class="date">发布：2020-11-06</span>
        <span class="number">播放：{{mvInfo.playCount}} 次</span>
      </section>
      <p class="mv-info">{{mvInfo.desc}}</p>
      <div class="comment-wrap">
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

        <h1 class="say-title" v-if="total!=0">最新评论 ({{total}})</h1>
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

      </div>
    </div>
    <div class="right-cont">
      <h3 class="title">相关推荐</h3>
      <ul class="mvpic-list">
      	<li v-for=" (item,index) in about" :key="index" @click="toMv(item.id)">
          <div class="pic">
            <img :src="item.cover">
            <span class="num">{{toW(item.playCount)}}</span>
            <time>{{toMinutes(item.duration)}}</time>
          </div>
          <div class="txt">
            <div>{{item.name}}</div>
            <p>{{item.artistName}}</p>
          </div>
        </li>

      </ul>
    </div>
  </div>

</template>

<script>

  import axios from 'axios'

  export default{
    name:'Mv',
    data(){
      return {
        url:'',//mv地址
        autoplay:false,
        about:[],
        mvInfo:[],
        singerPic:'',
        total:0,
        hotCount:[],
        comments:[],
        hotComment:[],
        page:1
      }
    },
    watch:{
      url(){
        this.autoplay=true
      }
    },
    created(){
       this.getMvInfo()
    },
    methods:{
      toMv(id){
        this.$router.push('/Mv?q='+id);
        this.getMvInfo()
      },
      getMvInfo(){
        //mv 播放地址
       axios({
         url:'https://autumnfish.cn/mv/url',
         method:'get',
         params:{
           id:this.$route.query.q
         }
       }).then(res=>{
         this.url=res.data.data.url
       })

        //相关推荐地址
        axios({
          url:'https://autumnfish.cn/simi/mv',
          method:'get',
          params:{
            mvid:this.$route.query.q
          }
        }).then(res=>{
          this.about=res.data.mvs
        })

        //获取mv信息
        axios({
          url:'https://autumnfish.cn/mv/detail',
          method:'get',
          params:{
            mvid:this.$route.query.q
          }
        }).then(res=>{
          this.mvInfo=res.data.data
          //获取歌手信息
          axios({
            url:'https://autumnfish.cn/artists',
            method:'get',
            params:{
              id:this.mvInfo.artists[0].id
            }
          }).then(res=>{
            this.singerPic=res.data.artist.picUrl;
          })
        })

        //获取评论数据
        axios({
          url:'https://autumnfish.cn/comment/mv',
          method:'get',
          params:{
            id:this.$route.query.q,
            limit:10,
            offset:0
          }
        }).then(res=>{
          this.hotComment=res.data.hotComments;
          this.hotCount=res.data.hotComments.length;
          this.comments=res.data.comments;
          this.total=res.data.total;
        })
      },
      handleCurrentChange(val){
        this.page=val
        axios({
          url:'https://autumnfish.cn/comment/mv',
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
      toW(num){
        for(let i=0;i<num;i++){
          if(num>100000){
            num=parseInt(num/10000)+'万'
          }
        }

        return num
      },
      toMinutes(num){
        let m=Math.floor((num/60000));
        let s=Math.floor((num/1000)%60);
        return ''+(m>=10?m:'0'+m)+':'+(s>=10?s:'0'+s)
      },
    },

  }

</script>

<style>
  *{margin:0;padding:0}
  li{list-style:none;}

  .clear-both::after{
    content:"";
    display: block;
  }

  .mv-container{
    width:1100px;
    margin:0 auto;
  }

  .mv-container .left-cont{
    width:700px;
    float:left;
  }

  .mv-container .right-cont{
    width:360px;
    float:right;
  }

  .mv-container .video{
    width: 100%;
    height: 390px;
    margin: 20px 0;
    background:#eee;
  }

  .mv-container .video video{
    width:100%;
    height: 100%;
    outline: none;
  }

  .mv-container .singer{
    display:flex;
    align-items: center;
  }

  .mv-container .singer .pic{
    width:70px;
    height:70px;
    background:#ccc;
    border-radius:50%;
    overflow:hidden;
    margin-right:10px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .mv-container .singer .pic img{
    width:130%;
  }

  .mv-container .mv-title{
    margin:20px 0;
  }

  .mv-container section{
    margin-bottom:20px;
  }

  .mv-container section span{
    color: #bebebe;
    font-size: 14px;
    margin-right:30px;
  }

  .mv-container .say-title{
    font-weight: normal;
    font-size:20px;
    color:#333;
  }

  .mv-container .say-list{
    margin-bottom: 80px;
  }

  .mv-container .say-list li{
    margin-top:20px;
    display:flex;
    font-size:14px;
  }

  .mv-container .say-list li .pic{
    width:50px;
    height:50px;
    border-radius:50%;
    background:#ccc;
    margin-right:15px;
    overflow: hidden;
  }

  .mv-container .say-list li .txt{
    flex:1;
  }

  .mv-container .say-list li .user{
    margin-bottom:15px;
  }

  .mv-container .say-list li .re-cont{
    padding: 10px;
    background-color: #e6e5e6;
    border-radius: 5px;
    margin-bottom:15px;

  }

  .mv-container .say-list li .name{
    color:#517eaf;
    margin-right:5px;
  }

  .mv-container .say-list li .time{
    color:#999
  }

  .mv-container .mv-info{
    margin-bottom:30px;
  }

  .mv-container .mvpic-list{
    margin-top:10px;
  }

  .mv-container .mvpic-list li{
    padding:10px;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    cursor: pointer;
  }

  .mv-container .mvpic-list li:hover{
    background:#f8f8f8;
  }

  .mv-container .mvpic-list li .pic{
    width: 180px;
    height:100px;
    overflow: hidden;
    position: relative;
    margin-right: 10px;
  }

  .mv-container .mvpic-list li img{
    width:100%;
  }

  .mv-container .mvpic-list li .num{
    position: absolute;
    right:8px;
    top:3px;
    font-size:14px;
    color:#fff;
  }

  .mv-container .mvpic-list li time{
    position: absolute;
    right:8px;
    bottom:3px;
    font-size:14px;
    color:#fff;
  }

  .mv-container .mvpic-list li .txt{
    flex:1;
    font-size:14px;
  }

  .mv-container .mvpic-list li .txt p{
    color:#999
  }

  .el-pagination{
    text-align: center;
  }

  .el-pagination.is-background .el-pager li:not(.disabled).active{
    background:orange
  }


</style>
