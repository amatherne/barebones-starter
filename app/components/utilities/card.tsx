// ../components/utilities/card.tsx

import React from 'react';
import ImgOutput from './img';
import { cleanBlockName } from '../../../utils/helpers';
import Link from "next/link";

interface CardProps {
  object: {
    node: {
      __typename: string;
      blocks: any[];
      _sys: {
        filename: string;
      };
      title: string;
    };
  };
}

const Card: React.FC<CardProps> = ({object}) => {

  const type      = object.node.__typename;
  const handle    = `${type.toLowerCase()}${type.slice(-1)==='s'?'':'s'}`;
  
  let imgSrc      = '';
  let imgAlt      = '';

  if (object.node.blocks) {
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

export default Card;