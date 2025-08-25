import "./globals.css";
import Navbar from "@/components/Navbar/Navbar";
export const metadata = {
  title: "Ritik Portfolio",
  description: "Created by Ritik",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="">
        <Navbar />
        {children}
      </body>
    </html>
  );
}
