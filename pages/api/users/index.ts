import { NextApiRequest, NextApiResponse } from 'next'
import dbConnect from '../../../libs/dbConnect'
import Users from '../../../models/Users'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req
  const getNextId = (id,digits) => {
    const prefix = id.slice(0,id.length-digits);
    const numb = parseInt(id.substr(1,4))+10**digits+1;
    return prefix+(numb.toString().slice(1));
    }
  await dbConnect()

  switch (method) {
    case 'POST':
      try {
        const { userData } = req.body;
        const existingUser = await Users.find({email:userData.email},{userId:1});
        if(existingUser.length>0){
          res.status(400).json({success: false, message:'email already registered'})
          break;
        }
        const userId = await Users.find({},{userId:1}).sort("-userId").limit(1);
        if(userId.length>0)
            userData.userId=getNextId(userId[0].userId,4);    
        else
          userData.userId="U0001";
        userData.userType = 'user';
        const user = await Users.create(
          userData
        ) 
        res.status(201).json({ success: true })
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
