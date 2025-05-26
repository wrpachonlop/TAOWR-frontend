'use client';
import React, {useState, useEffect} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEllipsisVertical, faPlus } from '@fortawesome/free-solid-svg-icons'
import AddToolForm from '@/components/AddToolForm';
import axios from "axios";
export default function ToolsPage() {  
    const optionsForMenu = [
      {value:1, name: 'View Profile'},
      {value:2, name: 'Deactivate'},
      {value:3, name: 'Edit'}
    ]
    
    const [toolSelected, setToolSelected] = useState(null);
    const [mostrarModal, setMostrarModal] = useState(false);
    const [nuevoeModal, setNuevoeModal] = useState(false);
    const [mostrarMenu, setMostrarMenu]=useState(null);
    const [tools, setTools] = useState([]);
    const [formData, setFormData] = useState({
      fullName:"", email:"", phone:"", address: "", postalCode: "", driversLicense: "", sin: "", birthDate: "" , isAdmin: "" , isActive: "" , startDate: "" , jobTitle: "", typeContract: "", salary: "", institutionNo: "", accountNo: "",transitNo: "",bankAccountName: "",

    });
    const handleClick = (id) => {
      setMostrarMenu(prev => (prev === id ? null : id));
    };
    const handleChange = (e) => {
      setFormData({
      ...formData,
      [e.target.name]: e.target.value,
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
      console.log("Error al guardar:", error);
      alert("Hubo un error al guardar el empleado");
      }
      await axios.post("https://taowr-backend.onrender.com/api/employees", formData);
      const updatedList = await axios.get ("https://taowr-backend.onrender.com/api/employees");
      setTools(updatedList.data);
    };
    const seleccionarOpcion = (idOption, empleado) => () => {
      if (idOption===1){
        setToolSelected(empleado);
        setMostrarModal(true);
      }
      console.log(`seleccionaste: ${idOption}`);
      setMostrarMenu(false);
    };

  async function handleAddTool(formData) {
    console.log("Form data submitted:", formData);
    // try {
    //   const res = await fetch("/api/tools", {
    //     method: "POST",
    //     headers: { "Content-Type": "application/json" },
    //     body: JSON.stringify(formData),
    //   });

    //   if (!res.ok) throw new Error("Failed to add tool");

    //   alert("Tool added!");
    //   setShowForm(false);
    //   // Optionally: refresh tool list
    // } catch (err) {
    //   console.error(err);
    //   alert("Failed to save.");
    // }
  }
  
  useEffect(() =>{
    const fetchTools = async()=> {
      try {
        const response = await axios.get("https://taowr-backend.onrender.com/api/tools");
        setTools(response.data);
      } catch (error){
        console.log("Error al obtener empleados:", error);
      }
    };

    fetchTools();
  },[]

  
  );     
    return (
      <div className="p-8 m-8">
        <h1 className="text-2xl font-bold mb-4 mt-6">Tools</h1>
          <div className='flex justify-end p-4'>
              <button onClick={()=> setNuevoeModal(true)} className=" block text-left bg-primary font-thin text-white px-3 py-1.5 rounded">
                <span className='pr-2'><FontAwesomeIcon icon={faPlus} /></span> Add tool
              </button>
          </div>
            {nuevoeModal && (
               <AddToolForm onClose={() => setNuevoeModal(false)} />
            )}
          <div className=" rounded-lg overflow-x-auto p-4">  {/* permite hacer scroll si la tabla es muy ancha */}
          <table className="min-w-full bg-white border border-gray-200 mt-8">{/*  crea la tabla con todo el ancho disponible con fondo blanco y borde gris*/}
            <thead className="bg-foreground h-1/2 text-left">{/*  encabezado de la tabla */}
              <tr className='text-background'>
                <th className="py-2 px-6 border-b rounded-tl-lg w-1/3">Name</th>{/*  py - padding vertical y px - padding horizontal y border-b hace una línea inferior */}
                <th className="py-2 px-6 border-b w-1/6">Brand</th>
                <th className="py-2 px-4 border-b w-1/8">Status</th>
                <th className="py-2 border-b w-1/8">Maintenance needed</th>
                <th className="py-2 border-b w-1/8">Employee assigned</th>
                <th className="border-b rounded-tr-lg w-1/20"></th>
              </tr>
            </thead>
            <tbody>
              {tools.map((tool) => (
                <tr key={tool.ID}>{/* En React, cuando haces listas (.map() para crear elementos repetidos como filas de tabla), necesitas darle una key única a cada elemento. Key ayuda a identificar cada fila de manera única (cómo el id del usuario)*/}
                  <td className="py-2 pl-8 pr-2 border-b last:rounded-bl-lg text-left border-gray-300">{tool.Name}<br/>
                    <span className='text-gray-500'>{tool.Brand}</span></td>
                  <td className="py-2 px-8 border-b border-gray-300">
                    <span className="inline-block bg-gray-200 text-sm px-1 py-0.5 rounded-lg">{tool.Brand}</span>
                    </td>
                  <td className="py-2 px-4 border-b border-gray-300">{tool.Status}<br/>
                    <span className='text-gray-500'>{tool.NeedsMaintenance}</span>
                  </td>
                  <td className="py-2 px-6 border-b border-gray-300">
                    {tool.NeedsMaintenance  ? <span className="inline-block bg-red-100 text-sm px-1 py-0.5 rounded-lg text-red-800">• Yes</span>:<span className="inline-block bg-green-100 text-sm px-1 py-0.5 rounded-lg text-green-800">• No</span>}</td>
                  <td className="py-2 px-4 border-b border-gray-300">{tool.Employee.FullName}<br/>
      
                  </td>
                  <td className="py-2 px-4 border-b last:rounded-br-lg border-gray-300"> 
                    <button onClick={()=>handleClick(tool.ID)} className="white text-black px-4 py-2 rounded">
                      <FontAwesomeIcon icon={faEllipsisVertical} />
                    </button>
                    {mostrarMenu === tool.ID && (
                      <div className='mt-2 bg-white border rounded shadow-lg absolute z-10'>
                        <ul className="text-sm text-gray-700">
                          {optionsForMenu.map((option) =>(
                            <li 
                              key={option.value} 
                              onClick={seleccionarOpcion(option.value, tool)}
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
              <p><strong>Name:</strong> {toolSelected.FullName}</p>
              <p><strong>Email:</strong> {toolSelected.Email}</p>
              <p><strong>Job Title:</strong> {toolSelected.JobTitle}</p>
              <p><strong>Phone Number</strong> {toolSelected.Phone}</p>
              <p><strong>Address:</strong> {toolSelected.Address}</p>
              <p><strong>Driver License:</strong> {toolSelected.DriversLicense}</p>
              <p><strong>SIN Number:</strong> {toolSelected.SIN}</p>
              <p><strong>Birthdate:</strong> {toolSelected.BirthDate}</p>
              <p><strong>Start Date:</strong> {toolSelected.StartDate}</p>
              <p><strong>Job Title:</strong> {toolSelected.JobTitle}</p>
              <p><strong>Type of Contract:</strong> {toolSelected.TypeContract}</p>
              <p><strong>Salary:</strong> {toolSelected.Salary} CAD</p>
              <p><strong>Bank Account Name:</strong> {toolSelected.BankAccountName}</p>
              <p><strong>Institution Number:</strong> {toolSelected.InstitutionNo}</p>
              <p><strong>Transit Number:</strong> {toolSelected.TransitNo}</p>
              <p><strong>Account Number:</strong> {toolSelected.AccountNo}</p>
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
              {toolSelected.EmergencyContacts.map((emergency) =>(
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
