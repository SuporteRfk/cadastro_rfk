import { Skeleton } from "./ui";


interface ILoadingSkellletonProps {
    numberLines?: number;
};

export const LoadingSkelleton = ({numberLines=10}:ILoadingSkellletonProps) => {
    return (
        <div className="w-full">
            <Skeleton className="px-1 py-3 h-[20px] bg-accent/40 rounded-t-sm rounded-b-none"/> 
            <Skeleton className="px-1 py-3 h-[16px] bg-neutral/60 rounded-none"/> 
            {
                [...Array(numberLines)].map((_, i) => (
                    <Skeleton key={i} className="h-6 my-2 rounded-[2px] odd:bg-neutral/20 even:bg-white-default/50 bg-accent" />
                  ))                  
            }
            
        </div>
    )
};