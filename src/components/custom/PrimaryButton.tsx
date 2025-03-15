import { Button } from "../ui/button";

const PrimaryButton = ({
  text,
  variant,
  type = "button",
  onSubmit,
}: {
  type?: "submit" | "button" | "reset";
  text: string;
  variant:
    | "link"
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost";
  onSubmit: () => void;
}) => {
  return (
    <Button
      variant={variant}
      className="bg-custom-primary cursor-pointer  px-5 py-3 hover:bg-custom-secondary "
      type={type}
      onSubmit={onSubmit}
    >
      {text}
    </Button>
  );
};

export default PrimaryButton;
