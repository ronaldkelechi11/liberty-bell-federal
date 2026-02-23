import { render, screen } from "@testing-library/react";
import ResendVerificationModal from "../ResendVerificationModal";
import { describe, it, expect, vi } from "vitest";
import { BrowserRouter } from "react-router-dom";
import React from "react";

// Mock the authService
vi.mock("@/api/auth", () => ({
  authService: {
    resendVerification: vi.fn(),
  },
}));

describe("ResendVerificationModal", () => {
  it("should render correctly when open", () => {
    render(
      <BrowserRouter>
        <ResendVerificationModal isOpen={true} onClose={() => {}} />
      </BrowserRouter>
    );

    expect(screen.getByText("Resend Verification")).toBeDefined();
    expect(screen.getByLabelText("Email Address")).toBeDefined();
    expect(screen.getByRole("button", { name: /Send Verification Code/i })).toBeDefined();
  });

  it("should not render when closed", () => {
    const { container } = render(
      <BrowserRouter>
        <ResendVerificationModal isOpen={false} onClose={() => {}} />
      </BrowserRouter>
    );

    expect(container.firstChild).toBeNull();
  });
});
