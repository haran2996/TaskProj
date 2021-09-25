import { useState } from 'react';
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import { checkUserSession } from '../util/utils';
import { useRouter } from 'next/router';
import {userLogin} from '../actions'

const LoginForm = () => {
    const isUserLoggedIn = useSelector(store=>store.isUserLoggedIn);
    const router = useRouter();
    if(isUserLoggedIn)
        router.push('/');
    const dispatch = useDispatch();
    const [userName, setuserName] = useState('');
    const [passowrd, setpassowrd] = useState('');
    const [loginError, setloginError] = useState(false);
    const [nameError, setnameError] = useState(false);
    const [passError, setpassError] = useState(false);

    const handleInputChange = (e, stateChangeFun, errorChangeFun)=>{
        if(e.target.value.trim()!=='')
            errorChangeFun(false);
        stateChangeFun(e.target.value);
    }
    const onSignIn = (e) => {
        e.preventDefault();
        setloginError(false);
        let error=false;
        if(userName.trim()===''){
            setnameError(true);
            error=true;
        }
        if(passowrd.trim()===''){
            setpassError(true);
            error=true;
        }
        if(!error){
            new Promise((resolve,reject)=>dispatch(userLogin({
                email: userName,
                password: passowrd
            },resolve))).then(
                (resp:any)=>{
                    if(resp.success)
                        router.push('/');
                    else
                        setloginError(true);
                }
            );
        }
    }
    return(
    <div className="mt-32 bg-gray-200 shadow-md rounded px-8 pt-6 pb-8 mb-4 flex flex-col xl:w-3/6 lg:w-3/6 md:w-4/6 sm:w-5/6 ml-auto mr-auto">
    <div className="mb-4">
        <label className="block text-grey-darker text-sm font-bold mb-2" htmlFor="username"> Username </label>
        <input value={userName} onChange={e=>handleInputChange(e,setuserName,setnameError)} className="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker" id="username" type="text" placeholder="Username" />
        {nameError && <p className="text-red-500 text-xs italic">Please enter a unsername.</p>}
    </div>
    <div className="mb-6">
        <label className="block text-grey-darker text-sm font-bold mb-2" htmlFor="password"> Password </label>
        <input value={passowrd} onChange={e=>handleInputChange(e,setpassowrd,setpassError)} className="shadow appearance-none border border-red rounded w-full py-2 px-3 text-grey-darker mb-3" id="password" type="password" placeholder="******************" />
        {passError && <p className="text-red-500 text-xs italic">Please enter a password.</p>}
    </div>
    {loginError && <div className="flex items-center justify-between mb-2">
        <p className="text-red-500 text-xs italic">username or password not found</p>
    </div>}
    <div className="flex items-center justify-between">
        <button onClick={onSignIn} className="bg-blue-600 hover:bg-blue-dark text-white font-bold py-2 px-4 rounded" type="button">Sign In</button>
        <Link className="inline-block align-baseline font-bold text-sm text-blue hover:text-blue-darker" href="/signup">Not Yet Registered</Link>
    </div>
    </div>
    );
}

export default LoginForm;

