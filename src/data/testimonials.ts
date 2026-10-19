export type Testimonial = {
  name: string;
  role: string;
  quote: string;
  initials: string;
};

export const TESTIMONIALS: Testimonial[] = [
  {
    name: "Camille & Anton Reyes",
    role: "Bought in BGC",
    quote:
      "They listened more than they sold. The first home they showed us is the one we bought — and two years later it still feels right.",
    initials: "CR",
  },
  {
    name: "Marco Santos",
    role: "Sold in Tagaytay",
    quote:
      "Three viewings, one honest conversation about pricing, and a clean sale in six weeks. No theatre, just good work.",
    initials: "MS",
  },
  {
    name: "Andrea Lim",
    role: "Bought in Makati",
    quote:
      "As an OFW buying from abroad, I needed someone I could trust on the ground. The video walkthroughs and paperwork help were exceptional.",
    initials: "AL",
  },
  {
    name: "Paolo Garcia",
    role: "Bought in Cebu",
    quote:
      "They understood exactly what island living should feel like and filtered out everything that wasn't it.",
    initials: "PG",
  },
];
