# 😊안녕하세요!<br>  React와 MySQL을 이용하여 게시판을 만들어보았습니다!!
## 🔧 Stack
![Semantic UI React](https://img.shields.io/badge/Semantic%20UI%20React-%2335BDB2.svg?style=for-the-badge&logo=SemanticUIReact&logoColor=white)
![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)
![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white)
![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white)
![MySQL](https://img.shields.io/badge/mysql-4479A1.svg?style=for-the-badge&logo=mysql&logoColor=white)

## 🖥️ Main Image
![20241006_230907_1](https://github.com/user-attachments/assets/e8cae20e-0130-4d45-8f4b-18b486117134)

## 📖 Description  
- 이 프로젝트는 React와 MySQL을 활용하여 구현한 게시판입니다. 
- 사용자가 글을 작성하고, 수정하며, 삭제할 수 있는 기본적인 기능을 제공합니다. 
- 게시판 목록에서는 작성된 글을 확인할 수 있으며, 페이징 및 검색 기능을 통해 원하는 게시글을 쉽게 찾을 수 있습니다.
- 각 글에는 댓글을 추가할 수 있는 기능이 있어 사용자 간의 소통을 지원합니다. <br>또한 스레드 댓글 기능을 통해 댓글에 대한 추가적인 의견을 쉽게 남길 수 있습니다. 
- 모든 기능은 사용자 검증 과정을 통해 안전하게 관리됩니다.

## ⭐ Main Feature
### 회원가입/로그인 구현
![20241006_230907_4](https://github.com/user-attachments/assets/fbcba2eb-a927-4a33-b0ae-c4c52ef194e9)
 - 기본적인 회원가입, 로그인 기능을 구현했습니다.
- 회원가입은 사용자가 입력하는 정보를 검증(ex. 비밀번호는 최소 8자 이상, 숫자 및 특수 문자를 포함해야 합니다.)하여 통과되면 다음 단계로 넘어갑니다.<br>DB에 동일한 아이디나 닉네임이 있는지 검증 후 저장되도록 만들었습니다.
- 로그인은 로컬스토리지를 이용하였습니다. 사용자가 아이디와 비밀번호를 입력하면 DB에 두 정보가 같이 있는 튜플이 있는지 확인 후 승인합니다.<br>로그인에 성공한다면 로컬스토리지에 사용자의 고유한 id와 아이디, 닉네임 등이 저장되어 로그인되었음을 나타냅니다.
 
### 댓글 기능 구현
![20241006_230907_2](https://github.com/user-attachments/assets/d81c704d-c50f-4c59-99a2-9d76de9e5d04)
- 게시글 작성 뿐만 아니라 댓글을 작성할 수 있습니다. 사용자와 게시글의 고유한 id를 가지고 댓글 테이블에 정보를 저장합니다.
- 또한 스레드 댓글을 구현하여 댓글에 대해 답문이 가능하도록 제작했습니다.

### 사용자 권한 관리
![20241006_230907_3](https://github.com/user-attachments/assets/0c6ca0ec-8a63-42c5-88ee-d9dc4880556a)
- 기본적으로 로그인을 하지 않으면 글을 작성하거나 수정, 삭제할 수 없도록 하였습니다.
- 로컬스토리지를 활용하여 현재 로그인된 사용자의 정보를 저장하고, 이를 통해 작성자와의 비교를 통해 권한을 확인합니다.

## 📂 Project Structure
📦src<br>
 ┣ 📂components<br>
 ┃ ┣ 📜BoardCreate.jsx<br>
 ┃ ┣ 📜BoardDetail.jsx<br>
 ┃ ┣ 📜BoardEdit.jsx<br>
 ┃ ┣ 📜BoardList.jsx<br>
 ┃ ┣ 📜BoardMain.jsx<br>
 ┃ ┣ 📜Comment.jsx<br>
 ┃ ┣ 📜UserJoin.jsx<br>
 ┃ ┗ 📜UserLogin.jsx<br>
 ┣ 📂css<br>
 ┃ ┣ 📜boardCreate.css<br>
 ┃ ┣ 📜boardDetail.css<br>
 ┃ ┣ 📜boardEdit.css<br>
 ┃ ┣ 📜boardList.css<br>
 ┃ ┣ 📜comment.css<br>
 ┃ ┣ 📜userJoin.css<br>
 ┃ ┗ 📜userLogin.css<br>
 ┣ 📂font<br>
 ┃ ┗ 📜NanumSquareRoundR.ttf<br>
 ┣ 📂server<br>
 ┃ ┗ 📜server.js<br>
 ...이하 생략
   
## ❤️ Thank you!
긴 글 읽어주셔서 감사합니다 :) 이번에는 리액트와 MySQL을 연계하여 게시판을 만들어보았는데요. 평소 새로고침을 누르면 사라지는 일시적인 화면 프로젝트를 하다가 이렇게 저장이 되는 프로젝트를 진행하게 되어서 너무 즐거웠습니다. 또 저번 팀 프로젝트에서 제대로 활용하지 못했던 로컬스토리지를 이번 기회에 응용하여 로그인을 구현했다는 점이 만족스럽습니다. 저번 프로젝트에서 게시판, 로그인 관련 부분은 제 담당이 아니었어서 얕은 지식인 상태였는데 이번 개인 프로젝트를 진행하면서 두 주제에 완벽히 이해하게 되었습니다. 스스로 발전할 수 있는 기회라 여기고 이번 개인 프로젝트를 열심히 만들어보았습니다. 감사합니다!

## 📌 Link  
더 자세한 설명은 제 개인 블로그에서 이어집니다. <br>
https://blog.naver.com/momonocha/223609338034

