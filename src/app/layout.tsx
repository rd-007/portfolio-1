import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Rajit Dakhane — Software Engineer",
  description: "Backend & AI/ML engineer. Spring Boot, RAG systems, ML experiment tracking. View projects, resume, and contact.",
  openGraph: {
    title: "Rajit Dakhane — Software Engineer",
    description: "Backend & AI/ML engineer. Spring Boot, RAG systems, ML experiment tracking.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <head>
        <meta
          httpEquiv="Content-Security-Policy"
          content="default-src 'self'; script-src 'self' 'unsafe-inline' https://cdn.jsdelivr.net; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data: https:; connect-src 'self'; frame-ancestors 'none'; base-uri 'self'; form-action 'self';"
        />
      </head>
      <body className="min-h-full flex flex-col bg-[var(--background)] text-[var(--foreground)] font-[var(--font-sans)]">
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>
        {children}
      </body>
    </html>
  );
}