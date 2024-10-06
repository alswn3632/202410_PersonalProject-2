import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios'
import '../css/boardList.css';

const BoardList = () => {

    // 유저 로그인 정보
    const [user, setUser] = useState({us_id:0});

    // 로그아웃 버튼
    const onLogout = () => {
        localStorage.setItem('loginData', JSON.stringify({us_id : 0}));
        window.location.href = '/list';
    }

    // 게시글 작성 버튼
    const onMove = () => {
        if(user.us_id !== 0){
            window.location.href = '/create';
        }else{
            if(window.confirm("로그인 후 작성 가능합니다.\n로그인 페이지로 넘어가시겠습니까?")){
                window.location.href = '/login';
            }
        }
    }

    //==페이징 포함 게시판 목록===============================================================
    const [ list, setList ] = useState([]);

    const [searchTerm, setSearchTerm] = useState('');
    const [filteredList, setFilteredList] = useState([]);
    const [searchOption, setSearchOption] = useState('title');
    const [currentPage, setCurrentPage] = useState(1);
    const [sort, setSort] = useState('latest');

    const itemsPerPage = 10;

    // 한 번에 보여줄 페이지 버튼 개수 설정 (추가) ***
    const pageGroupSize = 5; // 예시: 5개씩 페이지 버튼 표시

    const getListData = async () => {
        const lists = await axios.get('/list');
        setList(lists.data);
        // 검색을 하지 않더라도 filteredList에 전체 값이 들어가있도록함
        setFilteredList(lists.data); 
    }

    useEffect(() => {
        getListData();
        if(localStorage.getItem('loginData') === null){
            localStorage.setItem('loginData', JSON.stringify({us_id : 0}));
        }
        setUser(JSON.parse(localStorage.getItem('loginData')));
        onCountCo();
    },[]);

    useEffect(() => {
        // 출력 방식에 따라 filteredList 배열의 순서 변경해줌
        const sortedList = sortList(filteredList);
        setFilteredList(sortedList);
    }, [sort]); 

    const handleSearch = () => {
        if (searchTerm) {
            // 검색 조건에 따라 필터링 된 리스트를 filteredList에 담음
            const filtered = list.filter(item => {
                if (searchOption === 'title') {
                    return item.bo_title && item.bo_title.includes(searchTerm);
                } else if (searchOption === 'writer') {
                    return item.bo_us_nickname && item.bo_us_nickname.includes(searchTerm);
                } else if (searchOption === 'both') {
                    return (item.bo_title && item.bo_title.includes(searchTerm)) || 
                           (item.bo_us_nickname && item.bo_us_nickname.includes(searchTerm));
                }
                return false;
            });
            setFilteredList(filtered);
        } else {
            setFilteredList(list);
        }
        setCurrentPage(1);
        setSearchTerm('');
    };

    const totalPages = Math.ceil(filteredList.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const currentItems = filteredList.slice(startIndex, startIndex + itemsPerPage);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    // 페이징 조작 버튼
    const onPre = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const onNext = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    const sortList = (list) => {
        return [...list].sort((a, b) => {
            if (sort === 'latest') {
                return b.bo_id - a.bo_id;
            } else if (sort === 'views') {
                return b.bo_hits - a.bo_hits;
            }
            return 0;
        });
    };
    //=================================================================

    // 상세 페이지 이동, 조회수 조작
    const onMove2 = async (idc) => {
        try{
            const res = await axios.get(`/hits/${idc}`);
            window.location.href = `/detail/${idc}`;
        }catch(e){
            console.log(e);
        }
    }

    // 댓글 수 가져오기
    const [countComm, setCountComm] = useState({boId:0,countCo:0})

    const onCountCo = async () => {
        try{
            const res = await axios.get(`/countCo`);
            setCountComm(res.data);
        }catch(e){
            console.log(e);
        }
    }
    console.log(countComm)
    // ----------------------------------------------------------------------------------------------------

    // 페이지 그룹 계산 (추가) ***
    // startPage는 현재 페이지 그룹의 첫 번째 페이지 번호, endPage는 마지막 페이지 번호
    const startPage = Math.floor((currentPage - 1) / pageGroupSize) * pageGroupSize + 1;
    const endPage = Math.min(startPage + pageGroupSize - 1, totalPages);


    if(list.length >= 0){
        return (
            <div className='boardMain'>
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

                    <div className='searchBox'>
                        <select value={searchOption} onChange={(e) => setSearchOption(e.target.value)}>
                            <option value="title">제목</option>
                            <option value="writer">작성자</option>
                            <option value="both">제목+작성자</option>
                        </select>
                        <input type="text" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}/>

                        <button className='searchBtn' onClick={handleSearch}>검색</button>
                    </div>


                    <div className='sortBox'>
                        <div className='sort'>
                            <button onClick={() => setSort('latest')} className={sort === 'latest' ? 'selected' : ''}>{sort === 'latest' ? '✔최신' : '최신'}</button>
                            <button onClick={() => setSort('views')} className={sort === 'views' ? 'selected' : ''}>{sort === 'views' ? '✔조회수' : '조회수'}</button>
                        </div>
                    </div>

                    <div className='tableBox'>
                        <table>
                            <tr>
                                <th className='row1'>번호</th>
                                <th className='row2'>제목</th>
                                <th className='row3'>작성자</th>
                                <th className='row4'>작성일</th>
                                <th className='row5'>조회</th>
                            </tr>
                                {
                                    currentItems.map(b => (
                                        <tr key={b.bo_id} >
                                        <td>{b.bo_id}</td>
                                        <td onClick={() => onMove2(b.bo_id)} style={{fontWeight:"bold", cursor:"pointer"}}>{b.bo_title} <span style={{color:"red"}}>{b.bo_co_count === 0 ? null : `[${b.bo_co_count}]`}</span></td>
                                        <td>{b.bo_us_nickname}</td>
                                        <td>{new Date(b.bo_date).toLocaleDateString('en-US', { month: '2-digit', day: '2-digit' })}</td>   
                                        <td>{b.bo_hits}</td>
                                        </tr>
                                    ))
                                }
                        </table>
                        <button onClick={onMove} className='writeBtn'>글쓰기</button>
                    </div>

                    <div className='pagination'>
                        <button onClick={onPre} disabled={currentPage === 1}>이전</button>

                        {
                            // startPage부터 endPage까지 페이지 버튼 표시 (수정)
                            Array.from({ length: endPage - startPage + 1 }, (_, index) => (
                                <button key={startPage + index} onClick={() => handlePageChange(startPage + index)} disabled={currentPage === (startPage + index)}>
                                    {startPage + index}
                                </button>
                            ))
                        }

                        <button onClick={onNext} disabled={currentPage === totalPages}>다음</button>
                    </div>
                </div>    
            </div>
        );
    }
};

export default BoardList;