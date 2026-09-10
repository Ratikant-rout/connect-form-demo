// import { useState, useEffect } from "react"; // Added useEffect

// const OBJECTS = ["Account", "Opportunity", "Case", "Contact"];
// const OPERATIONS = ["GET", "PUT", "POST", "CREATE"];

// export default function ApiExplorer() {
//   const [operation, setOperation] = useState("GET");
//   const [selectedObject, setSelectedObject] = useState("Account");
//   const [formData, setFormData] = useState({ searchKey: "Name", updateField: "Name" });
//   const [response, setResponse] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [allRecords, setAllRecords] = useState([]);
//   const [selectedId, setSelectedId] = useState(null);

// // This hook fetches the records whenever you change the Object
// // This hook fetches the records whenever you change the Object
// useEffect(() => {
//     setSelectedId(null); // <--- Add this to reset the ID when object changes
//     setFormData({...formData, searchValue: ""}); // Optional: clear search field
    
//     const fetchRecords = async () => {
//         try {
//             const res = await fetch(`http://localhost:8003/api/v1/proxy?object=${selectedObject}`);
//             const data = await res.json();
//             if (data.records) {
//                 setAllRecords(data.records);
//             }
//         } catch (err) {
//             console.error("Failed to fetch records", err);
//         }
//     };
//     fetchRecords();
// }, [selectedObject]);

// const handleSubmit = async () => {
//     setLoading(true);
//     let url = "http://localhost:8003/api/v1/proxy";
//     let method = operation === "CREATE" ? "POST" : operation;
//     let requestBody = null;

//     // Build the request body ONCE based on the operation
//     if (operation === "CREATE") {
//         requestBody = {
//             object: selectedObject,
//             data: {
//                 Name: formData.OppName,
//                 Amount: formData.Amount,
//                 CloseDate: formData.CloseDate,
//                 StageName: formData.StageName,
//                 Type: formData.Type
//             }
//         };
//     } else if (operation === "PUT") {
//         requestBody = {
//             object: selectedObject,
//             id: selectedId,
//             updates: { [formData.updateField]: formData.updateValue }
//         };
//     } else if (operation !== "GET") {
//         // Standard search case
//         requestBody = {
//             object: selectedObject,
//             data: { [formData.searchKey]: formData.searchValue }
//         };
//     }

//     const options = {
//         method: method,
//         headers: { "Content-Type": "application/json" },
//         body: requestBody ? JSON.stringify(requestBody) : null
//     };

//     if (operation === "GET") {
//         url += `?object=${selectedObject}`;
//     }

//     try {
//         const res = await fetch(url, options);
//         const data = await res.json();
//         setResponse(data);
//     } catch (err) {
//         setResponse({ error: err.message });
//     }
//     setLoading(false);
//   };

//   return (
//     <div style={{ padding: "32px", color: "#E7ECF2" }}>
//       <h2 style={{ fontSize: 24, marginBottom: "20px" }}>API Explorer</h2>
      
//       {/* Operation Selection (keep your existing button code here) */}
//       <div style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
//         {OPERATIONS.map(op => (
//           <button key={op} onClick={() => setOperation(op)} 
//             style={{ padding: "8px 16px", backgroundColor: operation === op ? "#2563eb" : "#1e293b", border: "none", borderRadius: "6px", cursor: "pointer" }}>
//             {op}
//           </button>
//         ))}
//       </div>

//       {/* Object Selection (keep your existing select code here) */}
//       <select onChange={(e) => setSelectedObject(e.target.value)} style={{ width: "100%", padding: "10px", backgroundColor: "#0f172a", color: "white", marginBottom: "20px" }}>
//         {OBJECTS.map(obj => <option key={obj} value={obj}>{obj}</option>)}
//       </select>

//       {/* Dynamic Fields (keep your existing inputs here) */}
// {/* Replace your existing Dynamic Fields section with this: */}

// {/* Dynamic Fields */}
//       {(operation === "PUT" || operation === "CREATE") && (
//         <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          
//           {selectedObject === "Opportunity" && operation === "CREATE" && (
//             <div style={{ display: "flex", flexDirection: "column", gap: "10px", background: "#1e293b", padding: "15px", borderRadius: "6px" }}>
//               <input placeholder="Opportunity Name" onChange={(e) => setFormData({...formData, OppName: e.target.value})} style={{ padding: "8px" }} />
//               <input type="number" placeholder="Amount" onChange={(e) => setFormData({...formData, Amount: e.target.value})} style={{ padding: "8px" }} />
//               <input type="date" onChange={(e) => setFormData({...formData, CloseDate: e.target.value})} style={{ padding: "8px" }} />
//               <select onChange={(e) => setFormData({...formData, StageName: e.target.value})} style={{ padding: "8px" }}>
//                  <option value="">--Select Stage--</option>
//                  <option value="Prospecting">Prospecting</option>
//                  <option value="Closed Won">Closed Won</option>
//               </select>
//               <select onChange={(e) => setFormData({...formData, Type: e.target.value})} style={{ padding: "8px" }}>
//                  <option value="">--Select Type--</option>
//                  <option value="New Customer">New Customer</option>
//                  <option value="Existing Customer">Existing Customer</option>
//               </select>
//             </div>
// )}
//     {/* 1. Use a dropdown for the Field to find (Prevent Typos) */}
// {/* 1. Use a dropdown for the Field to find (Corrected) */}
// <select 
//   value={formData.searchKey} // Use searchKey here
//   onChange={(e) => setFormData({...formData, searchKey: e.target.value})} // Update searchKey here
//   style={{ padding: "8px", background: "#0f172a", color: "white", border: "1px solid #334155" }}
// >
//   <option value="Name">Find by Name</option>
//   <option value="Id">Find by ID</option>
// </select>

//     {/* 2. Value Input */}
//     {/* Replace your current Value Input with this block */}
// <div style={{ position: "relative" }}>
//   <input 
//     placeholder="Start typing to search..." 
//     value={formData.searchValue || ""}
//     onChange={(e) => setFormData({...formData, searchValue: e.target.value})} 
//     style={{ width: "100%", padding: "8px", background: "#0f172a", color: "white", border: "1px solid #334155" }} 
//   />
  
//   {/* The Dropdown list that appears while typing */}
//   {formData.searchValue && formData.searchValue.length > 0 && (
//     <ul style={{ 
//       position: "absolute", 
//       width: "100%", 
//       background: "#1e293b", 
//       border: "1px solid #334155", 
//       listStyle: "none", 
//       padding: 0, 
//       margin: 0,
//       zIndex: 1000,
//       maxHeight: "200px",
//       overflowY: "auto"
//     }}>
//       {allRecords
//         .filter(record => 
//            // Filters by Name if it exists, otherwise checks ID
//            (record.Name || "").toLowerCase().includes(formData.searchValue.toLowerCase())
//         )
//         .slice(0, 5) // Limits to 5 results to keep UI clean
// .map((record) => (
//   <li 
//     key={record.Id} 
//     onClick={() => {
//         setFormData({...formData, searchValue: record.Name});
//         setSelectedId(record.Id);
//     }}
//     style={{ padding: "10px", cursor: "pointer", borderBottom: "1px solid #334155", color: "white" }}
//   >
//     {record.Name}
//   </li>
// ))}
//     </ul>
//   )}
// </div>
//     {/* 3. Dropdown for Update Field (Crucial for Salesforce API success) */}
//     {operation === "PUT" && (
//       <>
//         <label style={{ fontSize: "12px", color: "#94a3b8" }}>Field to Update:</label>
//   <select 
//   value={formData.updateField} // Add this line for consistency
//   onChange={(e) => setFormData({...formData, updateField: e.target.value})}
//   style={{ padding: "8px", background: "#0f172a", color: "white", border: "1px solid #334155" }}
// >
//   <option value="Name">Name</option>
//   <option value="Phone">Phone</option>
//   <option value="BillingCity">City</option>
// </select>
        
//         <input placeholder="New Value" 
//           onChange={(e) => setFormData({...formData, updateValue: e.target.value})} 
//           style={{ padding: "8px", background: "#0f172a", color: "white", border: "1px solid #334155" }} />
//       </>
//     )}
//   </div>
// )}

//       <button onClick={handleSubmit} style={{ marginTop: "20px", width: "100%", padding: "12px", background: "#10B981", border: "none", borderRadius: "6px", cursor: "pointer" }}>
//         {loading ? "Processing..." : `Execute ${operation}`}
//       </button>

//      {/* FORMATTED DISPLAY START */}
// {response && (
//   <div style={{ marginTop: "20px", padding: "10px", border: "1px solid #334155", borderRadius: "6px" }}>
    
//     {/* 1. Show Success Message */}
//     {response.success && (
//       <p style={{ color: "#10B981", fontWeight: "bold" }}>✅ Operation Successful! (ID: {response.id || 'N/A'})</p>
//     )}

//     {/* 2. Show Error Message */}
//     {response.error && (
//       <p style={{ color: "#ef4444", fontWeight: "bold" }}>❌ Error: {response.error}</p>
//     )}

//     {/* 3. Show Table only for GET requests */}
//     {response.records && (
//       <table style={{ width: "100%", borderCollapse: "collapse", color: "white", backgroundColor: "#1e293b" }}>
//         <thead>
//           <tr style={{ borderBottom: "1px solid #334155" }}>
//             <th style={{ padding: "10px", textAlign: "left" }}>ID</th>
//             <th style={{ padding: "10px", textAlign: "left" }}>
//                 {selectedObject === 'Case' ? 'Case Number' : selectedObject === 'User' ? 'Username' : 'Name'}
//             </th>
//           </tr>
//         </thead>
//         <tbody>
//           {response.records.map((rec) => (
//             <tr key={rec.Id} style={{ borderBottom: "1px solid #334155" }}>
//               <td style={{ padding: "10px" }}>{rec.Id}</td>
//               <td style={{ padding: "10px" }}>
//                   {selectedObject === 'Case' ? rec.CaseNumber : selectedObject === 'User' ? rec.Username : rec.Name}
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     )}
//   </div>
// )}

//       {/* FORMATTED DISPLAY END */}
//     </div>
//   );
// }


import { useState, useEffect } from "react";

// --- Helper Component ---
const ResponseDisplay = ({ data }) => {
  if (data.records && Array.isArray(data.records)) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {data.records.map((rec, idx) => {
          // Dynamically detect field: Case uses CaseNumber, others (Account, Opportunity, Contact) use Name
          const fieldLabel = rec.CaseNumber ? 'Case Number' : 'Name';
          const fieldValue = rec.CaseNumber || rec.Name || 'N/A';

          return (
            <div key={idx} style={{ background: '#0f172a', padding: '16px', borderRadius: '8px', border: '1px solid #334155' }}>
              <div style={{ fontSize: "14px", display: "flex" }}>
                <span style={{ color: '#94a3b8', width: "110px", fontWeight: "600" }}>{fieldLabel}:</span>
                <span style={{ color: '#fff' }}>{fieldValue}</span>
              </div>
            </div>
          );
        })}
      </div>
    );
  }

  return (
    <div style={{ background: '#0f172a', padding: '15px', borderRadius: '6px', border: '1px solid #334155' }}>
      {Object.entries(data).map(([k, v]) => (
        <div key={k} style={{ fontSize: "14px", marginBottom: "8px" }}>
          <span style={{ color: '#94a3b8', marginRight: "8px" }}>{k}:</span>
          <span style={{ color: '#fff' }}>{String(v)}</span>
        </div>
      ))}
    </div>
  );
};

const OBJECTS = ["Account", "Opportunity", "Case", "Contact"];
const OPERATIONS = ["GET", "PUT", "POST", "CREATE"];

export default function ApiExplorer() {
  const [operation, setOperation] = useState("GET");
  const [selectedObject, setSelectedObject] = useState("Account");
  const [formData, setFormData] = useState({ searchKey: "Name", updateField: "Name" });
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);
  const [allRecords, setAllRecords] = useState([]);
  const [selectedId, setSelectedId] = useState(null);

  const FIELD_CONFIG = {
  Account: [
    { label: 'Name', apiName: 'Name', type: 'text' },
    { label: 'Phone', apiName: 'Phone', type: 'text' },
    { label: 'Type', apiName: 'Type', type: 'select', options: ['Prospect', 'Customer'] }
  ],
  Opportunity: [
    { label: 'Opp Name', apiName: 'Name', type: 'text' },
    { label: 'Close Date', apiName: 'CloseDate', type: 'date' },
    { label: 'Stage', apiName: 'StageName', type: 'select', options: ['Prospecting', 'Qualification', 'Value Proposition', 'Closed Won'] },
    { label: 'Type', apiName: 'Type', type: 'select', options: ['New Customer', 'Existing Customer'] }
  ],
  // You can easily add Case, Contact, etc. here later
};

  // This hook fetches the records whenever you change the Object
// This hook fetches the records whenever you change the Object
useEffect(() => {
  // Reset everything in one clean state update
  setFormData({ 
    searchKey: "Name", 
    updateField: "Name", 
    searchValue: "" 
  });
  setSelectedId(null); 
  
  const fetchRecords = async () => {
      try {
          const res = await fetch(`http://localhost:8003/api/v1/proxy?object=${selectedObject}`);
          const data = await res.json();
          if (data.records) {
              setAllRecords(data.records);
          }
      } catch (err) {
          console.error("Failed to fetch records", err);
      }
  };
  fetchRecords();
}, [selectedObject]);

  // 2. Add this NEW hook to clear data when the OPERATION changes
useEffect(() => {
  setFormData({ searchKey: "Name", updateField: "Name", searchValue: "" });
  setResponse(null);
}, [operation]);

const handleSubmit = async () => {
  if (operation === "PUT" && !selectedId) {
      alert("Please select a record from the list to update.");
      return;
  }

  setLoading(true);
  let url = "http://localhost:8003/api/v1/proxy";
  let requestBody = { object: selectedObject };

  // Logic for CREATE
  if (operation === "CREATE") {
      // This destructures formData and removes UI-only keys, 
      // leaving only the fields the user actually typed in.
      const { searchKey, searchValue, updateField, updateValue, ...dataToSubmit } = formData;
      requestBody = { ...requestBody, data: dataToSubmit };
  } 
  // Logic for PUT
  else if (operation === "PUT") {
      requestBody = { 
          ...requestBody, 
          id: selectedId, 
          updates: { [formData.updateField]: formData.updateValue } 
      };
  } 
  // Logic for GET
  else if (operation === "GET") {
      url += `?object=${selectedObject}`;
      requestBody = null; // GET usually doesn't need a body in this proxy setup
  }

  const options = {
      method: operation === "CREATE" ? "POST" : operation,
      headers: { "Content-Type": "application/json" },
      body: requestBody ? JSON.stringify(requestBody) : null
  };

  try {
      const res = await fetch(url, options);
      const data = await res.json();
      setResponse(data);
  } catch (err) {
      setResponse({ error: err.message });
  }
  setLoading(false);
};

 return (
  <div style={{ padding: "32px", color: "#E7ECF2" }}>
    <h2 style={{ fontSize: 24, marginBottom: "20px" }}>API Explorer</h2>


    {/* Operation Selection */}
    <div style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
      {OPERATIONS.map(op => (
        <button key={op} onClick={() => setOperation(op)}
          style={{ padding: "8px 16px", backgroundColor: operation === op ? "#2563eb" : "#1e293b", border: "none", borderRadius: "6px", cursor: "pointer" }}>
          {op}
        </button>
      ))}
    </div>

    {/* Object Selection */}
    <select onChange={(e) => setSelectedObject(e.target.value)} style={{ width: "100%", padding: "10px", backgroundColor: "#0f172a", color: "white", marginBottom: "20px" }}>
      {OBJECTS.map(obj => <option key={obj} value={obj}>{obj}</option>)}
    </select>

    {/* Dynamic Fields Section */}
    {(operation === "PUT" || operation === "CREATE") && (
      <div style={{ display: "flex", flexDirection: "column", gap: "10px", background: "#1e293b", padding: "15px", borderRadius: "6px", marginBottom: "20px" }}>
        
        {/* PUT: Field Selector + Value Input */}
        {operation === "PUT" && (
          <>
            <select onChange={(e) => setFormData({...formData, updateField: e.target.value})} style={{ padding: "8px" }}>
              {FIELD_CONFIG[selectedObject]?.map(f => <option key={f.apiName} value={f.apiName}>{f.label}</option>)}
            </select>
            <input placeholder="New Value" onChange={(e) => setFormData({...formData, updateValue: e.target.value})} style={{ padding: "8px" }} />
          </>
        )}

        {/* CREATE: Auto-generate all fields */}
        {operation === "CREATE" && FIELD_CONFIG[selectedObject]?.map(field => (
           field.type === "select" ? (
             <select key={field.apiName} onChange={(e) => setFormData({...formData, [field.apiName]: e.target.value})} style={{ padding: "8px" }}>
                <option value="">Select {field.label}</option>
                {field.options.map(opt => <option key={opt} value={opt}>{opt}</option>)}
             </select>
           ) : (
             <input key={field.apiName} type={field.type} placeholder={field.label} onChange={(e) => setFormData({...formData, [field.apiName]: e.target.value})} style={{ padding: "8px" }} />
           )
        ))}
      </div>
    )}

{/* Search Box with Result List */}
{(operation === "GET" || operation === "PUT") && (
  <div style={{ position: "relative" }}>
    <input 
      placeholder="Start typing to search..." 
      value={formData.searchValue || ""}
      onChange={(e) => setFormData({...formData, searchValue: e.target.value})} 
      style={{ width: "100%", padding: "8px", background: "#0f172a", color: "white", border: "1px solid #334155" }} 
    />
    {formData.searchValue && (
      <ul style={{ 
        position: "relative", // Changed from absolute
        width: "100%", 
        background: "#1e293b", 
        maxHeight: "200px", 
        overflowY: "auto", 
        listStyle: "none", 
        padding: 0, 
        margin: "0 0 10px 0", // Added bottom margin to push the button down
        border: "1px solid #334155" 
      }}>
        {allRecords
          .filter(r => (r.Name || "").toLowerCase().includes(formData.searchValue.toLowerCase()))
          .slice(0, 5)
          .map(record => (
            <li key={record.Id} onClick={() => {
              setFormData({...formData, searchValue: record.Name});
              setSelectedId(record.Id);
            }} style={{ padding: "10px", cursor: "pointer", borderBottom: "1px solid #334155" }}>
              {record.Name}
            </li>
        ))}
      </ul>
    )}
  </div>
)}

<button onClick={handleSubmit} style={{ marginTop: "20px", width: "100%", padding: "12px", background: "#10B981", border: "none", borderRadius: "6px", cursor: "pointer", fontWeight: "bold", color: "white" }}>
      {loading ? "Processing..." : `Execute ${operation}`}
    </button>

    {/* Success / Error Notification & Response Display */}
    {response && (
      <div style={{ marginTop: "20px" }}>
        {/* Banner Alert */}
        <div style={{
          padding: "12px 16px",
          borderRadius: "6px",
          marginBottom: "10px",
          backgroundColor: response.error ? "#7f1d1d" : "#065f46",
          color: response.error ? "#fca5a5" : "#6ee7b7",
          border: `1px solid ${response.error ? "#991b1b" : "#047857"}`
        }}>
          {response.error 
            ? `❌ Error: ${response.error}` 
            : `✅ Operation '${operation}' executed successfully!`}
        </div>

           {!response.error && <ResponseDisplay data={response} />}
      </div>
    )}

  </div>
 );
}