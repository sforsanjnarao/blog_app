// app/page.jsx
import Link from 'next/link';
import client from '../apollo-client'; // Import your Apollo Client instance
import { GET_POSTS } from '../graphql'; // Import the query

export default async function HomePage() {
  let posts = [];
  let error = null;

  try {
    // Fetch data directly in the server component
    const { data, error: fetchError } = await client.query({
      query: GET_POSTS,
    });

    if (fetchError) {
      error = fetchError;
      console.error("GraphQL Error fetching posts:", fetchError);
    } else if (data && data.posts) {
      posts = data.posts;
    }

  } catch (e) {
    // Handle network or other errors
    error = e;
    console.error("Network or other error fetching posts:", e);
  }

  // Basic Error Display
  if (error) {
    return (
      <div className="container">
        <p>Error loading posts: {error.message || 'An unknown error occurred'}</p>
      </div>
    );
  }

//   // Display message if no posts are found
//   if (!posts || posts.length === 0) {
//     return (
//       <div className="container">
//         <p>No blog posts found.</p>
//       </div>
//     );
//   }

  return (
    <div className="container">
      <div><h1>Blog Posts</h1>
      <ul>
        {posts.map((post) => (
          // Link to the individual post page
          <li key={post.id}>
            <Link href={`/posts/${post.id}`}>
              <h2>{post.title}</h2>
              <p>by {post.author}</p>
            </Link>
          </li>
        ))}
      </ul>
      </div>
      <div>
      <Link href="/create">
            <button style={{ padding: '0.5rem 1rem', backgroundColor: '#0070f3', color: '#fff', borderRadius: 4 }}>
                + Create New Post
            </button>
        </Link>
      </div>
    </div>
  );
}
