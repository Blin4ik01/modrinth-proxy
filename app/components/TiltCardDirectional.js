'use client'

import { useRef } from 'react'

export default function TiltCardDirectional({ children, className, direction = 'top' }) {
  const cardRef = useRef(null)

  const handleMouseEnter = () => {
    if (!cardRef.current) return
    
    // Фиксированный наклон в зависимости от direction
    let rotateX = 0
    
    if (direction === 'top') {
      // Верх назад (положительный rotateX)
      rotateX = 15
    } else if (direction === 'bottom') {
      // Низ назад (отрицательный rotateX)
      rotateX = -15
    }
    
    cardRef.current.style.transition = 'transform 0.3s ease-out'
    cardRef.current.style.transform = `perspective(1000px) rotateX(${rotateX}deg)`
  }

  const handleMouseLeave = () => {
    if (!cardRef.current) return
    cardRef.current.style.transition = 'transform 0.5s ease-out'
    cardRef.current.style.transform = ''
  }

  return (
    <div
      ref={cardRef}
      className={className}
      style={{ transformStyle: 'preserve-3d' }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {children}
    </div>
  )
}
