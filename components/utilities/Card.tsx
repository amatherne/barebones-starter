// ../components/Utilities/Card.tsx


import { Img } from '../../components/Utilities/Img';
import Link from "next/link";

export const Card = ({object}) => {

  const type      = object.node.__typename;
  const handle    = `${type.toLowerCase()}${type.slice(-1)==='s'?'':'s'}`;
  const image     = object.node.hero_image;
  const imageAlt  = object.node.hero_image_alt?object.node.hero_image_alt:'';

  return (
    <div className="card">

      <Link href={`/${handle}/${object.node._sys.filename}`} title={object.node.title} className="overlay-link">
        {object.node.title}
      </Link>

      {image ? (
        <Img src={image} alt={imageAlt} className />
      ) : null}

      <h2 className="h3">
        {object.node.title}
      </h2>

      {/*<div>
        <code>
          <pre
            style={{ 
              backgroundColor: "lightgray",
            }}
          >
            {JSON.stringify(object, null, 2)}
          </pre>
        </code>
      </div>*/}
    </div>
  );
}