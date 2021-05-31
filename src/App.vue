<template>
  <div id="app">
    <Top></Top>
    <Index></Index>

  </div>
</template>

<script>

  import Top from './components/Top.vue'
  import Index from './components/Index.vue'


  export default{
    name:"App",
    components:{
      Top,
      Index
    }
  }




</script>


<style>
*{
  margin:0;
  padding:0;
}
</style>
