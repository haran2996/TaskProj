import Layout from '../components/Layout'
import 'tailwindcss/tailwind.css';
import AddNewsComp from '../components/AddNews';
const AddNews = () => (
  <Layout title="AddNews | Next.js + TypeScript Example" currentPage='addnews'>
      <AddNewsComp/>
  </Layout>
)

export default AddNews
