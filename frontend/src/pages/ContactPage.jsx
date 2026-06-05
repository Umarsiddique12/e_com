import { useState } from "react";
import { motion } from "framer-motion";
import { 
  Mail, MapPin, Phone, Clock, Send, MessageCircle, 
  Award, Shield, Clock as ClockIcon, Globe, ArrowRight, Headphones
} from "lucide-react";
import toast from "react-hot-toast";
import { submitToWeb3Forms } from "../lib/web3forms";

const contactInfo = [
  {
    icon: Mail,
    title: "Email Support",
    detail: "support@stylehub.com",
    sub: "Response within 2 hours",
    href: "mailto:support@stylehub.com",
  },
  {
    icon: Phone,
    title: "Phone Line",
    detail: "+1 (888) 555-0199",
    sub: "Available 24/7",
    href: "tel:+18885550199",
  },
  {
    icon: MapPin,
    title: "Our Location",
    detail: "450 Madison Avenue, NY",
    sub: "By appointment only",
  },
  {
    icon: Clock,
    title: "Business Hours",
    detail: "Monday – Friday",
    sub: "9:00 AM – 7:00 PM EST",
  },
];

const ContactPage = () => {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [sending, setSending] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSending(true);

    try {
      await submitToWeb3Forms({
        subject: `StyleHub Contact — ${form.subject}`,
        from_name: "StyleHub Contact Form",
        name: form.name,
        email: form.email,
        topic: form.subject,
        message: form.message,
      });
      toast.success("Message received. Our team will respond shortly.");
      setForm({ name: "", email: "", subject: "", message: "" });
    } catch (error) {
      toast.error("Failed to send. Please try again or call our support line.");
    } finally {
      setSending(false);
    }
  };

  return (
    <div className='min-h-screen bg-gray-50'>
      {/* Hero Section with Background Image */}
      <div className='relative h-[400px] bg-cover bg-center bg-fixed' style={{
        backgroundImage: 'url("https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2070")'
      }}>
        <div className='absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/70' />
        <div className='absolute inset-0 bg-gradient-to-t from-gray-50 to-transparent' />
        
        <div className='relative h-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center'>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className='max-w-2xl'
          >
            <div className='flex items-center gap-2 text-white/80 text-sm mb-4'>
              <span>Get in Touch</span>
              <span>→</span>
              <span className='text-white'>Contact Us</span>
            </div>
            <h1 className='text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 tracking-tight'>
              Let's connect
            </h1>
            <p className='text-white/80 text-lg mb-8 max-w-xl'>
              Whether you have a question about an order, need styling advice, 
              or want to discuss a bespoke piece — our team is here to help.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Main Content */}
      <div className='max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16'>
        
        {/* Contact Cards */}
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16'>
          {contactInfo.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className='bg-white rounded-xl p-6 border border-gray-200 hover:shadow-lg transition-shadow'
            >
              <div className='w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center mb-4'>
                <item.icon size={22} className='text-gray-900' />
              </div>
              <h3 className='font-semibold text-gray-900 mb-1'>{item.title}</h3>
              {item.href ? (
                <a href={item.href} className='text-gray-600 text-sm hover:text-gray-900 transition'>
                  {item.detail}
                </a>
              ) : (
                <p className='text-gray-600 text-sm'>{item.detail}</p>
              )}
              <p className='text-xs text-gray-400 mt-2'>{item.sub}</p>
            </motion.div>
          ))}
        </div>

        {/* Two Column Layout */}
        <div className='grid lg:grid-cols-2 gap-12'>
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className='bg-white rounded-2xl border border-gray-200 p-8 shadow-sm'
          >
            <h2 className='text-2xl font-bold text-gray-900 mb-2'>Send a message</h2>
            <p className='text-gray-500 mb-6'>Fill out the form below and we'll respond within 2 hours.</p>
            
            <form onSubmit={handleSubmit}>
              <div className='grid sm:grid-cols-2 gap-4 mb-4'>
                <div>
                  <label className='block text-sm font-medium text-gray-700 mb-2'>Full name</label>
                  <input
                    type='text'
                    name='name'
                    value={form.name}
                    onChange={handleChange}
                    required
                    placeholder='James Wilson'
                    className='w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent text-gray-900'
                  />
                </div>
                <div>
                  <label className='block text-sm font-medium text-gray-700 mb-2'>Email address</label>
                  <input
                    type='email'
                    name='email'
                    value={form.email}
                    onChange={handleChange}
                    required
                    placeholder='hello@example.com'
                    className='w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent text-gray-900'
                  />
                </div>
              </div>
              
              <div className='mb-4'>
                <label className='block text-sm font-medium text-gray-700 mb-2'>Subject</label>
                <select
                  name='subject'
                  value={form.subject}
                  onChange={handleChange}
                  required
                  className='w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent text-gray-900 bg-white'
                >
                  <option value=''>Select a topic</option>
                  <option value='order'>Order Inquiry</option>
                  <option value='return'>Returns & Exchanges</option>
                  <option value='shipping'>Shipping Question</option>
                  <option value='product'>Product Consultation</option>
                  <option value='wholesale'>Wholesale & Partnerships</option>
                  <option value='other'>General Inquiry</option>
                </select>
              </div>
              
              <div className='mb-6'>
                <label className='block text-sm font-medium text-gray-700 mb-2'>Message</label>
                <textarea
                  name='message'
                  value={form.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  placeholder='How can we assist you today?'
                  className='w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent text-gray-900 resize-none'
                />
              </div>
              
              <button
                type='submit'
                disabled={sending}
                className='w-full bg-gray-900 hover:bg-gray-800 text-white px-8 py-3 rounded-lg font-semibold transition flex items-center justify-center gap-2'
              >
                <Send size={18} />
                {sending ? "Sending..." : "Send Message"}
              </button>
            </form>
          </motion.div>

          {/* Right Column - Quick Help & Departments */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className='space-y-6'
          >
            {/* Quick Response */}
            <div className='bg-gray-50 rounded-2xl p-8 border border-gray-200'>
              <div className='flex items-center gap-3 mb-4'>
                <Headphones size={24} className='text-gray-900' />
                <h3 className='font-bold text-gray-900 text-lg'>Quick response</h3>
              </div>
              <ul className='space-y-3 text-gray-600'>
                <li className='flex items-start gap-3'>
                  <span className='text-gray-900 mt-0.5'>•</span>
                  <span>Average response time: <strong className='text-gray-900'>2 hours</strong></span>
                </li>
                <li className='flex items-start gap-3'>
                  <span className='text-gray-900 mt-0.5'>•</span>
                  <span>24/7 support for urgent matters</span>
                </li>
                <li className='flex items-start gap-3'>
                  <span className='text-gray-900 mt-0.5'>•</span>
                  <span>Live chat available during business hours</span>
                </li>
              </ul>
            </div>

            {/* Department Contacts */}
            <div className='bg-white rounded-2xl p-8 border border-gray-200 shadow-sm'>
              <h3 className='font-bold text-gray-900 text-lg mb-4'>Department contacts</h3>
              <div className='space-y-4'>
                <div className='border-b border-gray-100 pb-3'>
                  <p className='text-xs text-gray-400 uppercase tracking-wide mb-1'>Orders & Support</p>
                  <a href='mailto:support@stylehub.com' className='text-gray-900 font-medium hover:text-gray-600 transition'>
                    support@stylehub.com
                  </a>
                </div>
                <div className='border-b border-gray-100 pb-3'>
                  <p className='text-xs text-gray-400 uppercase tracking-wide mb-1'>Returns</p>
                  <a href='mailto:returns@stylehub.com' className='text-gray-900 font-medium hover:text-gray-600 transition'>
                    returns@stylehub.com
                  </a>
                </div>
                <div>
                  <p className='text-xs text-gray-400 uppercase tracking-wide mb-1'>Wholesale</p>
                  <a href='mailto:wholesale@stylehub.com' className='text-gray-900 font-medium hover:text-gray-600 transition'>
                    wholesale@stylehub.com
                  </a>
                </div>
              </div>
            </div>

            {/* Virtual Consultation */}
            <div className='bg-gray-900 rounded-2xl p-8 text-center'>
              <h3 className='font-bold text-white text-lg mb-2'>Virtual consultation</h3>
              <p className='text-gray-300 text-sm mb-4'>
                Book a 1-on-1 video call with our style advisors
              </p>
              <button className='inline-flex items-center gap-2 text-white border border-white/30 hover:bg-white/10 px-5 py-2 rounded-lg transition text-sm'>
                Schedule now <ArrowRight size={16} />
              </button>
            </div>
          </motion.div>
        </div>

        {/* Trust Badges */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className='mt-16 pt-8 border-t border-gray-200 grid grid-cols-2 md:grid-cols-4 gap-8 text-center'
        >
          <div>
            <div className='w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-2'>
              <Award size={18} className='text-gray-900' />
            </div>
            <p className='text-sm font-medium text-gray-900'>Premium Quality</p>
            <p className='text-xs text-gray-500'>Curated collection</p>
          </div>
          <div>
            <div className='w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-2'>
              <Shield size={18} className='text-gray-900' />
            </div>
            <p className='text-sm font-medium text-gray-900'>Secure Payment</p>
            <p className='text-xs text-gray-500'>256-bit encryption</p>
          </div>
          <div>
            <div className='w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-2'>
              <ClockIcon size={18} className='text-gray-900' />
            </div>
            <p className='text-sm font-medium text-gray-900'>Fast Support</p>
            <p className='text-xs text-gray-500'>2-hour response</p>
          </div>
          <div>
            <div className='w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-2'>
              <Globe size={18} className='text-gray-900' />
            </div>
            <p className='text-sm font-medium text-gray-900'>Worldwide</p>
            <p className='text-xs text-gray-500'>Global shipping</p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ContactPage;