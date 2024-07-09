"use client"
import { TinaMarkdown } from "tinacms/dist/rich-text";
import { tinaField, useTina } from "tinacms/dist/react";
import { WebsiteQuery } from "../../../tina/__generated__/types";
import { Img } from '../../../components/utilities/Img';


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

    const content   = data.website.body;

    const images    = data.website?.gallery || [];
    const hero      = images.filter(item => item && item.hero)[0] || null;

    return (
      <div>

        {hero && hero.src !== '' ? (
          <Img src={hero.src} alt={hero.alt} className />
        ) : ''}

        <h1>
          {data.website.title}
        </h1>

        {content ? (
          <div data-tina-field={tinaField(data.website, "body")}>
            <TinaMarkdown content={content} />
          </div>
        ) : null}

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