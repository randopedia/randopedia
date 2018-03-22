import express from 'express'
import routes from './routes/index'

const app = express()

app.use(routes)

app.listen(8080, () => {
  console.log('Server started!') // eslint-disable-line no-console
})



export default app
