/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [
    function ({ addUtilities }) {
      const newUtilities = {
        ".scrollbar-thin": {
          scrollbarWidth: "thin",
          scrollbarColor: "rgba(187, 187, 187, 0.5) rgba(200, 255, 255, 0.1)",
        },
        ".scrollbar-none": {
          scrollbarWidth: "none",
        },
        ".scrollbar-webkit": {
          "&::-webkit-scrollbar": {
            width: "12px",
          },
          "&::-webkit-scrollbar-track": {
            background: "rgba(255, 255, 255, 0.1)",
          },
          "&::-webkit-scrollbar-thumb": {
            background: "rgba(155, 155, 155, 0.5)",
            borderRadius: "6px",
            border: "4px solid rgba(255, 255, 255, 0.1)",
          },
        },
      };
      addUtilities(newUtilities, ["responsive", "hover"]);
    },
  ],
};
