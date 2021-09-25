import React, {useEffect, useState} from 'react'
import noImage from '../images/noImage.jpg';
import { useDispatch, useSelector } from 'react-redux';
import {getAllNews} from '../actions'
import { useRouter } from 'next/router';
import NewsItem from './NewsItem';


const List = (props) => {
    const dispatch = useDispatch();
    const router = useRouter();
    const newsList = useSelector(store=>store.news);
    const [currentStory, setcurrentStory] = useState(null);
    useEffect(() => {
        dispatch(getAllNews());
    }, []);
    const handleNewItemClick=(item)=>{
        console.log('item clicked',item)
        // setcurrentStory(item);
        router.push(`/${item.newsId}`);
    }
    const handleCloseButton=(e)=>{
        setcurrentStory(null);
    }
    // if(!currentStory)
        return (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-4 mt-12 mb-12">
            <div>
                <h2 className="text-2xl font-extrabold text-gray-900">News List</h2>
                <section className="mt-6 grid md:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-8">
                {
                newsList?.map((news, index)=>{
                    return (
                        <div onClick={()=>handleNewItemClick(news)} key={index} className="bg-white group relative rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transform duration-200">
                            <div className="relative text-center w-full">
                                <img src={news.imgUrl || noImage.src}
                                    alt="product"
                                    className="object-center object-cover"/>
                            </div>
                            <div className="px-3 py-4">
                                <h3 className="text-gray-500 pb-2">
                                    <div className="font-bold text-lg text-black " href="#">
                                        <span className="absolute inset-0"></span>
                                        {news.title}
                                    </div>
                                </h3>
                                <p
                                    className="text-base h-12 overflow-y-hidden font-semibold text-gray-900 group-hover:text-indigo-600">
                                    {news.story}</p>
                            </div>
                        </div>
                    );
                })
                }
                </section>
            </div>
        </section>
        )
    // else
    //     return(
    //         <div className='fixed bg-black bg-opacity-60 h-full w-full'>
    //             <NewsItem title={currentStory?.title} story={currentStory?.story} closeButton={handleCloseButton}/>
    //         </div>
    //     )
}

export default List
