import { GetStaticProps, GetStaticPaths } from 'next'
import 'tailwindcss/tailwind.css';
import { User } from '../interfaces'
import Layout from '../components/Layout'
import NewsItem from '../components/NewsItem'

type PROPS={
  id: string;
}
const StaticPropsDetail = (props:PROPS) => {
  return (
    <Layout
      title={'User Detail | Next.js + TypeScript Example'}
    >
      <NewsItem id={props.id}/>
    </Layout>
  )
}

export default StaticPropsDetail

export const getStaticPaths: GetStaticPaths = async () => {
  return { paths:[], fallback: true }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  try {
    return { props: { id:params.id } }
  } catch (err) {
    return { props: { errors: err.message } }
  }
}
