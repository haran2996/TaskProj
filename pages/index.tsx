import { GetStaticProps } from 'next'
import Link from 'next/link'
import 'tailwindcss/tailwind.css';
import { News } from '../interfaces'
import Layout from '../components/Layout'
import List from '../components/NewsList'

type Props = {
  newsList: News[]
}

const IndexPage = ({ newsList }: Props) => (
  <Layout title="Users List | Next.js + TypeScript Example">
    <List newsList={newsList} />
  </Layout>
)

export const getStaticProps: GetStaticProps = async () => {
  const newsList: News[] = []
  return { props: { newsList } }
}
export default IndexPage
