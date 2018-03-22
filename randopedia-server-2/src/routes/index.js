import {Router} from 'express'
import toursRoutes from './tours'

const router = Router

router.use('/tours', toursRoutes)

export default router
