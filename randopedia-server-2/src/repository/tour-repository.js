// @flow
import Tour from '../models/tour'
import TourBucket from '../models/tour-bucket'

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

export const findTour = async (tourId: string): Promise<Object> => {
  let tour = await Tour.findById(tourId)
  return documentToTour(tour)
}

export const saveTour = async (tour: Object): Promise<Object> => {
  console.log(tour)
  const updatedTour = await Tour.findByIdAndUpdate(tour._id, tour, {'new': true})
  return documentToTour(updatedTour)
}

export const createTourBucket = async (tourBucket: Object) => {
  const updatedTour = await TourBucket.create(tourBucket)
}
