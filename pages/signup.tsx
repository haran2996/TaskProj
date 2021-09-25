import Layout from '../components/Layout'
import 'tailwindcss/tailwind.css';
import SignUp from '../components/SignUp';
const IndexPage = () => (
  <Layout title='Sign Up | Next.js + TypeScript Example' currentPage='signup'>
      <SignUp/>
  </Layout>
)

export default IndexPage
