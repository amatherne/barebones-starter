// ../components/blocks/contact-form.tsx

import React, { useState } from 'react';
import { TinaMarkdown, TinaMarkdownContent } from 'tinacms/dist/rich-text';

interface ContactProps {
  content: MainContentType;
  index?: number;
  settings?: {
    title?: string;
    text?: TinaMarkdownContent;
    styles?: {
      colors?: string;
    };
    custom_css?: string;
  } | null;
}

const ContactForm: React.FC<ContactProps> = ({settings}) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [status, setStatus] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setStatus('Sending...');
    
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();
      if (result.success) {
        e.target.querySelector('.cell').classList.add('hide');
        e.target.querySelector('.form--message').classList.remove('hide');
        setStatus(`Message sent!\nI'll get back to you soon!`);
        setFormData({ 
          name: '', 
          email: '', 
          subject: '', 
          message: '' 
        });
      } else {
        e.target.querySelector('.form--message').classList.remove('hide');
        e.target.querySelector('.form--message').classList.add('error');
        setStatus('Error sending message.');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setStatus('Error sending message.');
    }
  };

  const title                                           = settings?.title;
  const bodyText                                        = settings?.text;

  let text: TinaMarkdownContent | null                  = null;
  if (bodyText && bodyText.children.length !== 0) text  = bodyText;

  return (
    <>
      <section className="section">

        { title || text ? (
          <div className="section--title text-center">
            {title ? (
              <h2 className="h1">{title}</h2>
            ) : null}
            {text ? (
              <div className="rte">
                <TinaMarkdown content={text} />
              </div>
            ) : null}
          </div>
        ) : null }

        <form onSubmit={handleSubmit}>
          <div className="page-width page-width--narrow">
            <div className="cell sm--double-bottom">
              <div className="cell__item md-up--w-50">
                <div className="input">
                  <input
                    className="input__field"
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder=""
                    required
                  />
                  <label className="input__label" htmlFor="name">Name*</label>
                </div>
              </div>
              <div className="cell__item md-up--w-50">
                <div className="input">
                  <input
                    className="input__field"
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder=""
                    required
                  />
                  <label className="input__label" htmlFor="email">Email*</label>
                </div>
              </div>
              <div className="cell__item ">
                <div className="input">
                  <input
                    className="input__field"
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder=""
                  />
                  <label className="input__label" htmlFor="subject">Subject</label>
                </div>
              </div>
              <div className="cell__item ">
                <div className="input">
                  <textarea
                    className="input__textarea"
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder=""
                    rows="10"
                    required
                  />
                  <label className="input__label" htmlFor="message">Message*</label>
                </div>
              </div>

              <div className="cell__item text-center">
                <button type="submit" className="button button--gradient ">
                  <span>Send</span>
                </button>
              </div>

            </div>
            <div className="form--message hide" dangerouslySetInnerHTML={{ __html: status }} />
          </div>
        </form>
      </section>
    </>
  );
};

export default ContactForm;

