export const shortenAddress = (str: string) => {
    return `${str.slice(0, 6)}...${str.slice(-4)}`
}