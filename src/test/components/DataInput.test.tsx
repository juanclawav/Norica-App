import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { DataInput } from "../../auth/components/DataInput";

describe("DataInput", () => {
  const EXTRA_DATA_TEST = [
    {
      order: "orden uno",
      typeInput: "email",
      placeHolder: "placeholder uno",
    },
  ];

  test("Check the correct labels of inputs", () => {
    render(
      <DataInput
        order={EXTRA_DATA_TEST[0].order}
        typeInput={EXTRA_DATA_TEST[0].typeInput}
      />
    );
    expect(screen.getByText(/orden uno/i)).toBeTruthy();
  });
});
