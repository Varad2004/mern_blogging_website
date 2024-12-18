const LoadMoreDataBtn = ({ state,fetchDataFun }) =>{

    if(state!=null && state.totalDocs > state.results.length){
        return(
            <button className="tet-dark-grey p-2 px-3 hover:bg-grey/30 rouned-md flex items-center gap-2" 
            onClick={()=>fetchDataFun({page: state.page+1})}>
                Load More
            </button>
        )
    }
}
export default LoadMoreDataBtn;