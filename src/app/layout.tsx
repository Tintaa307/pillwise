import "./globals.css"
import type { Metadata } from "next"
import { Raleway } from "next/font/google"
import AuthProvider from "@/context/AuthProvider"
import QueryProvider from "@/context/QueryProvider"
import { Session } from "next-auth"
import Menu from "@/components/web/menu/Menu"

const inter = Raleway({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Pillwise",
  description: "The next medicine reminder app",
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
          <body className={inter.className}>
            <Menu />
            {children}
          </body>
        </QueryProvider>
      </AuthProvider>
    </html>
  )
}