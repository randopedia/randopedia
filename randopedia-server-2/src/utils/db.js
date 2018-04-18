// @flow

import mongoose from 'mongoose'
import config from '../config/config'

export const getConnection = async () => {
  try {
    let connection = await mongoose.connect(config.db.uri)
    return connection
  } catch (error) {
    console.log('could not connect to database', error)
  }
}
