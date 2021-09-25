import Layout from '../components/Layout'
import 'tailwindcss/tailwind.css';
import LoginForm from '../components/Login';
const IndexPage = () => (
  <Layout title="Login | Next.js + TypeScript Example" currentPage='login'>
      <LoginForm/>
  </Layout>
)

export default IndexPage
