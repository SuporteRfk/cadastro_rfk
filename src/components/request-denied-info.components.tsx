import { TriangleAlert } from "lucide-react";

interface RequestDeniedInfoProps {
  observation: string;
}

export const RequestDeniedInfo = ({ observation }: RequestDeniedInfoProps) => {
  return (
    <div className="bg-red-50 border border-red-200 px-4 py-2 mt-4 rounded-md">
      <p className="flex items-center gap-2 text-error font-semibold mb-1">
        <TriangleAlert size={18} />
        Solicitação negada
      </p>
      <p className="text-sm text-text-medium">{observation}</p>
    </div>
  );
};
