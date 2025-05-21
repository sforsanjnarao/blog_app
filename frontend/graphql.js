// graphql/queries.js
import { gql } from '@apollo/client';

// Query to get all posts
export const GET_POSTS = gql`
  query GetPosts {
    posts {
      id
      title
      author
    }
  }
`;

// Query to get a single post by ID
export const GET_POST_BY_ID = gql`
  query GetPostById($id: ID!) {
    post(id: $id) {
      id
      title
      content
      author
    }
  }
`;