import SymbolLogo from "@/assets/symbol_logo.png";

export const FullPageLoader = () => {

    return (
        <div className="bg-accent/5 flex-col gap-4 w-full h-screen flex items-center justify-center">
            <div className="relative w-32 h-32 flex items-center justify-center">
                {/* <!-- Borda girando --> */}
                <div className="absolute w-full h-full border-8 border-accent/30 border-t-accent rounded-full animate-spin"/>

                {/* <!-- Imagem pulsando --> */}
                <img 
                    src={SymbolLogo}
                    className="h-[3em] w-[3em] animate-ping "
                />
            </div>
        </div>
    )
};