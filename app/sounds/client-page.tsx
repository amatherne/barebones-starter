// ../app/sounds/client-page.tsx

import Link from "next/link";

export default function PostList(props) {

    return (
      <>
        <h1>Sounds</h1>
        <div>
          {props.data.soundsConnection.edges.map((sounds) => (
            <div key={sounds.node.id}>
              <Link href={`/sounds/${sounds.node._sys.filename}`}>
                <div>{sounds.node._sys.filename}</div>
              </Link>
              {/*<div>
                <code>
                  <pre
                    style={{
                      backgroundColor: "lightgray",
                    }}
                  >
                    {JSON.stringify(sounds, null, 2)}
                  </pre>
                </code>
              </div>*/}
            </div>
          ))}
        </div>
      </>
    );
  }