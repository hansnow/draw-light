import React, { Component } from 'react'

const WIDTH = 256
const HEIGHT = 256

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      time: 0
    }
  }
  drawImage = imgArr => {}
  drawRainBow = () => {
    const ctx = this.canvas.getContext('2d')
    // const start = performance.now()
    const start = Date.now()
    // const rgb = 256 * 256 * 256 * 3
    for (let y = 0; y < HEIGHT; y++) {
      for (let x = 0; x < WIDTH; x++) {
        const getHex = num => num.toString(16).padStart(2, '0')
        ctx.fillStyle = `#${getHex(x)}${getHex(y)}${getHex(255 - x)}`
        ctx.fillRect(x, y, 1, 1)
      }
    }
    // const end = performance.now()
    const end = Date.now()
    this.setState({ time: end - start })
  }
  componentDidMount() {
    this.canvas.width = WIDTH
    this.canvas.height = HEIGHT
  }
  render() {
    return (
      <div>
        <button onClick={this.drawRainBow}>Draw RainBow</button>
        <span style={{ marginLeft: 8 }}>It takes {this.state.time} ms</span>
        <br />
        <br />
        <canvas
          ref={el => (this.canvas = el)}
          style={{ border: '1px solid #000' }}
        />
      </div>
    )
  }
}

export default App
