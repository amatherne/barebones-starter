// ../components/blocks/contact-form.tsx

import React, { useState } from 'react';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
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
        setStatus('Message sent!');
        setFormData({ name: '', email: '', message: '' });
      } else {
        setStatus('Error sending message.');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setStatus('Error sending message.');
    }
  };

  return (
    <>
      <section className="section">
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
                <button type="submit" className="button button--secondary ">Send</button>
                <p>{status}</p>
              </div>

            </div>
          </div>
        </form>
      </section>
    </>
  );
};

export default ContactForm;

