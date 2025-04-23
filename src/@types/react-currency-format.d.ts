declare module "react-currency-format/lib/currency-format" {
    import * as React from "react";
  
    export interface CurrencyFormatProps extends React.InputHTMLAttributes<HTMLInputElement> {
      value?: number | string;
      displayType?: "input" | "text";
      thousandSeparator?: boolean | string;
      decimalSeparator?: string;
      decimalScale?: number;
      fixedDecimalScale?: boolean;
      allowNegative?: boolean;
      prefix?: string;
      suffix?: string;
      onValueChange?: (values: { value: string; formattedValue: string; floatValue: number }) => void;
    }
  
    const CurrencyFormat: React.ForwardRefExoticComponent<
      CurrencyFormatProps & React.RefAttributes<HTMLInputElement>
    >;
  
    export default CurrencyFormat;
  }
  