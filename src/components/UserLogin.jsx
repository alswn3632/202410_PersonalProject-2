import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../css/userLogin.css';

const UserLogin = () => {
    
    // input 정보 가져오기
    const [inputs, setInputs] = useState({
        us_userid : '',
        us_userpw : ''
    })

    const {us_userid, us_userpw} = inputs;

    const onChange = (e) => {
        const {name, value} = e.target;
        setInputs({
            ...inputs,
            [name] : value
        });
    }

    // 로그인하기
    const onLogin = async () => {
        try{
            const res = await axios.post(`/login`, inputs);
            console.log(res.data.length);
            console.log(res.data[0]);
            // 데이터베이스에 있을 경우 : 1, 없을 경우 : 0
            if(res.data.length === 1){
                // 로그인 - 로칼스토리지에 사용자 정보 저장
                localStorage.setItem('loginData', JSON.stringify(res.data[0]));
                window.location.href = '/list';
            }else if(res.data.length === 0){
                window.alert("로그인 정보가 올바르지 않습니다.")
            }
        }catch(e){
            console.log(e);
        }
    }
    
    // ----------------------------------------------------------------------------------------------------
    return (
        <div className='userLogin'>
            <h1>React Board</h1>
            <input type="text" onChange={onChange} name="us_userid" value={us_userid} placeholder='아이디'/><br />
            <input type="password" onChange={onChange} name="us_userpw" value={us_userpw} placeholder='비밀번호'/><br />
            <div className='signupLink'>
                <Link to={`/join`}><button>회원가입</button></Link>
            </div>
            <button onClick={onLogin}>로그인</button>
        </div>
    );
};

export default UserLogin;