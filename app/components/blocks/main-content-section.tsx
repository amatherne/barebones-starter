// ../components/blocks/main-content-section.tsx

import React from 'react';
import { TinaMarkdown, TinaMarkdownContent } from 'tinacms/dist/rich-text';
import { PageQuery, WebsiteQuery, SoundsQuery, PostQuery } from '../../tina/types';

type MainContentType = 
  PageQuery['page'] | 
  WebsiteQuery['website'] | 
  SoundsQuery['sounds'] | 
  PostQuery['post'];

interface MainContentProps {
  content: MainContentType;
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

// Type guard functions
const isPageQuery = (content: MainContentType): content is PageQuery['page'] => {
  return (content as PageQuery['page']).__typename === 'Page';
};

const isWebsiteQuery = (content: MainContentType): content is WebsiteQuery['website'] => {
  return (content as WebsiteQuery['website']).__typename === 'Website';
};

const isSoundsQuery = (content: MainContentType): content is SoundsQuery['sounds'] => {
  return (content as SoundsQuery['sounds']).__typename === 'Sounds';
};

const isPostQuery = (content: MainContentType): content is PostQuery['post'] => {
  return (content as PostQuery['post']).__typename === 'Post';
};

const MainContent: React.FC<MainContentProps> = ({ settings, content }) => {

  // console.log(settings)

  if (!settings || !content) return null;

  const checkMain = isPageQuery(content) || isWebsiteQuery(content) || isSoundsQuery(content) || isPostQuery(content);

  // Title can be taken from settings or content
  const title = settings?.title || (checkMain ? content.title : null);

  // Determine the text source
  const bodyText = settings?.title || (checkMain) ? content.body : null;

  // Combine text sources if available
  let text: TinaMarkdownContent | null = null;
  if (bodyText && bodyText.children.length !== 0) text = bodyText;

  // Determine if the title should be shown
  const showTitle = settings.show_title !== '' ? settings?.show_title : true;

  console.log('showTitle: ',showTitle)
  console.log('settings?.show_title: ',settings?.show_title)

  // Check if the section has any content
  const sectionHasContent = title || text;

  if (!sectionHasContent) return null;

  // Handle custom styles
  const color = settings?.styles?.colors || '';

  const sectionIDString = `ctas--section${title ? '-' + title : ''}`;
  const sectionID = 
    sectionIDString
      .toLowerCase()
      .replaceAll(/[^\w\s-]/gi, '')
      .replaceAll(/\s+/g, '-')
      .replaceAll(/-+/g, '-')
      .replaceAll(/^-|-$/g, '');

  let sectionCustomCSS = settings?.custom_css || '';
  if (sectionCustomCSS) {
    sectionCustomCSS = 
      sectionCustomCSS
        .replaceAll('==', '.' + sectionID)
        .replaceAll(';;', '##')
        .replaceAll(';', '!important;')
        .replaceAll('##', ';');
  }

  return (
    <section className={`page ${sectionID} ${color}`}>
      <div className="page-width">

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
