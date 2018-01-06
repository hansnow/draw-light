import React, { Component } from 'react'

import getImage from './utils/ch1'

const WIDTH = 512
const HEIGHT = 512

const getHex = num => num.toString(16).padStart(2, '0')

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      time: 0
    }
  }
  drawImage = imgArr => {
    // console.log(imgArr.length, imgArr)
    const start = Date.now()
    const ctx = this.canvas.getContext('2d')
    let index = 0
    for (let x = 0; x < WIDTH; x++) {
      for (let y = 0; y < HEIGHT; y++) {
        const r = imgArr[index]
        const g = imgArr[index + 1]
        const b = imgArr[index + 2]
        ctx.fillStyle = `#${getHex(r)}${getHex(g)}${getHex(b)}`
        ctx.fillRect(x, y, 1, 1)
        index = index + 3
      }
    }
    const end = Date.now()
    this.setState({ time: end - start })
  }
  drawCh1 = () => {
    const imgArr = getImage()
    this.drawImage(imgArr)
  }
  drawRainBow = () => {
    const ctx = this.canvas.getContext('2d')
    // const start = performance.now()
    const start = Date.now()
    // const rgb = 256 * 256 * 256 * 3
    for (let y = 0; y < HEIGHT; y++) {
      for (let x = 0; x < WIDTH; x++) {
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
        <button onClick={this.drawCh1}>Draw CH1</button>
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