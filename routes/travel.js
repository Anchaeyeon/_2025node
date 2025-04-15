const express = require('express');
const path = require('path');
const router = express.Router();
const db = require('../database/database');

router.get('/add', (req, res) => {
  res.render('addTravel');
});

router.get('/', (req, res) => {
  const _query = 'SELECT id, name FROM travelList';
  db.query(_query, (err, results) => {
    if (err) {
      console.errer('데이터베이스 쿼리 실패', err);
      res.status(500).send('Internal Server Error');
      return;
    }
    const travelList = results;
    res.render('travel', { travelList });
  });
});

router.get('/:id', (req, res) => {
  const travelId = req.params.id;
  const query = 'SELECT * FROM travellist WHERE id = ?';
  db.query(query, [travelId], (err, results) => {
    if (err) {
      console.error('데이터베이스 쿼리 실패 : ', err);
      res.status(500).send('Internal Server Error');
      return;
    }
    if (results.length == 0) {
      res.status(404).send('여행지를 찾을 수 없습니다.');
      return;
    }
    const travel = results[0];
    res.render('travelDetail', { travel });
  });
});

router.post('/', (req, res) => {
  const { name } = req.body;
  const _query = 'INSERT INTO travellist (name) VALUE (?)';
  db.query(_query, [name], (err, results) => {
    if (err) {
      console.error('데이터베이스 쿼리 실패 : ', err);
      res.status(500).send('Insternal Server Error');
      return;
    }
    res.redirect('/travel');
  });
});

router.put('/:id', (req, res) => {
  const travelId = req.params.id;
  const { name } = req.body;
  const _query = 'UPDATE travellist SET name=? WHERE id=?';
  db.query(_query, [name, travelId], (err, results) => {
    if (err) {
      console.errer('DB 쿼리 실패: ', err);
      res.status(500).send('DB 서버 에러');
      return;
    }
    res.render('updateSuccess');
  });
});

router.get('/:id/edit', (req, res) => {
  const travelId = req.params.id;
  const query = 'SELECT * FROM travellist WHERE id = ?';
  db.query(query, [travelId], (err, results) => {
    if (err) {
      console.error('데이터베이스 쿼리 실패 : ', err);
      res.status(500).send('Internal Server Error');
      return;
    }
    if (results.length == 0) {
      res.status(404).send('여행지를 찾을 수 없습니다.');
      return;
    }
    const travel = results[0];
    res.render('editTravel', { travel });
  });
});

router.delete('/:id', (req, res) => {
  const travelId = req.params.id;
  const _query = 'DELETE FROM travellist WHERE id=?';
  db.query(_query, [travelId], (err, results) => {
    if (err) {
      console.errer('DB 쿼리 실패: ', err);
      res.status(500).send('DB 서버 에러');
      return;
    }
    res.render('deleteSuccess');
  });
});

module.exports = router;