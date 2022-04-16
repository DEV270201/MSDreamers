const express = require('express');
const { NotFoundError, ClientError, ServerError } = require('./utils/AppErrors');
const app = express();
const cors = require('cors');
const mongoSanitize = require('express-mongo-sanitize');
const csrf = require('csurf');
// const csrfProtection = require("./auth/Csrf");
var cookieParser = require('cookie-parser');

if (process.env.NODE_ENV === 'development') {
  console.log('In the development mode');
}

if (process.env.NODE_ENV === 'production') {
  console.log('in the production stage');
}

app.use(
  cors({
    origin: ['http://localhost:3000'],
    credentials: true,
  })
);

app.use(cookieParser());


var csrfProtection = csrf({cookie:true});

app.use(express.json({ extended: false }));

app.use(express.urlencoded({ extended: false }));

// app.use((_req, res, next) => {
//   res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
//   res.header(
//     'Access-Control-Allow-Headers',
//     'Origin, X-Requested-With, Content-Type, Accept'
//   );
//   res.header('Access-Control-Allow-Credentials', 'true');
//   next();
// });
app.use(csrfProtection);

app.use((req,res,next)=>{
  res.cookie('XSRF-TOKEN',req.csrfToken());
  next();
});

// app.get('/', csrfProtection,(req, res) => {
//   // res.send('API running!');
//   // res.cookie('XSRF-TOKEN', req.csrfToken());
//   // console.log('XSRF-TOKEN', req.csrfToken());
//   // res.json({});
//   //   next();
  // res.render('send', { csrfToken: req.csrfToken() })
// });


// Used for sanitizing the input preventing NoSQL injection
app.use(mongoSanitize());

app.use('/users', require('./routes/UserRouter'));
app.use('/quotes', require('./routes/QuotesRouter'));
app.use('/words', require('./routes/WordsRouter'));
app.use('/resources', require('./routes/GoogleDriveRouter'));
app.use('/forum', require('./routes/ForumRouter'));
app.use('/test', require('./routes/TestRouter'));

const handleDuplicateError = () => {
  const msg = `User has been registered already. Please verify your email!`;
  return new ClientError(msg);
};

const handleInputError = ()=>{
  const msg = "Please fill the required fields!";
  return new ClientError(msg);
}

const handleCSRFError = ()=>{
  const msg = "Sorry, something went wrong!";
  return new ServerError(msg);
}

app.all('*', (_req, _res, next) => {
  return next(new NotFoundError('sorry , this route does not exists!'));
});

app.use((err, req, res, _next) => {
  console.log('global error middleware');
  let error = { ...err };
  error.statusCode = err.statusCode || 500;
  error.message = err.message || 'Server Error';
  console.log('Error codeee: ', error);
  if (err.code === 11000) {
    console.log('ENTERING THE IF STATEMENT');
    error = handleDuplicateError();
  }
  if(err.code === 'EBADCSRFTOKEN'){
    error = handleCSRFError();
  }
  if(err.message === "Cannot read property '0' of null"){
    error = handleInputError();
  }
  res.status(error.statusCode).json({
    status: 'Failed',
    message: error.message,
    name : error.name,
  });
});

module.exports = app;
