import { useState } from 'react';
import { EMAILJS_CONFIG } from '../lib/environment';
import { PROFILE_DATA } from '../data/profile';
import { AlertCircle, CheckCircle2, RefreshCw, Send } from '../components/icons';

export function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState('');
  const [form, setForm] = useState({ name: '', email: '', message: '' });

  const submit = async (event: React.FormEvent) => {
    event.preventDefault(); setSending(true); setError('');
    try {
      if (!EMAILJS_CONFIG.SERVICE_ID || !EMAILJS_CONFIG.TEMPLATE_ID || !EMAILJS_CONFIG.PUBLIC_KEY) throw new Error('Missing EmailJS environment variables');
      const response = await fetch('https://api.emailjs.com/api/v1.0/email/send', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ service_id: EMAILJS_CONFIG.SERVICE_ID, template_id: EMAILJS_CONFIG.TEMPLATE_ID, user_id: EMAILJS_CONFIG.PUBLIC_KEY, template_params: { from_name: form.name, from_email: form.email, message: form.message, to_email: PROFILE_DATA.email } }) });
      if (!response.ok) {
        const details = await response.text();
        throw new Error(details || `EmailJS HTTP status: ${response.status}`);
      }
      setSubmitted(true);
    } catch (submitError) {
      console.error(submitError);
      setError(submitError instanceof Error ? submitError.message : 'Unable to send the email. Please try again later.');
    } finally { setSending(false); }
  };

  return <div className="max-w-md mx-auto p-6 rounded-md bg-[#0d1117] border border-[#30363d] space-y-4"><h2 className="text-lg font-bold text-white">Direct Contact & Inquiry</h2>{submitted ? <div className="p-4 text-center text-emerald-400"><CheckCircle2 className="w-6 h-6 mx-auto"/><p className="font-bold mt-2">Message sent successfully!</p></div> : <form onSubmit={submit} className="space-y-3 text-xs">{error && <div className="p-2.5 rounded bg-rose-950/40 border border-rose-500/40 text-rose-300 flex gap-2"><AlertCircle className="w-4 h-4"/> {error}</div>}<input required value={form.name} onChange={event => setForm({...form, name: event.target.value})} placeholder="Your Name" className="w-full p-2.5 rounded bg-[#161b22] border border-[#30363d] text-white"/><input required type="email" value={form.email} onChange={event => setForm({...form, email: event.target.value})} placeholder="Email Address" className="w-full p-2.5 rounded bg-[#161b22] border border-[#30363d] text-white"/><textarea required rows={4} value={form.message} onChange={event => setForm({...form, message: event.target.value})} placeholder="Message / Job Opportunity" className="w-full p-2.5 rounded bg-[#161b22] border border-[#30363d] text-white resize-none"/><button disabled={sending} className="w-full py-2.5 rounded bg-purple-600 text-white font-bold flex justify-center items-center gap-2">{sending ? <RefreshCw className="w-3.5 h-3.5 animate-spin"/> : <Send className="w-3.5 h-3.5"/>}{sending ? 'Sending...' : 'Send Inquiry'}</button></form>}</div>;
}
