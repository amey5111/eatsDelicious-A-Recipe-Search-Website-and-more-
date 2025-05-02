'use client';

import { useEffect, useState } from 'react';

const TypingEffect = () => {
  const messages = [
    'Hi there, This is Magic Chef🧑🏼‍🍳',
    'How can I help you with your food😋'
  ];
  const [text, setText] = useState('');
  const [index, setIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (done) return;

    const currentMessage = messages[index];
    let typingSpeed = isDeleting ? 30 : 70;

    const timeout = setTimeout(() => {
      if (!isDeleting) {
        const updated = currentMessage.substring(0, charIndex + 1);
        setText(updated);
        setCharIndex(prev => prev + 1);

        // If finished typing current message
        if (updated === currentMessage) {
          if (index !== 1) {
            setTimeout(() => setIsDeleting(true), 1000); // erase first line after delay
          } else {
            setDone(true); // stop after second line
          }
        }
      } else {
        const updated = currentMessage.substring(0, charIndex - 1);
        setText(updated);
        setCharIndex(prev => prev - 1);

        if (updated === '') {
          setIsDeleting(false);
          setIndex(prev => prev + 1); // move to second message
        }
      }
    }, typingSpeed);

    return () => clearTimeout(timeout);
  }, [charIndex, isDeleting, index, done, messages]);

  return (
    <h1 className=" text-2xl lg:text-5xl font-bold mb-6 text-orange-500 dark:text-orange-400 pt-5 text-center border-x-2 border-orange-400 px-3 rounded-xl">
      {text}
      {!done && <span className="animate-pulse">|</span>}
    </h1>
  );
};

export default TypingEffect;
