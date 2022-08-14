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
            }
          }
        }
    `

export const GET_COURSES = `
  query GET_COURSES {
    recipeCourses {
      nodes {
        name
        databaseId
        uri
        slug
        description
        recipes {
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
        }
      }
    }
  }
`

export const GET_CUISINES = `
    query GET_CUISINES {
        recipeCuisines {
            nodes {
                name
                databaseId
                uri
                slug
                description
                recipes {
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
                }
            }
        }
    }
`

export const GET_CUISINES_SUMMARY = `
    query GET_CUISINES_SUMMARY {
        recipeCuisines {
            nodes {
                name
                databaseId
                uri
                recipes {
                    nodes {
                        databaseId
                    }
                }
            }
        }
    }
`

export const GET_COURSES_SUMMARY = `
    query GET_COURSES_SUMMARY {
        recipeCourses {
            nodes {
                name
                databaseId
                uri
                recipes {
                    nodes {
                        databaseId
                    }
                }
            }
        }
    }
`
