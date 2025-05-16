const Travel = require('../models/Travel');

const travelController = {
  // 여행지 목록 가져오기
  getTravelList: async (req, res) => {
    try {
      const travelList = await Travel.findAll({ attributes: ['id', 'name'] });
      res.render('travel', { travelList });
    } catch (err) {
      console.errer('데이터베이스 쿼리 실패', err);
      res.status(500).send('Internal Server Error');
    }
  },

  // 여행지 추가 폼 렌더링
  getAddTravelForm: (req, res) => {
    res.render('addTravel');
  },

  // 게시글을 추가
  addTravel: async (req, res) => {
    const { name } = req.body;
    try {
      await Travel.create({ name });
      res.redirect('/travel');
    } catch (err) {
      console.error('데이터베이스 쿼리 실패 : ', err);
      res.status(500).send('Insternal Server Error');
    }
  },

  // 해당 게시글 내용 읽기
  getTravelDetail: async (req, res) => {
    const travelId = req.params.id;
    try {
      const travel = await Travel.findByPk(travelId);
      if (!travel) {
        res.status(404).send('여행지를 찾을 수 없습니다.');
        return;
      }
      res.render('travelDetail', { travel });
    } catch (err) {
      console.error('데이터베이스 쿼리 실패 : ', err);
      res.status(500).send('Internal Server Error');
    }
  },

  // 게시글 수정 페이지로 이동
  getEditTravelForm: async (req, res) => {
    const travelId = req.params.id;
    try {
      const travel = await Travel.findByPk(travelId);
      if (!travel) {
        res.status(404).send('여행지를 찾을 수 없습니다.');
        return;
      }
      res.render('editTravel', { travel });
    } catch (err) {
      console.error('데이터베이스 쿼리 실패 : ', err);
      res.status(500).send('Internal Server Error');
    }
  },

  // 게시글 수정
  updateTravel: async (req, res) => {
    const travelId = req.params.id;
    const { name } = req.body;
    try {
      // 아이디가 있는지 확인 (유효성 검사)
      const travel = await Travel.findByPk(travelId);
      if (!travel) {
        res.status(404).send('여행지를 찾을 수 없습니다.');
        return;
      }
      await travel.update({ name });
      res.render('updateSuccess');
    } catch (err) {
      console.errer('DB 쿼리 실패: ', err);
      res.status(500).send('DB 서버 에러');
    }
  },

  // 게시글 삭제
  deleteTravel: async (req, res) => {
    const travelId = req.params.id;
    try {
      // 아이디가 있는지 확인 (유효성 검사)
      const travel = await Travel.findByPk(travelId);
      if (!travel) {
        res.status(404).send('여행지를 찾을 수 없습니다.');
        return;
      }
      await travel.destroy();
      res.render('deleteSuccess');
    } catch (err) {
      console.errer('DB 쿼리 실패: ', err);
      res.status(500).send('DB 서버 에러');
    }
  }
}

module.exports = travelController;