
import { useNavigate } from "react-router-dom";
import { AuthContext } from "@/context";
import { motion } from "framer-motion";
import { useContext } from "react";

export const NotFoundPage = () => {
  const {isAuthenticated} = useContext(AuthContext);
  const navigate = useNavigate();


  const handleGoBack = () => {
    if (isAuthenticated) {
      navigate("/dashboard");
    } else {
      navigate("/login");
    }
  };


  // Variantes de animação para o "4" caindo
  const fallingFourVariants = {
    initial: { y: -100, rotate: 0, opacity: 0 },
    animate: { y: 50, rotate: 20, opacity: 1 },
  };

  return (
    <div 
      className="min-h-screen min-w-full flex justify-center items-center" 
      style={{backgroundImage: "url('https://www.toptal.com/designers/subtlepatterns/uploads/extra_clean_paper.png')"}}
    >
      <div
        className="w-full h-screen flex flex-col justify-center items-center relative overflow-hidden"
      >
        {/* "404" com animação */}
        <div className="relative text-center">
          {/* Primeiro "4" */}
          <motion.span
            className="text-9xl font-extrabold text-text-strong"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            4
          </motion.span>

          {/* "0" */}
          <motion.span
            className="text-9xl font-extrabold text-text-neutral mx-4"
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            0
          </motion.span>

        {/* Segundo "4" caindo */}
        <motion.span
          className="text-9xl font-extrabold text-text-strong absolute top-0 left-[90%]"
          variants={fallingFourVariants}
          initial="initial"
          animate="animate"
          transition={{
            duration: 0.8,
            ease: "easeOut",
          }}
        >
          4
        </motion.span>
        </div>

        {/* "ERROR" abaixo do "404" */}
        <motion.p
          className="text-4xl font-bold text-warning mt-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9 }}
        >
          ERROR
        </motion.p>

        {/* Mensagem explicativa */}
        <motion.p
          className="text-lg text-text-neutral mt-6 text-center px-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1 }}
        >
          A página que você está tentando acessar não existe ou foi movida.
        </motion.p>

        {/* Botão de voltar */}
        <motion.button
          onClick={handleGoBack}
          className="px-6 py-3 bg-medium text-white rounded-lg shadow-md mt-6 hover:bg-accent transition-colors duration-300"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.3 }}
        >
          Voltar
        </motion.button>
      </div>
  
    </div>
  );
};
