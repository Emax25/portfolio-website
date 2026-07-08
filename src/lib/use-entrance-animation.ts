import { useReducedMotion } from 'motion/react';

const entrance = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
};

/** Standard page-entrance motion props; empty under prefers-reduced-motion. */
export function useEntranceAnimation() {
  return useReducedMotion() ? {} : entrance;
}
