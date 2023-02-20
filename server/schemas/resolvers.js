const { AuthenticationError } = require('apollo-server-express');
const { User } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
  Query: {
    user: async (parent, { username }) => {
      return User.findOne({
        $or: [
          { _id: User ? User._id : params.id },
          { username: params.username },
        ],
      }).populate('books');
    },
  },
  Mutation: {
    createUser: async (parent, { username, email, password }) => {
      const user = await User.create({ username, email, password });
      const token = signToken(user);
      return { token, user };
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });
      if (!user) {
        throw new AuthenticationError('No user found with that email address');
      }

      const correctPw = await user.isCorrectPassword(password);
      if (!correctPw) {
        throw new AuthenticationError('Incorrect credentials');
      }

      const token = signToken(user);
      return { token, user };
    },
    saveBook: async (parent, { bookid }) => {
      const book = await User.findOneAndUpdate(
        { _id: User._id },
        { $addToSet: { savedBooks: body } },
        { new: true, runValidators: true }
      );
      return book;
    },
  },
};

module.exports = resolvers;
