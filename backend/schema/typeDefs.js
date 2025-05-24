//schema/typeDefs.js
const { gql } = require('graphql-tag');

const typeDefs = gql`
  type Post {
    id: ID!
    title: String!
    content: String!
    author: String!
  }
   

  type Query {
    posts: [Post!]!
    post(id: ID!): Post
  }
  input CreatePostInput {
    title: String!
    content: String!
    author: String!
  }

  type Mutation {
    createPost(input: CreatePostInput!): Post
    # updatePost(id: ID!, input: UpdatePostInput!): Post
    # deletePost(id: ID!): Boolean
  }
`;

module.exports = typeDefs;