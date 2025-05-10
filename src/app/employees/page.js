'use client';
import React, {useState} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEllipsisVertical } from '@fortawesome/free-solid-svg-icons'
export default function EmployeesPage() {  
    const optionsForMenu = [
      {value:1, name: 'View Profile'},
      {value:2, name: 'Deactivate'},
      {value:3, name: 'Edit'}
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
    { id: 1, CreatedAt : '2025-05-03', UpdatedAt: '2025-05-03', DeletedAt: null, FullName:'Niko Montemayor', Email:'niko@theartofwildroots.com', Phone:'123-456-7890', Address: '123 Main St' , PostalCode: 'V5K0A1' , DriversLicense: 'D1234567' , SIN: '123456789' , BirthDate: '1990-01-01' , IsAdmin: false , IsActive: true , StartDate: "2024-05-01" , JobTitle: 'Owner', TypeContract: 'Full-time', Salary: 50000, InstitutionNo: "001", AccountNo: "123456789",TransitNo: "00011",BankAccountName: "John Doe",Tools: [], Trucks: [],EmergencyContacts: [{ID: 1,CreatedAt: "2025-05-03T17:12:18.716121Z",UpdatedAt: "2025-05-03T17:12:18.716121Z",DeletedAt: null,EmployeeID: 1,Name: "Jane Doe", Phone: "987-654-3210",Address: "456 Another Street",Relationship: "Spouse"}]},
    { id: 2, CreatedAt : '2025-05-03', UpdatedAt: '2025-05-03',DeletedAt: null, FullName:'Lourdes Hugo', Email:'Lou@theartofwildroots.com', Phone:'123-456-7890', Address: '123 Main St' , PostalCode: 'V5K0A1' , DriversLicense: 'D1234567' , SIN: '123456789' , BirthDate: '1990-01-01' , IsAdmin: false , IsActive: false ,StartDate: "2024-05-01" , JobTitle: 'CEO', TypeContract: 'Full-time', Salary: 50000, InstitutionNo: "001",AccountNo: "123456789",TransitNo: "00011",BankAccountName: "John Doe",Tools: [],Trucks: [],EmergencyContacts: [{ID: 1,CreatedAt: "2025-05-03T17:12:18.716121Z",UpdatedAt: "2025-05-03T17:12:18.716121Z",DeletedAt: null,EmployeeID: 1,Name: "Jane Doe", Phone: "987-654-3210",Address: "456 Another Street",Relationship: "Spouse"}]},
  ];      
    return (
      <div className="p-8 m-8">
        <h1 className="text-2xl font-bold mb-4 mt-6">Employees</h1>
          <div className="overflow-x-auto p-4">  {/* permite hacer scroll si la tabla es muy ancha */}
          <table className="min-w-full bg-white border border-gray-200">{/*  crea la tabla con todo el ancho disponible con fondo blanco y borde gris*/}
            <thead className="bg-foreground h-1/2 text-left">{/*  encabezado de la tabla */}
              <tr className='text-background'>
                <th className="py-2 px-6 border-b">Full Name</th>{/*  py - padding vertical y px - padding horizontal y border-b hace una línea inferior */}
                <th className="py-2 px-6 border-b">Email</th>
                <th className="py-2 px-6 border-b">Job Title</th>
                <th className="py-2 px-6 border-b">Status</th>
                <th className="border-b"></th>
              </tr>
            </thead>
            <tbody>
              {employees.map((user) => (
                <tr key={user.id} className="text-center">{/* En React, cuando haces listas (.map() para crear elementos repetidos como filas de tabla), necesitas darle una key única a cada elemento. Key ayuda a identificar cada fila de manera única (cómo el id del usuario)*/}
                  <td className="py-2 px-4 border-b">{user.FullName}</td>
                  <td className="py-2 px-4 border-b">{user.Email}</td>
                  <td className="py-2 px-4 border-b">{user.JobTitle}</td>
                  <td className="py-2 px-4 border-b">
                    {user.IsActive  ? "Active":"Inactive"}</td>
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
            <div className="bg-white p-6 rounded shadow-lg  relative">
              <h2 className="text-xl font-bold mb-4">Employee Profile</h2>
              <p><strong>Name:</strong> {empleadoSeleccionado.FullName}</p>
              <p><strong>Email:</strong> {empleadoSeleccionado.Email}</p>
              <p><strong>Job Title:</strong> {empleadoSeleccionado.JobTitle}</p>
              <p><strong>Phone Number</strong> {empleadoSeleccionado.Phone}</p>
              <p><strong>Address:</strong> {empleadoSeleccionado.Address}</p>
              <p><strong>Driver License:</strong> {empleadoSeleccionado.DriversLicense}</p>
              <p><strong>SIN Number:</strong> {empleadoSeleccionado.SIN}</p>
              <p><strong>Birthdate:</strong> {empleadoSeleccionado.BirthDate}</p>
              <p><strong>Start Date:</strong> {empleadoSeleccionado.StartDate}</p>
              <p><strong>Job Title:</strong> {empleadoSeleccionado.JobTitle}</p>
              <p><strong>Type of Contract:</strong> {empleadoSeleccionado.TypeContract}</p>
              <p><strong>Salary:</strong> {empleadoSeleccionado.Salary} CAD</p>
              <p><strong>Bank Account Name:</strong> {empleadoSeleccionado.BankAccountName}</p>
              <p><strong>Institution Number:</strong> {empleadoSeleccionado.InstitutionNo}</p>
              <p><strong>Transit Number:</strong> {empleadoSeleccionado.TransitNo}</p>
              <p><strong>Account Number:</strong> {empleadoSeleccionado.AccountNo}</p>
              <p><strong>Emergency Contacts:</strong></p>
              <table>
              <thead>{/*  encabezado de la tabla */}
              <tr>
                <th className="py-2 px-4 border-b">Full Name</th>{/*  py - padding vertical y px - padding horizontal y border-b hace una línea inferior */}
                <th className="py-2 px-4 border-b">Phone Number</th>
                <th className="py-2 px-4 border-b">Address</th>
                <th className="py-2 px-4 border-b">Relationship</th>
              </tr>
            </thead>
            <tbody>
              {empleadoSeleccionado.EmergencyContacts.map((emergency) =>(
                <tr key={emergency.ID} className="text-center">{/* En React, cuando haces listas (.map() para crear elementos repetidos como filas de tabla), necesitas darle una key única a cada elemento. Key ayuda a identificar cada fila de manera única (cómo el id del usuario)*/}
                <td className="py-2 px-4 border-b">{emergency.Name}</td>
                <td className="py-2 px-4 border-b">{emergency.Phone}</td>
                <td className="py-2 px-4 border-b">{emergency.Address}</td>
                <td className="py-2 px-4 border-b">{emergency.Relationship}</td>
              </tr>
              ) )
              }
            </tbody>
            </table>
              <button
                onClick={() => setMostrarModal(false)}
                className="mt-4 bg-indigo-500 text-white px-4 py-2 rounded"
              >
                Close
              </button>
            </div>
          </div>
        )}        
      </div>
      );
};
