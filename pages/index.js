import Head from 'next/head'
import { Inter } from '@next/font/google'
import { gql, GraphQLClient } from 'graphql-request'
import Section from '../components/Section'
import Navbar from '../components/NavBar'
import Link from 'next/link'
const inter = Inter({ subsets: ['latin'] })

export const getStaticProps = async () => {

  const url = process.env.ENDPOINT
  const graphQLClient = new GraphQLClient(url, {
    headers: {
      "Authorization": process.env.HYGRAPH_TOKEN
    }
  })

  const videosQuery = gql`
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

  const accountQuery = gql`
    query Account {
    account(where: {id: "clcl01o4r0jdh0ble77v55voi"}) {
      avatar {
        url
      }
      username
      }
    }`

  const data = await graphQLClient.request(videosQuery)
  const accountData = await graphQLClient.request(accountQuery)
  const videos = data.videos
  const account = accountData.account

  return {
    props: {
      videos,
      account
    }
  }
}

const Home = ({ videos, account }) => {

  const randomVideo = (videos) => {
    return videos[Math.floor(Math.random() * videos.length)]
  }

  const filterVideos = (videos, genre) => {
    return videos.filter((video) => video.tags.includes(genre))
  }

  const unSeenVideos = (videos) => {
    return videos.filter(video => video.seen == false || video.seen == null)
  }

  return (
    <>
      <Navbar account={account}></Navbar>
      <div className='app'>
        <div className='main-video'>
          <img src={randomVideo(videos).thumbnail.url}
            alt={randomVideo(videos).title} />
        </div>
        <div className="video-feed">
          <Link href='#disney'><div className='franchise' id='disney'></div></Link>
          <Link href='#family'><div className='franchise' id='family'></div></Link>
        </div>
        <div>
          <Section genre={'Recommended for you'} videos={unSeenVideos(videos)} />
          <Section id='family' genre={'Family'} videos={filterVideos(videos, 'family')} />
          <Section genre={'R'} videos={filterVideos(videos, 'R')} />
          <Section id='disney' genre={'Comedy'} videos={filterVideos(videos, 'comedy')} />
          <Section genre={'Romance'} videos={filterVideos(videos, 'romance')} />
        </div>
      </div>
    </>
  )
}

export default Home
