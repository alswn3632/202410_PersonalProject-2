import React from 'react';
import '../css/comment.css';

const Comment = ({co1, comm2, onRemove2, onRecomm}) => {

    const comm3 = comm2.filter(c => c.co_re_id === co1.co_id);

    // ----------------------------------------------------------------------------------------------------
    return (
        <div className='comment'>
            <div className='co1'>
                <div className='top'>
                    <p>{co1.co_us_nickname} <span>{new Date(co1.co_date).toLocaleDateString('ko-KR', { year: 'numeric', month: '2-digit', day: '2-digit' })}</span></p>
                    <button onClick={()=>onRecomm(co1.co_id)} className='commBtn'>답글</button>
                    <button onClick={()=>onRemove2(co1.co_id,co1.co_us_id)} className='commBtn'>삭제</button>
                </div>
                <p>{co1.co_content}</p>
            </div>
                {
                    comm3.map(co2 => (
                        <div className='co2' key={co2.co_id}>
                            <div className='top'>
                                <p>{co2.co_us_nickname} <span>{new Date(co1.co_date).toLocaleDateString('ko-KR', { year: 'numeric', month: '2-digit', day: '2-digit' })}</span></p>
                                <button onClick={()=>onRemove2(co2.co_id,co2.co_us_id)} className='commBtn'>삭제</button>
                            </div>
                            <p>{co2.co_content}</p>
                        </div>
                    ))
                }        
        </div>
    );
};

export default Comment;