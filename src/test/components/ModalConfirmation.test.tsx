import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { ModalConfirmation } from "../../modals/ModalConfirmation";

describe("ModalConfirmation", () => {
  test("Check the title and the message", () => {
    const methodOne = () => {};
    const TITULO: string = "titulo";
    const MENSAJE: string = "mensaje";
    render(
      <ModalConfirmation
        actionOne={methodOne}
        actionTwo={methodOne}
        title={TITULO}
        message={MENSAJE}
      />
    );
    expect(screen.getByText(/titulo/i)).toBeTruthy();
    expect(screen.getByText(/mensaje/i)).toBeTruthy();
  });
});
