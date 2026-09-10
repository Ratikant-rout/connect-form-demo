// import { useState } from "react";
// import { Link2, Loader2, CheckCircle2, XCircle, ChevronDown, KeyRound, Globe, Shield } from "lucide-react";
// import "./App.css";
// // Change this in your local App.jsx

// const RENDER_URL = "http://localhost:8000/api/provision";

// const AUTH_OPTIONS = [
//   { value: "NoAuthentication", label: "No authentication" },
//   { value: "Password", label: "Username & password" },
//   { value: "OAuth2", label: "OAuth 2.0" },
// ];

// export default function ConnectForm() {
//   const [systemName, setSystemName] = useState("");
//   const [endpoint, setEndpoint] = useState("");
//   const [protocol, setProtocol] = useState("NoAuthentication");
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");
//   const [clientId, setClientId] = useState("");
//   const [clientSecret, setClientSecret] = useState("");
//   const [tokenEndpoint, setTokenEndpoint] = useState("");
//   const [authOpen, setAuthOpen] = useState(false);

//   const [status, setStatus] = useState("idle");
//   const [result, setResult] = useState(null);
//   const [accounts, setAccounts] = useState([]);

//   const needsCreds = protocol === "Password";
//   const needsOAuth = protocol === "OAuth2";
  
//   const canSubmit = systemName.trim() && endpoint.trim() && (
//     protocol === "NoAuthentication" || 
//     (needsCreds && username.trim() && password.trim()) || 
//     (needsOAuth && clientId.trim() && clientSecret.trim() && tokenEndpoint.trim())
//   );

//   async function handleSubmit(e) {
//     e.preventDefault();
//     if (!canSubmit || status === "loading") return;
//     setStatus("loading");
//     setResult(null);

//     try {
//       const res = await fetch(RENDER_URL, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           system_name: systemName.trim(),
//           endpoint: endpoint.trim(),
//           protocol,
//           username: needsCreds ? username.trim() : "",
//           password: needsCreds ? password.trim() : "",
//           client_id: needsOAuth ? clientId.trim() : "",
//           client_secret: needsOAuth ? clientSecret.trim() : "",
//           token_endpoint_url: needsOAuth ? tokenEndpoint.trim() : "",
//         }),
//       });
//       const data = await res.json();
//       setStatus("success");
//       setResult(data);
      
//     } catch (err) {
//       // If the request fails entirely, we still force success
//       setStatus("success");
//       setResult({ message: "Connection request sent." });
//     }
//   }

//   async function handleSearchAccounts() {
//     const btn = document.getElementById("searchAccountsBtn");
//     const resultContainer = document.getElementById("accountsResultContainer");
//     const listDiv = document.getElementById("accountsList");

//     // Indicate loading status
//     btn.disabled = true;
//     btn.innerText = "Fetching Accounts...";
//     resultContainer.style.display = "block";
//     listDiv.innerHTML = "<p style='color: #94a3b8;'>Running Apex callout...</p>";

//     try {
//         const response = await fetch("http://localhost:8000/api/fetch-accounts", {
//             method: "POST",
//             headers: { "Content-Type": "application/json" },
//             body: JSON.stringify({
//                 system_name: document.getElementById("systemNameInput")?.value || "testgyansys15"
//             })
//         });

//         const resData = await response.json();

//         if (resData.success && resData.data.records) {
//             const records = resData.data.records;
            
//             if (records.length === 0) {
//                 listDiv.innerHTML = "<p style='color: #f59e0b;'>No accounts found.</p>";
//             } else {
//                 // Build a simple list of accounts
//                 let html = "<ul style='list-style: none; padding: 0; margin: 0;'>";
//                 records.forEach(acc => {
//                     html += `
//                         <li style="padding: 8px 0; border-bottom: 1px solid #334155; color: #e2e8f0;">
//                             <strong>${acc.Name}</strong> <br/>
//                             <span style="font-size: 12px; color: #94a3b8;">Type: ${acc.Type || 'N/A'} | Phone: ${acc.Phone || 'N/A'}</span>
//                         </li>
//                     `;
//                 });
//                 html += "</ul>";
//                 listDiv.innerHTML = html;
//             }
//         } else {
//             listDiv.innerHTML = `<p style="color: #ef4444;">Error: ${resData.error || 'Failed to fetch accounts'}</p>`;
//         }
//     } catch (err) {
//         listDiv.innerHTML = `<p style="color: #ef4444;">Connection Error: ${err.message}</p>`;
//     } finally {
//         btn.disabled = false;
//         btn.innerText = "🔍 Search Accounts";
//     }
// }

//   async function fetchAccounts() {
//   try {
//     const res = await fetch("https://https://gyansys171-dev-ed.develop.my.salesforce.com/services/apexrest/getAccounts", {
//       method: "GET",
//       headers: {
//         "Authorization": "Bearer YOUR_SESSION_ID"
//       }
//     });

//     const data = await res.json();

//     console.log("Accounts:", data);
//     setAccounts(data.records || []);

//   } catch (err) {
//     console.error("Error fetching accounts:", err);
//   }
// }

//   function reset() {
//     setStatus("idle"); setResult(null); setSystemName(""); setEndpoint(""); setProtocol("NoAuthentication");
//     setUsername(""); setPassword(""); setClientId(""); setClientSecret(""); setTokenEndpoint("");
//   }

//   return (
//     <div style={{ minHeight: "100%", width: "100%", background: "#0F1720", fontFamily: "'IBM Plex Sans', sans-serif", color: "#E7ECF2", padding: "48px 20px", display: "flex", justifyContent: "center" }}>
//       <div style={{ width: "100%", maxWidth: 560 }}>
//         <div style={{ marginBottom: 32 }}>
//           <h1 style={{ fontSize: 28, fontWeight: 700, margin: 0 }}>Connect a new system</h1>
//         </div>

//         {status !== "success" && (
//           <form onSubmit={handleSubmit} style={{ background: "#131D27", border: "1px solid #1F2B38", borderRadius: 14, padding: 26, display: "flex", flexDirection: "column", gap: 20 }}>
//             <div>
//               <label className="cf-label">System name</label>
//               <input className="cf-input" placeholder="e.g. Test_Connection_02" value={systemName} onChange={(e) => setSystemName(e.target.value)} />
//             </div>

//             <div>
//               <label className="cf-label">Endpoint URL</label>
//               <input className="cf-input" placeholder="https://..." value={endpoint} onChange={(e) => setEndpoint(e.target.value)} />
//             </div>

//             <div>
//               <label className="cf-label">Authentication</label>
//               <select className="cf-input" value={protocol} onChange={(e) => setProtocol(e.target.value)}>
//                 {AUTH_OPTIONS.map((opt) => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
//               </select>
//             </div>

//             {needsOAuth && (
//               <div style={{ display: "flex", flexDirection: "column", gap: 14, background: "#0F1720", border: "1px solid #1F2B38", borderRadius: 10, padding: 16 }}>
//                 <div><label className="cf-label">Client ID</label><input className="cf-input" value={clientId} onChange={(e) => setClientId(e.target.value)} /></div>
//                 <div><label className="cf-label">Client Secret</label><input className="cf-input" type="password" value={clientSecret} onChange={(e) => setClientSecret(e.target.value)} /></div>
//                 <div><label className="cf-label">Token Endpoint URL</label><input className="cf-input" value={tokenEndpoint} onChange={(e) => setTokenEndpoint(e.target.value)} /></div>
//               </div>
//             )}

//             <button type="submit" className="cf-btn-primary" disabled={!canSubmit || status === "loading"}>
//               {status === "loading" ? "Provisioning..." : "Create connection"}
//             </button>
//           </form>
//         )}
        
//         {/* Success State */}
// {status === "success" && (
//   <div style={{ background: "#131D27", padding: 30, textAlign: "center", border: "1px solid #10B981", borderRadius: 14 }}>
//     <CheckCircle2 size={48} color="#10B981" style={{ margin: "0 auto 16px" }} />
//     <h2 style={{ fontSize: 20, color: "#F8FAFC", marginBottom: 8 }}>Connection successful!</h2>
//     <p style={{ color: "#94A3B8", fontSize: 14, marginBottom: 20 }}>
//       {result?.message || "System has been provisioned successfully."}
//     </p>
//     <button className="cf-btn-ghost" style={{ borderColor: "#10B981", color: "#10B981" }} onClick={reset}>
//       Connect another system
//     </button>
//   </div>
// )}

// {/* Error State - Updated to show raw data if message is missing */}
// {status === "error" && (
//   <div style={{ background: "#131D27", padding: 30, textAlign: "center", border: "1px solid #EF4444", borderRadius: 14 }}>
//     <XCircle size={48} color="#EF4444" style={{ margin: "0 auto 16px" }} />
//     <h2 style={{ fontSize: 20, color: "#F8FAFC", marginBottom: 8 }}>Connection failed</h2>
//     <p style={{ color: "#94A3B8", fontSize: 14, marginBottom: 20 }}>
//       {result?.message || JSON.stringify(result)} 
//     </p>
//     <button className="cf-btn-ghost" style={{ borderColor: "#EF4444", color: "#EF4444" }} onClick={reset}>
//       Try again
//     </button>
//   </div>
// )}

// <div style="margin-top: 16px;">
//     <button 
//         type="button" 
//         id="searchAccountsBtn"
//         onclick="handleSearchAccounts()"
//         style="
//             width: 100%;
//             padding: 10px 16px;
//             background-color: #2563eb;
//             color: #ffffff;
//             border: none;
//             border-radius: 6px;
//             font-weight: 600;
//             cursor: pointer;
//             transition: background-color 0.2s;
//         ">
//         🔍 Search Accounts
//     </button>
// </div>

// <div id="accountsResultContainer" style="margin-top: 16px; display: none;">
//     <label style="color: #9ca3af; font-size: 12px; font-weight: 600; text-transform: uppercase;">Fetched Accounts</label>
//     <div id="accountsList" style="
//         margin-top: 8px;
//         max-height: 200px;
//         overflow-y: auto;
//         background-color: #0f172a;
//         border: 1px solid #1e293b;
//         border-radius: 6px;
//         padding: 12px;
//     ">
//     </div>
// </div>

//       </div>
//     </div>
//   );
// }


import { useState } from "react";
import { CheckCircle2, XCircle } from "lucide-react";
import "./App.css";
import ProviderDashboard from "./ProviderDashboard";
import ApiExplorer from "./ApiExplorer";
// In src/App.jsx
import SapIntegration from './SapIntegration';
import Header from "./components/Header";
import Navigation from "./components/Navigation";
import Hero from "./components/Hero";


const RENDER_URL = "https://mcp-provisioning-tool.onrender.com/api/provision";

const AUTH_OPTIONS = [
  { value: "NoAuthentication", label: "No authentication" },
  { value: "Password", label: "Username & password" },
  { value: "OAuth2", label: "OAuth 2.0" },
];

function ConnectForm() {
  const [systemName, setSystemName] = useState("");
  const [endpoint, setEndpoint] = useState("");
  const [protocol, setProtocol] = useState("NoAuthentication");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [clientId, setClientId] = useState("");
  const [clientSecret, setClientSecret] = useState("");
  const [tokenEndpoint, setTokenEndpoint] = useState("");

  const [status, setStatus] = useState("idle");
  const [result, setResult] = useState(null);

  const [accounts, setAccounts] = useState([]);
  const [accountsStatus, setAccountsStatus] = useState("idle");
  const [accountsError, setAccountsError] = useState(null);
  const [showAccountsContainer, setShowAccountsContainer] = useState(false);

  const needsCreds = protocol === "Password";
  const needsOAuth = protocol === "OAuth2";
  
  const canSubmit = systemName.trim() && endpoint.trim() && (
    protocol === "NoAuthentication" || 
    (needsCreds && username.trim() && password.trim()) || 
    (needsOAuth && clientId.trim() && clientSecret.trim() && tokenEndpoint.trim())
  );

  async function handleSubmit(e) {
    e.preventDefault();
    if (!canSubmit || status === "loading") return;
    setStatus("loading");
    setResult(null);

    try {
      const res = await fetch(RENDER_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          system_name: systemName.trim(),
          endpoint: endpoint.trim(),
          protocol,
          username: needsCreds ? username.trim() : "",
          password: needsCreds ? password.trim() : "",
          client_id: needsOAuth ? clientId.trim() : "",
          client_secret: needsOAuth ? clientSecret.trim() : "",
          token_endpoint_url: needsOAuth ? tokenEndpoint.trim() : "",
        }),
      });
      const data = await res.json();
      if (data.success) {
        setStatus("success");
      } else {
        setStatus("error");
      }
      setResult(data);
    } catch (err) {
      setStatus("error");
      setResult({ message: err.message || "Connection request failed." });
    }
  }

  async function handleSearchAccounts() {
    setAccountsStatus("loading");
    setShowAccountsContainer(true);
    setAccountsError(null);

    try {
      const response = await fetch("https://mcp-provisioning-tool.onrender.com/api/fetch-accounts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          system_name: systemName || "testgyansys15"
        })
      });

      const resData = await response.json();

      if (resData.success && resData.data) {
        const records = resData.data.records || resData.data;
        setAccounts(records);
        setAccountsStatus("success");
      } else {
        setAccountsError(resData.error || "Failed to fetch accounts");
        setAccountsStatus("error");
      }
    } catch (err) {
      setAccountsError(err.message);
      setAccountsStatus("error");
    }
  }

  function reset() {
    setStatus("idle");
    setResult(null);
    setSystemName("");
    setEndpoint("");
    setProtocol("NoAuthentication");
    setUsername("");
    setPassword("");
    setClientId("");
    setClientSecret("");
    setTokenEndpoint("");
    setShowAccountsContainer(false);
  }

  return (
    <div style={{ minHeight: "100%", width: "100%", background: "#0F1720", fontFamily: "'IBM Plex Sans', sans-serif", color: "#E7ECF2", padding: "48px 20px", display: "flex", justifyContent: "center" }}>
      <div style={{ width: "100%", maxWidth: 560 }}>
        <div style={{ marginBottom: 32 }}>
          <h1 style={{ fontSize: 28, fontWeight: 700, margin: 0 }}>Connect a new system</h1>
        </div>


        {status !== "success" && (
          <form onSubmit={handleSubmit} style={{ background: "#131D27", border: "1px solid #1F2B38", borderRadius: 14, padding: 26, display: "flex", flexDirection: "column", gap: 20 }}>
            <div>
              <label className="cf-label">System name</label>
              <input className="cf-input" placeholder="e.g. Test_Connection_02" value={systemName} onChange={(e) => setSystemName(e.target.value)} />
            </div>

            <div>
              <label className="cf-label">Endpoint URL</label>
              <input className="cf-input" placeholder="https://..." value={endpoint} onChange={(e) => setEndpoint(e.target.value)} />
            </div>

            <div>
              <label className="cf-label">Authentication</label>
              <select className="cf-input" value={protocol} onChange={(e) => setProtocol(e.target.value)}>
                {AUTH_OPTIONS.map((opt) => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
              </select>
            </div>

            {needsOAuth && (
              <div style={{ display: "flex", flexDirection: "column", gap: 14, background: "#0F1720", border: "1px solid #1F2B38", borderRadius: 10, padding: 16 }}>
                <div><label className="cf-label">Client ID</label><input className="cf-input" value={clientId} onChange={(e) => setClientId(e.target.value)} /></div>
                <div><label className="cf-label">Client Secret</label><input className="cf-input" type="password" value={clientSecret} onChange={(e) => setClientSecret(e.target.value)} /></div>
                <div><label className="cf-label">Token Endpoint URL</label><input className="cf-input" value={tokenEndpoint} onChange={(e) => setTokenEndpoint(e.target.value)} /></div>
              </div>
            )}

            <button type="submit" className="cf-btn-primary" disabled={!canSubmit || status === "loading"}>
              {status === "loading" ? "Provisioning..." : "Create connection"}
            </button>
          </form>
        )}
        
        {/* Success State */}
        {status === "success" && (
          <div style={{ background: "#131D27", padding: 30, textAlign: "center", border: "1px solid #10B981", borderRadius: 14 }}>
            <CheckCircle2 size={48} color="#10B981" style={{ margin: "0 auto 16px" }} />
            <h2 style={{ fontSize: 20, color: "#F8FAFC", marginBottom: 8 }}>Connection successful!</h2>
            <p style={{ color: "#94A3B8", fontSize: 14, marginBottom: 20 }}>
              {result?.message || "System has been provisioned successfully."}
            </p>
            <button className="cf-btn-ghost" style={{ borderColor: "#10B981", color: "#10B981" }} onClick={reset}>
              Connect another system
            </button>
          </div>
        )}

        {/* Error State */}
        {status === "error" && (
          <div style={{ background: "#131D27", padding: 30, textAlign: "center", border: "1px solid #EF4444", borderRadius: 14 }}>
            <XCircle size={48} color="#EF4444" style={{ margin: "0 auto 16px" }} />
            <h2 style={{ fontSize: 20, color: "#F8FAFC", marginBottom: 8 }}>Connection failed</h2>
            <p style={{ color: "#94A3B8", fontSize: 14, marginBottom: 20 }}>
              {result?.step || result?.message || JSON.stringify(result)} 
            </p>
            <button className="cf-btn-ghost" style={{ borderColor: "#EF4444", color: "#EF4444" }} onClick={reset}>
              Try again
            </button>
          </div>
        )}

        {/* Search Accounts Section - VISIBLE ONLY WHEN PROVISIONING IS SUCCESSFUL */}
        {status === "success" && (
          <>
            <div style={{ marginTop: "24px" }}>
              <button 
                type="button" 
                onClick={handleSearchAccounts}
                disabled={accountsStatus === "loading"}
                style={{
                  width: "100%",
                  padding: "12px 16px",
                  backgroundColor: "#2563eb",
                  color: "#ffffff",
                  border: "none",
                  borderRadius: "8px",
                  fontWeight: 600,
                  cursor: "pointer"
                }}>
                {accountsStatus === "loading" ? "Fetching Accounts..." : "🔍 Search Accounts"}
              </button>
            </div>

            {showAccountsContainer && (
              <div style={{ marginTop: "16px" }}>
                <label style={{ color: "#9ca3af", fontSize: "12px", fontWeight: 600, textTransform: "uppercase" }}>Fetched Accounts</label>
                <div style={{
                  marginTop: "8px",
                  maxHeight: "200px",
                  overflowY: "auto",
                  backgroundColor: "#0f172a",
                  border: "1px solid #1e293b",
                  borderRadius: "8px",
                  padding: "12px"
                }}>
                  {accountsStatus === "loading" && <p style={{ color: '#94a3b8', margin: 0 }}>Running Apex callout...</p>}
                  
                  {accountsStatus === "error" && <p style={{ color: '#ef4444', margin: 0 }}>Error: {accountsError}</p>}

                  {accountsStatus === "success" && accounts.length === 0 && (
                    <p style={{ color: '#f59e0b', margin: 0 }}>No accounts found.</p>
                  )}

                  {accountsStatus === "success" && accounts.length > 0 && (
                    <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                      {accounts.map((acc, idx) => (
                        <li key={acc.Id || idx} style={{ padding: '8px 0', borderBottom: '1px solid #334155', color: '#e2e8f0' }}>
                          <strong>{acc.Name}</strong> <br/>
                          <span style={{ fontSize: '12px', color: '#94a3b8' }}>Type: {acc.Type || 'N/A'} | Phone: {acc.Phone || 'N/A'}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}



// ==========================================
// MAIN APP ENTRY POINT
// ==========================================

export default function App() {
  const [activeTab, setActiveTab] = useState("connect");

  return (
    <div className="portal-app">

      {/* Generic enterprise header */}
      <Header />

      {/* Four application tabs */}
 <Navigation
  activeTab={activeTab}
  onTabChange={setActiveTab}
/>

      {/* Main hero / website introduction */}
      <Hero />

      {/* Application content */}
      <main className="portal-content">
        <div className="portal-content-inner">

          {activeTab === "connect" && (
            <ConnectForm />
          )}

          {activeTab === "provider" && (
            <ProviderDashboard />
          )}

          {activeTab === "explorer" && (
            <ApiExplorer />
          )}

          {activeTab === "sap" && (
            <SapIntegration />
          )}

        </div>
      </main>

    </div>
  );
}
