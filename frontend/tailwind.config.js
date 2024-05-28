/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./App.{js,jsx,ts,tsx}", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          green: "#2ecc71",
          orange: "#e67e22",
          red: "#800606",
        },
        secondary: {
          yellow: "#f1c40f",
          blue: "#3498db",
        },
        neutral: {
          dark: "#2c3e50",
          light: "#ecf0f1",
        },
      },
      fontFamily: {
        roboto: ["Roboto_400Regular", "Roboto_700Bold"],
        montserrat: ["Montserrat_400Regular", "Montserrat_700Bold"],
        openSans: ["OpenSans_400Regular", "OpenSans_700Bold"],
        lato: ["Lato_400Regular", "Lato_700Bold"],
        poppins: ["Poppins_400Regular"],
        poppinsBold: ["Poppins_700Bold"],
      },
      maxWidth: {
        "3/5": "60%",
        "4/5": "80%",
      },
    },
  },
  plugins: [],
};
