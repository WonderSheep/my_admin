# my_admin

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### 项目页面结构
1.商品管理:product
2.规格参数:params
3.内置分类管理:Content
4.用户登录注册页面:login
5.用户中心:usercenter

### npm run lint --fix 自动规范语法

### 页面管理级别
--login
--layout
    --content
    --params
    --product
--user


### 实现后台服务器提供接口
node+MySQL+express

### 用户登录的验证
vuex管理用户登陆状态
token用户凭证
 前端发送用户名密码 -> 后台验证用户名密码是否成功 ->返回token用户凭证 -> 前台保存的是token用户凭证