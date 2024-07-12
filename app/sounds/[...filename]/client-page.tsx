// ../app/sounds/[...filename]/client-page.tsx

"use client"
import { useTina } from "tinacms/dist/react";
import { SoundsQuery } from "../../../tina/__generated__/types";

interface ClientPageProps {
  query: string;
  variables: {
    relativePath: string;
  };
  data: SoundsQuery;
}

export default function Sounds(props : ClientPageProps) {
    // data passes though in production mode and data is updated to the sidebar data in edit-mode
    const { data } = useTina({
      query: props.query,
      variables: props.variables,
      data: props.data,
    });
    return (
      <div>
        <h1>
          {data.sounds.title}
        </h1>
        <div>
          {data.sounds.body}
        </div>
        {/*<code>
          <pre
            style={{
              backgroundColor: "lightgray",
            }}
          >
            {JSON.stringify(data.sounds, null, 2)}
          </pre>
        </code>*/}
      </div>
    );
  }