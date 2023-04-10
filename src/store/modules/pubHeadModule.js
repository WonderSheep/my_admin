export default {
    namespaced:true,
    state:{
        page:1,
        search:'',
        paramSearch:''
    },
    mutations:{
        setPage(state,page){
            state.page = page;
        },
        setSearch(state,search){
            state.search = search;
        },
        setPubHeadSearch(state,search){
            state.paramSearch = search;
        }
    }
}