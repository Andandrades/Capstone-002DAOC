import React from 'react';

const ScheduleTable = ({ schedules, onEdit, onDelete }) => {
    return (
        <table className='z-50'>
            <thead>
                <tr>
                    <th>Fecha</th>
                    <th>Hora de Inicio</th>
                    <th>Hora de Fin</th>
                    <th>Capacidad Máxima</th>
                    <th>Capacidad Actual</th>
                    <th>Acciones</th>
                </tr>
            </thead>
            <tbody>
                {schedules.map(schedule => (
                    <tr key={schedule.id}>
                        <td>{schedule.schedule_date.split('T')[0]}</td>
                        <td>{schedule.start_hour}</td>
                        <td>{schedule.end_hour}</td>
                        <td>{schedule.max_cap}</td>
                        <td>{schedule.actual_cap}</td>
                        <td>
                            <button onClick={() => onEdit(schedule)}>Editar</button>
                            <button onClick={() => onDelete(schedule.id)}>Eliminar</button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default ScheduleTable;
