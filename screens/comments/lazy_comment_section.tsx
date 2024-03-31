import React, { Suspense } from 'react'

import Loader from '../../components/loading'
import { SectionLoader } from '../../components/loading/section_loader'
import { withIntersection } from '../../components/with-intersection'
import { CommentSectionProps } from './comment_section'

const CommentSectionAsync = React.lazy(() =>
  import('./comment_section').then((module) => ({
    default: module.CommentSection,
  }))
)

const Fallback = () => {
  return (
    <SectionLoader title="Loading Comments">
      <Loader status="loading" size="30px" />
    </SectionLoader>
  )
}

const LazyCommentSectionComp = (props: CommentSectionProps) => {
  return (
    <Suspense fallback={<Fallback />}>
      <CommentSectionAsync {...props} />
    </Suspense>
  )
}

export const LazyCommentSection = withIntersection<CommentSectionProps>(
  LazyCommentSectionComp,
  {
    rootMargin: '300px',
  }
)
