import { PayButtonProps } from "./types";

export function PayButton(props: PayButtonProps) {
  const { id, onClick, className, children } = props;
  const buttonId = id || "pay-button";

  return (
    <button id={buttonId} onClick={onClick} className={className}>
      {children}
    </button>
  );
}
