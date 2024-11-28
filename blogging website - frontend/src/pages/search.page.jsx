import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import InPageNavigation from "../components/inpage-navigation.component";
import Loader from "../components/loader.component";
import AnimationWrapper from "../common/page-animation";
import NoDataMessage from "../components/nodata.component";
import BlogPostCard from "../components/blog-post.component";
import LoadMoreDataBtn from "../components/load-more.component";
import { filterPaginationData } from "../common/filter-pagination-data";
import axios from "axios";
import UserCard from "../components/usercard.component";

const SearchPage = () =>{

    let { query } = useParams()

    let [ blogs,setBlog ] = useState(null)
    let [ users,setUsers ] = useState(null)

    const searchBlogs = ({ page = 1,create_new_arr = false}) =>{

        axios.post(import.meta.env.VITE_SERVER_DOMAIN+"/search-blogs",{ query, page })
        .then(async ({ data }) => {

            let formateData = await filterPaginationData({
                state: blogs,
                data: data.blogs,
                page,
                countRoute: "/search-blogs-count",
                data_to_send:{ query },
                create_new_arr
            })

            setBlog(formateData)
        })
        .catch(err => {
            console.log(err);
        })

    }

    const fetchUsers = () =>{

        axios.post(import.meta.env.VITE_SERVER_DOMAIN + "/search-users",{ query })
        .then(({ data: {users}})=>{
            console.log(users);
            setUsers(users);
        })
    }

    useEffect(()=>{

        resetState();
        searchBlogs({page:1,create_new_arr:true });
        fetchUsers();

    },[query])

    const UserCardWrapper = () =>{

        return (
            <>
            {
                users === null ? <Loader/> :
                    users.length ?
                        users.map((user,i)=>{
                            return <AnimationWrapper key={i} transition={{duration:1,delay:i*0.08}}>
                                <UserCard user={user}/>
                            </AnimationWrapper>
                        })
                    : <NoDataMessage message="No user found !"/>
            }
            </>
        )
    }

    const resetState = () =>{
        setBlog(null);
        setUsers(null);
    }

    return (
        <section className="h-cover flex justify-center gap-10">
            <div className="w-full">
                <InPageNavigation routes={[`Search Reasults from "${query}"`,"Accounts Matched"]} defaultHidden={["Accounts Matched"]}>
                    <>
                    {
                                blogs === null ? <Loader /> :
                                    (
                                        blogs.results.length ?
                                            blogs.results.map((blog, i) => {
                                                return (<AnimationWrapper transition={{ duration: 1, delay: i * .1 }} key={i}>
                                                    <BlogPostCard content={blog} author={blog.author.personal_info} />
                                                </AnimationWrapper>);
                                            })
                                            : <NoDataMessage message="No Blogs published" />
                                    )
                            }
                            <LoadMoreDataBtn state = {blogs} fetchDataFun={searchBlogs}/>
                    </>

                    <UserCardWrapper/>

                </InPageNavigation>
            </div>

            <div className="min-w-[40%] lg-min-[350px] max-w-min border-l border-grey pl-8 pt-5 max-md:hidden">
                            <h1 className="font-mdeium text-xl mb-8">User related to search <i className="fi fi-rr-user mt-1"></i></h1>
                            <UserCardWrapper/>
            </div>
        </section>
    )
}
export default SearchPage;