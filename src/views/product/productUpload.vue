<template>
  <div>
    <el-upload
      ref="upload"
      action="http://localhost:3000/api/upload"
      :file-list="fileList"
      :auto-upload="false"
      :on-success="handleSuccess"
    >
      <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
      <el-button
        style="margin-left: 10px"
        size="small"
        type="success"
        @click="submitUpload"
        >上传到服务器</el-button
      >
      <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
    </el-upload>
  </div>
</template>

<script>
export default {
  data() {
    return {
      fileList: [],
    };
  },
  methods: {
    handleSuccess(res,file) {
        this.$emit('onUpload',res);
    },
    submitUpload() {
        this.$refs.upload.submit();
      },
  },
};
</script>

<style>
</style>