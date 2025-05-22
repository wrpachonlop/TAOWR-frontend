'use client';
import React, {useState, useEffect} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEllipsisVertical, faPlus } from '@fortawesome/free-solid-svg-icons'
import axios from "axios";
export default function EmployeesPage() {  
    const optionsForMenu = [
      {value:1, name: 'View Profile'},
      {value:2, name: 'Deactivate'},
      {value:3, name: 'Edit'}
    ]
    
    const [empleadoSeleccionado, setEmpleadoSeleccionado] = useState(null);
    const [mostrarModal, setMostrarModal] = useState(false);
    const [nuevoeModal, setNuevoeModal] = useState(false);
    const [mostrarMenu, setMostrarMenu]=useState(null);
    const [employees, setEmployees] = useState([]);
    const [formData, setFormData] = useState({
      fullName:"", 
      email:"", 
      phone:"", 
      address: "", 
      postalCode: "", 
      driversLicense: "", 
      sin: "", 
      birthDate: "" , 
      isAdmin: false , 
      isActive: true , 
      startDate: "" , 
      jobTitle: "", 
      typeContract: "", 
      salary: "", 
      institutionNo: "", 
      accountNo: "",
      transitNo: "",
      bankAccountName: "",
      emergencyContacts: [{Name: "", 
                           Phone: "",
                           Address: "",
                           Relationship: ""}]

    });
    const handleClick = (id) => {
      setMostrarMenu(prev => (prev === id ? null : id));
      console.log(`Botón presionado ${id}`);
    };
    const handleChange = (e) => {
      const {name,value,type,checked}=e.target;
      setFormData({
      ...formData,
      [name]: type ==="checkbox" ? checked : value,
    });
    };
    const handleSubmit = async (e) => {
      e.preventDefault();

      try {
      const response = await axios.post("https://taowr-backend.onrender.com/api/employees", formData);
      console.log("Respuesta del servidor:", response.data);
      alert("Empleado guardado exitosamente");
      setNuevoeModal(false);
      } catch (error) {
      console.error("Error al guardar:", error.response?.data || error.message);
      alert("Hubo un error al guardar el empleado");
      }
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
  
  /*const employees=[ //Estoy creando las tablas con la información de los empleados
    { id: 1, CreatedAt : '2025-05-03', UpdatedAt: '2025-05-03', DeletedAt: null, FullName:'Niko Montemayor', Email:'niko@theartofwildroots.com', Phone:'123-456-7890', Address: '123 Main St' , PostalCode: 'V5K0A1' , DriversLicense: 'D1234567' , SIN: '123456789' , BirthDate: '1990-01-01' , IsAdmin: false , IsActive: true , StartDate: "2024-05-01" , JobTitle: 'Owner', TypeContract: 'Full-time', Salary: 50000, InstitutionNo: "001", AccountNo: "123456789",TransitNo: "00011",BankAccountName: "John Doe",Tools: [], Trucks: [],EmergencyContacts: [{ID: 1,CreatedAt: "2025-05-03T17:12:18.716121Z",UpdatedAt: "2025-05-03T17:12:18.716121Z",DeletedAt: null,EmployeeID: 1,Name: "Jane Doe", Phone: "987-654-3210",Address: "456 Another Street",Relationship: "Spouse"}]},
    { id: 2, CreatedAt : '2025-05-03', UpdatedAt: '2025-05-03',DeletedAt: null, FullName:'Lourdes Hugo', Email:'lou@theartofwildroots.com', Phone:'123-456-7890', Address: '123 Main St' , PostalCode: 'V5K0A1' , DriversLicense: 'D1234567' , SIN: '123456789' , BirthDate: '1990-01-01' , IsAdmin: false , IsActive: false ,StartDate: "2024-05-01" , JobTitle: 'CEO', TypeContract: 'Full-time', Salary: 50000, InstitutionNo: "001",AccountNo: "123456789",TransitNo: "00011",BankAccountName: "John Doe",Tools: [],Trucks: [],EmergencyContacts: [{ID: 1,CreatedAt: "2025-05-03T17:12:18.716121Z",UpdatedAt: "2025-05-03T17:12:18.716121Z",DeletedAt: null,EmployeeID: 1,Name: "Jane Doe", Phone: "987-654-3210",Address: "456 Another Street",Relationship: "Spouse"}]},
  ];*/ 
  useEffect(() =>{
    const fetchEmployees = async()=> {
      try {
        const response = await axios.get("https://taowr-backend.onrender.com/api/employees");
        setEmployees(response.data);
      } catch (error){
        console.log("Error al obtener empleados:", error);
      }
    };

    fetchEmployees();
  },[]
  );  
    console.log(employees);   
    return (
      <div className="p-8 m-8">
        <h1 className="text-2xl font-bold mb-4 mt-6">Employees</h1>
          <div className='flex justify-end p-4'>
              <button onClick={()=> setNuevoeModal(true)} className=" block text-left bg-primary font-thin text-white px-3 py-1.5 rounded">
                <span className='pr-2'><FontAwesomeIcon icon={faPlus} /></span> New Employee
              </button>
          </div>
            {nuevoeModal && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z- ">
                <div className="bg-white p-6 rounded shadow-lg w-full max-w-4xl max-h-screen overflow-y-auto overflow-x-auto">
                  <h1 className="text-lg font-bold mb-6">New Employee</h1>
                        <form onSubmit={(e) => {
                        handleSubmit(e);
                        setNuevoeModal(false);
                      }}>
                          <div className="w-full my-10 grid grid-cols-2 gap-4 p-2">
                            <h3 className="text-lg font-regular mb-6">Demographics</h3>
                            <div className='col-span-2'>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                            Full Name
                            </label>
                            <input
                              type="text"
                              name="fullName"
                              value={formData.fullName}
                              onChange={handleChange}
                              className="w-full border border-gray-400 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-primary"
                              required
                            />
                          </div>
                          <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Email
                          </label>
                          <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full border border-gray-400 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-primary"
                            required
                          />
                          </div>
                           <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                            Phone Number
                            </label>
                            <input
                              type="text"
                              name="phone"
                              value={formData.phone}
                              onChange={handleChange}
                              className="w-full border border-gray-400 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-primary"
                              required
                            />
                          </div>                                               
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                            Address
                            </label>
                            <input
                              type="text"
                              name="address"
                              value={formData.address}
                              onChange={handleChange}
                              className="w-full border border-gray-400 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-primary"
                              required
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                            Postal Code
                            </label>
                            <input
                              type="text"
                              name="postalCode"
                              value={formData.postalCode}
                              onChange={handleChange}
                              className="w-1/2 border border-gray-400 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-primary"
                              required
                            />
                          </div>
                           <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                            SIN Number
                            </label>
                            <input
                              type="text"
                              name="sin"
                              value={formData.sin}
                              onChange={handleChange}
                              className="w-full border border-gray-400 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-primary"
                              required
                            />
                          </div>   
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                            Driver License Number
                            </label>
                            <input
                              type="text"
                              name="driverLicense"
                              value={formData.driversLicense}
                              onChange={handleChange}
                              className="w-full border border-gray-400 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-primary"
                              required
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                            Birth Date
                            </label>
                            <input
                              type="text"
                              name="birthDate"
                              value={formData.birthDate}
                              onChange={handleChange}
                              className="w-full border border-gray-400 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-primary"
                              required
                            />
                          </div>
                          <div className='py-8'>
                            <label className="inline-flex items-center cursor-pointer">
                              <span className='mr-2 text-sm font-medium text-gray-700'>Is the employee an admin?</span>
                              <input
                              type="checkbox"
                              name="isAdmin"
                              checked={formData.isAdmin}
                              onChange={handleChange}
                              className="sr-only"
                              required
                            />
                                <div
                                  className={`w-11 h-6 rounded-full relative transition-colors duration-300 ${
                                    formData.isAdmin ? "bg-primary" : "bg-gray-300"
                                  }`}
                                >
                                <div
                                  className={`w-4 h-4 bg-white rounded-full absolute top-1 transition-transform ${
                                    formData.isAdmin ? "translate-x-6" : "translate-x-1"
                                  }`}
                                ></div>
                              </div>
                            </label>
                          </div>
                          <div className="col-span-2">
                            <h3 className="text-lg font-regular mb-6">Company information</h3>
                          </div>                          
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                            Start Date
                            </label>
                            <input
                              type="text"
                              name="startDate"
                              value={formData.startDate}
                              onChange={handleChange}
                              className="w-full border border-gray-400 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-primary"
                              required
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                            Position
                            </label>
                            <input
                              type="text"
                              name="jobTitle"
                              value={formData.jobTitle}
                              onChange={handleChange}
                              className="w-full border border-gray-400 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-primary"
                              required
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                            Type of contract
                            </label>
                            <input
                              type="text"
                              name="typeContract"
                              value={formData.typeContract}
                              onChange={handleChange}
                              className="w-full border border-gray-400 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-primary"
                              required
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                            Salary
                            </label>
                            <input
                              type="number"
                              name="salary"
                              value={formData.salary}
                              onChange={handleChange}
                              className="w-full border border-gray-400 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-primary"
                              required
                            />
                          </div>
                          <div className="col-span-2">
                            <h3 className="text-lg font-regular mb-6 mt-4">Bank information</h3>
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                            Institution Number
                            </label>
                            <input
                              type="text"
                              name="institutionNo"
                              value={formData.institutionNo}
                              onChange={handleChange}
                              className="w-full border border-gray-400 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-primary"
                              required
                            />
                          </div> 
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                            Account Number
                            </label>
                            <input
                              type="text"
                              name="accountNo"
                              value={formData.accountNo}
                              onChange={handleChange}
                              className="w-full border border-gray-400 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-primary"
                              required
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                            Transit Number
                            </label>
                            <input
                              type="text"
                              name="transitNo"
                              value={formData.transitNo}
                              onChange={handleChange}
                              className="w-full border border-gray-400 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-primary"
                              required
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                            Bank Account Name
                            </label>
                            <input
                              type="text"
                              name="bankAccountName"
                              value={formData.bankAccountName}
                              onChange={handleChange}
                              className="w-full border border-gray-400 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-primary"
                              required
                            />
                          </div> 
                          <div className="col-span-2">
                            <h3 className="text-lg font-regular mb-6 mt-4">Emergency Contact</h3>
                          </div> 
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                            Emergency Contact Name
                            </label>
                            <input
                              type="text"
                              name="name"
                              value={formData.emergencyContacts.name}
                              onChange={handleChange}
                              className="w-full border border-gray-400 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-primary"
                              required
                            />
                          </div>   
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                            Emergency Contact Phone
                            </label>
                            <input
                              type="text"
                              name="phoneE"
                              value={formData.emergencyContacts.phone}
                              onChange={handleChange}
                              className="w-full border border-gray-400 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-primary"
                              required
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                            Emergency Contact Address
                            </label>
                            <input
                              type="text"
                              name="addressE"
                              value={formData.emergencyContacts.address}
                              onChange={handleChange}
                              className="w-full border border-gray-400 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-primary"
                              required
                            />
                          </div>  
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                            Emergency Contact Relationship
                            </label>
                            <input
                              type="text"
                              name="relationship"
                              value={formData.emergencyContacts.relationship}
                              onChange={handleChange}
                              className="w-full border border-gray-400 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-primary"
                              required
                            />
                          </div>  
                        </div>
                        <div className="flex justify-end space-x-2">
                          <button
                            type="button"
                            onClick={() => setNuevoeModal(false)}
                            className="px-4 py-2 bg-gray-300 text-gray-700 rounded"
                          >
                            Cancel
                          </button>

                          <button
                            type="submit"
                            className="px-4 py-2 bg-primary text-white rounded"
                          >
                            Save
                          </button>
                        </div>
                      </form>
                </div>
              </div>
            )}
          <div className=" rounded-lg overflow-x-auto p-4">  {/* permite hacer scroll si la tabla es muy ancha */}
          <table className="min-w-full bg-white border border-gray-200 mt-8">{/*  crea la tabla con todo el ancho disponible con fondo blanco y borde gris*/}
            <thead className="bg-foreground h-1/2 text-left">{/*  encabezado de la tabla */}
              <tr className='text-background'>
                <th className="py-2 px-6 border-b rounded-tl-lg w-1/3">Full Name</th>{/*  py - padding vertical y px - padding horizontal y border-b hace una línea inferior */}
                <th className="py-2 px-6 border-b w-1/6">Phone Number</th>
                <th className="py-2 px-4 border-b w-1/8">Job Title</th>
                <th className="py-2 border-b w-1/8">Status</th>
                <th className="border-b rounded-tr-lg w-1/20"></th>
              </tr>
            </thead>
            <tbody>
              {employees.map((user) => (
                <tr key={user.ID}>{/* En React, cuando haces listas (.map() para crear elementos repetidos como filas de tabla), necesitas darle una key única a cada elemento. Key ayuda a identificar cada fila de manera única (cómo el id del usuario)*/}
                  <td className="py-2 pl-8 pr-2 border-b last:rounded-bl-lg text-left border-gray-300">{user.FullName}<br/>
                    <span className='text-gray-500'>{user.Email}</span></td>
                  <td className="py-2 px-8 border-b border-gray-300">
                    <span className="inline-block bg-gray-200 text-sm px-1 py-0.5 rounded-lg">{user.Phone}</span>
                    </td>
                  <td className="py-2 px-4 border-b border-gray-300">{user.JobTitle}<br/>
                    <span className='text-gray-500'>{user.TypeContract}</span>
                  </td>
                  <td className="py-2 px-6 border-b border-gray-300">
                    {user.IsActive  ? <span className="inline-block bg-green-100 text-sm px-1 py-0.5 rounded-lg text-green-800">• Active</span>:<span className="inline-block bg-red-100 text-sm px-1 py-0.5 rounded-lg text-red-800">• Inactive</span>}</td>
                  <td className="py-2 px-4 border-b last:rounded-br-lg border-gray-300"> 
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
