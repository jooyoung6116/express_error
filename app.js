const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan'); // morgan 미들웨어 -> 모든 요청에 대해서 로그가 출력
const app = express();
const path = require('path');

dotenv.config(); // .env -> porcess.env 하위 속성

// app.use(morgan('dev')); // dev, combined, common, short, tiny
// app.use(morgan('combined')); // dev, combined, common, short, tiny

app.set('PORT', process.env.PORT || 3000);

app.use("/", express.static(path.join(__dirname, 'upload')));

app.use((req,res, next) => {
	console.log("공통 라우터 입니다");
	next();
});


app.get("/",(req,res,next) =>{
	/**
		1. error 생성자에서 객체를 생성하여 throw
		2. next 함수에 에러 객체를 담아서 호출 -> 에러 처리 라우터로 전달
	*/
	
	const err = new Error("그냥 만들어본 에러!");
	//throw err; // 에러처리 라우터 이동
	//next(err); // error 객체가 인수로 있으면 에러처리 미들웨어 이동
	
	return res.send("메인페이지");
});


app.get("/join", (req,res) => {
	return res.send("join 페이지 입니다.");
});


app.get("/login", (req,res) => {
	return res.send("login 페이지 입니다.");
});


// 없는 페이지 라우터

app.use((req, res, next) => {
	// return res.status(404).send(`${req.url}은 없는 페이지 입니다.`);
	const err = new Error(`${req.url}은 없는 페이지 입니다`);
	err.status = 404;
	next(err); // 오류처리 미들웨어 전달
});


// 오류처리 라우터

app.use((err, req, res, next) => {
	// console.error(err);
	console.log("오류처리 라우터", err.addText);
	return res.status(err.status || 500).send(err.message);
});


app.listen(app.get("PORT"), () =>{
	console.log(app.get("PORT"), "에서 서버 대기중입니다.");
});