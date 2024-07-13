// ../app/sounds/[...filename]/client-page.tsx

"use client"

import React from "react";
import { TinaMarkdown } from "tinacms/dist/rich-text";
import { tinaField, useTina } from "tinacms/dist/react";
import { SoundsQuery } from "../../../tina/__generated__/types";
// import { Img } from '../../../components/Utilities/Img';
import Head from '../../../components/head/head';

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

    const { sounds } = data;
    const { body, title } = sounds || {};


    return (
      <div>
        <h1>
          {data.sounds.title}
        </h1>
        

        {body && (
          <div data-tina-field={tinaField(sounds, "body")}>
            <TinaMarkdown content={body} />
          </div>
        )}

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