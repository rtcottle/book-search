const { gql } = require('apollo-server-express');

const typeDefs = gql`
}
type Query {
  me: [User]
}
input SaveBookInput {
    description: String!
    title: String!
    bookId: bookId
    image: 
    link: 
}
type Mutation {
    login(email: String!, password: String!): Auth
  addUser(username: String!, email: String!, password: String!): Auth
  saveBook([authors], SaveBookInput): [User]
}
  type User {
    _id: ID
    username: String
    email: String
    bookCount: savedBooks.length
    savedBooks: [Book]
  }
  type Book {
    bookId: String
    authors: [String]
    description: String
    title: String
    image:
    link: 
  }
  type Auth {
    token: ID!
    user: User
 
`;

// TODO: find out how to get image and link in the typeDefs.

module.exports = typeDefs;
