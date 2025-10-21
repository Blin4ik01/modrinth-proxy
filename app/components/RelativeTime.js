'use client'

export default function RelativeTime({ dateString, className = '' }) {
  const date = new Date(dateString)
  const now = new Date()
  
  if (isNaN(date.getTime())) {
    return <span className={className}>неизвестно</span>
  }
  
  const diffMs = now - date
  

  if (diffMs < 0) {
    return <span className={className}>{date.toLocaleDateString('ru-RU')}</span>
  }
  
  const diffMinutes = Math.floor(diffMs / (1000 * 60))
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60))
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24))
  
  let timeText
  if (diffMinutes < 60) {
    timeText = `${Math.max(1, diffMinutes)} мин. назад`
  } else if (diffHours < 24) {
    timeText = `${diffHours} ч. назад`
  } else if (diffDays === 1) {
    timeText = 'вчера'
  } else if (diffDays < 7) {
    timeText = `${diffDays} дн. назад`
  } else if (diffDays < 30) {
    timeText = `${Math.floor(diffDays / 7)} нед. назад`
  } else if (diffDays < 365) {
    timeText = `${Math.floor(diffDays / 30)} мес. назад`
  } else {
    timeText = `${Math.floor(diffDays / 365)} г. назад`
  }

  return <span className={className}>{timeText}</span>
}

