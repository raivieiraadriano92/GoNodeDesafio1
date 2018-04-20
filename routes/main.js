const express = require('express');
const moment = require('moment');

const router = express.Router();

router.get('/', (req, res) => {
  res.render('main');
});

router.post('/check', (req, res) => {
  const { name, birthDate } = req.body;

  const age = moment().diff(moment(birthDate, 'DD/MM/YYYY'), 'years');

  const page = age >= 18 ? 'major' : 'minor';

  res.redirect(`/${page}?name=${name}`);
});

const checkName = (req, res, next) => {
  if (req.query.name) {
    return next();
  }

  res.redirect('/');
};

router.get('/major', checkName, (req, res) => {
  const { name } = req.query;

  res.render('major', { name });
});

router.get('/minor', checkName, (req, res) => {
  const { name } = req.query;

  res.render('minor', { name });
});

module.exports = router;
