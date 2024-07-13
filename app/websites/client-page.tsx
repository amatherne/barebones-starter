// ../app/websites/client-page.tsx

import { Card } from '../../components/Utilities/Card';


export default function PostList(props) {
    return (
      <>
        <div className="posts-page">

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
      </>
    );
  }