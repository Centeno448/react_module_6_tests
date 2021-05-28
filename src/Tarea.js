import React from 'react'

export default function Tarea({ tarea }) {
    return (
        <div>
            <label>
                <input type="checkbox" checked={tarea.completado}/>
                {tarea.nombre}
            </label>
        </div>
    )
}
