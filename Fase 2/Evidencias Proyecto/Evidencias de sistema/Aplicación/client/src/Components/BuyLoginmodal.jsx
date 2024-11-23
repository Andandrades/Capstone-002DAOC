import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useUser } from './API/UserContext';
import { toast } from 'react-toastify';

export const BuyLoginmodal = (props) => {
    const { onClose } = props
    const [error, setError] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { setIsAuth, fetchAuthData } = useUser();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, password }),
                credentials: "include",
            });

            if (!response.ok) {
                await response.json();
                toast.error("Usuario o contraseña invalidos.");
                return;
            }

            fetchAuthData();
        } catch (err) {
            toast.error("Usuario o contraseña invalidos.");
            console.error(err);
        }
    };

    const handleBackdropClick = (e) => {
        if (e.target.classList.contains('modal-backdrop')) {
            onClose();
        }
    };
    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 modal-backdrop"
            onClick={handleBackdropClick}
        >
            <div
                className="bg-white w-full max-w-lg mx-auto p-6 rounded-lg shadow-xl relative"
                onClick={(e) => e.stopPropagation()}
            >
                <button
                    className="absolute top-2 right-2 text-gray-600 hover:text-black focus:outline-none"
                    onClick={onClose}
                >
                    &times;
                </button>

                <div className="text-center mb-6">
                    <h2 className="text-2xl font-bold text-gray-800">Soldados Gym</h2>
                    <p className="mt-2 text-gray-600">Para continuar con la compra, por favor inicia sesión o regístrate.</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="flex flex-col">
                        <input
                            type="email"
                            placeholder="Email"
                            className="px-4 py-2 border border-gray-300 rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    <div className="flex flex-col">
                        <input
                            type="password"
                            placeholder="Contraseña"
                            className="px-4 py-2 border border-gray-300 rounded-lg text-black  focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-purple-600 text-white py-3 rounded-lg hover:bg-purple-700 mb-4"
                    >
                        Iniciar sesión
                    </button>

                    <button
                        type="button"
                        className="w-full border-2 border-purple-600 text-purple-600 py-3 rounded-lg hover:bg-gray-100"
                        onClick={() => navigate('/Register')}
                    >
                        Registrarse
                    </button>

                    <p className="mt-4 text-sm text-center text-gray-600">
                        ¿Olvidaste tu contraseña?{' '}
                        <span
                            onClick={() => navigate("recover")}
                            className="text-purple-600 cursor-pointer underline">
                            Recupérala aquí
                        </span>
                    </p>
                </form>
                {error && <p className="mt-4 text-red-600 text-center">{error}</p>}
            </div>
        </div >)
}


