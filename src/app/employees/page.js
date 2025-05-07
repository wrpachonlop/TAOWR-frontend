'use client';
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEllipsisVertical } from '@fortawesome/free-solid-svg-icons'



export default function EmployeesPage() {  
  const handleClick = (name) => {
    console.log("Botón presionado",name);
  };
  const employees=[ //Estoy creando las tablas con la información de los empleados
    { id: 1, name:'Niko Montemayor', number:'niko@theartofwildroots.com', role: 'Owner', status: 'Active'},
    { id: 2, name:'Lourdes Hugo', number:'Lou@theartofwildroots.com', role: 'CEO', status: 'Active'},
  ];      
    return (
      <div>
        <h1 className="text-2xl font-bold mb-4">Employees</h1>
          <div className="overflow-x-auto">  {/* permite hacer scroll si la tabla es muy ancha */}
          <table className="min-w-full bg-white border border-gray-200">{/*  crea la tabla con todo el ancho disponible con fondo blanco y borde gris*/}
            <thead>{/*  encabezado de la tabla */}
              <tr>
                <th className="py-2 px-4 border-b">Nombre</th>{/*  py - padding vertical y px - padding horizontal y border-b hace una línea inferior */}
                <th className="py-2 px-4 border-b">Phone number</th>
                <th className="py-2 px-4 border-b">Role</th>
                <th className="py-2 px-4 border-b">Status</th>
                <th className="py-2 px-4 border-b"></th>
              </tr>
            </thead>
            <tbody>
              {employees.map((user) => (
                <tr key={user.id} className="text-center">{/* En React, cuando haces listas (.map() para crear elementos repetidos como filas de tabla), necesitas darle una key única a cada elemento. Key ayuda a identificar cada fila de manera única (cómo el id del usuario)*/}
                  <td className="py-2 px-4 border-b">{user.name}</td>
                  <td className="py-2 px-4 border-b">{user.number}</td>
                  <td className="py-2 px-4 border-b">{user.role}</td>
                  <td className="py-2 px-4 border-b">{user.status}</td>
                  <td className="py-2 px-4 border-b"> 
                    <button onClick={()=>handleClick(user.name)} className="white text-black px-4 py-2 rounded">
                      <FontAwesomeIcon icon={faEllipsisVertical} />
                    </button>
                  </td>
                </tr>
              )         
            )}
            </tbody>
          </table>
        </div>
      </div>
      );
};
