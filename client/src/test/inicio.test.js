import { render, screen } from "@testing-library/react";
import { Inicio } from "../components/Inicio.js";


test("Should render message", () => {
  render(<Inicio />);
  const msg = screen.getByTestId("message");
  console.log(msg)
  expect(msg).toBeInTheDocument();
  expect(msg).toHaveTextContent(
    " La esperanza es lo que nos hace fuertes,Es la razón del por qué estamos aquí,Es por lo que peleamos cuando todo lo demás está perdido"
  );
});
