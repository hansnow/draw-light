const TWO_PI = 2 * Math.PI
const EPSILON = 1e-6

const main = ({
  WIDTH = 256,
  HEIGHT = 256,
  N = 64,
  MAX_STEP = 20,
  MAX_DISTANCE = 2
}) => {
  const trace = (ox, oy, dx, dy) => {
    let t = 0
    for (let i = 0; i < MAX_STEP && t < MAX_DISTANCE; i++) {
      const sd = circleSDF(ox + dx * t, oy + dy * t, 0.5, 0.5, 0.1)
      if (sd < EPSILON) return 2
      t += sd
    }
    return 0
  }

  const sample = (x, y) => {
    let sum = 0
    for (let i = 0; i < N; i++) {
      // const a = TWO_PI * i / N
      const a = TWO_PI * (i + Math.random()) / N
      sum += trace(x, y, Math.cos(a), Math.sin(a))
    }
    return sum / N
  }

  const circleSDF = (x, y, cx, cy, r) => {
    const ux = x - cx
    const uy = y - cy
    return Math.sqrt(ux * ux + uy * uy) - r
  }

  const p = Array(WIDTH * HEIGHT * 3).fill(0)
  let index = 0
  for (let y = 0; y < HEIGHT; y++) {
    for (let x = 0; x < WIDTH; x++) {
      const color = Math.round(
        Math.min(sample(x / WIDTH, y / HEIGHT) * 255, 255)
      )
      p[index] = p[index + 1] = p[index + 2] = color
      index = index + 3
    }
  }
  return p
}

export default main
