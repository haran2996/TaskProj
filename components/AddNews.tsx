import { useState } from 'react';
import { useDispatch } from 'react-redux';
import {addNewNewsItem} from '../actions'

const AddNews = (props) => {
    const [title, settitle] = useState('');
    const [story, setstory] = useState('');
    const [titleError, settitleError] = useState(false);
    const [storyError, setstoryError] = useState(false);
    const [addError, setaddError] = useState(false);
    const dispatch = useDispatch();
    const handleInputChange = (e, stateChangeFun, errorChangeFun)=>{
        if(e.target.value.trim()!=='')
            errorChangeFun(false);
        stateChangeFun(e.target.value);
    }

    const onPublish = (e) => {
        e.preventDefault();
        setaddError(false);
        let error=false;
        if(title.trim()===''){
            settitleError(true);
            error=true;
        }
        if(story.trim()===''){
            setstoryError(true);
            error=true;
        }
        if(!error){
            new Promise(
                (resolve,reject)=>{
                    dispatch(
                        addNewNewsItem({
                            title,
                            story
                        },resolve)
                    )
                }
            ).then(
                (resp:any)=>{
                    if(!resp.success)
                        setaddError(true);
                    else    
                        console.log('successfully registered')
                }
            )
        }
        
    }

    return (
        <div className="mt-3 bg-gray-200 shadow-md rounded px-8 pt-6 pb-8 mb-4 flex flex-col xl:w-5/6 lg:w-5/6 md:w-5/6 sm:w-full ml-auto mr-auto">
            <div className="mb-4">
                <input value={title} onChange={e=>handleInputChange(e,settitle,settitleError)} className="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker" id="title" type="text" placeholder="Title" />
                {titleError && <p className="text-red-500 text-xs italic">Please enter a title.</p>}
            </div>
            <div className="mb-3">
                <textarea value={story} onChange={e=>handleInputChange(e,setstory,setstoryError)} rows="10" placeholder="Enter your story here..." className="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker"></textarea>
                {storyError && <p className="text-red-500 text-xs italic">Please enter a something.</p>}
            </div>
            {addError && <p className="text-red-500 text-sm mb-2 italic">Title already present.</p>}
            <div className="flex items-center justify-between">
                <button onClick={onPublish} className="bg-blue-600 hover:bg-blue-dark text-white font-bold py-2 px-4 rounded" type="button">Publish</button>
            </div>
        </div>
    )
}

export default AddNews;
