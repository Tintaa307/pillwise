import React from "react"
import { AccesibilityProvider } from "./AccesibilityContext"

const AccesibilityComponent = ({ children }: { children: React.ReactNode }) => {
  return <AccesibilityProvider>{children}</AccesibilityProvider>
}

export default AccesibilityComponent
