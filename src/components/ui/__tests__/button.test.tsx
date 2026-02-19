import { render } from "@testing-library/react";
import { Button } from "../button";
import { describe, it, expect } from "vitest";
import React from "react";

describe("Button", () => {
  it("should render correctly with asChild", () => {
    render(
      <Button asChild>
        <a href="/">Test Link</a>
      </Button>
    );
  });

  it("should render correctly when loading", () => {
    render(<Button loading>Click me</Button>);
  });

  it("should not crash when both asChild and loading are true", () => {
    render(
      <Button asChild loading>
        <a href="/">Test Link</a>
      </Button>
    );
  });
});
