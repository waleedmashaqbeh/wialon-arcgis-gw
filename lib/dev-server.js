import http from 'http';
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import options from './../options';
import routers from './server/routers';
import wialonToArcgis from './server/wialon-to-arcgis';

const app = express();
app.use(bodyParser.json({limit: '1024mb'}));
app.set('json spaces', 2);

app.use(cors({origin: true}));
routers(app);
wialonToArcgis.start((err) => {
  if (err) {
    console.log('(wialonToArcgis.start) err: ', err.message);
  } else {
    console.log('wialonToArcgis started.');
  }
});

const httpServer = http.Server(app);

httpServer.listen(options.W_PORT);
console.log('App server listening on port ', options.W_PORT);
