import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import '../css/boardEdit.css'

const BoardEdit = () => {

    // 유저 로그인 정보
    const [user, setUser] = useState({us_id : 0});

    // 로그아웃 버튼
    const onLogout = () => {
        localStorage.setItem('loginData', JSON.stringify({us_id : 0}));
        window.location.href = '/list';
    }   

    // 수정할 글 내용 가져오기
    const { id } = useParams();

    const [board, setBoard] = useState({bo_us_id : 0});

    const [inputs, setInputs] = useState({
        title : '',
        content : ''
    });

    const getEditDate = async () => {
        try{
            const edit = await axios.get(`/detail/${id}`);
            setBoard(edit.data[0]);
            setInputs({
                title : edit.data[0].bo_title,
                content : edit.data[0].bo_content
            }); 
        }catch(e){
            console.log(e);
        }
    }
    
    // 랜더링시 실행
    useEffect(()=>{
        getEditDate();
        setUser(JSON.parse(localStorage.getItem('loginData')));
    },[]);

    const {title, content} = inputs;

    const onChange = (e) => {
        const {name, value} = e.target;
        setInputs({
            ...inputs,
            [name] : value
        });
    }

    // 수정하기
    const onEdit = async () => {
        if(title === ''){
            alert('title is null');
            return;
        }
        if(content === ''){
            alert('content is null');
            return;
        }
        if(window.confirm('수정하시겠습니까?')){
            try{
                const res = await axios.post(`/update/${id}`, inputs);
                if(res.data === 'OK'){
                    window.location.href = `/detail/${id}`;
                }
            }catch(err){
                console.log(err)
            }
        }
    }

    // ----------------------------------------------------------------------------------------------------
    if(board.bo_id !== 0){
        return (
            <div className='boardEdit'>
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
                    <input type="text" onChange={onChange} name='title' value={title} />
                    <textarea type="text" onChange={onChange} name='content' value={content} />
                    <button onClick={onEdit}>저장</button>
                </div>
            </div>
        );
    }
};

export default BoardEdit;