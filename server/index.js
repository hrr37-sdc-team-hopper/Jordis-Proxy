require('newrelic');
require('dotenv').config();

const express = require('express');
const morgan = require('morgan');
const proxy = require('http-proxy-middleware');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(morgan('dev'));

const staticPath = `${__dirname}/../public`;
app.use('/booksInfo/:id', express.static(staticPath));

app.use('/books/:id', proxy({ target: 'http://ec2-52-53-235-189.us-west-1.compute.amazonaws.com:3001', changeOrigin: true }));
// app.use('/books', proxy({ target: 'http://localhost:3001', changeOrigin: true }));

// hannah-service
// app.use(
//   '/books/:id/reviews',
//   proxy({ target: 'http://localhost:3003', changeOrigin: true }),
// );

// kaz-service
// app.use(
//   '/books/:id/info',
//   proxy({ target: 'http://localhost:3002', changeOrigin: true }),
// );

// ginger-service
// app.use(
//   '/books/:id/authors',
//   proxy({ target: 'http://localhost:3000', changeOrigin: true }),
// );


const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});


// const staticPath = `${__dirname}/../public`;
// app.use('/booksInfo/:id', express.static(staticPath));

// app.use('/books/:id', proxy({ target: 'http://localhost:3001', changeOrigin: true }));
// app.use('/books', proxy({ target: 'http://localhost:3001', changeOrigin: true }));

// hannah-service
// app.use(
//   '/books/:id/reviews',
//   proxy({ target: 'http://localhost:3003', changeOrigin: true }),
// );

// kaz-service
// app.use(
//   '/books/:id/info',
//   proxy({ target: 'http://localhost:3002', changeOrigin: true }),
// );

// ginger-service
// app.use(
//   '/books/:id/authors',
//   proxy({ target: 'http://localhost:3000', changeOrigin: true }),
// );