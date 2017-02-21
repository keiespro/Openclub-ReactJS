import express from 'express';
import bodyParser from 'body-parser';
import path from 'path';
import methodOverride from 'method-override';
import gzip from 'compression';
import helmet from 'helmet';

export default (app) => {
  app.set('port', (process.env.PORT || 3000));

  if (process.env.NODE_ENV === 'production') {
    app.use(gzip());
    // Secure your Express apps by setting various HTTP headers. Documentation: https://github.com/helmetjs/helmet
    app.use(helmet());
  }

  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
  app.use(methodOverride());
console.log('Public', path.join(process.cwd(), 'dist/public'));
  app.use(express.static(path.join(process.cwd(), 'dist/public')));

  app.set('trust proxy', 'loopback');

  console.log('--------------------------');
  console.log('===> 😊  Starting Server . . .');
  console.log(`===>  Environment: ${process.env.NODE_ENV}`);
  console.log(`===>  Listening on port: ${app.get('port')}`);
  console.log('--------------------------');
};
