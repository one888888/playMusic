<template>

  <div class="top-container">
    <input v-model="inputValue" @keyup.enter="toSearch" class="el-input__inner" placeholder="搜索" autocomplete="off">

  </div>

</template>

<script>

  import sch from '../router/siblings.js'

  export default{
    name:"Top",
    data(){
      return {
        inputValue:''
      }
    },
    methods:{
      toSearch(){
        if(this.inputValue==''){
          this.$message.warning('请输入内容')
        }else{
          this.$router.push('/Result?q='+this.inputValue);
          sch.$emit('event',this.inputValue)
        }
      }
    },

  }

</script>

<style>
.top-container{
  height: 60px;
  position: fixed;
  width: 100%;
  top: 0;
  left: 0;
  padding: 0 20px;
  box-sizing: border-box;
  background-color: #f9f9f9;
  width: 100%;
  z-index: 999;
}

.top-container .el-input__inner{
  height: 32px;
  width:200px;
  line-height: 32px;
  float:right;
  margin-top:15px;
  font-size:14px;
}

</style>
