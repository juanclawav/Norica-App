import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { ModalMessage } from "../../modals/ModalMessage";

describe("ModalMessage", () => {
  test("Check the title and the message", () => {
    const methodOne = () => {};
    const TITULO: string = "titulo";
    const MENSAJE: string = "mensaje";
    render(
      <ModalMessage action={methodOne} title={TITULO} message={MENSAJE} />
    );
    expect(screen.getByText(/titulo/i)).toBeTruthy();
    expect(screen.getByText(/mensaje/i)).toBeTruthy();
  });
});
