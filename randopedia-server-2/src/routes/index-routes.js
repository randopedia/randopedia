// @flow

import {Router} from 'express'
import toursRoutes from './tour-routes'

const router = Router()

router.use('/tours', toursRoutes)

export default router
