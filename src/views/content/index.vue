<template>
  <div>
    <el-tag
      :key="index"
      v-for="(tag, index) in dynamicTags"
      closable
      :disable-transitions="false"
      @close="handleClose(tag)"
      @click="clickHandle(tag)"
    >
      {{ tag.name }}
    </el-tag>
    <el-input
      class="input-new-tag"
      v-if="inputVisible"
      v-model="inputValue"
      ref="saveTagInput"
      size="small"
      @blur="handleInputConfirm"
    >
    </el-input>
    <el-button v-else class="button-new-tag" size="small" @click="showInput"
      >+ 添加广告</el-button
    >

    <el-table :data="contentList" style="width: 100%">
      <el-table-column prop="name" label="名字"> </el-table-column>
      <el-table-column prop="url" label="地址"> </el-table-column>
      <el-table-column prop="image" label="图片"> </el-table-column>
    </el-table>
  </div>
</template>

<script>
import api from "../../api";

export default {
  name: "contentCenter",
  data() {
    return {
      dynamicTags: [],
      inputVisible: false,
      inputValue: "",
      contentList: [],
    };
  },
  mounted() {
    this.http();
  },
  methods: {
    http() {
      api.content().then((res) => {
        if (res.data.status === 200) {
          this.dynamicTags = res.data.result;
        }
      });
    },
    clickHandle(tag) {
      api
        .contentList({ pid: tag.pid })
        .then((res) => {
          if (res.data.status === 200) {
            this.contentList = res.data.result;
            this.http();
          }else{
            this.contentList = []
            this.http();
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    handleClose(tag) {
      api
        .deleteContent({
          pid: tag.pid,
        })
        .then((res) => {
          if (res.data.status === 200) {
            this.http();
            this.$message({
              message: "删除成功!",
              type: "success",
            });
          }
        });
    },
    showInput() {
      this.inputVisible = true;
      this.$nextTick((_) => {
        this.$refs.saveTagInput.$refs.input.focus();
      });
    },
    handleInputConfirm() {
      let inputValue = this.inputValue;
      api
        .addContent({ name: inputValue })
        .then((res) => {
          if (res.data.status === 200) {
            this.http();
            this.$message({
              message: "添加成功!",
              type: "success",
            });
            this.inputVisible = false;
            this.inputValue = "";
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>

<style scoped>
.el-tag + .el-tag {
  margin-left: 10px;
}
.button-new-tag {
  margin-left: 10px;
  height: 32px;
  line-height: 30px;
  padding-top: 0;
  padding-bottom: 0;
}
.input-new-tag {
  width: 90px;
  margin-left: 10px;
  vertical-align: bottom;
}
</style>
