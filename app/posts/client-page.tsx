// ../app/posts/client-page.tsx

import Link from "next/link";
import React from "react";

// Import the generated types
import { PostConnectionQuery } from "../../tina/__generated__/types";

interface PostNode {
  id: string;
  _sys: {
    filename: string;
  };
}

interface PostEdge {
  node: PostNode;
}

interface PostConnection {
  edges: (PostEdge | null)[] | null;
}

interface Props {
  data: PostConnectionQuery;
}

const PostList: React.FC<Props> = ({ data }) => {
  const edges = data?.postConnection?.edges ?? []; // Handle null or empty values

  return (
    <>
      <h1>Posts</h1>
      <div>
        {edges.length === 0 ? (
          <p>No posts available</p> // Provide user feedback for empty state
        ) : (
          edges
            .filter((post): post is PostEdge => post !== null)
            .map((post) => (
              <div key={post.node.id}>
                <Link href={`/posts/${post.node._sys.filename}`}>
                  <div>{post.node._sys.filename}</div>
                </Link>
                {/*<div>
                  <code>
                    <pre
                      style={{
                        backgroundColor: "lightgray",
                      }}
                    >
                      {JSON.stringify(post, null, 2)}
                    </pre>
                  </code>
                </div>*/}
              </div>
            ))
        )}
      </div>
    </>
  );
};

export default PostList;
