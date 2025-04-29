export default function EmployeesPage() {  
  const employees=[ //Estoy creando las tablas con la información de los empleados
    { id: 1, name:'Niko Montemayor', email:'niko@theartofwildroots.com', position: 'Owner'},
    { id: 2, name:'Lourdes Hugo', email:'Lou@theartofwildroots.com', position: 'CEO'},
  ];      
    return (
      <div>
        <h1 className="text-2xl font-bold mb-4">Employees</h1>
        <p>List of employees will go here!</p>
         <div className="overflow-x-auto">  {/* permite hacer scroll si la tabla es muy ancha */}
          <table className="min-w-full bg-white border border-gray-200"> {/*  crea la tabla con todo el ancho disponible con fondo blanco y borde gris*/}
            <thead> {/*  encabezado de la tabla */}
              <tr>
                <th className="py-2 px-4 border-b">Nombre</th> {/*  py - padding vertical y px - padding horizontal y border-b hace una línea inferior */}
                <th className="py-2 px-4 border-b">Correo</th>
                <th className="py-2 px-4 border-b">Edad</th>
              </tr>
            </thead>
            <tbody>
              {employees.map((user) => (
                <tr key={user.id} className="text-center"> {/* En React, cuando haces listas (.map() para crear elementos repetidos como filas de tabla), necesitas darle una key única a cada elemento. Key ayuda a identificar cada fila de manera única (cómo el id del usuario)*/}
                  <td className="py-2 px-4 border-b">{user.name}</td>
                  <td className="py-2 px-4 border-b">{user.email}</td>
                  <td className="py-2 px-4 border-b">{user.age}</td>
                </tr>
              )         
            )}
            </tbody>
          </table>
        </div>
      </div>
      );
};
