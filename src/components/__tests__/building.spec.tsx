import { render } from "@testing-library/react";
import React from "react";
import { Building } from "../building";
import { BrowserRouter as Router } from "react-router-dom";

describe("<Building />", () => {
  it("renders OK with props", () => {
    const buildingProps = {
      id: "1",
      name: "name",
      categoryName: "categoryName",
      coverImg: "lala",
    };
    const { getByText, container } = render(
      <Router>
        <Building {...buildingProps} />
      </Router>
    );
    getByText(buildingProps.name);
    getByText(buildingProps.categoryName);
    expect(container.firstChild).toHaveAttribute(
      "href",
      `/buildings/${buildingProps.id}`
    );
  });
});