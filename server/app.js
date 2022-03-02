const express = require('express');
const app = express();
const session = require('express-session');
const fs = require('fs');

app.use(session ({
  secret: 'secret code',
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: false,
    maxAge: 1000 * 60 * 60 // 쿠키 유효시간 1시간
  }
}));

// 상세페이지에 데이터를 json형식으로 불러올수 있게 해준다
app.use(express.json ({
  limit: '50mb'
}));

// server 실행
const server = app.listen(3000, () => {
  console.log('Server started. port 3000.')
});


let sql = require('./sql.js');

fs.watchFile(__dirname + '/sql.js', (curr, prev) => {
  console.log('sql 변경시 재시작 없이 반영되도록 함.');
  delete require.cache[require.resolve('./sql.js')];
  sql = require('./sql.js');
});

// db 정보
const db = {
  database: "dev_class",
  connectionLimit: 10,
  host: "192.168.0.32",
  user: "root",
  password: "tnqls197",
  dateStrings: "date" // db에 있는 날짜를 그대로 가지고 올때
};

const dbPool = require('mysql').createPool(db);

app.post('/api/login', async (request, res) => {
  request.session['email'] = 'qkrtnqls197@gmail.com';
  res.send('ok')
});

app.post('/api/logout', async (request, res) => {
  request.session.destroy();
  res.send('ok')
});

// 로그인을 해야만 들어갈수 있는 페이지
app.post('/apirole/:alias', async(request, res) => {
  if(!request.session.email) {
    return res.status(401).send({ error: '로그인을 하지 않았습니다.' });
  }
  try {
    res.send(await req.db(request.params.alias))
  } catch(err) {
    res.status(500).send({
      error: err
    });
  }
});

// 로그인 안해도 들어갈수 있는 페이지
app.post('/api/:alias', async(request, res) => {
  try {
    res.send(await req.db(request.params.alias, request.body.param))
  } catch(err) {
    res.status(500).send({
      error: err
    });
  }
});


// db 쿼리 호출 함수
const req = {
  async db(alias, param = [], where = '') {
    return new Promise((resolve, reject) => dbPool.query(sql[alias].query + where, param, (error, rows) => {
      if (error) {
        if (error.code != 'ER_DUP_ENTRY')
          console.log(error);
        resolve({
          error
        });
      } else resolve(rows);
    }));
  }
};