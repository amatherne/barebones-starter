// ../app/websites/client-page.tsx

import Card from '../components/utilities/card';


export default function PostList(props) {
    return (
      <>
        <section className="page page--default">
          <div className="page-width">

            <h1>Websites</h1>
          
            <div className="cell">
              {props.data.websiteConnection.edges.map((website) => {
                return (
                  <div key={website.node.id} className="cell__item ">
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