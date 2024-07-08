import Link from "next/link";

export default function PostList(props) {

    return (
      <>
        <h1>Websites</h1>
        <div>
          {props.data.postConnection.edges.map((website) => (
            <div key={website.node.id}>
              <Link href={`/websites/${website.node._sys.filename}`}>
                <div>{website.node._sys.filename}</div>
              </Link>
              <div>
                <code>
                  <pre
                    style={{
                      backgroundColor: "lightgray",
                    }}
                  >
                    {JSON.stringify(website, null, 2)}
                  </pre>
                </code>
              </div>
            </div>
          ))}
        </div>
      </>
    );
  }