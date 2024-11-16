import axios from "axios";
const URL = `${import.meta.env.VITE_API_URL}`;

export const sendEmail = async (props) => {
    const{data,subject,text} = props
    try {
        const response = await axios.post(`${URL}/sendemail`, {
            to: data.email,
            subject: subject,
            text: text,
        });
        console.log('Correo enviado:', response.data);
    } catch (error) {
        console.error('Error enviando correo:', error);
    }
};
