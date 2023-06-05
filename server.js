const express = require('express');
const cookieParser = require('cookie-parser');
const http = require('http');
const { socket } = require('./router/socket');
require('dotenv').config();
const port=process.env.PORT;

const pages = require('./router/pages.js');
const imgAPI = require('./router/api/image');
const userAPI = require('./router/api/user');
const roomAPI = require('./router/api/room');
const msgAPI = require('./router/api/message');
const s3API = require('./router/api/s3');
const live = require('./router/liveStream');
const room = require('./router/roomStream');

const app = express();
const server = http.createServer(app);

app.set('view engine', 'ejs');
app.set('views', './views');

app.use(express.static('./public'));
app.use(cookieParser());

// RESTful API
app.use('/api', imgAPI);
app.use('/api', userAPI);
app.use('/api', roomAPI);
app.use('/api', msgAPI);
app.use('/api', s3API);
app.use('/live', live);
app.use('/room', room);
// RESTful API <END>

// render pages
app.get('/', pages.root);
app.get('/home', pages.home);
app.get('/description', pages.description);
app.get('/profile', pages.profile);
// render pages <END>

socket(server);

server.listen(port, () => {
  console.log(`listening on *:${port}`);
});
