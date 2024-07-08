"use client"
import { useTina } from "tinacms/dist/react";
import { WebsiteQuery } from "../../../tina/__generated__/types";

interface ClientPageProps {
  query: string;
  variables: {
    relativePath: string;
  };
  data: WebsiteQuery;
}

export default function Website(props : ClientPageProps) {
    // data passes though in production mode and data is updated to the sidebar data in edit-mode
    const { data } = useTina({
      query: props.query,
      variables: props.variables,
      data: props.data,
    });
    return (
      <div>
        <h1>
          {data.website.title}
        </h1>
        <div>
          {data.website.body}
        </div>
        <code>
          <pre
            style={{
              backgroundColor: "lightgray",
            }}
          >
            {JSON.stringify(data.website, null, 2)}
          </pre>
        </code>
      </div>
    );
  }