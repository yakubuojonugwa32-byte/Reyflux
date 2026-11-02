import React, { useState } from 'react';
import { MapPin, Phone, Clock, Mail, Send, CheckCircle2, Navigation, MessageSquare, ExternalLink } from 'lucide-react';
import { COMPANY_INFO, createWhatsAppUrl } from '../data/companyInfo';

export const LocationAndContact: React.FC = () => {
  const [formState, setFormState] = useState({
    name: '',
    phone: '',
    subject: 'General Inquiry',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const getWhatsAppInquiryUrl = () => {
    const msg = `Hello Reyflux Enterprises, website inquiry from ${formState.name || 'Customer'} (${formState.phone || 'No phone'}):
Subject: ${formState.subject}
Message: ${formState.message || 'I want to inquire about your organic foodstuffs.'}`;
    return createWhatsAppUrl(msg);
  };

  return (
    <section id="contact" className="py-8 sm:py-10 bg-amber-50/30 dark:bg-slate-900 border-t border-amber-200/50 dark:border-slate-800">
      <div className="w-full max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-red-100 dark:bg-red-950/80 border border-red-300 dark:border-red-800 text-red-900 dark:text-red-300 text-xs font-bold uppercase tracking-wider">
            <MapPin className="w-4 h-4 text-red-600" />
            <span>VISIT OR CONTACT OUR SULEJA DEPOT</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Address, Hotlines & Direct Inquiries
          </h2>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400">
            Located conveniently in Suleja, Niger State. Visit our store or reach out directly on mobile or WhatsApp for immediate service.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Address Card & Map Frame */}
          <div className="lg:col-span-6 bg-white dark:bg-slate-800/80 p-6 sm:p-8 rounded-3xl border border-amber-200 dark:border-slate-700 shadow-sm space-y-6">
            
            <div className="space-y-4">
              <div className="p-4 bg-amber-50 dark:bg-slate-900 rounded-2xl border border-amber-200/80 dark:border-slate-800 space-y-3">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl bg-red-600 text-white flex items-center justify-center font-bold shrink-0 mt-0.5">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-extrabold text-slate-900 dark:text-white text-base">Store Address</h3>
                    <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 mt-1 font-semibold leading-relaxed">
                      {COMPANY_INFO.address}
                    </p>
                    <p className="text-[11px] text-amber-800 dark:text-amber-400 font-bold mt-1">
                      Landmark: {COMPANY_INFO.landmark}
                    </p>
                  </div>
                </div>
              </div>

              {/* Phone Hotlines */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {COMPANY_INFO.phones.map((phone, idx) => (
                  <a
                    key={phone}
                    href={`tel:${phone}`}
                    className="p-3 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-amber-400 transition-colors flex items-center justify-between"
                  >
                    <div>
                      <div className="text-[10px] text-slate-500 font-semibold uppercase">Hotline {idx + 1}</div>
                      <div className="font-mono font-extrabold text-slate-900 dark:text-white text-sm">{phone}</div>
                    </div>
                    <Phone className="w-4 h-4 text-emerald-600" />
                  </a>
                ))}
              </div>

              {/* Operating Hours */}
              <div className="p-4 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 space-y-2 text-xs">
                <div className="flex items-center gap-2 font-bold text-slate-900 dark:text-white">
                  <Clock className="w-4 h-4 text-amber-600" />
                  <span>Business Opening Hours</span>
                </div>
                <div className="grid grid-cols-2 gap-2 text-slate-600 dark:text-slate-400 pt-1">
                  <div>Monday - Saturday: <span className="font-bold text-slate-800 dark:text-slate-200">{COMPANY_INFO.workingHours.weekdays}</span></div>
                  <div>Sunday: <span className="font-bold text-slate-800 dark:text-slate-200">{COMPANY_INFO.workingHours.sunday}</span></div>
                </div>
              </div>
            </div>

            {/* Simulated Interactive Map */}
            <div className="relative rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-700 h-52 bg-slate-900 flex flex-col justify-end p-4 text-white">
              <div className="absolute inset-0 bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:16px_16px] opacity-20 pointer-events-none" />
              
              <div className="relative z-10 space-y-2">
                <div className="inline-flex items-center gap-1.5 bg-red-600 text-white text-[10px] font-bold px-2.5 py-1 rounded-full shadow-md">
                  <Navigation className="w-3 h-3" />
                  <span>Suleja Depot Location</span>
                </div>
                <p className="text-xs font-bold text-slate-200">
                  Second Gate by Yaro College Road, Adjacent Alheri Plaza, Suleja
                </p>
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(COMPANY_INFO.address)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white text-slate-950 font-bold text-xs rounded-lg hover:bg-amber-100 transition-colors"
                >
                  <span>Open Directions in Google Maps</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

          </div>

          {/* Right Column: Direct Message Form */}
          <div className="lg:col-span-6 bg-white dark:bg-slate-800/80 p-6 sm:p-8 rounded-3xl border border-amber-200 dark:border-slate-700 shadow-sm space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-bold">
                <MessageSquare className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-extrabold text-slate-900 dark:text-white text-base">Direct Customer Inquiry</h3>
                <p className="text-xs text-slate-500">Send an instant message to our team</p>
              </div>
            </div>

            {!submitted ? (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Your Full Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Maryam Bello"
                    value={formState.name}
                    onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                    className="w-full px-3.5 py-2.5 text-xs bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Phone Number</label>
                    <input
                      type="tel"
                      required
                      placeholder="e.g. 09064153934"
                      value={formState.phone}
                      onChange={(e) => setFormState({ ...formState, phone: e.target.value })}
                      className="w-full px-3.5 py-2.5 text-xs bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Topic</label>
                    <select
                      value={formState.subject}
                      onChange={(e) => setFormState({ ...formState, subject: e.target.value })}
                      className="w-full px-3.5 py-2.5 text-xs bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white"
                    >
                      <option value="Palm Oil Order">Pure Organic Palm Oil</option>
                      <option value="Garri Order">Fresh Yellow / White Garri</option>
                      <option value="Cassava Flour">High Quality Cassava Flour</option>
                      <option value="Plantain Flour">Plantain Flour</option>
                      <option value="Amala Flour">Amala Yam Flour</option>
                      <option value="Groundnut Order">Crispy / Raw Groundnut</option>
                      <option value="Wholesale Contract">Commercial Wholesale Order</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Your Message or Quantity Details</label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Tell us what you need (e.g., I need 2 jerricans of 25L Palm Oil and 1 sack of Plantain Flour delivered to Zuba, Abuja)..."
                    value={formState.message}
                    onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                    className="w-full px-3.5 py-2.5 text-xs bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white"
                  />
                </div>

                <div className="flex gap-3">
                  <a
                    href={getWhatsAppInquiryUrl()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 inline-flex items-center justify-center gap-2 py-3 px-4 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl transition-colors shadow-md"
                  >
                    <Send className="w-4 h-4" />
                    <span>Send via WhatsApp</span>
                  </a>

                  <button
                    type="submit"
                    className="px-5 py-3 text-xs font-bold text-slate-800 dark:text-slate-200 bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 rounded-xl transition-colors"
                  >
                    Submit Form
                  </button>
                </div>
              </form>
            ) : (
              <div className="p-6 bg-emerald-50 dark:bg-emerald-950/50 rounded-2xl border border-emerald-200 text-center space-y-3">
                <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
                <h4 className="font-extrabold text-slate-900 dark:text-white text-base">Inquiry Submitted!</h4>
                <p className="text-xs text-slate-600 dark:text-slate-300">
                  Thank you, {formState.name}. A representative from Reyflux Enterprises Limited will contact you shortly at {formState.phone}.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="text-xs font-bold text-emerald-700 underline"
                >
                  Send another inquiry
                </button>
              </div>
            )}

          </div>

        </div>

      </div>
    </section>
  );
};
