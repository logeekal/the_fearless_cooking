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
              modifiedGmt
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
              modifiedGmt
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
            }
          }
        }
    `

