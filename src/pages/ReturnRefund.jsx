import React from 'react';

export default function ReturnRefund() {
  return (
    <div className="bg-gray-50 min-h-screen py-12 px-4">
      <div className="max-w-4xl mx-auto bg-white shadow-sm rounded-2xl p-8 md:p-12 border border-gray-100">
        
        {/* Header Section */}
        <div className="border-b border-gray-100 pb-8 mb-8 text-center">
          <h1 className="text-4xl font-extrabold text-gray-900 mb-4">Return & Refund Policy</h1>
          <p className="text-gray-500 italic">Last Updated: October 2023</p>
        </div>

        {/* Quick Summary Box */}
        <div className="bg-indigo-50 border-l-4 border-indigo-500 p-6 mb-10 rounded-r-lg">
          <h3 className="font-bold text-indigo-900 mb-2">The Short Version:</h3>
          <ul className="list-disc list-inside text-indigo-800 space-y-1">
            <li><strong>30 Days</strong> to return most items.</li>
            <li><strong>Free returns</strong> on damaged or incorrect orders.</li>
            <li>Refunds processed within <strong>5-7 business days</strong>.</li>
          </ul>
        </div>

        <div className="space-y-10 text-gray-700 leading-relaxed">
          
          {/* Section 1: Returns */}
          <section>
            <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
              <span className="bg-gray-100 p-2 rounded-lg mr-3">📦</span> 1. Return Eligibility
            </h2>
            <p className="mb-4">
              We want you to love what you bought. If you're not satisfied, you may return items within <strong>30 days of delivery</strong>. To be eligible for a return, your item must be:
            </p>
            <ul className="list-disc ml-6 space-y-2">
              <li>Unused and in the same condition that you received it.</li>
              <li>In the original packaging with all tags attached.</li>
              <li>Accompanied by the receipt or proof of purchase.</li>
            </ul>
          </section>

          {/* Section 2: Non-Returnable Items */}
          <section>
            <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
              <span className="bg-gray-100 p-2 rounded-lg mr-3">⚠️</span> 2. Non-Returnable Items
            </h2>
            <p>Some items are exempt from being returned due to health or safety reasons:</p>
            <ul className="list-disc ml-6 mt-3 space-y-2 text-gray-500">
              <li>Perishable goods (food, flowers, plants).</li>
              <li>Personal care items (beauty products, skincare).</li>
              <li>Custom-made or personalized products.</li>
              <li>Downloadable software products or gift cards.</li>
            </ul>
          </section>

          {/* Section 3: The Refund Process */}
          <section>
            <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
              <span className="bg-gray-100 p-2 rounded-lg mr-3">💰</span> 3. Refunds & Processing
            </h2>
            <p>
              Once your return is received and inspected, we will send you an email to notify you that we have received your returned item. 
            </p>
            <p className="mt-4">
              If approved, your refund will be processed, and a credit will automatically be applied to your original method of payment within <strong>5 to 7 business days</strong>.
            </p>
          </section>

          {/* Section 4: Shipping Costs */}
          <section>
            <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
              <span className="bg-gray-100 p-2 rounded-lg mr-3">🚚</span> 4. Shipping Costs
            </h2>
            <p>
              If the return is a result of our error (you received an incorrect or defective item), we will pay the return shipping costs. In other cases, you will be responsible for paying your own shipping costs for returning your item. Shipping costs are non-refundable.
            </p>
          </section>

        </div>

        {/* Support Footer */}
        <div className="mt-12 pt-8 border-t border-gray-100 text-center">
          <p className="text-gray-600 mb-4">Need help with a specific return?</p>
          <a 
            href="mailto:support@bazaar.com" 
            className="text-indigo-600 font-bold hover:underline"
          >
            Contact our Returns Department →
          </a>
        </div>
      </div>
    </div>
  );
}