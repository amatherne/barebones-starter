import { Card } from '../../components/utilities/Card';


export default function PostList(props) {

    return (
      <>

        <h1>Websites</h1>

        <div className="cell ">
          {props.data.websiteConnection.edges.map((website) => {
            const web = website.node;
            return (
              <div key={web.id} className="cell__item ">
                <Card 
                  object={website}
                  handle="websites" 
                />
              </div>
            );
          })}
        </div>

      </>
    );
  }