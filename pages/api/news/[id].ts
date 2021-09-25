import { NextApiRequest, NextApiResponse } from 'next'
import dbConnect from '../../../libs/dbConnect'
import News from '../../../models/News'

export default async function handler(req:NextApiRequest, res:NextApiResponse) {
  const {
    query: { id },
    method,
  } = req

  await dbConnect()

  switch (method) {
    case 'GET' /* Get a model by its ID */:
      try {
        const news = await News.find({newsId: id});
        if (!news || news.length==0) {
          return res.status(400).json({ success: false })
        }
        res.status(200).json({ success: true, news: news[0] })
      } catch (error) {
        res.status(400).json({ success: false })
      }
      break

    case 'PUT' /* Edit a model by its ID */:
      try {
        console.log(req.body.newsData)
        const news = await News.findOneAndUpdate({newsId: id}, {...req.body.newsData}, {
          new: true
        });
        if (!news) {
          return res.status(400).json({ success: false })
        }
        res.status(200).json({ success: true, news })
      } catch (error) {
        res.status(400).json({ success: false })
      }
      break

    case 'DELETE' /* Delete a model by its ID */:
      try {
        const deletedNews = await News.deleteOne({ newsId: id })
        if (!deletedNews) {
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
