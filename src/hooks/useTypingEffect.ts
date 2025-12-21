import { useState, useEffect, useCallback } from 'react';

interface UseTypingEffectOptions {
  phrases: string[];
  typingSpeed?: number;
  deletingSpeed?: number;
  pauseDuration?: number;
}

export function useTypingEffect({
  phrases,
  typingSpeed = 100,
  deletingSpeed = 50,
  pauseDuration = 2000,
}: UseTypingEffectOptions) {
  const [displayText, setDisplayText] = useState('');
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(true);
  const [isPaused, setIsPaused] = useState(false);

  const currentPhrase = phrases[phraseIndex];

  useEffect(() => {
    if (isPaused) {
      const pauseTimeout = setTimeout(() => {
        setIsPaused(false);
        setIsTyping(false);
      }, pauseDuration);
      return () => clearTimeout(pauseTimeout);
    }

    if (isTyping) {
      if (displayText.length < currentPhrase.length) {
        const typingTimeout = setTimeout(() => {
          setDisplayText(currentPhrase.slice(0, displayText.length + 1));
        }, typingSpeed);
        return () => clearTimeout(typingTimeout);
      } else {
        setIsPaused(true);
      }
    } else {
      if (displayText.length > 0) {
        const deletingTimeout = setTimeout(() => {
          setDisplayText(displayText.slice(0, -1));
        }, deletingSpeed);
        return () => clearTimeout(deletingTimeout);
      } else {
        setPhraseIndex((prev) => (prev + 1) % phrases.length);
        setIsTyping(true);
      }
    }
  }, [displayText, isTyping, isPaused, currentPhrase, phrases.length, typingSpeed, deletingSpeed, pauseDuration]);

  return displayText;
}
