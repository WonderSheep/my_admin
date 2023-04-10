const base = {
    baseUrl:'http://localhost:3000', //根路径
    login:'/api/login',              //登录
    register:'/api/register',         //注册
    product:'/api/product',           //商品列表
    total:'/api/total',                //数据总条数
    search:'/api/search',              //商品模糊查询
    category:'/api/category',          //商品类目选择实现
    insert:'/api/insert',              //插入数据
    delete:'/api/delete',              //删除数据
    preUpdate:'/api/preUpdate',        //预更新
    update2:'/api/update2',              //更新
    paramAll:'/api/paramAll',          //规格参数查询 
    paramsSearch:'/api/paramsSearch',   //规格参数模糊搜索
    insertParams:'/api/insertParams',  //规格参数添加
    deleteParams:'/api/deleteParams',  //规格参数删除
    content:'/api/content',            //获取广告参数
    deleteContent:'/api/deleteContent',//删除广告参数
    addContent:'/api/addContent',       //添加广告参数
    contentList:'/api/contentList',      //内容分类-元素列表
    
}

export default base;