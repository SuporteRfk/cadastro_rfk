import { Coffee } from "lucide-react"

export const MomentCoffe = ({mensagem, applyColor=true }:{mensagem :string, applyColor?:boolean}) => {

    return (
        <div className={`mt-10 w-full max-w-[600px] h-[50vh] flex flex-col items-center justify-center text-center text-gray-600 ${applyColor && "shadow-lg bg-white"} rounded-2xl `}>
            <Coffee size={48} strokeWidth={1.5} className="mb-4 text-accent" />
            <h2 className="text-xl font-semibold mb-4">
                {mensagem}
            </h2>
            <p className="text-sm text-gray-500">Tudo certo por aqui. Aproveite para tomar um café.</p>
            <span className="text-3xl animate-bounce mt-4">☕</span>
        </div>
    );
};
