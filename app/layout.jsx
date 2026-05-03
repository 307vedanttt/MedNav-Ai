import { Space_Grotesk, Inter } from "next/font/google";
import "./globals.css";
const spaceGrotesk = Space_Grotesk({
  variable: "--font-headline",
  subsets: ["latin"]
});
const inter = Inter({
  variable: "--font-body",
  subsets: ["latin"]
});
export const metadata = {
  title: "MediNav-AI | Clinical Futurism",
  description: "AI Healthcare Prototype"
};
export default function RootLayout({
  children
}) {
  return <html lang="en" suppressHydrationWarning className={`${spaceGrotesk.variable} ${inter.variable} h-full antialiased`}>
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet" />
      </head>
      <body>{children}</body>
    </html>;
}
