'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { couple, wedding } from '@/lib/data';

export default function RSVP() {
  const [submitted, setSubmitted] = useState(false);
  const [attendance, setAttendance] = useState<'yes' | 'no' | ''>('');
  const [showTravelNote, setShowTravelNote] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setShowTravelNote(params.has('travel'));
  }, []);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const phone = '917406058845';
    const message =
      attendance === 'yes'
        ? "Hey Gopal & Madhushri! Count me in for the wedding 🎉"
        : "Hey Gopal & Madhushri! Tragically busy on those dates, but sending love 💌";
    const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
    setSubmitted(true);
  }

  return (
    <section className="scene bg-ink text-cream flex flex-col items-center justify-center px-6 py-24 relative overflow-hidden">
      {/* Ambient glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(circle at 50% 30%, rgba(217,177,95,0.10) 0%, transparent 50%), radial-gradient(circle at 50% 80%, rgba(212,83,126,0.12) 0%, transparent 55%)',
        }}
      />

      {/* Drifting golden particles */}
      {[...Array(12)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 rounded-full bg-gold/70 shadow-[0_0_6px_rgba(217,177,95,0.7)]"
          style={{ left: `${(i * 8) % 100}%`, top: '100%' }}
          animate={{
            top: ['100%', '-5%'],
            opacity: [0, 0.9, 0],
            x: [0, (i % 2 ? 20 : -20)],
          }}
          transition={{
            duration: 14 + (i % 5) * 2,
            delay: i * 1.1,
            repeat: Infinity,
            ease: 'linear',
          }}
        />
      ))}

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
        className="max-w-md w-full text-center relative z-10"
      >
        <p className="text-[10px] tracking-[0.4em] text-cream/40 mb-4">
          {couple.groom.name.toUpperCase()} · WEDS · {couple.bride.name.toUpperCase()}
        </p>
        <h2
          className="font-display italic text-[clamp(2.2rem,9vw,3.6rem)] leading-[1] mb-3 bg-clip-text text-transparent"
          style={{
            backgroundImage:
              'linear-gradient(120deg, #f5ede0 0%, #f3e1bb 35%, #d9b15f 50%, #f3e1bb 65%, #f5ede0 100%)',
          }}
        >
          see you on<br />the {wedding.shortDate.split('.')[0].trim()}th.
        </h2>
        <p className="text-cream/60 text-sm mb-8">
          {wedding.date} · {wedding.city}
        </p>

        {showTravelNote && (
          <p className="text-rose/90 text-xs sm:text-sm italic leading-relaxed mb-10 px-2">
            We're booking train tickets soon — please confirm ASAP so we can plan around you.
          </p>
        )}

        {!submitted ? (
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div>
              <label className="block text-[10px] tracking-[0.2em] text-cream/50 mb-3">
                WILL YOU BE THERE?
              </label>
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => setAttendance('yes')}
                  className={`flex-1 py-3 rounded border transition-all ${
                    attendance === 'yes'
                      ? 'bg-rose border-rose text-cream'
                      : 'border-cream/30 text-cream/70 hover:border-cream/60'
                  }`}
                >
                  yes, obviously
                </button>
                <button
                  type="button"
                  onClick={() => setAttendance('no')}
                  className={`flex-1 py-3 rounded border transition-all ${
                    attendance === 'no'
                      ? 'bg-cream/15 border-cream/40 text-cream'
                      : 'border-cream/30 text-cream/70 hover:border-cream/60'
                  }`}
                >
                  tragically busy
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={!attendance}
              className="mt-6 py-3 rounded bg-cream text-ink font-medium tracking-wider disabled:opacity-30 disabled:cursor-not-allowed hover:bg-cream/90 transition-colors flex items-center justify-center gap-2"
            >
              SEND ON WHATSAPP
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M.057 24l1.687-6.163a11.867 11.867 0 0 1-1.587-5.946C.16 5.335 5.495 0 12.05 0a11.817 11.817 0 0 1 8.413 3.488 11.824 11.824 0 0 1 3.48 8.414c-.003 6.557-5.338 11.892-11.893 11.892a11.9 11.9 0 0 1-5.688-1.448L.057 24zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413z"/>
              </svg>
            </button>
          </form>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="py-12 text-center"
          >
            <p className="font-display italic text-3xl text-rose mb-2">
              {attendance === 'yes' ? 'see you there.' : 'tragically noted.'}
            </p>
            <p className="text-cream/60 text-sm">
              your reply is teed up in WhatsApp — hit send and you're done.
            </p>
          </motion.div>
        )}

        <p className="mt-12 text-[10px] tracking-[0.3em] text-cream/30">
          {wedding.hashtag}
        </p>
      </motion.div>
    </section>
  );
}
