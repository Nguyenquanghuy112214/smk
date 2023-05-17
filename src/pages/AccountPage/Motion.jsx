export const wrapper = {
    hidden: { opacity: 0, y: '10vh' },
    show: {
      opacity: 1,
      y: '0vh',
      transition: {
        duration: 0.3,
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  };

  export const container = {
    hidden: { opacity: 0, y: '1vh' },
    show: {
      opacity: 1,
      y: '0vh',
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1,
      },
    },
  };
