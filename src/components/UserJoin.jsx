import React, { useState } from 'react';
import axios from 'axios';
import '../css/userJoin.css';

const UserJoin = () => {

    // input 정보 가져오기
    const [inputs, setInputs] = useState({
        us_name : '',
        us_phone : '',
        us_email : '',
        us_nickname : '',
        us_userid : '',
        us_userpw : '', 
        confirmPassword: '' // 비밀번호 확인 추가
    });

    const {us_name, us_phone, us_email, us_nickname, us_userid, us_userpw, confirmPassword} = inputs;

    const [errors, setErrors] = useState({}); // 오류 메시지 관리

    const onChange = (e) => {
        const {name, value} = e.target;
        setInputs({
            ...inputs,
            [name] : value
        });
    };

    // 입력값 검증 함수
    const validateForm = () => {
        const newErrors = {};

        // 이름 검증
        if (us_name === '') {
            newErrors.us_name = '이름을 입력해주세요.';
        }

        // 핸드폰 번호 검증 (숫자와 "-" 기호만 허용)
        const phoneRegex = /^[0-9-]+$/;
        if (us_phone === '') {
            newErrors.us_phone = '핸드폰 번호를 입력해주세요.';
        } else if (!phoneRegex.test(us_phone)) {
            newErrors.us_phone = '유효한 핸드폰 번호를 입력해주세요. (숫자와 "-"만 허용)';
        }

        // 이메일 검증 (간단한 이메일 형식 검증)
        const emailRegex = /\S+@\S+\.\S+/;
        if (us_email === '') {
            newErrors.us_email = '이메일을 입력해주세요.';
        } else if (!emailRegex.test(us_email)) {
            newErrors.us_email = '유효한 이메일 주소를 입력해주세요.';
        }

        // 닉네임 검증
        if (us_nickname === '') {
            newErrors.us_nickname = '닉네임을 입력해주세요.';
        }

        // 아이디 검증 (5자 이상, 영문자와 숫자만 허용)
        const idRegex = /^[a-zA-Z0-9]+$/;
        if (us_userid === '') {
            newErrors.us_userid = '아이디를 입력해주세요.';
        } else if (us_userid.length < 5) {
            newErrors.us_userid = '아이디는 최소 5자 이상이어야 합니다.';
        } else if (!idRegex.test(us_userid)) {
            newErrors.us_userid = '아이디는 영문자와 숫자만 가능합니다.';
        }

        // 비밀번호 검증 (대소문자, 숫자, 특수문자 포함)
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[a-zA-Z\d!@#$%^&*]{8,16}$/;
        if (us_userpw === '') {
            newErrors.us_userpw = '비밀번호를 입력해주세요.';
        } else if (us_userpw.length < 8) {
            newErrors.us_userpw = '비밀번호는 최소 8자 이상이어야 합니다.';
        } else if (!passwordRegex.test(us_userpw)) {
            newErrors.us_userpw = '비밀번호는 대소문자, 숫자 및 특수문자를 포함해야 합니다.';
        }

        // 비밀번호 확인 검증 (비밀번호와 일치 여부)
        if (confirmPassword === '') {
            newErrors.confirmPassword = '비밀번호 확인을 입력해주세요.';
        } else if (us_userpw !== confirmPassword) {
            newErrors.confirmPassword = '비밀번호가 일치하지 않습니다.';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    // 회원가입
    const onJoin = async () => {
        // 입력값 검증 후 실패 시 리턴
        if (!validateForm()) {
            return;
        }

        // user 데이터 베이스에 동일한 아이디, 이메일, 닉네임이 있는지 검증
        try {
            const { us_userid, us_email, us_nickname } = inputs;
    
            const res = await axios.post('/check-duplicate', { us_userid, us_email, us_nickname });
    
            if (res.data.exists) {
                alert('중복된 아이디, 이메일 또는 닉네임이 존재합니다.');
                return;
            }
        } catch (err) {
            console.error(err);
            return;
        }
    
        if (window.confirm('등록하시겠습니까?')) {
            try {
                // confirmPassword를 제외한 데이터를 서버로 전송
                const { confirmPassword, ...userData } = inputs; // confirmPassword 제외
                const res = await axios.post('/join', userData); // 나머지 정보만 전송
                if (res.data === 'OK') {
                    window.location.href = '/login';
                }
            } catch (err) {
                console.log(err);
            }
        }
    };

    return (
        <div className='userJoin'>
            <h1>회원가입</h1>
            <input type="text" onChange={onChange} name="us_name" value={us_name} placeholder='이름' /> {errors.us_name && <p>{errors.us_name}</p>}
            <input type="text" onChange={onChange} name="us_phone" value={us_phone} placeholder='핸드폰번호' /> {errors.us_phone && <p>{errors.us_phone}</p>}
            <input type="text" onChange={onChange} name="us_email" value={us_email} placeholder='이메일' /> {errors.us_email && <p>{errors.us_email}</p>}
            <input type="text" onChange={onChange} name="us_userid" value={us_userid} placeholder='아이디' /> {errors.us_userid && <p>{errors.us_userid}</p>}
            <input type="text" onChange={onChange} name="us_nickname" value={us_nickname} placeholder='닉네임' /> {errors.us_nickname && <p>{errors.us_nickname}</p>}
            <input type="password" onChange={onChange} name="us_userpw" value={us_userpw} placeholder='비밀번호' /> {errors.us_userpw && <p>{errors.us_userpw}</p>}
            <input type="password" onChange={onChange} name="confirmPassword" value={confirmPassword} placeholder='비밀번호 확인' /> {errors.confirmPassword && <p>{errors.confirmPassword}</p>}
            <button onClick={onJoin}>회원가입</button>
        </div>
    );
    
};

export default UserJoin;
