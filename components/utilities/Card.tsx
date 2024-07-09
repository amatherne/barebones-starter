import { Image } from '../../components/utilities/Image';
import Link from "next/link";


export const Card = ({object, handle}) => {

  return (
    <div className="card">

      <Link href={`/${object.node.__typename.toLowerCase()}/${object.node._sys.filename}`} title={object.node.title} className="overlay-link">
        {object.node.title}
      </Link>

      {object.node.hero_image ? (
        <Image src={object.node.hero_image} />
      ) : null}

      <h2 className="h3">
        {object.node.title}
      </h2>

      <div>
        <code>
          <pre
            style={{ 
              backgroundColor: "lightgray",
            }}
          >
            {JSON.stringify(object, null, 2)}
          </pre>
        </code>
      </div>
    </div>
  );
}