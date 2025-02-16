import { Montserrat } from "next/font/google";
import AppNavBar from "../../src/components/AppNavBar";
import { pwaTrackingListeners } from "../scripts/pwaEventlisteners";
import "./globals.css";
import Providers from "./providers";
import { Metadata } from "next";

const inter = Montserrat({
  subsets: ["latin"],
  variable: "--font-primary",
});

const isBrowser = typeof window !== "undefined";

if (isBrowser) {
  pwaTrackingListeners();
}

export const metadata: Metadata = {
  title: "React PWA Boilerplate",
  description: "A PWA boilerplate/reference application in React",
  manifest: "/manifest.webmanifest.json",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <head>
        <script
          type="text/javascript"
          dangerouslySetInnerHTML={{
            __html: `(function(d, t) {
              var g = d.createElement(t),
                  s = d.getElementsByTagName(t)[0];
              g.src = "https://cdn.pushalert.co/integrate_5ff239592a0f2ea64e7845730612bca3.js";
              s.parentNode.insertBefore(g, s);
            }(document, "script")));`,
          }}
        ></script>
      </head>
      <body className={inter.className}>
        <Providers>
          <main
            className={`flex flex-col h-svh text-foreground bg-background ${inter.variable} font-sans`}
          >
            <AppNavBar />
            <div className="container mx-auto flex-1">{children}</div>
          </main>
        </Providers>
        {/* Dynamically load PushAlert script */}
      </body>
    </html>
  );
}

if (isBrowser && "serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("/sw.js")
      .then(() => {
        console.log("Service worker registered");
      })
      .catch((err) => {
        console.log("Service worker registration failed", err);
      });
  });
}
