import { useState } from 'react';
import Link from 'next/link';
import { useDispatch } from 'react-redux';
import { userRegister } from '../actions';
import { useRouter } from 'next/router';

const LoginForm = () => {
    const [firstName, setfirstName] = useState('');
    const [lastName, setlastName] = useState('');
    const [emailId, setemailId] = useState('');
    const [passowrd, setpassowrd] = useState('');
    const [signUpError, setsignUpError] = useState(false);
    const [fnameError, setfnameError] = useState(false);
    const [lnameError, setlnameError] = useState(false);
    const [emailError, setemailError] = useState(false);
    const [passError, setpassError] = useState(false);
    const router = useRouter();
    const dispatch = useDispatch();
    const handleInputChange = (e, stateChangeFun, errorChangeFun)=>{
        if(e.target.value.trim()!=='')
            errorChangeFun(false);
        stateChangeFun(e.target.value);
    }
    const onRegister = (e) => {
        e.preventDefault();
        let error = false;
        setsignUpError(false);
        if(firstName.trim()===''){
            setfnameError(true);
            error =true;
        }
        if(lastName.trim()===''){
            setlnameError(true);
            error=true;
        }
        if(emailId.trim()===''){
            setemailError(true);
            error=true;
        }
        if(passowrd.trim()===''){
           setpassError(true);
           error=true;
        }
        if(!error) {
            new Promise((resolve,reject)=>dispatch(userRegister({
                fname: firstName,
                lname: lastName,
                password: passowrd,
                email: emailId
            },resolve))).then((resp: any)=>{
                if(resp.success)
                    router.push('/');
                else
                    setsignUpError(true);
            });
        }
    }
    return(
    <div className="mt-16 bg-gray-200 shadow-md rounded px-8 pt-6 pb-4 mb-4 flex flex-col xl:w-3/6 lg:w-3/6 md:w-4/6 sm:w-5/6 ml-auto mr-auto">
    <div className="mb-4">
        <label className="block text-grey-darker text-sm font-bold mb-2" htmlFor="firstName"> First Name </label>
        <input value={firstName} onChange={e=>handleInputChange(e,setfirstName,setfnameError)} className="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker" id="firstName" type="text" placeholder="First Name" />
        {fnameError && <p className="text-red-500 text-xs italic">Please enter a name.</p>}
    </div>
    <div className="mb-4">
        <label className="block text-grey-darker text-sm font-bold mb-2" htmlFor="firstName"> Last Name </label>
        <input value={lastName} onChange={e=>handleInputChange(e,setlastName,setlnameError)} className="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker" id="lastName" type="text" placeholder="Last Name" />
        {lnameError && <p className="text-red-500 text-xs italic">Please enter a name.</p>}
    </div>
    <div className="mb-4">
        <label className="block text-grey-darker text-sm font-bold mb-2" htmlFor="firstName"> Email Id </label>
        <input value={emailId} onChange={e=>handleInputChange(e,setemailId,setemailError)} className="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker" id="emailId" type="text" placeholder="Email Id" />
        {emailError && <p className="text-red-500 text-xs italic">Please enter a mailid.</p>}
    </div>
    <div className="mb-6">
        <label className="block text-grey-darker text-sm font-bold mb-2" htmlFor="password"> Password </label>
        <input value={passowrd} onChange={e=>handleInputChange(e,setpassowrd,setpassError)} className="shadow appearance-none border border-red rounded w-full py-2 px-3 text-grey-darker mb-3" id="password" type="password" placeholder="******************" />
        {passError && <p className="text-red-500 text-xs italic">Please enter a Password.</p>}
    </div>
    {signUpError && <div className="flex items-center justify-between mb-2">
        <p className="text-red-500 text-xs italic">Email already registered</p>
    </div>}
    <div className="flex items-center justify-between">
        <button onClick={onRegister} className="bg-blue-600 hover:bg-blue-dark text-white font-bold py-2 px-4 rounded" type="button">Register</button>
        <Link className="inline-block align-baseline font-bold text-sm text-blue hover:text-blue-darker" href="/login">Already Registered</Link>
    </div>
    </div>
    );
}

export default LoginForm;

