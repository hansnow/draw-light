import React, { Fragment } from 'react'
import styled from 'styled-components'

const Label = styled.label`
  display: table-cell;
`
const Input = styled.input`
  display: table-cell;
`

const Field = ({ field, label, value, onChange }) => (
  <Fragment>
    <Label htmlFor={field}>{label}</Label>
    <Input
      type="number"
      id={field}
      name={field}
      value={value}
      onChange={onChange}
    />
  </Fragment>
)

export default Field
