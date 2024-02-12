import "./globals.css";
import {
  Caveat,
  Dancing_Script,
  Indie_Flower,
  Kalam,
  Architects_Daughter,
} from "next/font/google";

const caveat = Caveat({
  weight: "400",
  subsets: ["latin"],
  variable: "--caveat",
  display: "swap",
});

const dancingScript = Dancing_Script({
  weight: "400",
  subsets: ["latin"],
  variable: "--dancingScript",
  display: "swap",
});

const architectsDaughter = Architects_Daughter({
  weight: "400",
  subsets: ["latin"],
  variable: "--architectsDaughter",
  display: "swap",
});

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${caveat.variable} ${dancingScript.variable} ${architectsDaughter.variable}`}
      >
        <main>{children}</main>
      </body>
    </html>
  );
}
