// ../app/websites/client-page.tsx

import card from '../../components/utilities/card';


export default function PostList(props) {
    return (
      <>
        <div className="posts-page">

          <h1>Websites</h1>
        
          <div className="cell">
            
            {props.data.websiteConnection.edges.map((website) => {
              return (
                <div key={website.node.id} className="cell__item ">
                  {/*<card 
                    object={website}
                  />*/}
                </div>
              );
            })}
            
          </div>

        </div>
      </>
    );
  }