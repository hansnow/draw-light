import React, { Component } from 'react'
import styled from 'styled-components'

import Field from './components/Field'
import getImage from './utils/ch1'

const Container = styled.form`
  display: table;
  margin-top: 8px;
`
const Row = styled.p`
  display: table-row;
`

const getHex = num => num.toString(16).padStart(2, '0')

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      calTime: 0,
      drawTime: 0,
      width: 256,
      height: 256,
      n: 64,
      maxStep: 20,
      maxDistance: 2
    }
  }
  handleFieldsChange = e => {
    const key = e.target.name
    const value = e.target.value
    const patch = {}
    if (key === 'width') {
      patch.height = value
    }
    if (key === 'height') {
      patch.width = value
    }
    this.setState({
      [key]: value,
      ...patch
    })
  }
  drawImage = imgArr => {
    const start = performance.now()
    const { width, height } = this.state
    this.canvas.width = width
    this.canvas.height = height
    const ctx = this.canvas.getContext('2d')
    let index = 0
    for (let x = 0; x < width; x++) {
      for (let y = 0; y < height; y++) {
        const r = imgArr[index]
        const g = imgArr[index + 1]
        const b = imgArr[index + 2]
        ctx.fillStyle = `#${getHex(r)}${getHex(g)}${getHex(b)}`
        ctx.fillRect(x, y, 1, 1)
        index = index + 3
      }
    }
    const end = performance.now()
    this.setState({ drawTime: (end - start).toFixed(2) })
  }
  drawCh1 = () => {
    const start = performance.now()
    const { width, height, n, maxStep, maxDistance } = this.state
    const imgArr = getImage({
      WIDTH: width,
      HEIGHT: height,
      N: n,
      MAX_STEP: maxStep,
      MAX_DISTANCE: maxDistance
    })
    const end = performance.now()
    this.setState({ calTime: (end - start).toFixed(2) })
    this.drawImage(imgArr)
  }
  drawRainBow = () => {
    const start = performance.now()
    this.canvas.width = 256
    this.canvas.height = 256
    const ctx = this.canvas.getContext('2d')
    for (let y = 0; y < 256; y++) {
      for (let x = 0; x < 256; x++) {
        ctx.fillStyle = `#${getHex(x)}${getHex(y)}${getHex(255 - x)}`
        ctx.fillRect(x, y, 1, 1)
      }
    }
    const end = performance.now()
    this.setState({ drawTime: (end - start).toFixed(2), calTime: 0 })
  }
  render() {
    return (
      <div>
        <button onClick={this.drawCh1}>Draw Light</button>
        <button onClick={this.drawRainBow}>Draw Rainbow</button>
        <span style={{ marginLeft: 8 }}>
          Calculate: {this.state.calTime} ms, Draw: {this.state.drawTime} ms
        </span>
        <Container>
          <Row>
            <Field
              field="width"
              label="WIDTH: "
              value={this.state.width}
              onChange={this.handleFieldsChange}
            />
          </Row>
          <Field
            field="height"
            label="HEIGHT: "
            value={this.state.height}
            onChange={this.handleFieldsChange}
          />
          <Row>
            <Field
              field="n"
              label="N: "
              value={this.state.n}
              onChange={this.handleFieldsChange}
            />
          </Row>
          <Row>
            <Field
              field="maxStep"
              label="MAX_STEP: "
              value={this.state.maxStep}
              onChange={this.handleFieldsChange}
            />
          </Row>
          <Row>
            <Field
              field="maxDistance"
              label="MAX_DISTANCE: "
              value={this.state.maxDistance}
              onChange={this.handleFieldsChange}
            />
          </Row>
          <Row>
            <Field field="epsilon" label="EPSILON: " value="1e-6" />
          </Row>
        </Container>
        <br />
        <canvas ref={el => (this.canvas = el)} />
      </div>
    )
  }
}

export default App
