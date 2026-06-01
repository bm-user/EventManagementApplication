import { createContext, useState, useEffect } from 'react'
export const ThemeContext = createContext()

function ThemeProvider({ children }) {
    const [isDark, setIsDark] = useState(() => {
      const saved = localStorage.getItem('theme')
      return saved === 'dark'
    })

  useEffect(() => {
    localStorage.setItem('theme', isDark ? 'dark' : 'light')
    document.body.className = isDark ? 'dark' : 'light'
  }, [isDark])

  function toggleTheme() {
    setIsDark(prev => !prev)
  }

  return (
    <ThemeContext.Provider value={{ isDark, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export default ThemeProvider