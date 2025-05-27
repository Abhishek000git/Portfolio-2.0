"use client"

import { useState, useEffect } from "react"

interface UseTypingAnimationProps {
  words: string[]
  typeSpeed?: number
  deleteSpeed?: number
  delaySpeed?: number
}

export function useTypingAnimation({
  words,
  typeSpeed = 150,
  deleteSpeed = 100,
  delaySpeed = 2000,
}: UseTypingAnimationProps) {
  const [currentWordIndex, setCurrentWordIndex] = useState(0)
  const [currentText, setCurrentText] = useState("")
  const [isDeleting, setIsDeleting] = useState(false)

  useEffect(() => {
    const currentWord = words[currentWordIndex]

    const timeout = setTimeout(
      () => {
        if (!isDeleting) {
          // Typing
          if (currentText.length < currentWord.length) {
            setCurrentText(currentWord.slice(0, currentText.length + 1))
          } else {
            // Word complete, start deleting after delay
            setTimeout(() => setIsDeleting(true), delaySpeed)
          }
        } else {
          // Deleting
          if (currentText.length > 0) {
            setCurrentText(currentText.slice(0, -1))
          } else {
            // Deletion complete, move to next word
            setIsDeleting(false)
            setCurrentWordIndex((prev) => (prev + 1) % words.length)
          }
        }
      },
      isDeleting ? deleteSpeed : typeSpeed,
    )

    return () => clearTimeout(timeout)
  }, [currentText, isDeleting, currentWordIndex, words, typeSpeed, deleteSpeed, delaySpeed])

  return currentText
}
