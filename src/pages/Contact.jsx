import React, { useState } from 'react';
import { Mail, Phone, MapPin, MessageSquare, Send, Globe } from 'lucide-react';

const Contact = () => {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-white text-gray-900 font-sans">
      {/* Header Section */}
      <section className="bg-gray-50 py-16 border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-extrabold mb-4">Get in Touch</h1>
          <p className="text-gray-500 max-w-xl mx-auto text-lg">
            Have a question about an order or just want to say hi? Our team usually responds within 24 hours.
          </p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid lg:grid-cols-3 gap-16">
          
          {/* Contact Info Sidebar */}
          <div className="lg:col-span-1 space-y-12">
            <div>
              <h3 className="text-xl font-bold mb-6">Contact Information</h3>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="bg-indigo-100 p-3 rounded-lg text-indigo-600">
                    <Mail className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="font-semibold">Email us</p>
                    <p className="text-gray-500 text-sm">support@lumina.com</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-indigo-100 p-3 rounded-lg text-indigo-600">
                    <Phone className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="font-semibold">Call us</p>
                    <p className="text-gray-500 text-sm">+1 (555) 000-0000</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-indigo-100 p-3 rounded-lg text-indigo-600">
                    <MapPin className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="font-semibold">Visit our Studio</p>
                    <p className="text-gray-500 text-sm">123 Design District, <br/>New York, NY 10001</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-8 bg-indigo-600 rounded-3xl text-white">
              <MessageSquare className="w-8 h-8 mb-4 text-indigo-200" />
              <h4 className="text-lg font-bold mb-2">Live Chat</h4>
              <p className="text-indigo-100 text-sm mb-6">Available Mon-Fri, 9am - 5pm EST for instant support.</p>
              <button className="w-full bg-white text-indigo-600 py-3 rounded-xl font-bold hover:bg-indigo-50 transition-colors">
                Start Chatting
              </button>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            {!submitted ? (
              <form onSubmit={handleSubmit} className="space-y-6 bg-white border p-8 md:p-12 rounded-3xl shadow-sm">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                    <input 
                      type="text" 
                      required
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all"
                      placeholder="Jane Doe"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                    <input 
                      type="email" 
                      required
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all"
                      placeholder="jane@example.com"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Subject</label>
                  <select className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-indigo-500 outline-none">
                    <option>Order Inquiry</option>
                    <option>Returns & Exchanges</option>
                    <option>Product Question</option>
                    <option>Wholesale</option>
                    <option>Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
                  <textarea 
                    rows="5" 
                    required
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-indigo-500 outline-none"
                    placeholder="How can we help you?"
                  ></textarea>
                </div>

                <button 
                  type="submit"
                  className="w-full bg-gray-900 text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-gray-800 transition-all"
                >
                  Send Message <Send className="w-4 h-4" />
                </button>
              </form>
            ) : (
              <div className="bg-green-50 text-green-800 p-12 rounded-3xl text-center border border-green-100">
                <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Globe className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-2xl font-bold mb-2">Message Sent!</h3>
                <p className="mb-6">Thank you for reaching out. We've received your inquiry and will get back to you shortly.</p>
                <button 
                  onClick={() => setSubmitted(false)}
                  className="text-green-800 font-bold underline"
                >
                  Send another message
                </button>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Mini FAQ Section */}
      <section className="bg-gray-50 py-20">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold mb-8">Quick Answers</h2>
          <div className="space-y-4 text-left">
            {[
              { q: "How do I track my order?", a: "Once shipped, you’ll receive an email with a tracking link." },
              { q: "What is your return policy?", a: "We offer a 30-day window for all unused items." },
              { q: "Do you ship internationally?", a: "Yes, we ship to over 50 countries worldwide." }
            ].map((item, i) => (
              <div key={i} className="bg-white p-6 rounded-2xl border border-gray-200">
                <p className="font-bold text-gray-900 mb-1">{item.q}</p>
                <p className="text-gray-500 text-sm">{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;