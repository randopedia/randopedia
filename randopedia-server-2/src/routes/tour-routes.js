// @flow

import {Router} from 'express'
import {findAllTours, findTour, findToursByQuery} from '../repository/tour-repository';
import {logService} from '../service/log-service';

const log = logService.getLogger()

const router = Router()

//TODO move try catch blocks to middleware

router.get('/', async (req, res) => {
  const query = req.query["query"];

  try {
    if(query) {
      const tours = await findToursByQuery(query)
      res.send(tours)
    } else {
      const tours = await findAllTours()
      res.send(tours)
    }
  } catch (e) {
    log.warn(e)
    res.send('error')
  }
})

router.get('/:id?', async (req, res) => {
  let tourId = req.params.id;
  try {
    let tour = await findTour(tourId)
    res.send(tour)
  } catch (e) {
    log.warn(e)
    res.send('error')
  }
})

export default router
