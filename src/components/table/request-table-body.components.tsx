import { flexRender, Table } from "@tanstack/react-table";
import { TableBody, TableCell, TableRow } from "../ui";
import { IViewRequest } from "@/interfaces";
import { MomentCoffe } from "../moment-coffe.components";
import { Fragment } from "react/jsx-runtime";

interface RequestTableBodyProps {
    table: Table<IViewRequest>;
    observationOpenId: number | null
}

export const RequestTableBody = ({table, observationOpenId}:RequestTableBodyProps) => {
    const rows = table.getRowModel().rows;

    // caso não exista nenhum dado a ser exibido
    if (rows.length === 0) {
        return (
          <TableBody>
            <TableRow>
              <TableCell colSpan={table.getAllColumns().length} className="py-4">
                <MomentCoffe mensagem=" Nenhuma solicitação encontrada"/>
              </TableCell>
            </TableRow>
          </TableBody>
        );
    }


    return (
        <TableBody>
          {rows.map((row) => (
            <Fragment key={row.id}>
              <TableRow
                key={row.id}
                className="odd:bg-neutral/10 even:bg-white hover:bg-accent/10 transition-colors h-fit text-sm"
              >
                  {row.getVisibleCells().map((cell, index) => {
                      //lidar com a borda
                      const isFirst = index === 0;
                      const isLast = index === row.getVisibleCells().length;
      
                      // Adiciona borda à esquerda apenas nas colunas do meio
                      const borderClass = !isFirst && !isLast ? "border-l-2 border-neutral/80" : "";
                      return(
                          <TableCell key={cell.id} className={`
                              px-2 py-1.5 ${borderClass}
                              ${observationOpenId === row.original.id && 'bg-neutral/20'}
                          `}>
                              {flexRender(cell.column.columnDef.cell, cell.getContext())}
                          </TableCell>
                      )
                  })}
              </TableRow>
    
              {observationOpenId === row.original.id && (
                  <TableRow>
                      <TableCell colSpan={table.getAllColumns().length} className="bg-neutral/5 text-left italic text-muted px-4 py-2">
                          {row.original.observacao || `Sem observação registrada para a solicitação de número ${row.original.id}.`}
                      </TableCell>
                  </TableRow>
              )}
            </Fragment>
          ))}
      </TableBody>
    )
};