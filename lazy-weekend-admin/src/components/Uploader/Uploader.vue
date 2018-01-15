<template>
    <div class="i-uploader">
        <el-input v-model="cover" placeholder="请输入内容"></el-input>
        <el-upload
                class="avatar-uploader"
                :action="`${baseUrl}common/upload`"
                :show-file-list="false"
                name="upfile"
                 :on-success="handleAvatarSuccess"
                :before-upload="beforeImageUpload">
            <img v-if="cover" :src="cover" class="avatar">
            <i v-if="!isPhoto" class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
    </div>

</template>

<script>
import configs from '@/configs/api';

  const {baseUrl} = configs;
  /*
  * @Author: 52admln (ismrwang@gmail.com)
  * @Date: 2017/11/8 下午4:46
  * @Description: null
  */
  export default {
    name: 'Uploader',
    props: {
      value: {
        type: String,
        default: ''
      }
    },
    data() {
      return {
          baseUrl: baseUrl,
        cover: this.value
      }
    },
    watch: {
      value(val) {
        this.cover = val;
      },
      cover(val) {
        this.$emit('input', val);
      }
    },
    computed:{
      isPhoto() {
        let reg = /^http|(jpg|jpeg|png)+$/;
        return this.cover.match(reg) && this.cover.match(reg).length >= 2;
      }
    },
    methods: {
      // 图片上传前限制条件
      beforeImageUpload(file) {
        const isJPG = file.type === 'image/jpeg' || file.type === 'image/png';
        const isLt2M = file.size / 1024 / 1024 < 5;

        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG 或 PNG 格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
        }
        return isJPG && isLt2M;
      },
      handleAvatarSuccess(res, file) {
        this.cover = 'http://api.gong.ninja/'+res.data.url;
      },
    }
  }
</script>

<style>
    .avatar-uploader .el-upload {
        position: relative;
        margin-top: 10px;
        border: 1px dashed #d9d9d9;
        border-radius: 6px;
        cursor: pointer;
        overflow: hidden;
    }

    .avatar-uploader .el-upload:hover {
        border-color: #20a0ff;
    }

    .avatar-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        min-width: 178px;
        min-height: 178px;
        line-height: 178px;
        text-align: center;
    }

    .avatar {
        display: block;
        max-width: 200px;
    }
</style>