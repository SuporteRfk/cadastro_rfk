import { Dialog,DialogClose, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger} from "@/components/ui/dialog";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "../ui";
import { IQueryRequest, OperationRequest, StatusRequest, TypeRequest } from "@/interfaces";
import { Filter as FilterIcon, X as CloseIcon} from "lucide-react";
import { useContext, useState } from "react";
import { RequestContext } from "@/context";

interface RequestTableFilterProps {
    fixedFilter?: Partial<IQueryRequest>;
}

export const RequestTableFilter = ({fixedFilter={}}:RequestTableFilterProps) => {
  const { filter, setFilter } = useContext(RequestContext);


  const defaultFilter: IQueryRequest = {
    status: fixedFilter.status ?? null,
    tipo: null,
    operacao: null,
    nome: "",
    data: "",
    email: fixedFilter.email ?? null,
  };

  const [localFilter, setLocalFilter] = useState<IQueryRequest>({
    ...defaultFilter,
    ...filter,
  });

  const clearFilter = () => {
    setLocalFilter(defaultFilter);
    setFilter({
      offset: 0,
      indexLimit: filter?.indexLimit,
      ...defaultFilter,
    });
  };

  const handleChange = (key: string, value: string) => {
    setLocalFilter((prev) => ({ ...prev, [key]: value === "all" ? null : value }));
  };

  const applyFilter = () => {
    setFilter((prev) => ({
        offset: 0,
        indexLimit: filter?.indexLimit,
        ...prev,
        ...localFilter
    }))
  };

  return (
    <Dialog>
        {/* Botão para abrir modal */}
        <DialogTrigger asChild> 
            <button className="my-2 mr-2 cursor-pointer flex py-1 px-3 gap-2 items-center justify-center bg-accent/50 border border-accent rounded-sm ml-auto text-text-strong hover:bg-accent/80 transition-colors">
                Filtros
                <FilterIcon size={16}/>
            </button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-md">
            {/* cabeçalho */}
            <DialogHeader>
                <DialogTitle>Filtrar Solicitações</DialogTitle>
                <DialogDescription>Use os campos abaixo para aplicar filtros à tabela.</DialogDescription>
            </DialogHeader>
            
            {/* opções do filtro */}
            <div className="mt-4">
                {/* Status */}
                <Select 
                    onValueChange={(value)=>handleChange("status", value)} 
                    value={localFilter.status || "all"}
                    disabled={fixedFilter?.status !== undefined}
                >
                    <p className="text-sm my-2 ml-1 font-medium text-text-medium">Filtrar por Status:</p>
                    <SelectTrigger>
                        <SelectValue placeholder="Status"/>
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            <SelectLabel>Opções de Status</SelectLabel>
                            <SelectItem value="all">Todos</SelectItem>
                            {Object.values(StatusRequest).map((status, i) =>(
                                  <SelectItem value={status} key={status+i}>{status}</SelectItem>
                            ))}
                        </SelectGroup>
                    </SelectContent>
                </Select>

                {/* Tipo de cadastro */}
                <Select onValueChange={(value)=>handleChange("tipo", value)} value={localFilter.tipo || "all"}>
                    <p className="text-sm my-2 ml-1 font-medium text-text-medium">Filtrar por tipo:</p>
                    <SelectTrigger>
                        <SelectValue placeholder="Tipo da solicitação"/>
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            <SelectLabel>Opções de tipo</SelectLabel>
                            <SelectItem value="all">Todos</SelectItem>
                            {Object.values(TypeRequest).map((status, i) =>(
                                  <SelectItem value={status} key={status+i}>{status}</SelectItem>
                            ))}
                        </SelectGroup>
                    </SelectContent>
                </Select>

                {/* Operação */}
                <Select onValueChange={(value)=>handleChange("operacao", value)} value={localFilter.operacao || "all"}>
                    <p className="text-sm my-2 ml-1 font-medium text-text-medium">Filtrar por tipo:</p>
                    <SelectTrigger>
                        <SelectValue placeholder="Tipo da operação"/>
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            <SelectLabel>Operações</SelectLabel>
                            <SelectItem value="all">Todos</SelectItem>
                            {Object.values(OperationRequest).map((status, i) =>(
                                  <SelectItem value={status} key={status+i}>{status}</SelectItem>
                            ))}
                        </SelectGroup>
                    </SelectContent>
                </Select>

                {/* Solicitante */}
                {fixedFilter?.email === undefined &&
                    <div className="mt-2">
                        <label className="text-sm my-2 ml-1 font-medium text-text-medium">Solicitante</label>
                        <input
                            type="text"
                            value={localFilter.nome || ""}
                            onChange={(e) => handleChange("nome", e.target.value)}
                            className="w-full border rounded px-3 py-1.5 text-sm outline-transparent focus:outline-accent"
                            placeholder="Digite o nome"
                        />
                    </div>
                }

                {/* Data */}
                <div className="mt-2">
                    <label className="text-sm my-2 ml-1 font-medium text-text-medium">Data</label>
                    <div className="flex gap-4">
                        <input
                            type="date"
                            min="2024-01-01"
                            max="2100-12-31"
                            value={localFilter.data || ""}
                            onChange={(e) => handleChange("data", e.target.value)}
                            className="w-full border rounded px-3 py-2 text-sm cursor-pointer"
                        />
                        {localFilter.data && (
                            <button
                                onClick={() => handleChange("data", "")}
                                className="cursor-pointer"
                            >
                                <CloseIcon size={20} color="var(--color-error)"/>
                            </button>
                        )}
                    </div>
                </div>
            </div>

            {/* botões ações */}
            <div className="flex justify-between mt-6">
                {/* Limpar filtro */}
                <DialogClose asChild>
                    <button 
                        onClick={clearFilter}
                        className="flex items-center cursor-pointer justify-center gap-2 text-error hover:underline text-sm"
                    >
                        <CloseIcon size={16}/>
                        Limpar filtros
                    </button>
                </DialogClose>

                {/* aplicar filtro */}
                <DialogClose asChild>
                    <button 
                        onClick={applyFilter}
                        className=" cursor-pointer bg-accent/80 hover:bg-accent/95 text-white px-4 py-2 rounded text-sm"
                    >
                        Aplicar
                    </button>
                </DialogClose>
            </div>
        </DialogContent>
    </Dialog>
  );
}





