export const MIXPLA_GRADIENT = [
  { pos: 0, color: '#1e3b8a' },
  { pos: 0.25, color: '#3c83f6' },
  { pos: 0.5, color: '#07b6d5' },
  { pos: 0.75, color: '#1077b7' },
  { pos: 1, color: '#db38d3' }
]

function hlsToRgb(h: number, l: number, s: number): string {
  const c = (1 - Math.abs(2 * l - 1)) * s
  const x = c * (1 - Math.abs(((h * 6) % 2) - 1))
  const m = l - c / 2

  let r = 0, g = 0, b = 0
  const hSector = h * 6

  if (hSector < 1) {
    r = c; g = x; b = 0
  } else if (hSector < 2) {
    r = x; g = c; b = 0
  } else if (hSector < 3) {
    r = 0; g = c; b = x
  } else if (hSector < 4) {
    r = 0; g = x; b = c
  } else if (hSector < 5) {
    r = x; g = 0; b = c
  } else {
    r = c; g = 0; b = x
  }

  const toHex = (val: number) => {
    const hex = Math.round((val + m) * 255).toString(16)
    return hex.length === 1 ? '0' + hex : hex
  }

  return `#${toHex(r)}${toHex(g)}${toHex(b)}`
}

export function generateRandomGradient(): Array<{ pos: number; color: string }> {
  const baseHue = Math.random()
  const stops: Array<{ pos: number; color: string }> = []

  for (let i = 0; i < 5; i++) {
    const hue = (baseHue + i * 0.1) % 1.0
    const lightness = 0.45 + i * 0.05
    const color = hlsToRgb(hue, lightness, 0.8)
    stops.push({ pos: i / 4, color })
  }

  return stops
}
