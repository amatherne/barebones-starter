// ../app/posts/[...filename]/client-page.tsx

"use client"
import { useTina } from "tinacms/dist/react";
import { PostQuery } from "../../../tina/__generated__/types";

interface ClientPageProps {
  query: string;
  variables: {
    relativePath: string;
  };
  data: PostQuery;
}

export default function Post(props : ClientPageProps) {
    // data passes though in production mode and data is updated to the sidebar data in edit-mode
    const { data } = useTina({
      query: props.query,
      variables: props.variables,
      data: props.data,
    });
    return (
      <div>
        {/*<code>
          <pre
            style={{
              backgroundColor: "lightgray",
            }}
          >
            {JSON.stringify(data.post, null, 2)}
          </pre>
        </code>*/}
        <h1>
          {data.post.title}
        </h1>
        <div>
          {data.post.body}
        </div>
      </div>
    );
  }