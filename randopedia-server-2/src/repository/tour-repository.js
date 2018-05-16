// @flow
import Tour from '../models/tour'

const documentToTour = (doc : Object) => {
  return doc.toObject()
}

export const findAllTours = async () => {
  let tours = await Tour.find()
  tours = tours.map(tour => {
    return documentToTour(tour)
  })
  return tours
}

export const findTour = async (tourId : string) : Promise<Object> => {
  let tour = await Tour.findById(tourId)
  return documentToTour(tour)
}
