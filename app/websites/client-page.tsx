// ../app/websites/client-page.tsx

import React from 'react';
import Card from '../components/utilities/card';

export default function PostList(props) {

  function isZero(num) {
    if (num === 0 || num === null) return true;
    return false;
  }

  let websites = props.data?.websiteConnection?.edges;

  if (websites) {
    const cleanedWebsites = websites
      .filter((website) => website.node.published) // remove unpublished
      .slice() 
      .sort((a, b) => { // sort, and move numbered items first
        const sortOrderA = a.node.sortOrder;
        const sortOrderB = b.node.sortOrder;
         if (isZero(sortOrderA)) return 1;
         if (isZero(sortOrderB)) return -1;
        return sortOrderA - sortOrderB;
      });

    websites = cleanedWebsites;
  }

  return ( 
    <>
      <section className="page page--default">
        <div className="page-width">
          
          <div className="section--title text-left">
            <h1>Websites</h1>
          </div>

          <div className="cell match-height">
            { websites ? websites.map((website) => {
              return (
                <div key={website.node.id} className="cell__item sm-md--w-50 md--w-50 lg-up--w-33">
                  <Card 
                    object={website}
                  />
                </div>
              )
            }) : null }
          </div>

        </div>
      </section> 
    </>
  );
}