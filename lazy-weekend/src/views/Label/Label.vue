<template>
  <div>
    <mt-header :title="this.$route.params.id == 0 ? '全部分类' : titleList[this.$route.params.id]" class="label">
      <router-link to="/home" slot="left">
        <mt-button icon="back">返回</mt-button>
      </router-link>
    </mt-header>

    <div class="selected">
      <ul v-infinite-scroll="loadMore"  
          infinite-scroll-disabled="loading"
          infinite-scroll-distance="50">
        <li v-for="(item, index) in selectedList" :key="index">
          <img :src="item.cover" :alt="item.title" @click="toDetail($index,item)"/>
          <p @click="toDetail($index,item)" class="title">{{ item.title }}</p>
          <p class="place"><span>{{ item.place }}</span>·<span>{{ item.type }}</span></p>
          <p class="time"><span>{{ item.time }}</span><span @click="addLike(item)">♡{{ item.like }}</span><span>￥{{ item.price }}</span></p>
        </li>
      </ul>
      <div class="loading_bottom" v-show="loading">
        <mt-spinner class="loading_circle" type="fading-circle"></mt-spinner>
        <span>加载中...</span></div>
    </div>
  </div>
</template>

<script>
import { Toast } from "mint-ui";
export default {
    data() {
        return {
          selectedList: [
            
          ],
          titleList: {},
          // list: []
          pageNo: 1,
        pageSize: 50,
        proCopyright: [],
        allLoaded: false, //是否可以上拉属性，false可以上拉，true为禁止上拉，就是不让往上划加载数据了
        scrollMode: "auto", //移动端弹性滚动效果，touch为弹性滚动，auto是非弹性滚动
        totalpage: 0,
        loading: false,
        bottomText: ""
        }
    },
    methods: {
      async getTagData() {
        let params = {
          
        };
        const res = await this.$http.get("tagList", params);
        if (res === null) return;
        res.data.forEach(item => {
          this.titleList[item.id] = item.type
   
        });
        // this.titleList.unshift({type: "全部分类", id: 0, icon: "fa fa-snowflake-o fa-3x", pid: 0});
        // this.list = res.data.list;
      },
      async getListData() {
       
        let params = {
          type: this.$route.params.id,
          area: this.$route.params.area,
          popular: this.$route.params.popular,
          keyword: this.$route.params.keyword,
        };
        const res = await this.$http.get("articleList",  this.$route.params.id == 0 ? {} : params);
        if (res === null) return;
        this.selectedList = res.data;
      },
      
      toDetail(index, item) {
        this.$router.push(`/detail/${item.id}`);
        console.log(item.id)
    },
     async addLike(item) {
      let params = {
        article_id: item.id
      };

      const res = await this.$http.get(`addLike`, params);

      if (res === null) return;
      this.getListData();
      Toast({
        message: "操作成功！",
        position: "bottom",
        duration: 3000
      }); 
    },
    async loadMore() {
        if(this.allLoaded) return
        this.pageNo += 1;
        let params = {
          // area: this.currArea.id,
           type: this.$route.params.id,
          page: this.pageNo,
        };
        this.loading = true;
        const res = await this.$http.get("articleList", this.$route.params.id == 0 ? {} : params);
        this.loading = false;
        console.log(res.data.length)
        if (res === null) return;
        if (res.data.length !== 0) {
          this.selectedList = this.selectedList.concat(res.data);
        } else {
          this.allLoaded = true
        }

      },
    },
    mounted() {
    this.getTagData();
    this.getListData();
  }
}
</script>

<style lang="scss" scoped>
  .label {
    background-color: #fff;
    color: #3c424a;
  }

  .selected {
    width: 100%;
    height: 100%;
    background-color: #fff;
    margin-top: -0.5rem;
    .loading_bottom {
    text-align: center;
    height: 5rem;
    line-height: 100px;
    color: #999;
  }
  .loading_circle {
    display: inline-block;
  }
    li {
      padding: 1rem 0;
      border-bottom: 1px solid #f2f2f2;
    }
    img {
      width: 100%;
      height: 20rem;
    }
    p {
      padding: 0 0.8rem;
      line-height: 28px;

    }
    .title {
      font-size: 16px;
      color: #000;

    }
    .place {
      color: #999;
      font-size: 14px;
      span {
        padding: 0 1rem;
        &:first-child {
          padding-left: 0;
        }
      }
    }
    .time {
      color: #999;
      font-size: 14px;

      span {
        margin: 0 1rem;
        border: 1px solid #999;
        padding: 0 0.3rem;
        &:first-child {
          margin-left: 0;
        }
        &:last-child {
          position: absolute;
          right: 0;
          line-height: 19px;
          margin-top: 3px;
        }
      }
    }
  }
</style>
