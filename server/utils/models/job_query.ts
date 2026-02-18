export type job_query = {
    page: number
    type: 'CDI' | 'CDD' | 'FREELANCE' | 'INTERNSHIP'
    keyWords: string
}