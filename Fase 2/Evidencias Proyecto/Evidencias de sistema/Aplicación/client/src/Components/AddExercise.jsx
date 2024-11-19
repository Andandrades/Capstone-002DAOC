import { useState, useEffect } from "react";
import axios from "axios";

// Traducciones para las partes del cuerpo
const targetTranslations = {
  back: "Espalda",
  cardio: "Cardio",
  chest: "Pecho",
  "lower arms": "Antebrazos",
  "lower legs": "Piernas inferiores",
  neck: "Cuello",
  shoulders: "Hombros",
  "upper arms": "Brazos superiores",
  "upper legs": "Piernas superiores",
  waist: "Cintura",
};

//Traduccion Musculos del cuerpo
const targetMuscleTranslations = {
  abductors: "Abductores",
  abs: "Abdomen",
  adductors: "Aductores",
  biceps: "Bíceps",
  calves: "Gemelos",
  "cardiovascular system": "Sistema cardiovascular",
  delts: "Deltoides",
  forearms: "Antebrazos",
  glutes: "Glúteos",
  hamstrings: "Isquiotibiales",
  lats: "Latisimos del dorso",
  "levator scapulae": "Elevador de la escápula",
  pectorals: "Pectorales",
  quads: "Cuádriceps",
  "serratus anterior": "Serrato anterior",
  spine: "Columna vertebral",
  traps: "Trapecio",
  triceps: "Tríceps",
  "upper back": "Parte superior de la espalda",
};

const AddExercise = ({ isOpen, onClose, onSubmit, historyId }) => {
  // Lista de partes del cuerpo
  const [bodyParts, setBodyParts] = useState([]);
  // Parte del cuerpo seleccionada
  const [selectedBodyPart, setSelectedBodyPart] = useState("");
  const [exercises, setExercises] = useState([]);
  // Offset para paginación
  const [offset, setOffset] = useState(0);
  // Ejercicio seleccionado
  const [selectedExercise, setSelectedExercise] = useState(null);

  const [formData, setFormData] = useState({
    machine: "",
    weight: "",
    sets: "",
    repetitions: "",
    total_reps: "",
    notes: "",
    exercise_api_id: "",
  });

  const [loading, setLoading] = useState(false);

  // Fetch partes del cuerpo
  useEffect(() => {
    const fetchBodyParts = async () => {
      try {
        const response = await axios.get(
          "https://exercisedb.p.rapidapi.com/exercises/bodyPartList",
          {
            headers: {
              "X-RapidAPI-Key": `${import.meta.env.VITE_API_KEY_EXERCISES}`,
              "X-RapidAPI-Host": "exercisedb.p.rapidapi.com",
            },
          }
        );
        setBodyParts(response.data);
      } catch (error) {
        console.error("Error fetching body parts:", error);
      }
    };

    fetchBodyParts();
  }, []);

  const fetchExercisesByBodyPart = async () => {
    if (!selectedBodyPart) return;

    setLoading(true);
    try {
      const response = await axios.get(
        `https://exercisedb.p.rapidapi.com/exercises/bodyPart/${selectedBodyPart}`,
        {
          params: { limit: 10, offset: offset },
          headers: {
            "X-RapidAPI-Key": `${import.meta.env.VITE_API_KEY_EXERCISES}`,
            "X-RapidAPI-Host": "exercisedb.p.rapidapi.com",
          },
        }
      );

      setExercises(response.data);
    } catch (error) {
      console.error("Error fetching exercises:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchExercisesByBodyPart();
  }, [selectedBodyPart, offset]);

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  //Guardar informacion de ejercicio seleccionado
  const handleExerciseSelect = (exercise) => {
    setSelectedExercise(exercise);
    setFormData({
      ...formData,
      exercise_api_id: exercise.id,
    });
  };

  // Manejo del submit
  const handleSubmit = (event) => {
    event.preventDefault();

    if (!selectedExercise) {
      alert("Por favor selecciona un ejercicio.");
      return;
    }

    const exerciseData = {
      history_id: historyId,
      exercise_name: selectedExercise.name,
      machine: formData.machine,
      weight: parseInt(formData.weight),
      sets: parseInt(formData.sets),
      repetitions: parseInt(formData.repetitions),
      total_reps: parseInt(formData.total_reps),
      image: selectedExercise.gifUrl,
      target:
        targetMuscleTranslations[selectedExercise.target] ||
        selectedExercise.target,
      notes: formData.notes,
      exercise_api_id: formData.exercise_api_id,
    };

    onSubmit(exerciseData);
    onClose();
  };

  return (
    isOpen && (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
        <div className="bg-white w-11/12 max-w-3xl max-h-[80vh] rounded-lg p-6 overflow-y-auto">
          <h2 className="text-2xl font-semibold mb-4">Agregar Ejercicio</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block font-medium mb-2">Parte del cuerpo</label>
              <select
                className="border rounded-lg w-full p-2"
                value={selectedBodyPart}
                onChange={(e) => {
                  setSelectedBodyPart(e.target.value);
                  setOffset(0);
                }}
              >
                <option value="">Selecciona una parte</option>
                {bodyParts.map((part) => (
                  <option key={part} value={part}>
                    {targetTranslations[part] || part}{" "}
                  </option>
                ))}
              </select>
            </div>

            <div className="mb-4">
              <div className="flex items-center space-x-2 py-10 overflow-x-auto">
                {offset > 0 && (
                  <button
                    type="button"
                    onClick={() => setOffset((prev) => Math.max(prev - 10, 0))}
                    className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                  >
                    ←
                  </button>
                )}

                {exercises.length > 0
                  ? exercises.map((exercise) => (
                      <div
                        key={exercise.id}
                        onClick={() => handleExerciseSelect(exercise)}
                        className={`flex-shrink-0 w-48 py-10 border rounded-lg p-2 cursor-pointer ${
                          selectedExercise?.id === exercise.id
                            ? "border-blue-500"
                            : "border-gray-300"
                        }`}
                      >
                        <img
                          src={exercise.gifUrl}
                          alt={exercise.name}
                          className="w-full h-32 object-cover rounded-lg"
                        />
                        <p className="text-center truncate font-medium mt-2">
                          {exercise.name}
                        </p>
                      </div>
                    ))
                  : null}
                {exercises.length === 10 && (
                  <button
                    type="button"
                    onClick={() => setOffset((prev) => prev + 10)}
                    className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                  >
                    →
                  </button>
                )}
              </div>
            </div>

            <div className="mb-4">
              <label className="block font-medium mb-2">Máquina</label>
              <input
                type="text"
                className="border rounded-lg w-full p-2"
                name="machine"
                value={formData.machine}
                onChange={handleFormChange}
                placeholder="Ingresa el nombre de la máquina"
              />
            </div>

            <div className="mb-4">
              <label className="block font-medium mb-2">Peso</label>
              <input
                type="number"
                className="border rounded-lg w-full p-2"
                name="weight"
                value={formData.weight}
                onChange={handleFormChange}
                placeholder="Ingresa el peso"
              />
            </div>

            <div className="mb-4">
              <label className="block font-medium mb-2">Sets</label>
              <input
                type="number"
                className="border rounded-lg w-full p-2"
                name="sets"
                value={formData.sets}
                onChange={handleFormChange}
                placeholder="Ingresa la cantidad de sets"
              />
            </div>

            <div className="mb-4">
              <label className="block font-medium mb-2">Repeticiones</label>
              <input
                type="number"
                className="border rounded-lg w-full p-2"
                name="repetitions"
                value={formData.repetitions}
                onChange={handleFormChange}
                placeholder="Ingresa la cantidad de repeticiones"
              />
            </div>

            <div className="mb-4">
              <label className="block font-medium mb-2">Total Reps</label>
              <input
                type="number"
                className="border rounded-lg w-full p-2"
                name="total_reps"
                value={formData.total_reps}
                onChange={handleFormChange}
                placeholder="Ingresa el total de repeticiones"
              />
            </div>

            <div className="mb-4">
              <label className="block font-medium mb-2">Notas</label>
              <textarea
                className="border rounded-lg w-full p-2"
                name="notes"
                value={formData.notes}
                onChange={handleFormChange}
                placeholder="Ingresa observaciones"
              />
            </div>

            <div className="flex justify-end mt-6">
              <button
                type="button"
                onClick={onClose}
                className="bg-gray-300 hover:bg-gray-400 text-black px-4 py-2 rounded-md mr-2"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md"
              >
                Agregar
              </button>
            </div>
          </form>
        </div>
      </div>
    )
  );
};

export default AddExercise;
