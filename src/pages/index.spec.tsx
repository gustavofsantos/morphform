import HomePage from "."
import { render, screen } from "@testing-library/react"

describe(HomePage.name, () => {
  it("Should mount", () => {
    render(<HomePage />)

    expect(screen.getByText(/home page/i)).toBeInTheDocument()
  })
})
