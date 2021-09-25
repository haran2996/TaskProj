import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {getNewsItem, updateNewsItem,deleteNewsItem} from '../actions'
import { useRouter } from 'next/router';
type PROPS ={
    id:String;
}
const NewsItem = (props:PROPS) => {
    const router = useRouter();
    const isUserLoggedIn = useSelector(store=>store.isUserLoggedIn);
    const userInfo = useSelector(store=>store.userInfo);
    const [title, settitle] = useState('');
    const [story, setstory] = useState('');
    const [editMode, seteditMode] = useState(false);
    const [titleError, settitleError] = useState(false);
    const [storyError, setstoryError] = useState(false);
    const [newsItem, setnewsItem] = useState({});
    const dispatch = useDispatch();
    const handleInputChange = (e, stateChangeFun, errorChangeFun)=>{
        if(e.target.value.trim()!=='')
            errorChangeFun(false);
        stateChangeFun(e.target.value);
    }
    useEffect(() => {
        const id = window.location.pathname.split('/')[1];
        if(props.id || id){
            new Promise(
                (resolve,reject)=>
                dispatch(getNewsItem(props.id || id,resolve))
            ).then((res:any)=>{
                if(res.success){
                    setnewsItem(res.news);
                    settitle(res.news.title);
                    setstory(res.news.story);
                }
            });
        }
    }, []);
    const handleUpdateStory = ()=>{
        seteditMode(false);
        dispatch(updateNewsItem({
            title,
            story
        },props.id))
    }

    const handleDeleteStory =() =>{
        new Promise(
            (resolve,reject)=>dispatch(deleteNewsItem(props.id,resolve))
        ).then((resp: any)=>{
            if(resp.success){
                router.push('/');
            }
        })
    }

    return (
        <div className="mt-3 bg-gray-200 shadow-md rounded px-8  pb-8 mb-4 flex flex-col xl:w-5/6 lg:w-5/6 md:w-5/6 sm:w-full mt-5 ml-auto mr-auto">
            <div className="mb-4 pt-6">
                <h2 className="text-gray-500 pb-2 text-left">
                    <div className="font-bold text-lg text-black flex justify-between">
                        <ul className="flex items-center w-9/12">
                            {editMode?
                                <input value={title} onChange={e=>handleInputChange(e,settitle,settitleError)} className="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker" id="title" type="text" placeholder="Title" />
                                :
                                ( title || 'Title' )
                            }
                        </ul>
                        {
                        isUserLoggedIn&&userInfo?.userType ==='admin'&&
                        <div className="font-normal text-base p-2">
                            {
                                editMode?
                                <span className="mr-2 text-blue-700 cursor-pointer" onClick={handleUpdateStory}>
                                    Update
                                </span>
                                :
                                <span className="mr-2 text-blue-700 cursor-pointer" onClick={()=>{seteditMode(true)}}>
                                    Edit
                                </span>
                            }
                            <span className="text-red-600 cursor-pointer " onClick={handleDeleteStory}>
                                Delete
                            </span>
                        </div>
                        }
                    </div>
                </h2>
                {
                    editMode?
                    <div className="mb-6">
                        <textarea value={story} onChange={e=>handleInputChange(e,setstory,setstoryError)} rows="10" placeholder="Enter your story here..." className="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker"></textarea>
                    </div>   
                    :
                    <p className='text-left text-base text-gray-900 group-hover:text-indigo-600'>
                        {story|| 'Story goes here..'}
                    </p>
                }
            </div>
        </div>
    );
}

export default NewsItem;
