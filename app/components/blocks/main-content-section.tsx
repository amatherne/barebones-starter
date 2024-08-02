// ../components/blocks/main-content-section.tsx

import React from 'react';
import { TinaMarkdown, TinaMarkdownContent } from 'tinacms/dist/rich-text';
import { PageQuery, WebsiteQuery, SoundsQuery, PostQuery } from '../../../tina/__generated__/types';
import { convertFileNameToCamelCase, customCSS } from '../../../utils/helpers';


type MainContentType = 
  PageQuery['page'] | 
  WebsiteQuery['website'] ;
  // | 
  // SoundsQuery['sounds'] | 
  // PostQuery['post'];

interface MainContentProps {
  content: MainContentType;
  index?: number;
  settings?: {
    title?: string;
    show_title?: boolean;
    text?: TinaMarkdownContent;
    styles?: {
      colors?: string;
    };
    custom_css?: string;
  } | null;
}


const isPageQuery = (content: MainContentType): content is PageQuery['page'] => {
  return (content as PageQuery['page']).__typename === 'Page';
};

const isWebsiteQuery = (content: MainContentType): content is WebsiteQuery['website'] => {
  return (content as WebsiteQuery['website']).__typename === 'Website';
};

// const isSoundsQuery = (content: MainContentType): content is SoundsQuery['sounds'] => {
//   return (content as SoundsQuery['sounds']).__typename === 'Sounds';
// };

// const isPostQuery = (content: MainContentType): content is PostQuery['post'] => {
//   return (content as PostQuery['post']).__typename === 'Post';
// };



const MainContent: React.FC<MainContentProps> = ({ settings, content, index }) => {

  if (!settings || !content) return null;

  // const checkMain                                       = isPageQuery(content) || isWebsiteQuery(content) || isSoundsQuery(content) || isPostQuery(content);
  const checkMain                                       = isPageQuery(content) || isWebsiteQuery(content);

  const title                                           = settings?.title || (checkMain ? content.title : null);
  const bodyText                                        = settings?.title || (checkMain) ? content.body : null;

  let text: TinaMarkdownContent | null                  = null;
  if (bodyText && bodyText.children.length !== 0) text  = bodyText;

  const showTitle                                       = settings?.show_title !== false;

  const sectionHasContent                               = title || text;
  if (!sectionHasContent) return null;

  const color                                           = settings?.styles?.colors || '';

  const sectionIDString                                 = `ctas--section${title ? '-' + title : ''}`;
  const sectionID                                       = convertFileNameToCamelCase(sectionIDString);

  let sectionCustomCSS                                  = settings?.custom_css || '';
  if (sectionCustomCSS) {
    sectionCustomCSS                                    = customCSS(sectionCustomCSS,sectionID);
  }

  return (
    <section className={`page ${sectionID} ${color}`}>
      <div className="page-width page-width--narrow">

        {sectionCustomCSS ? (
          <style>{`
            ${sectionCustomCSS}
          `}</style>
        ) : null}

        {showTitle && title ? (
          <h1 className="h1">{title}</h1>
        ) : null}

        {text ? (
          <div className="rte">
            <TinaMarkdown content={text} />
          </div>
        ) : null}

      </div>
    </section>
  );
};

export default MainContent;
