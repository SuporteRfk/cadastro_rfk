import SymbolLogo from "@/assets/symbol_logo.png";


export const LoadingModal = () => {
    return(
        <div className={`absolute inset-0 w-full h-full h-1 flex items-center justify-center z-50 bg-accent/5 left-0 rounded-lg`}>
            <div className="relative w-24 h-24 flex items-center justify-center">
                {/* <!-- Borda girando --> */}
                <div className="absolute w-full h-full border-7 border-accent/40 border-t-accent rounded-full animate-spin"/>

                {/* <!-- Imagem pulsando --> */}
                <img 
                    src={SymbolLogo}
                    className="h-[2em] w-[2em] animate-ping "
                />
            </div>
        </div>
       
    )
} 