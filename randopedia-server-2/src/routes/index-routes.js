// @flow

import {Router} from 'express'
import toursRoutes from './tour-routes'
import migrationsRouts from './migrations-routes'

const router = Router()

router.use('/tours', toursRoutes)

router.use('/migrations', migrationsRouts)
export default router
