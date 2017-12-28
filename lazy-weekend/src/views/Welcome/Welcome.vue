<template>
  <div>
    <!-- <div class="bg">
      <img src="../../assets/images/bg_1.png" alt=""/>
    </div> -->
    <!--轮播图-->
    <div class="carousel-wrap bg" id="carousel">
     <mt-swipe :auto="4000" :show-indicators="false" speed="1000">
  <mt-swipe-item v-for="(list,index) in slideList" :key="index">
    <img :src="list.cover" :alt="list.title">
    </mt-swipe-item>
  <!-- <mt-swipe-item>2</mt-swipe-item>
  <mt-swipe-item>3</mt-swipe-item> -->
</mt-swipe>
    </div>
    <div class="btn">
      <router-link to="/signin"><mt-button class="signin" plain>登 录</mt-button></router-link>
      <router-link to="/signup"><mt-button class="signup" plain>注 册</mt-button></router-link>
    </div>
  </div>
</template>

<script>
import { Swipe, SwipeItem } from 'mint-ui';

export default {
    data() {
        return {
currentIndex: 0,
      timer: "",
      loading: false,
      showMenu: false,
      showPlaceFilter: false,
      slideList: [
        {cover: require('../../assets/images/bg_1.png'), title: '懒人星期天'},
        {cover: require('../../assets/images/bg_2.png'), title: '懒人星期天'},
        {cover: require('../../assets/images/bg_3.png'), title: '懒人星期天'},
      ],
        }
    },
    methods: {
go() {
      this.timer = setInterval(() => {
        this.autoPlay();
      }, 4000);
    },
    stop() {
      clearInterval(this.timer);
      this.timer = null;
    },
    change(index) {
      this.currentIndex = index;
    },
    autoPlay() {
      this.currentIndex++;
      if (this.currentIndex > this.slideList.length - 1) {
        this.currentIndex = 0;
      }
    },
     components: {
    Swipe,
    SwipeItem
  },
    }
}
</script>

<style lang="scss" scoped>
  .bg {
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 1;
    /*background-image: url("http://dummyimage.com/1745x492/f1d65b");*/
    img {
      width: 100%;
      height: 100%;
    }
  }
  .btn {
    position: absolute;
    bottom: 5rem;
    z-index: 99;
    width: 100%;
    height: 3rem;
    margin: 0 auto;
    
    .signup {
      width: 8rem;
      height: 3rem;
      position: fixed;
      left: 4rem;
      color: #fff;
      font-weight: bold;
      border: #fff solid 0.2rem;
      opacity:0.8;
    }
    .signin {
      width: 8rem;
      height: 3rem;
      position: fixed;
      right: 4rem;
      color: #fff;
      font-weight: bold;
       border: #fff solid 0.2rem;
      opacity:0.8;
    }

    float: left;
  }
</style>
