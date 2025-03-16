import { Button } from "../ui/button";

const PrimaryButton = ({
  text,
  variant = "default",
  type = "button",
  onSubmit,
  onClick,
}: {
  type?: "submit" | "button" | "reset";
  text: string;
  variant?:
    | "link"
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost";
  onSubmit?: () => void;
  onClick?: () => void;
}) => {
  return (
    <Button
      variant={variant}
      className="bg-custom-primary cursor-pointer hover:text-white hover:bg-custom-secondary text-white px-5 py-3  "
      type={type}
      onSubmit={onSubmit}
      onClick={onClick}
    >
      {text}
    </Button>
  );
};

export default PrimaryButton;
