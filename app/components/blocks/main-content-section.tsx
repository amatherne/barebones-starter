// ../components/blocks/main-content-section.tsx

import React from 'react';
import { TinaMarkdown, TinaMarkdownContent } from 'tinacms/dist/rich-text';
import { 
  PageQuery, 
  WebsiteQuery, 
  SoundsQuery, 
  PostQuery 
} from '../../tina/__generated__/types';

type MainContentType = 
  PageQuery['page'] | 
  WebsiteQuery['website'] | 
  SoundsQuery['sounds'] | 
  PostQuery['post'];

interface MainContentProps {
  content: MainContentType;
  settings?: {
    title?: string;
    text?: TinaMarkdownContent;
    styles?: {
      colors?: string;
    };
    custom_css?: string;
  } | null;
}

const MainContent: React.FC<MainContentProps> = ({ settings, content }) => {

  const pageContent         = content.page;

  if (!settings && !content.page) return null;

  const title               = settings?.title || pageContent?.title || null;
  const bodyText            = pageContent?.body;
  const sectionText         = settings?.text;
 
  let text                  = null;
  if (bodyText && bodyText.children.length !== 0) text = bodyText;
  if (sectionText && sectionText.children.length !== 0) text = sectionText;

  const showTitle           = content.page._sys.filename !== "home";

  const sectionHasContent   = title || text;

  if (!sectionHasContent) return null;

  const color               = settings?.styles?.colors || '';

  const sectionIDString     = `ctas--section${title ? '-' + title : ''}`;
  const sectionID = 
    sectionIDString
      .toLowerCase()
      .replaceAll(/[^\w\s-]/gi, '')
      .replaceAll(/\s+/g, '-')
      .replaceAll(/-+/g, '-')
      .replaceAll(/^-|-$/g, '');

  let sectionCustomCSS      = settings?.custom_css || '';
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
