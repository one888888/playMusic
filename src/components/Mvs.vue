<template>
  <div class="mvs-container">
    <div class="filter-wrap">
      <div class="seciton-wrap">
        <span class="section-type">地区:</span>
        <ul class="tabs-wrap">
          <li class="tab"><span class="title" :class="{active:area=='全部'}" @click="area='全部'">全部</span></li>
          <li class="tab"><span class="title" :class="{active:area=='内地'}" @click="area='内地'">内地</span></li>
          <li class="tab"><span class="title" :class="{active:area=='港台'}" @click="area='港台'">港台</span></li>
          <li class="tab"><span class="title" :class="{active:area=='欧美'}" @click="area='欧美'">欧美</span></li>
          <li class="tab"><span class="title" :class="{active:area=='日本'}" @click="area='日本'">日本</span></li>
          <li class="tab"><span class="title" :class="{active:area=='韩国'}" @click="area='韩国'">韩国</span></li>
        </ul>
      </div>
      <div class="type-wrap">
        <span class="type-type">类型:</span>
        <ul class="tabs-wrap">
          <li class="tab"><span class="title" :class="{active:type=='全部'}" @click="type='全部'">全部</span></li>
          <li class="tab"><span class="title" :class="{active:type=='官方版'}" @click="type='官方版'">官方版</span></li>
          <li class="tab"><span class="title" :class="{active:type=='原声'}" @click="type='原声'">原声</span></li>
          <li class="tab"><span class="title" :class="{active:type=='现场版'}" @click="type='现场版'">现场版</span></li>
          <li class="tab"><span class="title" :class="{active:type=='网易出品'}" @click="type='网易出品'">网易出品</span></li>
        </ul>
      </div>
      <div class="order-wrap">
        <span class="order-type">排序:</span>
        <ul class="tabs-wrap">
          <li class="tab"><span class="title" :class="{active:order=='上升最快'}" @click="order='上升最快'">上升最快</span></li>
          <li class="tab"><span class="title" :class="{active:order=='最热'}" @click="order='最热'">最热</span></li>
          <li class="tab"><span class="title" :class="{active:order=='最新'}" @click="order='最新'">最新</span></li>
        </ul>
      </div>
    </div>

    <div class="mvs">
      <div class="items">
        <div class="item" v-for="(item,index) in lists" :key="index"  @click="toMv(item.id)">
          <div class="img-wrap"><img :src="item.cover+'?param=250y150'"
              alt="">
            <div class="num-wrap">
              <div class="iconfont el-icon-caret-right"></div>
              <div class="num">{{item.playCount}}</div>
            </div>
          </div>
          <div class="info-wrap">
            <div class="name">{{item.name}}</div>
            <div class="singer">{{item.artistName}}</div>
          </div>
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


  </div>
</template>

<script>
  import axios from 'axios'

  export default {
    name: 'Mvs',
    data() {
      return {
        total: 20,
        page: 1,
        limit: 8,
        area:'全部',
        type:'全部',
        order:'上升最快',
        lists:[]
      }
    },
    watch:{
      area(){
        this.getData();
        this.page=1
      },
      type(){
        this.getData()
        this.page=1
      },
      order(){
        this.getData()
        this.page=1
      }
    },
    created() {
      this.getData()
    },
    methods:{
      //去mv页面
      toMv(id){
        this.$router.push('/Mv?q='+id);
      },
      getData(){
        axios({
          url:'https://autumnfish.cn/mv/all',
          method:'get',
          params:{
            area:this.area,
            type:this.type,
            order:this.order,
            limit:this.limit,
            offset:(this.page-1)*this.limit   //(页码-1)*数量
          }
        }).then(res=>{
          this.lists=res.data.data
          for(let i=0;i<this.lists.length;i++){
            if(this.lists[i].playCount>100000){
              this.lists[i].playCount=parseInt(this.lists[i].playCount/10000)+'w'
            }
          }


          if(res.data.count){
            this.total=res.data.count
          }

        })
      },

      handleCurrentChange(val){
        this.page=val;
        this.getData()
      },

    }
  }
</script>

<style>
  * {
    margin: 0;
    padding: 0
  }

  li {
    list-style: none;
  }

  .mvs-container {
    width: 1100px;
    margin: 0 auto;
  }

  .mvs-container .filter-wrap>div {
    margin-bottom: 30px;
    color: #666;
    font-size: 15px;
  }

  .mvs-container .filter-wrap>div::after {
    content: '';
    display: block;
    clear: both;
  }

  .mvs-container .filter-wrap>div>span {
    float: left;
    color: #333;
    padding: 0 30px;
    border-radius: 0;
    background: none;
  }

  .mvs-container .filter-wrap ul {
    float: left
  }

  .mvs-container .filter-wrap ul li {
    float: left;
    padding: 0 30px;
    border-right: solid 1px #eee
  }

  .mvs-container .filter-wrap span {
    border-radius: 13px;
    display: block;
    height: 26px;
    padding: 0 10px;
    text-align: center;
    line-height: 26px;
    cursor: pointer;
  }

  .mvs-container .filter-wrap>div span.title.active {
    color: #dd6d60;
    background-color: #fcf6f5;
    border-radius: 20px;
  }

  .mvs-container .mvs .items .item {
    width: 250px;
    cursor: pointer;
    margin-right: 25px;
    margin-bottom: 30px;
  }

  .mvs-container .mvs .items {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-pack: start;
    -ms-flex-pack: start;
    justify-content: flex-start;
    -ms-flex-wrap: wrap;
    flex-wrap: wrap;
   }

   .mvs-container .mvs .items .item {
    width: 250px;
    cursor: pointer;
    margin-right: 25px;
    margin-bottom: 30px;
   }
   .mvs-container .mvs .items .item .img-wrap {
      width: 100%;
      position: relative;
    }

    .mvs-container .mvs .items .item .img-wrap img {
        width: 100%;
        border-radius: 5px;
    }
    .mvs-container .mvs .items .item .img-wrap .num-wrap {
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
     .mvs-container .mvs .items .item .info-wrap .name {
         font-size: 15px;
         overflow: hidden;
         text-overflow: ellipsis;
         display: -webkit-box;
         -webkit-line-clamp: 1;
         -webkit-box-orient: vertical;
     }
     .mvs-container .mvs .items .item .info-wrap .singer {
         font-size: 14px;
         color: #c5c5c5;
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



</style>
