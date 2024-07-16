// ../components/utilities/card.tsx

import ImgOutput from './img';

import Link from "next/link";

const card = ({object}) => {

  const type      = object.node.__typename;
  const handle    = `${type.toLowerCase()}${type.slice(-1)==='s'?'':'s'}`;
  const hero      = object.node.hero || null;

  const imgSrc    = object.node.hero?.gallery?.[0].src || null;
  const imgAlt    = object.node.hero?.gallery?.[0].alt || null;

  return (
    <div className="card">

      <Link href={`/${handle}/${object.node._sys.filename}`} title={object.node.title} className="overlay--link">
        {/*{object.node.title}*/}
      </Link>

      {imgSrc ? (
        <ImgOutput src={imgSrc} alt={imgAlt} className />
      ) : null}

      <h2 className="h2">
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

export default card;