
import "./globals.css";
import { GlobalProvider } from "@/store";

export const metadata = {
  title: "Socialize",
  description: "Socialize with your friends and family",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <GlobalProvider>
        <body>
          {children}
        </body>
      </GlobalProvider>
    </html>
  );
}
