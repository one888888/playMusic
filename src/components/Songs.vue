<template>
  <div class="songs-container">
    <div class="tab-bar">
      <span class="item" :class="{active:tag==0}" @click="get">全部</span>
      <span class="item" :class="{active:tag==7}" @click="get">华语</span>
      <span class="item" :class="{active:tag==96}" @click="get">欧美</span>
      <span class="item" :class="{active:tag==8}" @click="get">日本</span>
      <span class="item" :class="{active:tag==16}" @click="get">韩国</span>
    </div>

    <ul class="music-list">
      <li>
        <div class="num"></div>
        <div class="pic"></div>
        <div class="title">音乐标题</div>
        <div class="singer">歌手</div>
        <div class="album">专辑</div>
        <div class="time">时长</div>
      </li>
      <li v-for="(item,index) in musicList" class="li-list" :key="index" v-if="suc">
        <div class="num">{{index+1}}</div>
        <div class="pic">
          <section>
            <img :src="item.album.picUrl" @click="playMusic(item.id)">
          </section>
        </div>
        <div class="title">{{item.name}}</div>
        <div class="singer">{{item.album.artists[0].name}}</div>
        <div class="album">{{item.album.name}}</div>
        <div class="time">{{toMinutes(item.duration)}}</div>
      </li>
    </ul>
    <section v-show="!suc" class="load">
      <div class="sk-chase">
        <div class="sk-chase-dot"></div>
        <div class="sk-chase-dot"></div>
        <div class="sk-chase-dot"></div>
        <div class="sk-chase-dot"></div>
        <div class="sk-chase-dot"></div>
        <div class="sk-chase-dot"></div>
      </div>
    </section>




  </div>
</template>

<script>
  import axios from 'axios'
  export default{
    name:'Songs',
    data(){
      return {
        musicList:[],
        tag:0,//分类
        suc:false
      }
    },
    created(){
      this.getListData()
    },
    methods:{
      toMinutes(num){
        let m=Math.floor((num/60000));
        let s=Math.floor((num/1000)%60);
        return ''+(m>=10?m:'0'+m)+':'+(s>=10?s:'0'+s)
      },
      get(e){
        this.suc=false;
        let activeValue=e.srcElement.innerHTML;
        switch(activeValue){
          case '全部':
            activeValue=0;
            break;
          case '华语':
            activeValue=7;
            break;
          case '欧美':
            activeValue=96;
            break;
          case '日本':
            activeValue=8;
            break;
          case '韩国':
            activeValue=16;
            break;
        }
        this.tag=activeValue;
        this.getListData()
      },

      getListData(){
        axios({
          url:'https://autumnfish.cn/top/song',
          method:'get',
          params:{
            type:this.tag,
          },
        }).then(res=>{
           this.musicList=res.data.data.splice(0,50);
           //this.musicList.splice(10)
           this.suc=true;
        })
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
          this.$parent.isNo=true
        })
      }

    }

  }

</script>

<style>
  .songs-container{
    width:1100px;
    margin:0 auto
  }
  .songs-container .clear-both{
    clear: both;
  }

  .songs-container .tab-bar{
    text-align: right;
  }

  .songs-container .tab-bar span{
    font-size:15px;
    margin-left:15px;
    color:#666;
    cursor:pointer;
  }

  .songs-container .tab-bar span.active{
    color:orange
  }

  .songs-container .music-list{
    margin:0; padding:0;
    list-style: none;
  }

  .songs-container .music-list li{
    line-height:90px;
    color:#666;
    font-size:15px
  }

  .songs-container .music-list li:nth-of-type(1){
    color:#999;
    font-size:15px;
  }

  .songs-container .music-list li::after{
    content:"";
    display: block;
    clear: both;
  }

  .songs-container .music-list li>div{
    float:left;
    height:90px;
  }

  .songs-container .music-list li>div:nth-of-type(1){
    width:50px;
    text-indent:10px;
  }

  .songs-container .music-list li>div:nth-of-type(2){
    width:130px;
  }

  .songs-container .music-list li>div:nth-of-type(3){
    width:300px;
  }

  .songs-container .music-list li>div:nth-of-type(4){
    width:200px;
  }

  .songs-container .music-list li>div:nth-of-type(5){
    width:360px;
  }

  .songs-container .music-list li>div:nth-of-type(6){
    width:60px;
  }

  .songs-container .music-list li section{
    width:70px;
    height:70px;
    background:#ccc;
    margin-top:10px;
    cursor: pointer;
    overflow:hidden
  }

  .songs-container .music-list li section img{
    width:100%;
    display: block;
  }

  .songs-container .music-list li.li-list{
    transition:.3s;
  }

  .songs-container .music-list li.li-list:hover{
    background:#f6f6f6;
  }

  section.load{
    display: flex;
    justify-content:center;
    align-items: center;
    height:calc(100vh - 500px)
  }

  .sk-chase {
    width: var(--sk-size);
    height: var(--sk-size);
    position: relative;
    animation: sk-chase 2.5s infinite linear both;
  }

  .sk-chase-dot {
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0;
    top: 0;
    animation: sk-chase-dot 2.0s infinite ease-in-out both;
  }

  .sk-chase-dot:before {
    content: '';
    display: block;
    width: 25%;
    height: 25%;
    background-color: var(--sk-color);
    border-radius: 100%;
    animation: sk-chase-dot-before 2.0s infinite ease-in-out both;
  }

  .sk-chase-dot:nth-child(1) { animation-delay: -1.1s; }
  .sk-chase-dot:nth-child(2) { animation-delay: -1.0s; }
  .sk-chase-dot:nth-child(3) { animation-delay: -0.9s; }
  .sk-chase-dot:nth-child(4) { animation-delay: -0.8s; }
  .sk-chase-dot:nth-child(5) { animation-delay: -0.7s; }
  .sk-chase-dot:nth-child(6) { animation-delay: -0.6s; }
  .sk-chase-dot:nth-child(1):before { animation-delay: -1.1s; }
  .sk-chase-dot:nth-child(2):before { animation-delay: -1.0s; }
  .sk-chase-dot:nth-child(3):before { animation-delay: -0.9s; }
  .sk-chase-dot:nth-child(4):before { animation-delay: -0.8s; }
  .sk-chase-dot:nth-child(5):before { animation-delay: -0.7s; }
  .sk-chase-dot:nth-child(6):before { animation-delay: -0.6s; }

  @keyframes sk-chase {
    100% { transform: rotate(360deg); }
  }

  @keyframes sk-chase-dot {
    80%, 100% { transform: rotate(360deg); }
  }

  @keyframes sk-chase-dot-before {
    50% {
      transform: scale(0.4);
    } 100%, 0% {
      transform: scale(1.0);
    }
  }

  :root {
    --sk-size: 40px;
    --sk-color: orange;
  }





</style>
