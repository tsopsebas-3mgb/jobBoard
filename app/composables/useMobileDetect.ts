export const useMobileDetect = () => {
    const isMobile = ref(false)
    const setIsMobile = () => isMobile.value = window.innerWidth <= 768
    onMounted(() => {
        setIsMobile()
        window.addEventListener('resize', setIsMobile)
    })
    onUnmounted(() => {
        window.removeEventListener('resize', setIsMobile)
    })
    return {
        isMobile
    }
}