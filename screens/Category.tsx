import React from 'react'

import { RecipeCourse, RecipeCuisine } from '../types/wp-graphql.types'

type CategoryPageProps = {
    category: RecipeCuisine | RecipeCourse
}

function Category(props: CategoryPageProps) {
    return <div>Category</div>
}

export default Category
