import "./globals.css"
import type { Metadata } from "next"
import { Raleway } from "next/font/google"
import AuthProvider from "@/context/AuthProvider"
import QueryProvider from "@/context/QueryProvider"
import { Session } from "next-auth"
import Menu from "@/components/web/menu/Menu"
import AccesibilityComponent from "@/context/AccesibilityComponent"

const inter = Raleway({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Pillwise",
  description: "The next medicine reminder app",
  icons: {
    icon: "/logo-pillwise.png",
  },
  viewport: "width=device-width, initial-scale=1.0",
  manifest: "/manifest.json",
  themeColor: "#2A0E8F",
}

export default function RootLayout({
  children,
  session,
}: {
  session: Session | null
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <AuthProvider session={session}>
        <QueryProvider>
          <AccesibilityComponent>
            <body className={inter.className}>
              <Menu />
              {children}
            </body>
          </AccesibilityComponent>
        </QueryProvider>
      </AuthProvider>
    </html>
  )
}
