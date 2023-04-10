<template>
    <div>
        <div class="header">
            <div class="login">
                <el-badge :value="12" class="item">
                    <i class="el-icon-bell"></i>
                </el-badge>
                <span class="user-name">{{username}}</span>
                <el-dropdown class="leave">
                    <span class="el-dropdown-link">
                        个人中心<i class="el-icon-arrow-down el-icon--right"></i>
                    </span>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item>
                            <router-link to="/user" custom v-slot="{ navigate }">
                                <span @click="navigate" role="link">个人中心</span>
                            </router-link>
                        </el-dropdown-item>
                        <el-dropdown-item><div @click="logout">退出登录</div></el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
            </div>
        </div>
        <el-menu :default-active="currentIndex" class="el-menu-vertical-demo" router>
            <el-menu-item index="/product">
                <i class="el-icon-truck"></i>
                <span slot="title">商品管理</span>
            </el-menu-item>
            <el-menu-item index="/params">
                <i class="el-icon-data-analysis"></i>
                <span slot="title">规格参数</span>
            </el-menu-item>
            <el-menu-item index="/content">
                <i class="el-icon-s-opportunity"></i>
                <span slot="title">广告分类</span>
            </el-menu-item>
        </el-menu>
    </div>
</template>

<script>
import { mapMutations, mapState } from 'vuex';

export default {
    name: 'MainNav',
    data() {
        return {
            currentIndex: "/product"
        }
    },
    mounted(){
        this.currentIndex = this.$route.path;//解决了刷新后左边栏的高亮问题
    },
    computed:{
        ...mapState("loginModule",["username"])
    },
    methods:{
        ...mapMutations("loginModule",["clearToken"]),
        logout(){
            this.clearToken();
            localStorage.removeItem("token");
            this.$router.push('/login')
        }
    }
}
</script>

<style scoped>

.leave{
    margin-left: 10px;
}

.el-dropdown-link {
    cursor: pointer;
    color: orange;
  }
  .el-icon-arrow-down {
    font-size: 12px;
  }

.header {
    width: 100%;
    height: 50px;
    line-height: 50px;
    background: #545c64;
    box-shadow: 0px 0px 5px 1px #999;
    /* text-decoration-color: #fff; */
}

.header .user-name {
    color: orange;
    margin-right: 50px;
    font-size: 15px;
    border: 1px solid #545c64;
    width: 40px;
    height: 40px;
    line-height: 40px;
    display: inline-block;
    /* background: orange;
    border-radius: 50%; */
}

.header .login {
    color: orange;
    height: 50px;
    float: right;
    margin-right: 20px;
}

.item {
    height: 25px;
    margin-right: 30px;
}

.header .login .item i {
    display: block;
    font-size: 25px;
}

.el-menu-vertical-demo {
    position: fixed;
    left: 0;
    top: 0;
    height: 100%;
    width: 200px;
    /* z-index: 1000; */
}
</style>