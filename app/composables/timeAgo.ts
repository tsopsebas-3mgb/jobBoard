export const timeAgo =  (date : Date) => {
   const timeDiff = Math.floor((new Date().getTime() - new Date(date))/1000)
    if (timeDiff < 30) return "À l'instant";
    const timeUnits = [
        {name: 'an', seconds: 31536000},
        {name: 'mois', seconds: 2592000},
        {name: 'jour', seconds: 86400},
        {name: 'heure', seconds: 3600},
        {name: 'minute', seconds: 60},
    ]

    for(const unit of timeUnits){
        const quotient = Math.floor(timeDiff/unit.seconds)
        if(quotient>=1){
            return `Il y a ${quotient} ${unit.name}${quotient>1 && unit.name !== 'mois' ? 's' : ''}`
        }
    }
    return `Il y a ${Math.floor(timeDiff)} secondes`
}