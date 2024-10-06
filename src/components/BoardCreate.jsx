import axios from 'axios';
import React, { useEffect, useState } from 'react';
import '../css/boardCreate.css';
import { Link } from 'react-router-dom';

const BoardCreate = () => {

    // 유저 로그인 정보
    const [user, setUser] = useState({us_id:0});

    // 로그아웃 버튼
    const onLogout = () => {
        localStorage.setItem('loginData', JSON.stringify({us_id : 0}));
        window.location.href = '/list';
    }    

    useEffect(()=>{
        setUser(JSON.parse(localStorage.getItem('loginData')));
    },[]);

    // 글쓰기 페이지에서 입력한 값 받아오기
    const [inputs, setInpust] = useState({
        bo_title :'',
        bo_content : '',
        bo_us_id : '',
        bo_us_nickname : ''
    });
    
    const {bo_title, bo_content, bo_us_id, bo_us_nickname} = inputs;

    const onChange = (e) => {
        const {name,value} = e.target;
        setInpust({
            ...inputs,
            bo_us_id : user.us_id,
            bo_us_nickname : user.us_nickname,
            [name] : value
        });
    }

    // 저장하기
    const onCreate = async () => {
        if(bo_title === ''){
            alert('title is null');
            return;
        }
        if(bo_content === ''){
            alert('content is null');
            return;
        }
        if(bo_us_id === 0){
            if(window.confirm("로그인 후 작성 가능합니다.\n로그인 페이지로 넘어가시겠습니까?")){
                window.location.href = '/login';
            }else{
                return;
            }
        }
        if(window.confirm('등록하시겠습니까?')){
            try{
                console.log(inputs)
                const res = await axios.post('/insert', inputs);
                if(res.data === 'OK'){
                    window.location.href = '/list';
                }
            }catch(err){
                console.log(err)
            }
        }
    }
    
    // ----------------------------------------------------------------------------------------------------
    return (
        <div className='boardCreate'>
            <div className='header'>
                <Link to='/list' className='txt1'>React Board</Link>
                {   
                    user.us_id !== 0?
                        <span className='txt2'>{user.us_nickname}님</span>
                        : 
                        <span className='txt2'>Guest</span>
                            
                }
                {   
                    user.us_id !== 0?
                    <button onClick={onLogout} className='btn1'>로그아웃</button>
                    : 
                    <Link to={'/login'}><button className='btn1'>로그인</button></Link>
                }
            </div>
            <div className='main'>
                <input type="text" onChange={onChange} name='bo_title' value={bo_title} placeholder='제목을 입력해주세요.'/>
                <textarea onChange={onChange} name='bo_content' value={bo_content} placeholder='내용을 입력해주세요.'></textarea>
                <button onClick={onCreate}>저장</button>
            </div>
        </div>
    );
};

export default BoardCreate;