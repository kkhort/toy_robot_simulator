export function isNumber(value: string): boolean {
    return Number.isInteger(Number(value))
}

export function modulo(n: number, m: number): number {
    return ((n % m) + m) % m;
}