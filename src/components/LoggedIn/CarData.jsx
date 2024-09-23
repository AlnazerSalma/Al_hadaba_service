// import React,{ useEffect, useState } from "react";
// import { Link } from "react-router-dom";

// function CarData()
// {
//     const [carData, setCardata]= useState([]); 
//     useEffect( ()=>{
//         const getCardata= async()=>{
//             const reqData= await fetch("http://localhost:8080/cars");
//             const resData= await reqData.json();
//             setCardata(resData);
//         }
//         getCardata();
//     },[]);
 
//     return(
//         <React.Fragment>
//             <div className="container">
//                 <div className="row">
//                     <div className="col-md-12">
//                     <h5 className="mt-2">Car Data</h5>
//                        <div className="d-grid d-md-flex justify-content-md-end mb-3">
//                         <Link to="/add-car" className="btn btn-warning">Add New Car</Link>
//                        </div>
//                        <table className="table table-bordered table-striped">
//                         <thead>
//                         <tr>
//                         <th>Car Code</th>
//                         <th>Car Name</th>
//                         <th>Car Model</th>
//                         <th>MSRB</th>
//                         <th>Buy Price</th>
//                         <th>Car Description</th>
//                         </tr>
//                         </thead>
//                         <tbody>
//                          { carData.map( (carData, index)=>(                           
//                         <tr key={index}>
//                         <td>{index+1} </td>
//                         <td>{ carData.carName } </td>
//                         <td>{ carData.carModel } </td>
//                         <td>{ carData.carDescription } </td>
//                         <td>{ carData.carCode } </td>
//                         <td>{ carData.buyPrice } </td>
//                         <td>
//                          <Link to={"/editCar/"+carData.carCode} className="btn btn-success mx-2">Edit</Link>
//                          <Link to="/deleteCar" className="btn btn-danger">Delete</Link>
//                         </td>
//                         </tr>
//                         )) 
//                         }                        
//                         </tbody>
//                         </table>                            
//                     </div>
//                 </div>
//             </div>
            
//         </React.Fragment>
//     );
// }

// export default CarData;
