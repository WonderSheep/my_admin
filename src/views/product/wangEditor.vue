<template>
  <div>
    <div id="wangEditor" ref="editor" style="text-align: left"></div>
  </div>
</template>

<script>
import wangEditor from "wangeditor";

export default {
  data() {
    return {
      editorContent: "",
    };
  },
  props:{
    wangContent:{
        type:String,
        default:""
    }
  },
  watch:{
    wangContent(newValue){
        this.editor.txt.html(newValue);
    }
  },
  mounted() {
    // this.editor = new wangEditor('#wangEditor');//这么创建的话富文本编辑器无法复用
    this.editor = new wangEditor(this.$refs.editor);
    this.editor.config.onchange = (newHtml) => {
      this.editorContent = newHtml;
      this.$emit("onEditor", newHtml);
    };

    this.editor.config.pasteFilterStyle = false;
    this.editor.config.menus = [
      "head", // 标题
      "fontSize", // 字号
      "italic", // 斜体
      "underline", // 下划线
      "strikeThrough", // 删除线
      "backColor", // 背景颜色
      "lineHeight", //行高
      "list", // 列表
      "justify", // 对齐方式
      "undo", // 撤销
      "redo", // 重复
    ];

    // this.$bus.$on('clearEditor',()=>{
    //     this.editorContent = "";
    // })

    //创建编辑器
    this.editor.create();
  },
};
</script>

<style>
</style>