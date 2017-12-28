<template>
    <div class="form-wrapper">
        <el-form :model="formData" label-width="120px" :rules="formRules" ref="formData">
            <el-form-item v-for="(item, index) in formItems"
                          :label="item.label"
                          :prop="item.prop"
                          :key="index">
                <!-- 普通文本、文本域 -->
                <el-input v-if="item.type === 'text' || item.type === 'textarea'"
                          :type="item.type"
                          v-model="formData[item.prop]"
                          :placeholder="item.placeholder ? item.placeholder : '请输入内容' "
                          auto-complete="off"></el-input>
                <!-- 数字 -->
                <el-input v-else-if="item.type === 'number'"
                          v-model.number="formData[item.prop]"
                          :placeholder="item.placeholder ? item.placeholder : '请输入内容' "
                          auto-complete="off"></el-input>
                <!-- 时间段 -->
                <el-row v-else-if="item.type === 'period'">
                    <el-col :span="11">
                        <el-form-item :prop="item.start_prop">
                            <el-date-picker v-model.date="formData[item.start_prop]"
                                            align="right"
                                            type="datetime"
                                            placeholder="选择开始日期"
                                            style="width: 100%;"></el-date-picker>
                        </el-form-item>
                    </el-col>
                    <el-col class="line" :span="2">-</el-col>
                    <el-col :span="11">
                        <el-form-item :prop="item.end_prop">
                            <el-date-picker v-model.date="formData[item.end_prop]"
                                            align="right"
                                            type="datetime"
                                            placeholder="选择结束日期"
                                            style="width: 100%;"></el-date-picker>

                        </el-form-item>
                    </el-col>
                </el-row>
                <!-- 时间选择 -->
                <el-date-picker v-else-if="item.type === 'time'"
                                v-model.date="formData[item.prop]"
                                align="right"
                                type="datetime"
                                :placeholder="item.placeholder ? item.placeholder : '请选择时间' "
                                style="width: 100%;"></el-date-picker>
                <!-- 单图片上传 -->
                <i-uploader v-else-if="item.type === 'upload'"
                            v-model="formData[item.prop]"></i-uploader>
                <!-- 选择器 -->
                <el-select v-else-if="item.type === 'select'"
                           v-model.number="formData[item.prop]"
                           :placeholder="item.placeholder ? item.placeholder : '请选择内容' ">
                    <el-option :label="option[item.labelProp]"
                               :value="option[item.valueProp]"
                               :key="optionIndex"
                               v-for="(option, optionIndex) in options[item.option]"></el-option>
                </el-select>
                <!-- 经纬度 -->
                <el-row v-else-if="item.type === 'location'">
                    <el-col :span="24">
                        <el-row type="flex" justify="space-between">
                            <el-col :span="11">
                                <el-form-item prop="latitude">
                                    <el-input placeholder="请输入内容" v-model.number="formData.latitude">
                                        <template slot="prepend">经度</template>
                                    </el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="11" :offset="2">
                                <el-form-item prop="longitude">
                                    <el-input placeholder="请输入内容" v-model.number="formData.longitude">
                                        <template slot="prepend">纬度</template>
                                    </el-input>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <i-baidu-map :lng="formData.longitude" :lat="formData.latitude"
                                     @success="locationSuccess"></i-baidu-map>
                    </el-col>
                </el-row>
            </el-form-item>
            <!-- 富文本 -->
            <!-- <el-form-item label="富文本" prop="name">
                <UE :defaultMsg="formData.detail" ref="ue"></UE>
            </el-form-item> -->
            <!-- 多图片上传 -->
            <!-- <el-form-item label="多图片上传" prop="images">
                <i-muti-uploader :value="formData.images" ref="album"></i-muti-uploader>
            </el-form-item> -->
            <!-- 自定义表单项目 -->
            <!-- ... -->
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click.native="handleCancel">取消</el-button>
            <el-button type="primary" @click.native="formSubmit" :loading="formLoading">提交</el-button>
        </div>
    </div>
</template>

<script>
  import util from '@/utils/js';
  import UE from '@/components/UEditor';
  import Uploader from '@/components/Uploader';
  import MutiUploader from "@/components/MutiUploader";
  import BaiduMap from '@/components/BaiduMap';

  const MODEL_NAME = 'Cms'; // http://api.zhongjiao.kfw001.com/webadmin/控制器/方法 -> 接口控制器名称

  export default {
    data() {
      var validateContent = (rule, value, callback) => {
        value = this.$refs['ue'].getUEContent();
        if (value === '') {
          callback(new Error('请输入内容'));
        } else {
          callback();
        }
      };
      return {
        /**
         * type 'text'(普通文本) 'number'(数值) 'textarea'(文本域)
         *      'period'(时间段)  --> start_prop / end_prop 对应 开始 / 结束 时间字段名称
         *      'time'(时间选择) 'upload'(图片上传) 'location'(经纬度)
         *      'select'(选择器)  --> option 字段对应 data 中 options 里字段名
         * prop 对应 formData 字段 和 validate 名称
         * label 对应表单名称
         * placeholder 对应提示信息
         */
        formItems: [
          {
            type: 'text',
            prop: 'email',
            label: '用户名'
          },
          {
            type: 'text',
            prop: 'password',
            label: '密码'
          },
          {
            type: 'text',
            prop: 'name',
            label: '昵称'
          },
           
          {
            type: 'select',
            prop: 'sex',
            label: '性别',
            option: 'sex', // 下拉列表数据别名
            labelProp: 'label', // 下拉列表数组内元素 label 别名
            valueProp: 'value', // 下拉列表数组内元素 value 别名
            placeholder: '请选择性别'
          },
          {
            type: 'select',
            prop: 'life_status',
            label: '生活状态',
            option: 'life_status', // 下拉列表数据别名
            labelProp: 'label', // 下拉列表数组内元素 label 别名
            valueProp: 'value', // 下拉列表数组内元素 value 别名
            placeholder: '请选择生活状态'
          },
          {
            type: 'upload',
            prop: 'cover',
            label: '头像'
          },
        ],
        // 下拉列表数据
        options: {
          sex: [
            {value: 1, label: '男'},
            {value: 2, label: '女'},
          ],
          life_status: [
            {value: 1, label: '为人父母'},
            {value: 2, label: '恋爱中/已婚'},
            {value: 3, label: '单身生活'},
          ],
        },
        formLoading: false,
        formRules: {
          email: [
            {required: true, message: '请输入邮箱', trigger: 'blur'}
          ],
          password: [
            {required: true, message: '请输入密码', trigger: 'blur'}
          ],
          cover: [
            {required: true, message: '请上传头像', trigger: 'blur'}
          ],
          name: [
            {required: true, message: '请输入昵称', trigger: 'blur'}
          ],
          sex: [
            {type: 'number', required: true, message: '请选择性别', trigger: 'blur'}
          ],
          life_status: [
            {type: 'number', required: true, message: '请选择生活状态', trigger: 'blur'}
          ],
        },
        //新增界面数据
        formData: {
          email: '',
          password: '',
          cover: '',
          name: '',
          sex: '',
          life_status: '',
          is_verification: 0,
        }
      }
    },
    methods: {
      // 百度地图定位成功后的回调
      locationSuccess(data) {
        this.formData.longitude = data.lng;
        this.formData.latitude = data.lat;
      },
      handleCancel() {
        this.$router.back();
      },
      async getArrayData() {
        const res = await this.$http.post(`${MODEL_NAME}/array`);
        if (res === null) return;
        this.array = res.param;
        // 搜索选项
        this.filters.options.type = this.formateOptions(res.param.type);
        this.filters.options.type.unshift({label: '全部分类', value: ''});
      },
      formateOptions(source) {
        let _data = [];
        for (let key in source) {
          _data.push({label: source[key], value: key * 1})
        }
        return _data.slice(0);
      },
      //新增
      formSubmit() {
        this.$refs.formData.validate((valid) => {
          if (valid) {
            this.$confirm('确认提交吗？', '提示', {}).then(async () => {
              this.formLoading = true;

              let params = Object.assign({}, this.formData);
              // params.detail = this.getUEContent('detail'); // 富文本内容
              // params.images = this.getImageList("album"); // 多图上传
              const res = await this.$http.post(`userAdd`, params);
              this.formLoading = false;
              if (res === null) return;
              this.$message({
                message: '新建成功',
                type: 'success'
              });
              this.handleCancel();
            });
          }
        });
      },
      // UEditor 获取内容，传入 ref 的值
      getUEContent(ele) {
        return this.$refs[ele].getUEContent();
      },
      // 多图上传获取内容，传入 ref 的值
      getImageList(ele) {
        return this.$refs[ele].getImageList();
      }
    },
    mounted() {

    },
    components: {
      UE,
      'i-uploader': Uploader,
      'i-baidu-map': BaiduMap
    },
  }
</script>

<style lang="scss" scoped>

</style>
