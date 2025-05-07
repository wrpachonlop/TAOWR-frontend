'use client';
import React, {useState} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEllipsisVertical } from '@fortawesome/free-solid-svg-icons'
export default function EmployeesPage() {  

  
    const [mostrarMenu, setMostrarMenu]=useState(null);
    const handleClick = (id) => {
      setMostrarMenu(prev => (prev === id ? null : id));
      console.log("Botón presionado",name);
    };
    const seleccionarOpcion = (opcion) => () => {
      console.log('seleccionaste: ${opcion}');
      setMostrarMenu(false);
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
                    <button onClick={()=>handleClick(user.id)} className="white text-black px-4 py-2 rounded">
                      <FontAwesomeIcon icon={faEllipsisVertical} />
                    </button>
                    {mostrarMenu === user.id && (
                      <div className='mt-2 bg-white border rounded shadow-lg absolute z-10'>
                        <ul className="text-sm text-gray-700">
                          <li
                            onClick={seleccionarOpcion('Ver perfil')}
                            className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                            >
                              Ver Perfil
                          </li>
                          <li
                            onClick={seleccionarOpcion('Inactivar')}
                            className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                            >
                              Inactivar
                          </li>
                          <li
                            onClick={seleccionarOpcion('Saludos')}
                            className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                            >
                              Saludos
                          </li>
                        </ul>
                      </div>
                     )}  
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
