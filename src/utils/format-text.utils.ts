
interface IFormatText {
    text: string | Date;
    type: "data";
}


export const formatText = (text:IFormatText["text"], type:IFormatText["type"]):string => {
    if(!text) return '';

    switch(type){
        case "data":
            const data = typeof text === "string" ? new Date(text) : (text as Date);
            if (isNaN(data.getTime())) return "";;
            const dia = String(data.getDate()).padStart(2, "0");
            const mes = String(data.getMonth() + 1).padStart(2, "0"); // mês começa do 0
            const ano = data.getFullYear();
            const horas = String(data.getHours()).padStart(2, "0");
            const minutos = String(data.getMinutes()).padStart(2, "0");
            
            return `${dia}/${mes}/${ano} ${horas}:${minutos}`;
        default:
            return String(text);
    }
}