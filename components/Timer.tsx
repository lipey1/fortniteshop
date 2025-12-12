'use client'

import { useEffect, useState } from 'react'

export default function Timer() {
  const [timeLeft, setTimeLeft] = useState('')

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date()
      const nextUpdate = new Date()
      
      // A loja do Fortnite atualiza às 00:00 UTC (21:00 BRT)
      nextUpdate.setUTCHours(0, 0, 0, 0)
      
      // Se já passou das 00:00 UTC hoje, a próxima atualização é amanhã
      if (now >= nextUpdate) {
        nextUpdate.setUTCDate(nextUpdate.getUTCDate() + 1)
      }
      
      const difference = nextUpdate.getTime() - now.getTime()
      
      if (difference <= 0) {
        return 'Atualizando agora...'
      }
      
      const hours = Math.floor(difference / (1000 * 60 * 60))
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60))
      const seconds = Math.floor((difference % (1000 * 60)) / 1000)
      
      return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`
    }

    setTimeLeft(calculateTimeLeft())
    const interval = setInterval(() => {
      setTimeLeft(calculateTimeLeft())
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div style={{
      display: 'inline-block',
      padding: '1rem 2rem',
      background: 'var(--bg-card)',
      borderRadius: '0.75rem',
      border: '2px solid var(--accent)',
      boxShadow: '0 0 20px rgba(0, 212, 255, 0.3)',
    }}>
      <div style={{
        fontSize: '0.9rem',
        color: 'var(--text-secondary)',
        marginBottom: '0.5rem',
        textTransform: 'uppercase',
        letterSpacing: '1px',
      }}>
        Próxima Atualização em
      </div>
      <div style={{
        fontSize: '2rem',
        fontWeight: 'bold',
        color: 'var(--accent)',
        fontFamily: 'monospace',
      }}>
        {timeLeft}
      </div>
    </div>
  )
}

