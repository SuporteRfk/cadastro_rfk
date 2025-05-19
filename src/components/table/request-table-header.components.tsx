import { TableHeader, TableRow, TableHead } from "@/components/ui/table";
import {MousePointerClick as ActionIcon} from "lucide-react";
import { flexRender, Table } from "@tanstack/react-table";
import { IViewRequest } from "@/interfaces";

interface RequestTableHeaderProps {
  table: Table<IViewRequest>;
}

export const RequestTableHeader = ({ table }: RequestTableHeaderProps) => {
  return (
    <TableHeader className="bg-accent/70">
      {table.getHeaderGroups().map(headerGroup => (
        <TableRow key={headerGroup.id} >
          {headerGroup.headers.map((header,index) => {
              // lidar com a borda
              const isFirst = index === 0;
              const isLast = index === headerGroup.headers.length;
              const borderClass = !isFirst && !isLast ? "border-l-2 border-accent/80 border-b-2 border-b-accent" : "";

              // colocar no header o icone para ações.
              const isColumnAction = header.column.columnDef.header === ""
              
            return(
              <TableHead 
                key={header.id} 
                className={`pt-1 text-text-strong text-center text-sm font-semibold border-b-2 border-b-accent ${borderClass}`}
              >
                  {isColumnAction 
                    ? <span className="w-full flex items-center">
                        <ActionIcon className="flex-1 items-center" size={21}/>
                      </span>
                    : flexRender(header.column.columnDef.header, header.getContext())
                  }
                  
                  
              </TableHead>
            )
          })}
        </TableRow>
      ))}
    </TableHeader>
  );
};
