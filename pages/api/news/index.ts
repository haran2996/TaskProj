import { NextApiRequest, NextApiResponse } from 'next'
import dbConnect from '../../../libs/dbConnect'
import News from '../../../models/News'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req
  const getNextId = (id,digits) => {
    const prefix = id.slice(0,id.length-digits);
    const numb = parseInt(id.substr(1,4))+10**digits+1;
    return prefix+(numb.toString().slice(1));
    }
  await dbConnect()

  switch (method) {
    case 'GET':
      try {
        const news = await News.find({},{_id:0,__v:0})
        res.status(200).json({ success: true, news })
      } catch (error) {
        res.status(400).json({ success: false })
      }
      break
    case 'POST':
      try {
        const { newsData } = req.body;
        const existingNews = await News.find({title:newsData.title});
        if(existingNews && existingNews.length>0){
          res.status(400).json({success:false,message:'title already present'});
          break;
        }
        const newsId = await News.find({},{newsId:1}).sort("-newsId").limit(1);
        if(newsId.length>0)
            newsData.newsId=getNextId(newsId[0].newsId,4);    
        else
            newsData.newsId="N0001";
        const news = await News.create(
          newsData
        ) 
        res.status(201).json({ success: true,  news })
      } catch (error) {
        res.status(400).json({ success: false })
      }
      break
    default:
      res.status(405).json({ success: false, message: 'method not allowed' })
      break
  }
}

export default handler;
