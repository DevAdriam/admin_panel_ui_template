import { Loader2 } from "lucide-react";

const Loader = () => {
  return (
    <div className="grid place-items-center min-h-screen min-w-screen">
      <h1>
        Loading .... <Loader2 size={50} color="red" />
      </h1>
    </div>
  );
};

export default Loader;
