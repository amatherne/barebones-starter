// ../components/utilities/card.tsx

import ImgOutput from './img';
import { cleanBlockName } from '../../../utils/helpers';
import Link from "next/link";

const card = ({object}) => {

  const type      = object.node.__typename;
  const handle    = `${type.toLowerCase()}${type.slice(-1)==='s'?'':'s'}`;
  let imgSrc      = object.node.blocks || '';
  let imgAlt      = '';

  if (imgSrc) {
    const img     = object.node.blocks.find(block => cleanBlockName(block.__typename) === 'BlocksHero').item?.[0] || '';
    imgSrc        = img.src || '';
    imgAlt        = img.alt || '';
  }

  return (
    <div className="card">

      <Link href={`/${handle}/${object.node._sys.filename}`} title={object.node.title} className="overlay--link"></Link>

      {imgSrc ? (
        <ImgOutput src={imgSrc} alt={imgAlt} className="card--image" />
      ) : null}

      <h2 className="h2">
        {object.node.title}
      </h2>

    </div>
  );
}

export default card;