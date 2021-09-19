const express = require('express');
const router = express.Router();
const {
  fetchSingleTest,
  fetchAllTests,
} = require('../controller/TestController');
const auth = require('../auth/Auth');

//for getting the tests
router.get('/', auth, async (req, res, next) => {
  try {
    let tests = await fetchAllTests();

    res.status(200).json({
      status: 'success',
      tests,
    });
  } catch (err) {
    console.log('errrrr : ', err);
    return next(err);
  }
});

//for getting the specific test questions
router.get('/:test_id', auth, async (req, res, next) => {
  try {
    let test_id = req.params.test_id;
    let test = await fetchSingleTest(test_id);

    res.status(200).json({
      status: 'success',
      test,
    });
  } catch (err) {
    console.log('errrrr : ', err);
    return next(err);
  }
});

module.exports = router;
