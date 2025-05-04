import { Mulish,Playwrite_US_Trad} from "next/font/google";
import "./globals.css";
import ConditionalLayout from "../components/ConditionalLayout";


const mulish = Mulish({
  subsets: ['latin'],
  variable: '--font-mulish',
});

const playwrite = Playwrite_US_Trad({
  subsets: ['latin'],
  variable: '--font-playwrite',
});


export const metadata = {
  title: "TAOWR",
  description: "home page for TAOWR",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${mulish.variable} ${playwrite.variable} antialiased`}
      >
        <ConditionalLayout>{children}</ConditionalLayout>
      </body>
    </html>
  );
}