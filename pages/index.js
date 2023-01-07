import Head from 'next/head'
import { Inter } from '@next/font/google'
import { gql, GraphQLClient } from 'graphql-request'

const inter = Inter({ subsets: ['latin'] })

export const getStaticProps = async () => {

  const url = process.env.ENDPOINT
  const graphQLClient = new GraphQLClient(url, {
    headers: {
      "Authorization" : process.env.HYGRAPH_TOKEN
    }
  })

  const query = gql`
    query Videos {
      videos {
        createdAt
        description
        id
        seen
        slug
        tags
        title
        platform {
          title
        }
        thumbnail {
          url
        }
        mp4 {
          url
        }
      }
    }
    `
  const data = await graphQLClient.request(query)
  const videos = data.videos

  return {
    props: {
      videos,
    }
  }
}

const Home = ( {videos} ) => {
  const randomVideo = (videos) => {
    return Math.random(Math.random() * videos.length)
  }
  return (
    <>
      <div className='app'>
        <div className='main-video'>
          <img src={{}}/>
        </div>
      </div>
    </>
  )
}

export default Home
