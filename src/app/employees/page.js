'use client';
import React, {useState} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEllipsisVertical } from '@fortawesome/free-solid-svg-icons'
export default function EmployeesPage() {  
    const optionsForMenu = [
      {value:1, name: 'Ver Perfil'},
      {value:2, name: 'Desactivar'},
      {value:3, name: 'Editar'}
    ]
    
    const [empleadoSeleccionado, setEmpleadoSeleccionado] = useState(null);
    const [mostrarModal, setMostrarModal] = useState(false);
    const [mostrarMenu, setMostrarMenu]=useState(null);
    const handleClick = (id) => {
      setMostrarMenu(prev => (prev === id ? null : id));
      console.log(`Botón presionado ${id}`);
    };
    const seleccionarOpcion = (idOption, empleado) => () => {
      console.log('Opción:', idOption);
      console.log('Empleado:', empleado);
      if (idOption===1){
        setEmpleadoSeleccionado(empleado);
        setMostrarModal(true);
      }
      console.log(`seleccionaste: ${idOption}`);
      setMostrarMenu(false);
    };
  
  const employees=[ //Estoy creando las tablas con la información de los empleados
    { id: 1, CreatedAt : '2025-05-03', UpdatedAt: '2025-05-03', DeletedAt: null, FullName:'Niko Montemayor', Email:'niko@theartofwildroots.com', Phone:'123-456-7890', Address: '123 Main St' , PostalCode: 'V5K0A1' , DriversLicense: 'D1234567' , SIN: '123456789' , role: 'Owner', status: 'Active'},
    { id: 2, CreatedAt : '2025-05-03', UpdatedAt: '2025-05-03',DeletedAt: null, FullName:'Lourdes Hugo', Email:'Lou@theartofwildroots.com', Phone:'123-456-7890', Address: '123 Main St' , PostalCode: 'V5K0A1' , DriversLicense: 'D1234567' , SIN: '123456789' , role: 'CEO', status: 'Active'},
  ];      
    return (
      <div>
        <h1 className="text-2xl font-bold mb-4">Employees</h1>
          <div className="overflow-x-auto">  {/* permite hacer scroll si la tabla es muy ancha */}
          <table className="min-w-full bg-white border border-gray-200">{/*  crea la tabla con todo el ancho disponible con fondo blanco y borde gris*/}
            <thead>{/*  encabezado de la tabla */}
              <tr>
                <th className="py-2 px-4 border-b">Full Name</th>{/*  py - padding vertical y px - padding horizontal y border-b hace una línea inferior */}
                <th className="py-2 px-4 border-b">Email</th>
                <th className="py-2 px-4 border-b">Role</th>
                <th className="py-2 px-4 border-b">Status</th>
                <th className="py-2 px-4 border-b"></th>
              </tr>
            </thead>
            <tbody>
              {employees.map((user) => (
                <tr key={user.id} className="text-center">{/* En React, cuando haces listas (.map() para crear elementos repetidos como filas de tabla), necesitas darle una key única a cada elemento. Key ayuda a identificar cada fila de manera única (cómo el id del usuario)*/}
                  <td className="py-2 px-4 border-b">{user.FullName}</td>
                  <td className="py-2 px-4 border-b">{user.Email}</td>
                  <td className="py-2 px-4 border-b">{user.role}</td>
                  <td className="py-2 px-4 border-b">{user.status}</td>
                  <td className="py-2 px-4 border-b"> 
                    <button onClick={()=>handleClick(user.id)} className="white text-black px-4 py-2 rounded">
                      <FontAwesomeIcon icon={faEllipsisVertical} />
                    </button>
                    {mostrarMenu === user.id && (
                      <div className='mt-2 bg-white border rounded shadow-lg absolute z-10'>
                        <ul className="text-sm text-gray-700">
                          {optionsForMenu.map((option) =>(
                            <li 
                              key={option.value} 
                              onClick={seleccionarOpcion(option.value, user)}
                              className="px-4 py-2 hover:bg-gray-100 cursor-pointer"                              
                            >
                              {option.name}
                            </li>
                          ))}
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
          {mostrarModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded shadow-lg w-96 relative">
              <h2 className="text-xl font-bold mb-4">Perfil del Empleado</h2>
              <p><strong>Name:</strong> {empleadoSeleccionado.FullName}</p>
              <p><strong>Email:</strong> {empleadoSeleccionado.Email}</p>
              <p><strong>Rol:</strong> {empleadoSeleccionado.role}</p>
              <p><strong>Estado:</strong> {empleadoSeleccionado.status}</p>
              <button
                onClick={() => setMostrarModal(false)}
                className="mt-4 bg-indigo-500 text-white px-4 py-2 rounded"
              >
                Cerrar
              </button>
            </div>
          </div>
        )}        
      </div>
      );
};
