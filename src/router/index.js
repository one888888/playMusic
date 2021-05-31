import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'
import Top from "../components/Top.vue"
import Discovery from "../components/Discovery.vue"
import Playlists from "../components/Playlists.vue"
import Songs from "../components/Songs.vue"
import Mvs from "../components/Mvs.vue"
import Result from "../components/Result.vue"
import PlayInfo from "../components/PlayInfo.vue"
import Mv from "../components/Mv.vue"

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect:'/Discovery'
    },
    {
      path: '/Top',
      component: Top
    },
    {
      path: '/Discovery',
      component: Discovery
    },
    {
      path: '/Playlists',
      component: Playlists
    },
    {
      path: '/Songs',
      component: Songs
    },
    {
      path: '/Mvs',
      component: Mvs
    },
    {
      path: '/Result',
      component: Result
    },
    {
      path: '/PlayInfo',
      component: PlayInfo
    },
    {
      path: '/Mv',
      component: Mv
    },
  ]
})
