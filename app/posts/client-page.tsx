// ../app/posts/client-page.tsx

// import React from 'react';
// import Link from 'next/link';

// interface PostNode {
//   id: string;
//   _sys: {
//     filename: string;
//   };
// }

// interface PostEdge {
//   cursor: string;
//   node: PostNode;
// }

// interface PageInfo {
//   hasPreviousPage: boolean;
//   hasNextPage: boolean;
//   startCursor: string;
//   endCursor: string;
// }

// interface PostConnection {
//   pageInfo: PageInfo;
//   totalCount: number;
//   edges: PostEdge[];
// }

// interface PostListProps {
//   data: PostConnection;
// }

// const PostList: React.FC<PostListProps> = ({ data }) => {
//   return (
//     <>
//       <h1>Posts</h1>
//       <div>
//         {data.edges.map((edge) => (
//           <div key={edge.node.id}>
//             <Link href={`/post/${edge.node._sys.filename}`}>
//               <div>{edge.node._sys.filename}</div>
//             </Link>
//             <div>
//               <code>
//                 <pre style={{ backgroundColor: 'lightgray' }}>
//                   {JSON.stringify(edge, null, 2)}
//                 </pre>
//               </code>
//             </div>
//           </div>
//         ))}
//       </div>
//     </>
//   );
// };

// export default PostList;
