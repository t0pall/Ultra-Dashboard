import { useState } from "react"
import { useTranslation } from "react-i18next"

export const Home = () => {
  const {i18n} = useTranslation()
  const [currentLanguage, setCurrentLanguage] = useState(i18n.language);

  const changeLocale = () => {
    setCurrentLanguage(currentLanguage === 'ru' ? 'en' : 'ru')
    i18n.changeLanguage(currentLanguage === 'ru' ? 'en' : 'ru')
  }

  return (
    <div><button style={{position: 'absolute', top: 5, left: 5, zIndex: 10000}} onClick={changeLocale}>{i18n.language}</button></div>
  )
}