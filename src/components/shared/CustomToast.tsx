import { TriangleAlert } from "lucide-react";
import type React from "react";
import { toast } from "sonner";

interface Props {
  message?: string,
  t: string | number,
  callback: () => void
}

export const CustomToast: React.FC<Props> = ({ message = "Toast generic", t, callback }) => {
  return (
    <div className="bg-white flex flex-row items-center gap-4 px-8 py-4 rounded-2xl shadow w-full">
      {/* Ícono y pregunta */}
      <div className="flex flex-row items-center gap-2 flex-shrink-0">
        <TriangleAlert size={24} />
        <p className="font-medium whitespace-nowrap">{message}</p>
      </div>
      {/* Botones */}
      <div className="flex flex-row justify-end gap-4 flex-grow">
        <button
          onClick={() => {
            toast.dismiss(t);
            callback();
          }}
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-700 whitespace-nowrap"
        >
          Confirm
        </button>
        <button
          onClick={() => {
            toast.dismiss(t);
          }}
          className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-700 whitespace-nowrap"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};