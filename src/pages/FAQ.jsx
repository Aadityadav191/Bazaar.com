import React from 'react';

const FAQ_DATA = [
  {
    category: "General Information",
    questions: [
      {
        q: "What is Bazaar.com?",
        a: "Bazaar.com is a leading multi-vendor marketplace designed to connect independent sellers with global buyers. We provide a platform for unique products ranging from handmade crafts to modern electronics."
      },
      {
        q: "How do I create an account?",
        a: "Click the 'Login / Register' button in the top navigation bar. You can sign up using your email address or quickly via your Google or Facebook account."
      }
    ]
  },
  {
    category: "Orders & Payments",
    questions: [
      {
        q: "How do I place an order?",
        a: "Browse our shop, add items to your cart, and proceed to checkout. You will receive an email confirmation once your order is successfully placed."
      },
      {
        q: "What payment methods do you accept?",
        a: "We accept all major credit cards (Visa, Mastercard, Amex), PayPal, and Apple Pay. Your transactions are secured with industry-standard SSL encryption."
      },
      {
        q: "Can I cancel my order?",
        a: "Orders can be canceled within 2 hours of placement. After that, the order may have already been processed for shipping. Check your 'Order History' to see if cancellation is still available."
      }
    ]
  },
  {
    category: "Shipping & Returns",
    questions: [
      {
        q: "How long does shipping take?",
        a: "Standard shipping typically takes 3-5 business days. International shipping varies by location but usually arrives within 7-14 business days."
      },
      {
        q: "What is your return policy?",
        a: "We offer a 30-day return policy for most items. Products must be in their original packaging and unused condition. Please visit our Returns Portal to start a claim."
      }
    ]
  }
];

export default function FAQ() {
  return (
    <div className='bg-gray-50 min-h-screen py-12 px-4'>
      <div className='max-w-4xl mx-auto'>
        <div className='text-center mb-12'>
          <h1 className='text-4xl font-extrabold text-gray-900 mb-4'>Help & Support</h1>
          <p className='text-lg text-gray-600'>Everything you need to know about shopping on Bazaar.com</p>
        </div>

        <div className='space-y-12'>
          {FAQ_DATA.map((section, idx) => (
            <section key={idx}>
              <h2 className='text-2xl font-bold text-indigo-600 mb-6 border-b-2 border-indigo-100 pb-2'>
                {section.category}
              </h2>
              <div className='grid gap-6'>
                {section.questions.map((item, qIdx) => (
                  <div key={qIdx} className='bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 border border-gray-100'>
                    <h3 className='text-lg font-semibold text-gray-800'>{item.q}</h3>
                    <p className='text-gray-600 mt-3 leading-relaxed'>{item.a}</p>
                  </div>
                ))}
              </div>
            </section>
          ))}
        </div>

        <div className='mt-16 p-8 bg-indigo-600 rounded-2xl text-center text-white'>
          <h3 className='text-xl font-bold mb-2'>Still have questions?</h3>
          <p className='mb-6 opacity-90'>Our support team is available 24/7 to help you with any issues.</p>
          <button className='bg-white text-indigo-600 px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors'>
            Contact Support
          </button>
        </div>
      </div>
    </div>
  );
}