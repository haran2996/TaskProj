import Link from 'next/link';
import React, {useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { checkUserSession } from '../util/utils';
import {userLogout} from '../actions'
type PROPS = {
    currentPage: string;
}
const TopNav = (props): PROPS => {
    const isUserLoggedIn = useSelector(store=>store.isUserLoggedIn);
    checkUserSession();
    const dispatch = useDispatch();
    const onLogout = () => {
        dispatch(userLogout())
    }
    return (
        <div className='flex-1 bg-gray-200 flex flex-col'>
            <nav className='px-4 flex justify-between h-10 border-b-2'>
                <ul className='flex items-center'>
                    <li className={`h-6 w-6 ${props.currentPage==='home'?'text-gray-500':''}`}>
                        <Link href='/'>Home</Link>
                    </li>
                    {isUserLoggedIn &&  
                        <li className={`h-6 pl-10 ${props.currentPage==='addnews'?'text-gray-500':''}`}>
                        <Link href='/addnews'>AddNews</Link>
                    </li>
                    }
                </ul>
                <ul className='flex items-center'>
                    {!isUserLoggedIn &&
                        <React.Fragment>
                            <li className={`pr-6 ${props.currentPage==='login'?'text-gray-500':''}`}>
                                <Link href='/login'>Login</Link>
                            </li>
                            <li className={`pr-6 ${props.currentPage==='signup'?'text-gray-500':''}`}>
                                <Link href='/signup'>Register</Link>
                            </li>
                        </React.Fragment>
                    } 
                    {isUserLoggedIn &&  
                        <li className={`pr-6 ${props.currentPage==='signup'?'text-gray-500':''}`}>
                            <span className="text-red-600 cursor-pointer" onClick={onLogout}>Logout</span>
                        </li>
                    }
                </ul>
            </nav>
        </div>

    )
}

export default TopNav;
