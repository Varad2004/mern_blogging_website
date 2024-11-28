import AnimationWrapper from "../common/page-animation"
import InPageNavigation from "../components/inpage-navigation.component"
import axios from "axios"
import { useEffect, useState } from "react"
import Loader from "../components/loader.component"
import BlogPostCard from "../components/blog-post.component"
import MinimalBlogPost from "../components/nobanner-blog-post.component"
import { activeTabRef } from "../components/inpage-navigation.component"
import NoDataMessage from "../components/nodata.component"
import { filterPaginationData } from "../common/filter-pagination-data"
import LoadMoreDataBtn from "../components/load-more.component"

const HomePage = () => {

    let [blogs, setBlog] = useState(null);
    let [trendingBlogs, setTrendingBlog] = useState(null);
    let categories = ["travel", "hollywood", "science", "food", "study", "finances", "chart"]
    let [pageState, setPageState] = useState("home")

    const fetchLatestBlogs = ({ page = 1 }) => {
        axios.post(import.meta.env.VITE_SERVER_DOMAIN + "/latest-blogs", { page })
            .then(async ({ data }) => {

                let formateData = await filterPaginationData({
                    state: blogs,
                    data: data.blogs,
                    page,
                    countRoute: "/all-latest-blogs-count"
                })

                setBlog(formateData)
            })
            .catch(err => {
                console.log(err);
            })
    }

    const fetchBlogsByCategory = ({ page = 1 }) => {
        axios.post(import.meta.env.VITE_SERVER_DOMAIN + "/search-blogs", { tag: pageState })
            .then(async ({ data }) => {
                let formateData = await filterPaginationData({
                    state: blogs,
                    data: data.blogs,
                    page,
                    countRoute: "/search-blogs-count",
                    data_to_send: { tag: pageState }
                })

                setBlog(formateData)
            })
            .catch(err => {
                console.log(err);
            })
    }

    const fetchTrendingBlogs = () => {
        axios.get(import.meta.env.VITE_SERVER_DOMAIN + "/trending-blogs")
            .then(({ data }) => {
                setTrendingBlog(data.blogs)
            })
            .catch(err => {
                console.log(err);
            })
    }

    const loadBlogsByCategory = (e) => {

        let category = e.target.innerText.toLowerCase();

        setBlog(null);

        if (pageState == category) {
            setPageState("home")
            return;
        }

        setPageState(category)

    }


    useEffect(() => {

        activeTabRef.current.click();

        if (pageState == "home") {
            fetchLatestBlogs({ page: 1 });
        } else {
            fetchBlogsByCategory({ page: 1 });
        }

        if (!trendingBlogs) {
            fetchTrendingBlogs();
        }

    }, [pageState])

    return (
        <AnimationWrapper>
            <section className="h-cover flex justify-center gap-10">
                <div className="w-full">
                    <InPageNavigation routes={[pageState, "trending blogs"]}
                        defaultHidden={"trending blogs"}
                    >
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
                            <LoadMoreDataBtn state={blogs} fetchDataFun={fetchLatestBlogs} />
                        </>

                        {
                            trendingBlogs === null ? <Loader /> :
                                (
                                    trendingBlogs.length ?
                                        trendingBlogs.map((trendingBlog, i) => {
                                            return <AnimationWrapper transition={{ duration: 1, delay: i * .1 }} key={i}>
                                                <MinimalBlogPost blog={trendingBlog} index={i} />
                                            </AnimationWrapper>
                                        })
                                        : <NoDataMessage message="No Trending Blogs" />
                                )
                        }

                    </InPageNavigation>
                </div>

                <div className="min-w-[40%] lg:min-w-[400px] max-w-min border-l border-grey pl-8 pt-3 max-md:hidden">
                    <div className="flex flex-col gap-10">
                        <div>
                            <h1>Stories from all interests</h1>

                            <div className="flex gap-3 flex-wrap mt-5">
                                {
                                    categories.map((category, i) => {
                                        return <button className={"tag " + (pageState == category ? " bg-black text-white " : " ")}
                                            onClick={loadBlogsByCategory}
                                            key={i}>{category}</button>
                                    })
                                }
                            </div>
                        </div>


                        <div>
                            <h1 className="font-medium text-xl mb-8 ">Trending
                                <i className="fi fi-rr-arrow-trend-up"></i>
                            </h1>

                            {
                                trendingBlogs === null ? <Loader /> :
                                    (
                                        trendingBlogs.length ?
                                            trendingBlogs.map((trendingBlog, i) => {
                                                return <AnimationWrapper transition={{ duration: 1, delay: i * .1 }} key={i}>
                                                    <MinimalBlogPost blog={trendingBlog} index={i} />
                                                </AnimationWrapper>
                                            })
                                            : <NoDataMessage message="No trending blogs" />
                                    )
                            }

                        </div>
                    </div>

                </div>
            </section>
        </AnimationWrapper>
    )
}

export default HomePage