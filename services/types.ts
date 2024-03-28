export type AddCommentArgs = {
  /**
   *	The ID of the user object, if author was a user.
   * */
  author?: string
  /*	Email address for the comment author. */
  author_email?: string
  /*
   *IP address for the comment author.
   * */
  author_ip: string
  /*
   * 	Display name for the comment author.
   * */
  author_name: string
  /* URL for the comment author. */
  author_url?: string
  /*
   * 	User agent for the comment author.
   * */
  author_user_agent?: string
  /*
   *The content for the comment.
   * */
  content: string
  /* The ID for the parent of the comment. */
  parent: number
  /* 	The ID of the associated post object. */
  post: number
  /* Meta fields of the comment. */
  meta: {
    /* rating by in the comment  */
    rating: number
  }
  status: 'approve'
}

export type CommentCreatedResponse = {
  id: number
  parent: number
  post: number
  content: {
    rendered: string
    raw: string
  }
}

export type GetCommentsInputs = {
  first?: number
  after?: string
  postId: number
}
