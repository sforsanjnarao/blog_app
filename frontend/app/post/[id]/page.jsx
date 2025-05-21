// app/posts/[id]/page.jsx
import Link from 'next/link';
import client from '../../../lib/apollo-client'; // Adjust path if needed
import { GET_POST_BY_ID } from '../../../graphql/queries'; // Adjust path if needed

export default async function PostDetailsPage({ params }) {
  const postId = params.id; // Get the ID from the URL

  let post = null;
  let error = null;

  try {
    // Fetch the single post using the ID
    const { data, error: fetchError } = await client.query({
      query: GET_POST_BY_ID,
      variables: { id: postId }, // Pass the ID as a variable
    });

    if (fetchError) {
      error = fetchError;
      console.error(`GraphQL Error fetching post ${postId}:`, fetchError);
    } else if (data && data.post) {
      post = data.post;
    }

  } catch (e) {
    // Handle network or other errors
    error = e;
    console.error(`Network or other error fetching post ${postId}:`, e);
  }

  // Basic Error Display
  if (error) {
    return (
       <div className="container">
        <p>Error loading post: {error.message || 'An unknown error occurred'}</p>
        <Link href="/">Back to posts</Link>
      </div>
    );
  }

  // Display message if post is not found (or 404)
  if (!post) {
    // In a real app, you might want to return a dedicated 404 page
    return (
      <div className="container">
        <p>Post with ID "{postId}" not found.</p>
        <Link href="/">Back to posts</Link>
      </div>
    );
  }

  // Display the post details
  return (
    <div className="container">
      <h1>{post.title}</h1>
      <p>by {post.author}</p>
      {/* Render content - basic handling for newlines */}
      <div>
         {post.content && post.content.split('\n').map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
          ))}
      </div>
      <div style={{ marginTop: '20px' }}>
        <Link href="/">Back to posts</Link>
      </div>
    </div>
  );
}