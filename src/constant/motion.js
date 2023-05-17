export const staggerContainer = (staggerChildren, delayChildren) => ({
  hidden: {},
  show: {
    transition: {
      staggerChildren,
      delayChildren,
    },
  },
});

export const planetVariants = (direction) => ({
  hidden: {
    x: direction === 'left' ? '-200%' : '100%',
    rotate: 360,
    opacity: 0,
  },
  show: {
    x: 0,
    rotate: 0,
    opacity: 1,
    transition: {
      type: 'spring',
      duration: 1.2,
      delay: 0.4,
      bounce: 0.47,
      damping: 20,
      stiffness: 200,
    },
  },
});
export const zoomandRotate = (delay, duration) => ({
  hidden: {
    x: '-50%',
    scale: 0,
    // rotate: 360,
    opacity: 0,
  },
  show: {
    scale: 1,
    x: '-50%',
    // rotate: 0,
    opacity: 1,
    transition: {
      type: 'spring',
      duration: 5,
      delay: delay,
      bounce: 0.27,
      damping: 7,
      stiffness: 200,
    },
  },
});

export const moveDetail = (direction) => ({
  hidden: {
    x: direction === 'left' ? '-50%' : '50%',
    opacity: 0,
  },
  show: {
    x: 0,
    opacity: 1,
    transition: {
      type: 'spring',
      duration: 1.2,
      delay: 1.5,
      bounce: 0.47,

      damping: 20,
      stiffness: 150,
    },
  },
});

export const dropAlpha = (direction, delay, bounce) => ({
  hidden: {
    y: direction === 'left' ? '-200%' : '0%',
    opacity: 0,
    scale: 1,
  },
  show: {
    y: 0,
    opacity: 1,

    scale: 1,
    transition: {
      type: 'spring',
      duration: 1.2,
      delay: delay,
      bounce: bounce,
    },
  },
});
export const dropAlpha2 = (direction, delay, bounce) => ({
  hidden: {
    y: direction === 'left' ? '-200%' : '0%',
    opacity: 0,
    scale: 1,
    x: '-50%',
  },
  show: {
    y: 0,
    opacity: 1,
    x: '-50%',

    scale: 1,
    transition: {
      type: 'spring',
      duration: 1.2,
      delay: delay,
      bounce: bounce,
    },
  },
});

export const zoomIn = (delay, duration, scale) => ({
  hidden: {
    scale: scale || 0.8,
    opacity: 0,
  },
  show: {
    scale: 1,
    opacity: 1,
    transition: {
      type: 'spring',
      delay,
      duration,
      ease: 'easeOut',
    },
  },
  exit: {
    scale: 0,
    opacity: 0,
  },
});

export const zoomIn50 = (delay, duration) => ({
  hidden: {
    scale: 0,
    opacity: 0,
    x: '-50%',
  },
  show: {
    scale: 1,
    opacity: 1,
    x: '-50%',
    transition: {
      type: 'tween',
      delay,
      duration,
      ease: 'easeOut',
    },
  },
  exit: {
    scale: 0,
    opacity: 0,
  },
});

//
export const textContainer = {
  hidden: {
    opacity: 0,
  },
  show: (i = 1) => ({
    opacity: 1,
    transition: { staggerChildren: 0.02, delayChildren: i * 0.2 },
  }),
};

export const textVariant2 = {
  hidden: {
    opacity: 0,
    y: 15,
  },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      type: 'tween',
      ease: 'easeIn',
    },
  },
};
