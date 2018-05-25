// @flow

import {Router} from 'express'
import {findAllTours, findTour, createTourBucket} from '../repository/tour-repository';
import {logService} from '../service/log-service';

const log = logService.getLogger()

const router = Router()

router.get('/old-language-to-new', async (req, res) => {
    //let tour = await findTour('5372fbf2e4b02a17ad6e8ef6')

    let tours = await findAllTours()

    for(let tour of tours) {
      let tourBucket = Object.assign({})
      tourBucket.no = Object.assign({}, tour)
      tourBucket.eng = Object.assign({}, tour)

      if(tour.itinerary) {
        tourBucket.no.itinerary = tour.itinerary.no
        tourBucket.eng.itinerary = tour.itinerary.eng
      }

      if(tour.accessPoint) {
        tourBucket.no.accessPoint = tour.accessPoint.no
        tourBucket.eng.accessPoint = tour.accessPoint.eng
      }

      if(tour.hazardsDescription) {
        tourBucket.no.hazardsDescription = tour.hazardsDescription.no;
        tourBucket.eng.hazardsDescription = tour.hazardsDescription.no;
      }

      if(tour.toolsDescription) {
        tourBucket.no.toolsDescription  = tour.toolsDescription.no;
        tourBucket.eng.toolsDescription  = tour.toolsDescription.eng;
      }

      if(tour.shortDescription) {
        tourBucket.no.shortDescription  = tour.shortDescription.no;
        tourBucket.eng.shortDescription  = tour.shortDescription.eng;
      }

      const updatedTour = await createTourBucket(tourBucket)
    }
    res.send({result: 'ok'})
})

export default router
