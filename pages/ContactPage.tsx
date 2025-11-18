import React, { useState } from 'react';
import { motion } from 'framer-motion';
import PageLayout from '../components/PageLayout';
import Button from '../components/ui/Button'; // Import the custom Button component

const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({
        name: '',
        email: '',
        message: ''
      });
    }, 4000);
  };

  return (
    <PageLayout>
      <section className="py-24 md:py-32">
        <div className="container mx-auto px-6 md:px-12 lg:px-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tighter text-brand-dark">
              Let's Create Together
            </h1>
            <p className="text-lg md:text-xl mt-4 text-brand-gray">
              Have a project in mind or just want to say hello? We'd love to hear from you.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="max-w-xl mx-auto mt-16"
          >
            {submitted ? (
              <div className="text-center p-8 bg-white rounded-lg shadow-md border border-zinc-200">
                <h2 className="text-2xl font-bold text-brand-dark">Thank You!</h2>
                <p className="text-brand-gray mt-2">Your message has been sent. We'll get back to you shortly.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-brand-gray mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Your Name"
                    className="w-full px-4 py-3 bg-white border border-zinc-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-dark transition-colors"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-brand-gray mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="your.email@example.com"
                    className="w-full px-4 py-3 bg-white border border-zinc-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-dark transition-colors"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-brand-gray mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell us about your project..."
                    className="w-full px-4 py-3 bg-white border border-zinc-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-dark transition-colors"
                    required
                  />
                </div>

                <div className="text-center pt-4">
                  <Button size="lg" type="submit">
                    Send Message
                  </Button>
                </div>
              </form>
            )}
          </motion.div>
        </div>
      </section>
    </PageLayout>
  );
};

export default ContactPage;