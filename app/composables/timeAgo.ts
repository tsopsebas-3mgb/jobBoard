export const timeAgo = (date: Date | string | number) => {
  const timeDiff = Math.floor((new Date().getTime() - new Date(date).getTime()) / 1000)
  if (timeDiff < 30) return "Just now";
  
  const timeUnits = [
    { name: 'year', seconds: 31536000 },
    { name: 'month', seconds: 2592000 },
    { name: 'day', seconds: 86400 },
    { name: 'hour', seconds: 3600 },
    { name: 'minute', seconds: 60 },
  ]

  for (const unit of timeUnits) {
    const quotient = Math.floor(timeDiff / unit.seconds)
    if (quotient >= 1) {
      return `${quotient} ${unit.name}${quotient > 1 ? 's' : ''} ago`
    }
  }
  return `${Math.floor(timeDiff)} seconds ago`
}