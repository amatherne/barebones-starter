import Link from "next/link";

export default function PostList(props) {

    return (
      <>
        <h1>Websites</h1>
        <div>
          {props.data.postConnection.edges.map((post) => (
            <div key={post.node.id}>
              <Link href={`/Websites/${post.node._sys.filename}`}>
                {post.node._sys.filename}
              </Link>
            </div>
          ))}
        </div>
      </>
    );
  }