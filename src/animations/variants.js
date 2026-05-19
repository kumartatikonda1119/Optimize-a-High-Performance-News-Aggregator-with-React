export const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

export const staggerContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

export const cardHover = {
  rest: { y: 0, boxShadow: "0 20px 50px rgba(12, 15, 20, 0.35)" },
  hover: { y: -6, boxShadow: "0 30px 70px rgba(12, 15, 20, 0.45)" },
};
