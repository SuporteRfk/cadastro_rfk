// components/ReviewField/safe-review-field.tsx
import { ReviewField } from "./review-field.components";
import { FormStateType } from "@/interfaces";
import { ReactNode } from "react";
import { useReview } from "@/context";


interface SafeReviewFieldProps {
  children: ReactNode;
  field: string;
  mode: FormStateType;
}

export const SafeReviewField = (props: SafeReviewFieldProps) => {
  try {
    useReview(); // só para forçar o erro se estiver fora
    return <ReviewField {...props} />;
  } catch {
    return <>{props.children}</>; // renderiza só o campo normal
  }
};
