// ../app/posts/client-page.tsx

import Link from "next/link";

export default function PostList(props) {

    return (
      <>
        <h1>Posts</h1>
        <div>
          {props.data.postConnection.edges.map((post) => (
            <div key={post.node.id}>
              <Link href={`/posts/${post.node._sys.filename}`}>
                <div>{post.node._sys.filename}</div>
              </Link>
              <div>
                <code>
                  <pre
                    style={{
                      backgroundColor: "lightgray",
                    }}
                  >
                    {JSON.stringify(post, null, 2)}
                  </pre>
                </code>
              </div>
            </div>
          ))}
        </div>
      </>
    );
  }