import axios from "../utils/request"
import base from "./base"

const api = {
    login(params){
        return axios.post(base.baseUrl + base.login , params);//路径加参数
    },
    register(params){
        return axios.post(base.baseUrl + base.register , params)//注册
    },
    product(params){
        return axios.get(base.baseUrl + base.product , {
            params //传的是一个对象,通过参数去决定访问的页码
        })
    },
    total(){
        return axios.get(base.baseUrl + base.total);
    },
    //商品模糊查询
    search(params){
        return axios.get(base.baseUrl + base.search,{
            params//传的是一个对对象,通过参数获取数据
        })
    },
    category(params){
        return axios.get(base.baseUrl + base.category,{
            params
        })
    },
    insert(params){
        return axios.get(base.baseUrl + base.insert , {params})
    },
    delete(params){
        return axios.get(base.baseUrl + base.delete, {params})
    },
    preUpdate(params){
        return axios.get(base.baseUrl + base.preUpdate,{
            params
        })
    },
    update2(params){
        return axios.get(base.baseUrl + base.update2,{
            params
        })
    },
    paramAll(params){
        return axios.get(base.baseUrl + base.paramAll,{
            params
        })
    },
    paramsSearch(params){
        return axios.get(base.baseUrl + base.paramsSearch,{
            params
        })
    },
    insertParams(params){
        return axios.get(base.baseUrl + base.insertParams,{
            params
        })
    },
    deleteParams(params){
        return axios.get(base.baseUrl + base.deleteParams,{
            params
        })
    },
    content(){
        return axios.get(base.baseUrl + base.content);
    },
    deleteContent(params){
        return axios.get(base.baseUrl + base.deleteContent,{
            params
        })
    },
    addContent(params){
        return axios.get(base.baseUrl + base.addContent,{
            params
        })
    },
    contentList(params){
        return axios.get(base.baseUrl + base.contentList,{
            params
        })
    }
}

export default api;
