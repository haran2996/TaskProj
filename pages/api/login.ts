import { NextApiRequest, NextApiResponse } from 'next'
import dbConnect from '../../libs/dbConnect'
import Users from '../../models/Users'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req
  
  await dbConnect()

  switch (method) {
    case 'POST':
      try {
        const { userData } = req.body;
        console.log(userData);
        const user = await Users.find({email:userData.email, password:userData.password},{password:0,_id:0,__v:0});
        if(user.length>0)
            res.status(200).json({ success: true, user: user[0] })
        else
            res.status(400).json({success: false, message: 'wrong credentials'})
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
