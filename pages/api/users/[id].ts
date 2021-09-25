import { NextApiRequest, NextApiResponse } from 'next'
import dbConnect from '../../../libs/dbConnect'
import Users from '../../../models/Users'

export default async function handler(req:NextApiRequest, res:NextApiResponse) {
  const {
    query: { id },
    method,
  } = req

  await dbConnect()

  switch (method) {
    case 'GET' /* Get a model by its ID */:
      try {
        const user = await Users.find({userId: id},{_id:0,__v:0,password:0});
        if (!user || user.length==0) {
          return res.status(400).json({ success: false })
        }
        res.status(200).json({ success: true, user:user[0] })
      } catch (error) {
        res.status(400).json({ success: false })
      }
      break

    case 'PUT' /* Edit a model by its ID */:
      try {
        const user = await Users.findOneAndUpdate({userId: id}, req.body, {
          new: true,
          runValidators: true,
        })
        if (!user) {
          return res.status(400).json({ success: false })
        }
        res.status(200).json({ success: true, user })
      } catch (error) {
        res.status(400).json({ success: false })
      }
      break

    case 'DELETE' /* Delete a model by its ID */:
      try {
        const deletedUser = await Users.deleteOne({ userId: id })
        if (!deletedUser) {
          return res.status(400).json({ success: false })
        }
        res.status(200).json({ success: true, data: {} })
      } catch (error) {
        res.status(400).json({ success: false })
      }
      break

    default:
      res.status(405).json({ success: false, message: 'method not allowed' })
      break
  }
}
