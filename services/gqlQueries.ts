/* eslint-disable */

export const GEN_GET_RECIPE_POSTS_DETAIL_QUERY = (
  first = 100,
  endCursor: string | null = null,
  startCursor: string | null = null
) => `
      query GET_RECIPE_POSTS {
          recipes(first:${first},\
                  after:"${endCursor}", \
                  before:"${startCursor}") {
            pageInfo {
              endCursor
              startCursor
              hasNextPage
              hasPreviousPage
            }
            nodes {
              databaseId
              content
              uri
              slug
              link
              excerpt
              date
              dateGmt
              recipeId
              title
              featuredImage {
                node {
                  mediaItemUrl
                  srcSet
                  sourceUrl
                  mediaDetails {
                    sizes {
                      name
                      sourceUrl
                    }
                  }
                }
              }
              recipeCuisines {
                nodes {
                  name
                  link
                  databaseId
                  uri
                  slug
                  parentId
                }
              }
              recipeCourses {
                nodes {
                  name
                  link
                  databaseId
                  uri
                  slug
                  parentId
                }
              }
              commentCount
              comments(first: 100) {
                pageInfo {
                  endCursor
                  startCursor
                  hasNextPage
                  hasPreviousPage
                }
                nodes {
                  id
                  commentId
                  author{
                    node { 
                      name, 
                      email
                    }
                  }
                  content
                  rating
                  parentId
                  parentDatabaseId
                }
              }
            }
          }
        }
    `

export const GET_COURSES = (
  first: number = 10,
  after: string | null = null
) => `
  query GET_COURSES {
    recipeCourses {
      nodes {
        name
        databaseId
        uri
        slug
        thumbnail
        description
        recipes(first: ${first}, after: ${after}) {
          nodes {
            databaseId
            uri
            excerpt
            date
            dateGmt
            recipeId
            title
            featuredImage {
              node {
                mediaItemUrl
                srcSet
                sourceUrl
                mediaDetails {
                  sizes {
                    name
                    sourceUrl
                  }
                }
              }
            }
          }

        pageInfo {
          endCursor
          startCursor
          hasNextPage
          hasPreviousPage
        }
        }
      }
    }
  }
`

export const GET_CUISINES = (
  first: number = 10,
  after: string | null = null
) => `
    query GET_CUISINES {
        recipeCuisines {
            nodes {
                name
                databaseId
                uri
                slug
                thumbnail
                description
                recipes(first: ${first}, after: ${after}) {
                    nodes {
                        databaseId
                        uri
                        excerpt
                        date
                        dateGmt
                        recipeId
                        title
                        featuredImage {
                            node {
                                mediaItemUrl
                                srcSet
                                sourceUrl
                                mediaDetails {
                                    sizes {
                                        name
                                        sourceUrl
                                    }
                                }
                            }
                        }
                    }

                    pageInfo {
                      endCursor
                      startCursor
                      hasNextPage
                      hasPreviousPage
                    }
                }
            }
        }
    }
`

export const GET_CUISINES_SUMMARY = (
  first: number = 10,
  after: string | null = null
) => `
    query GET_CUISINES_SUMMARY {
        recipeCuisines(first: 100) {
            nodes {
                name
                databaseId
                uri
                thumbnail
                recipes(first: ${first}, after: ${after}) {
                    nodes {
                        databaseId
                    }
                    pageInfo {
                      endCursor
                      startCursor
                      hasNextPage
                      hasPreviousPage
                    }
                }
            }
        }
    }
`

export const GET_COURSES_SUMMARY = (
  first: number = 10,
  after: string | null = null
) => `
    query GET_COURSES_SUMMARY {
        recipeCourses {
            nodes {
                name
                databaseId
                uri
                thumbnail
                recipes(first:${first}, after: ${after}) {
                    nodes {
                        databaseId
                    }
                    pageInfo {
                      endCursor
                      startCursor
                      hasNextPage
                      hasPreviousPage
                    }
                }
            }
        }
    }
`

export const GET_COURSE = (id: number, after: string | null, first: number) => `
     query GET_COURSE {
        recipeCourse(id: ${id}, idType: DATABASE_ID) {
                name
                databaseId
                uri
                thumbnail
                recipes(first: ${first}, after: ${after}) {
                    nodes {
                        databaseId
                    }
                    pageInfo {
                      endCursor
                      startCursor
                      hasNextPage
                      hasPreviousPage
                    }
                }
            }
    }`

export const GET_CUISINE = (
  id: number,
  after: string | null,
  first: number
) => `
      query GET_CUISINE {
        recipeCuisine(id: ${id}, idType: DATABASE_ID) {
                name
                databaseId
                uri
                thumbnail
                recipes(first: ${first}, after: "${after}") {
                    nodes {
                        databaseId
                    }
                    pageInfo {
                      endCursor
                      startCursor
                      hasNextPage
                      hasPreviousPage
                    }
                }
        }
  }`





export const GEN_GET_POSTS_DETAIL_QUERY = (
  first = 100,
  endCursor: string | null = null,
  startCursor: string | null = null
) => `
      query GET_POSTS {
          posts(first:${first}, after:"${endCursor}", before:"${startCursor}") {
            pageInfo {
              endCursor
              startCursor
              hasNextPage
              hasPreviousPage
            }
            nodes {
              databaseId
              content
              uri
              slug
              link
              excerpt
              date
              dateGmt
              postId
              title
              featuredImage {
                node {
                  mediaItemUrl
                  srcSet
                  sourceUrl
                  mediaDetails {
                    sizes {
                      name
                      sourceUrl
                    }
                  }
                }
              }
              commentCount
              comments(first: 100) {
                pageInfo {
                  endCursor
                  startCursor
                  hasNextPage
                  hasPreviousPage
                }
                nodes {
                  commentId
                  author{
                    node { 
                      name, 
                      email
                    }
                  }
                  content
                  rating
                }
              }
            }
          }
        }
    `


export const GET_COMMENT_DETAILS = (commentInternalId: string) => `
  query GET_COMMENT_BY_ID {
    comment(id: "${commentInternalId}") {
      commentId
      content
      author {
        node {
          name
        }
      }
      replies(first: 100) {
        pageInfo {
          hasNextPage
          endCursor
          startCursor
          hasPreviousPage
        }
        edges {
          node {
            id
            content
            rating
            author {
              node {
                name
              }
            }
          }
        }
      }
    }
  }`


export const GET_ALL_COMMENTS_PER_RECIPE = (recipeId:number, first: number = 100, after: string | null = null ) =>`
query GET_RECIPE_COMMENTS {
    recipe(id: ${recipeId}, idType: DATABASE_ID) {
                commentCount
                comments(first: ${first}, after: ${after}, where: {parent:0}) {
                  pageInfo {
                    endCursor
                    startCursor
                    hasNextPage
                    hasPreviousPage
                  }
                  nodes {
                    id
                    commentId
                    author{
                      node { 
                        name, 
                        email
                      }
                    }
                    content
                    rating
                    dateGmt
                    parentId
                    parentDatabaseId
                  }
                }
    }
  }
`

export const GET_ALL_COMMENTS_PER_POST = (postId: number, first: number=100, after: string | null = null) =>`
query GET_POST_COMMENTS {
    post(id: ${postId}, idType: DATABASE_ID) {
                commentCount
                comments(first: ${first}, after: ${after}, where: {parent:0}) {
                  pageInfo {
                    endCursor
                    startCursor
                    hasNextPage
                    hasPreviousPage
                  }
                  nodes {
                    id
                    commentId
                    author{
                      node { 
                        name, 
                        email
                      }
                    }
                    content
                    rating
                    dateGmt
                    parentId
                    parentDatabaseId
                  }
                }
    }
  }
` 
