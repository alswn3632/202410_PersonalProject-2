// 설치한 라이브러리 변수로 받아오기
const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const cors = require('cors');
const { useParams } = require('react-router-dom');

//express 사용하기 위한 app 생성
const app = express();

//express 사용할 서버포트 설정
// const PORT = process.env.PORT || 5000;
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());

//DB 접속
const db = mysql.createConnection({
    host : 'localhost',
    user: 'react',
    password: 'mysql',
    port:'3306',
    database:'db_board'
});

// express 접속
app.listen(PORT, ()=>{
    console.log(`server connecting on : http://localhost:${PORT}`);
});
// 처음에 열리는 화면이 root 경로, 없으면 안됨!

//db 연결
db.connect((err)=>{
    if(!err){
        console.log("seccuss");

    }else{
        console.log("fail");
    }
});

// 기본 화면 설정
app.get('/',(req, res)=>{
    res.send("React Server Connect Success!!")
})

// 목록 페이지
app.get('/list', (req, res)=>{
    console.log('/list');
    const sql = 'select b.*,count(c.co_id) as bo_co_count from board b left join comment c on b.bo_id = c.co_bo_id group by b.bo_id order by bo_id desc';
    db.query(sql, (err, data)=>{
        if(!err){
            res.send(data);
        }else{
            console.log(err);
            res.send('전송오류');
        }
    })
});

// app.get('/list2', (req, res)=>{
//     console.log('/list2');
//     const sql = 'select * from board order by bo_id desc';
//     db.query(sql, (err, data)=>{
//         if(!err){
//             res.send(data);
//         }else{
//             console.log(err);
//             res.send('전송오류');
//         }
//     })
// });


// 상세 페이지
app.get('/detail/:id', (req, res)=>{
    const id = req.params.id
    const sql = `select * from board where bo_id = ${id}`;
    db.query(sql, (err, data)=>{
        if(!err){
            res.send(data);
        }else{
            console.log(err);
            res.send('전송오류');
        }
    })
})

// 글 작성
app.post('/insert', (req, res)=>{
    const {bo_title, bo_content, bo_us_id, bo_us_nickname} = req.body;
    const sql = `insert into board (bo_title,bo_content,bo_us_id,bo_us_nickname) value (?,?,?,?)`;
    db.query(sql, [bo_title, bo_content, bo_us_id, bo_us_nickname], (err,data)=>{
        if(!err){
            res.send("OK");
        }else{
            console.log(err);
            res.send('전송오류');
        }
    })
})

// 글 수정
app.post('/update/:id', (req, res)=>{
    const id = req.params.id
    const {title, content} = req.body;
    const sql = `update board set bo_title = ?, bo_content = ? where bo_id = ?`;
    db.query(sql, [title,content,id], (err,data)=>{
        if(!err){
            res.send("OK");
        }else{
            console.log(sql)
            console.log(err);
            res.send('전송오류');
        }
    })
})

// 글 삭제 - 연관된 comment 테이블 데이터 먼저 삭제
app.get('/remove1/:id', (req, res)=>{
    const id = req.params.id
    const sql = `delete from comment where co_bo_id = ${id};`;
    console.log(id)
    db.query(sql, (err, data)=>{
        if(!err){
            res.send("OK");
        }else{
            console.log(err);
            res.send('전송오류');
        }
    })
})

// 글 삭제 - comment 데이터 삭제 후 진행
app.get('/remove2/:id', (req, res)=>{
    const id = req.params.id
    const sql = `delete from board where bo_id = ${id};`;
    console.log(id)
    db.query(sql, (err, data)=>{
        if(!err){
            res.send("OK");
        }else{
            console.log(err);
            res.send('전송오류');
        }
    })
})

// 댓글 가져오기
app.get('/comment/:id', (req, res)=>{
    const id = req.params.id
    const sql = `select * from comment where co_bo_id = ${id}`;
    db.query(sql, (err, data)=>{
        if(!err){
            res.send(data);
        }else{
            console.log(err);
            res.send('전송오류');
        }
    })
})

// 댓글 저장하기
app.post('/insertCo1', (req, res)=>{
    const {co_content, co_us_id, co_us_nickname, co_bo_id, co_recomment, co_re_id} = req.body
    const sql = `insert into comment(co_content, co_us_id, co_us_nickname, co_bo_id, co_recomment, co_re_id) values(?,?,?,?,?,?)`;
    db.query(sql, [co_content, co_us_id, co_us_nickname, co_bo_id, co_recomment, co_re_id], (err,data)=>{
        if(!err){
            res.send("OK");
        }else{
            console.log(err);
            res.send('전송오류');
        }
    })
})

// 댓글 삭제
app.get('/removeCo1/:id', (req, res)=>{
    const id = req.params.id
    const sql = `delete from comment where co_re_id = ${id}`;
    db.query(sql, (err, data)=>{
        if(!err){
            res.send("OK");
        }else{
            console.log(err);
            res.send('전송오류');
        }
    })
})

// 댓글 삭제 
app.get('/removeCo2/:id', (req, res)=>{
    const id = req.params.id
    const sql = `delete from comment where co_id = ${id}`;
    db.query(sql, (err, data)=>{
        if(!err){
            res.send("OK");
        }else{
            console.log(err);
            res.send('전송오류');
        }
    })
})

// 로그인
app.post('/login', (req, res)=>{
    const {us_userid, us_userpw} = req.body;
    const sql = `select * from user where us_userid = '${us_userid}' and us_userpw = '${us_userpw}'`;
    db.query(sql, (err,data)=>{
        if(!err){
            res.send(data);
        }else{
            console.log(sql);
            console.log(err);
            res.send('전송오류');
        }
    })
})

// 회원가입
app.post('/join', (req, res)=>{
    const {us_name, us_phone, us_email, us_nickname, us_userid, us_userpw} = req.body;
    const sql = `insert into user (us_name, us_phone, us_email, us_nickname, us_userid, us_userpw) value (?,?,?,?,?,?)`;
    db.query(sql, [us_name, us_phone, us_email, us_nickname, us_userid, us_userpw], (err,data)=>{
        if(!err){
            res.send("OK");
        }else{
            console.log(err);
            res.send('전송오류');
        }
    })
})

// 회원가입 - 중복검사
app.post('/check-duplicate', (req, res) => {
    const { us_userid, us_email, us_nickname } = req.body;

    const sql = `select count(*) as count from user where us_userid = ? OR us_email = ? OR us_nickname = ?`;
    db.query(sql, [us_userid, us_email, us_nickname], (err, data) => {
        if (err) {
            console.log(err);
            return res.status(500).send('서버 오류'); 
        }
        const count = data[0].count; 
        res.json({ exists: count > 0 }); 
    });
});

// 조회수
app.get('/hits/:id', (req, res)=>{
    const id = req.params.id
    const sql = `update board set bo_hits = bo_hits+1 where bo_id = ${id}`;
    db.query(sql, (err, data)=>{
        if(!err){
            res.send(data);
        }else{
            console.log(err);
            res.send('전송오류');
        }
    })
})

// 댓글수
app.get('/countCo', (req, res)=>{
    const id = req.params.id
    const sql = `select b.bo_id as boId, count(c.co_id) as countCo from comment c join board b on c.co_bo_id = b.bo_id group by b.bo_id;`;
    db.query(sql, (err, data)=>{
        if(!err){
            res.send(data);
        }else{
            console.log(err);
            res.send('전송오류');
        }
    })
})
