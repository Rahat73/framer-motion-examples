const parentVariant = {
  closed: {
    scale: 0,
    transition: {
      when: "afterChildren",
      staggerChildren: 0.05,
      staggerDirection: -1,
      delayChildren: 0.2,
    },
  },
  opened: {
    scale: 1,
    transition: {
      when: "beforeChildren",
      staggerChildren: 0.07,
      delayChildren: 0.2,
    },
  },
};
const childVariant = {
  closed: { y: "-5vh", opacity: 0 },
  opened: { y: 0, opacity: 1 },
};

const exitAnimation = {
  hidden: {
    x: "-5vw",
    opacity: 0,
  },
  visible: {
    x: 0,
    opacity: 1,
  },
  exit: {
    x: "5vw",
    opacity: 0,
  },
};
export { parentVariant, childVariant, exitAnimation };
