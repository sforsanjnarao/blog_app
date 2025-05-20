const { ObjectId } = require('mongodb');
const connectDB = require('../db/db');

const resolvers = {
  Query: {
    posts: async () => {
      const db = await connectDB();
      const posts = await db.collection('posts').find({}).toArray();
      return posts.map(p => ({ ...p, id: p._id.toString() }));
    },
    post: async (_, { id }) => {
      const db = await connectDB();
      const post = await db.collection('posts').findOne({ _id: new ObjectId(id) });
      if (!post) throw new Error("Post not found");
      return { ...post, id: post._id.toString() };
    }
  }
};

module.exports = resolvers;