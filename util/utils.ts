import { useDispatch } from "react-redux";
import {fetchUserDetail} from '../actions';
import {useEffect} from 'react';
export const checkUserSession = () => {
    const dispatch = useDispatch();
    useEffect(()=>{
        const currentUser = sessionStorage.getItem('currentUser');
        if(currentUser){
            dispatch(fetchUserDetail(currentUser));
            return true;
        }else
            return false;
    },[])
        
}
