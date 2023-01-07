import { gql, GraphQLClient } from 'graphql-request'

export const getServerSideProps = async (pageContext) => {
    const pageSlug = pageContext.query.slug

    const url = process.env.ENDPOINT
    const graphQLClient = new GraphQLClient(url, {
        headers: {
            "Authorization": process.env.HYGRAPH_TOKEN
        }
    })

    console.log(pageSlug)

    const query = gql`
    query ($pageSlug: String!) {
        video(where: {slug: $pageSlug}) {
            createdAt
            description
            id
            slug
            seen
            tags
            title
            mp4 {
                url
                width
            }
            platform {
                title
            }
            thumbnail {
                url
            }
        }
    }
    `

    const variables = {
        pageSlug,
    }

    const data = await graphQLClient.request(query, variables)
    const { video } = data

    return {
        props: {
            video
        }
    }
}

const Video = ({ video }) => {
    console.log(video)
    return (
        <div></div>
    )
}

export default Video