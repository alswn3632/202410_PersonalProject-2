import React from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import BoardList from './BoardList';
import BoardDetail from './BoardDetail';
import BoardCreate from './BoardCreate';
import BoardEdit from './BoardEdit';
import UserLogin from './UserLogin';
import UserJoin from './UserJoin';

const BoardMain = () => {
    return (
        <div className='boardMain' style={{marginTop: "30px"}}>
            <BrowserRouter>
                <Routes>
                    <Route path='/' element={<BoardList/>}/>
                    <Route path='/list' element={<BoardList/>}/>
                    <Route path='/detail/:id' element={<BoardDetail/>}/>
                    <Route path='/create' element={<BoardCreate/>}/>
                    <Route path='/edit/:id' element={<BoardEdit/>}/>
                    <Route path='/login' element={<UserLogin/>}/>
                    <Route path='/join' element={<UserJoin/>}/>
                </Routes>
            </BrowserRouter>
        </div>
    );
};

export default BoardMain;