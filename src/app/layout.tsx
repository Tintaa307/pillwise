import "./globals.css"
import type { Metadata } from "next"
import { Raleway } from "next/font/google"
import AuthProvider from "@/context/AuthProvider"
import { Session } from "next-auth"

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
        <body className={inter.className}>{children}</body>
      </AuthProvider>
    </html>
  )
}
