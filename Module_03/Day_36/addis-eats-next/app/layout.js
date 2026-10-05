import Header from "./(components)/(Header)/Header";
import Footer from "./(components)/(Footer)/Footer";
import Providers from "./providers";

import "./globals.css";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Header />

        <Providers>
          {children}
        </Providers>

        <Footer />
      </body>
    </html>
  );
}