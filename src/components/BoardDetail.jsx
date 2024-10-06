import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import Comment from './Comment';
import '../css/boardDetail.css'

const BoardDetail = () => {

    // 유저 로그인 정보
    const [user, setUser] = useState({id:''});

    // 로그아웃 버튼
    const onLogout = () => {
        localStorage.setItem('loginData', JSON.stringify({us_id : 0}));
        window.location.href = '/list';
    }

    useEffect(()=>{
        setUser(JSON.parse(localStorage.getItem('loginData')));
    },[]);

    // 상세페이지 출력
    const { id } = useParams();

    const [board, setBoard] = useState({bo_id : 0});

    const getDetailDate = async () => {
        try{
            const details = await axios.get(`/detail/${id}`);
            setBoard(details.data[0]);
        }catch(e){
            console.log(e);
        }
    }

    // 글 삭제
    const onRemove = async () => {
        if(((board.bo_us_id === user.us_id) && board.bo_id !== 0)){
            if(window.confirm('삭제하시겠습니까?')){
                try{
                    const removes = await axios.get(`/remove1/${id}`)
                    console.log(removes.data)
                }catch(e){
                    console.log(e)
                }
                
                try{
                    const removes = await axios.get(`/remove2/${id}`)
                    console.log(removes.data)
                    if(removes.data === 'OK'){
                        window.location.href = '/list';
                    }
                }catch(e){
                    console.log(e)
                }
            }
        }else{
            window.confirm('권한이 없습니다.')
        }
    }

    // 댓글 박스 출력
    const [comment, setComment] = useState([]);

    const getCommDate = async () => {
        try{
            const comm = await axios.get(`/comment/${id}`);
            setComment(comm.data);
        }catch(e){
            console.log(e);
        }
    }
    
    const comm1 = comment.filter(c => c.co_recomment === 0);
    const comm2 = comment.filter(c => c.co_recomment === 1);

    // 랜더링-실행 연결
    useEffect(()=>{
        getDetailDate();
        getCommDate();
    },[]);

    // 댓글 삭제
    const onRemove2 = async (idc,idu) => {
        if((idu === user.us_id) && user.us_id !== 0){
            if(window.confirm('삭제하시겠습니까?')){
                try{
                    const res = await axios.get(`/removeCo1/${idc}`)
                }catch(e){
                    console.log(e)
                }
    
                try{
                    const res = await axios.get(`/removeCo2/${idc}`)
                    if(res.data === 'OK'){
                        window.location.href = `/detail/${id}`;
                    }
                }catch(e){
                    console.log(e)
                }
            }
        }else{
            window.confirm('권한이 없습니다.')
        }
    }

    // 대댓글 기능
    const [recommInfo, setRecommInfo] = useState({
        re_id : 0,
        recomment : 0
    });

    const onRecomm = (id) => {
        setRecommInfo({
            re_id : id,
            recomment : 1
        });
    }

    const [inputs, setInputs] = useState({
        co_content : '',
        co_us_id : '',
        co_us_nickname : '',
        co_bo_id : id,
        co_re_id : 0,
        co_recomment : 0
    });

    // 댓글 작성하기 - input 정보 가져오기
    const onChange = (e) => {

        setInputs({
            ...inputs,
            co_content : e.target.value,
            co_us_id : user.us_id,
            co_us_nickname : user.us_nickname,
            co_re_id : recommInfo.re_id,
            co_recomment : recommInfo.recomment
        });
    }

    // 댓글 작성하기 - 등록
    const onCreate = async () => {

        if(inputs.co_content === ''){
            return;
        }
        if(inputs.co_us_id === 0){
            if(window.confirm("로그인 후 작성 가능합니다.\n로그인 페이지로 넘어가시겠습니까?")){
                window.location.href = '/login';
            }else{
                return;
            }
        }
        try{
            const res = await axios.post(`/insertCo1`, inputs);
            if(res.data === 'OK'){
                window.location.href = `/detail/${id}`;
            }
        }catch(err){
            console.log(err)
        }
    
    }

    // 수정 페이지 이동
    const onMove3 = () => {
        if(((board.bo_us_id === user.us_id) && board.bo_id !== 0)){
            window.location.href = `/edit/${board.bo_id}`;
        }else{
            window.confirm('권한이 없습니다.')
        }
    }

    // ----------------------------------------------------------------------------------------------------
    if(board.bo_id !== 0){
        return (
            <div className='boardDetail'>
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
                    <div className='titleBox'>
                        <h1>{board.bo_title}</h1>
                        <div>
                            <span>#{board.bo_us_nickname} </span>
                            <span>{new Date(board.bo_date).toLocaleDateString('ko-KR', { year: 'numeric', month: '2-digit', day: '2-digit' })}</span>
                        </div>
                    </div>

                    <div className='contentBox'>
                        <div style={{whiteSpace : "pre-wrap"}}>{board.bo_content}</div>
                        <div className='btn'>
                            <button onClick={onMove3}>수정 |</button>
                            <button onClick={onRemove}>삭제 |</button>
                        </div>
                    </div>

                    <div className='commBox'>
                        <div className='commCreate'>
                            <input type="text" name="co_content" value={inputs.co_content} onChange={onChange}/>
                            <button onClick={onCreate}>등록</button>
                        </div>
                        <div className='commMain'>
                            {
                                comm1.map(co1 => (
                                    <Comment key={co1.co_id} co1={co1} comm2={comm2} onRemove2={onRemove2} onRecomm={onRecomm}/>
                                ))
                            }
                        </div>
                    </div>

                </div>
            </div>
        );
    }
};

export default BoardDetail;