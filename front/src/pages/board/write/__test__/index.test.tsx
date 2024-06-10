import '@testing-library/jest-dom'
import { screen } from '@testing-library/react'
import BoardWrite from '..'
import { renderWithQueryClient } from '@/utils/test-utils'

describe('testing', () => {
  it('renders a heading', () => {
    renderWithQueryClient(<BoardWrite/>)
 
    const textIn = screen.getAllByText("날짜")
 
    expect(textIn).toBeInTheDocument()
  })
})