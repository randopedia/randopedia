// @flow
import Tour from '../models/tour'
import TourBucket from '../models/tour-bucket'

const documentToTour = (doc : Object) => {
  return doc.toObject()
}

export const findAllTours = async () => {
  let tours = await TourBucket.find()
  tours = tours.map(tour => {
    return documentToTour(tour.no)
  })
  return tours
}

export const findTour = async (tourId: string): Promise<Object> => {
  let tour = await TourBucket.findById(tourId)
  if(tour) {
    return documentToTour(tour.no)
  }
  return Object.assign({})
}

export const saveTourBucket = async (tour: Object): Promise<Object> => {
  console.log(tour)
  const updatedTour = await TourBucket.findByIdAndUpdate(tour._id, tour, {'new': true})
  return documentToTour(updatedTour)
}

export const createTourBucket = async (tourBucket: Object) => {
  const updatedTour = await TourBucket.create(tourBucket)
}
