import mongoose from 'mongoose';

const NewsSchema = new mongoose.Schema({
  newsId: {
    type: String,
    unique: true,
    required: [true, 'Please provide a newsId']
  },
  title: {
    type: String,
    required: [true, 'Please provide a title for the story.'],
  },
  story: {
    type: String,
    required: [true, 'Please provide the story'],
  },
})

export default mongoose.models.News || mongoose.model('News', NewsSchema)
