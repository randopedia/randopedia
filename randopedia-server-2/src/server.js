// @flow

import express from 'express'
import routes from './routes/index-routes'
import {getConnection} from './utils/db';
import {logService} from './service/log-service';

const log = logService.getLogger()

getConnection()

const app = express()

app.use(routes)

app.listen(8080, () => {
  log.info('Server started!') // eslint-disable-line no-console
})



export default app
