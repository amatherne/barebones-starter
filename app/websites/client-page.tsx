// ../app/websites/client-page.tsx

import React from 'react';
import Card from '../components/utilities/card';

export default function PostList(props) {
    return (
      <>
        <section className="page page--default">
          <div className="page-width">

            <div className="section--title text-center">
              <h1>Websites</h1>
            </div>

            <div className="cell match-height">
              {props.data.websiteConnection.edges.map((website) => {
                return (
                  <div key={website.node.id} className="cell__item w-50 lg-up--w-33">
                    <Card 
                      object={website}
                    />
                  </div>
                );
              })}
            </div>
            
          </div>
        </section>
      </>
    );
  }