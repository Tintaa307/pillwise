"use client"

import { createContext, useState } from "react"

export const AccesibilityContext = createContext({
  isAnimated: false,
  isContrasted: { isContrasted: false, whitePoint: false },
  language: "es" || "en" || "fr" || "ita",
  fontWeight: "small" || "normal" || "large",
  textToSpeech: false,
  handleLanguage: (lang: string) => {},
  handleAnimated: () => {},
  handleContrasted: (config: {
    isContrasted: boolean
    whitePoint: boolean
  }) => {},
  handleFontWeight: (weight: string) => {},
  handleTextToSpeech: () => {},
})

interface AccesibilityProviderProps {
  children: React.ReactNode
}

export const AccesibilityProvider = ({
  children,
}: AccesibilityProviderProps) => {
  const [isAnimated, setIsAnimated] = useState(false)
  const [isContrasted, setIsContrasted] = useState({
    isContrasted: false,
    whitePoint: false,
  })
  const [language, setLanguage] = useState("es")
  const [fontWeight, setFontWeight] = useState("normal")
  const [textToSpeech, setTextToSpeech] = useState(false)

  const handleLanguage = (lang: string) => {
    setLanguage(lang)
  }

  const handleAnimated = () => {
    setIsAnimated(!isAnimated)
  }

  const handleContrasted = (config: {
    isContrasted: boolean
    whitePoint: boolean
  }) => {
    setIsContrasted(config)
  }

  const handleFontWeight = (weight: string) => {
    setFontWeight(weight)
  }

  const handleTextToSpeech = () => {
    setTextToSpeech(!textToSpeech)
  }

  return (
    <AccesibilityContext.Provider
      value={{
        isAnimated,
        isContrasted,
        language,
        fontWeight,
        textToSpeech,
        handleLanguage,
        handleAnimated,
        handleContrasted,
        handleFontWeight,
        handleTextToSpeech,
      }}
    >
      {children}
    </AccesibilityContext.Provider>
  )
}
