import React, { useState, useEffect } from 'react';
import { Eye, EyeOff, BarChart2, ShieldCheck, Database, Hash } from 'lucide-react';

export default function ProviderDashboard() {
  const [showCredentials, setShowCredentials] = useState(false);
  const [metrics, setMetrics] = useState([]);
  const [loading, setLoading] = useState(true);
  const [credentials, setCredentials] = useState(null);



  // Hardcoded or Environment-driven OAuth Parameters for Provider Org
  const providerDetails = {
    clientId: "3MVG9k02hQhyUg91a8xZ_Provider_Client_ID_Sample",
    clientSecret: "9012384910238491023849102384",
    tokenUrl: "https://login.salesforce.com/services/oauth2/token",
    restEndpoint: "https://your-org.develop.my.salesforce.com/services/apexrest/v1/ProviderData/"
  };

  // Fetch telemetry metrics on load
  useEffect(() => {
    fetchMetrics();
  }, []);

  const handleToggleCredentials = async () => {
  if (!showCredentials) {
    try {
      const response = await fetch("http://localhost:8003/api/provider-credentials");
      const result = await response.json();
      if (result.success) {
        setCredentials(result.data);
      }
    } catch (error) {
      console.error("Failed to fetch credentials:", error);
    }
  }
  setShowCredentials(!showCredentials);
};

  const fetchMetrics = async () => {
    try {
      const res = await fetch("http://localhost:8003/api/provider-metrics");
      const json = await res.json();
      if (json.success) {
        setMetrics(json.data);
      }
    } catch (err) {
      console.error("Failed to load metrics:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ background: "#0F1720", minHeight: "100vh", padding: "40px 20px", color: "#E7ECF2", fontFamily: "sans-serif" }}>
      <div style={{ maxWidth: "800px", margin: "0 auto" }}>
        
        {/* Header Bar */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px" }}>
          <div>
            <h1 style={{ fontSize: "24px", margin: 0 }}>Provider Telemetry & Developer Portal</h1>
            <p style={{ color: "#94A3B8", fontSize: "14px", marginTop: "4px" }}>Monitor external consumer data usage and manage API credentials.</p>
          </div>
          
          <button 
           onClick={handleToggleCredentials}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              padding: "10px 16px",
              backgroundColor: showCredentials ? "#334155" : "#2563eb",
              color: "#fff",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
              fontWeight: 600
            }}
          >
            {showCredentials ? <EyeOff size={18} /> : <Eye size={18} />}
            {showCredentials ? "Hide Credentials" : "Show Credentials"}
          </button>
        </div>

        
{/* Connection Parameters Credentials Box */}
{showCredentials && (
  <div style={{
    background: "#131D27",
    border: "1px solid #1F2B38",
    borderRadius: "10px",
    padding: "20px",
    marginBottom: "28px",
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.2)"
  }}>
    <h3 style={{ 
      margin: "0 0 16px 0", 
      color: "#38BDF8", 
      fontSize: "16px",
      display: "flex",
      alignItems: "center",
      gap: "8px"
    }}>
      <ShieldCheck size={18} /> Connection Parameters
    </h3>

    <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
      {/* Client ID */}
      <div>
        <label style={{ display: "block", color: "#94A3B8", fontSize: "13px", marginBottom: "6px", fontWeight: 500 }}>
          Client ID
        </label>
        <input 
          type="text" 
          readOnly 
          value={credentials?.client_id || "Loading..."} 
          style={{
            width: "100%",
            padding: "10px 12px",
            background: "#0F1720",
            border: "1px solid #1F2B38",
            borderRadius: "6px",
            color: "#E2E8F0",
            fontFamily: "monospace",
            fontSize: "13px",
            outline: "none",
            boxSizing: "border-box"
          }}
        />
      </div>

      {/* Client Secret */}
      <div>
        <label style={{ display: "block", color: "#94A3B8", fontSize: "13px", marginBottom: "6px", fontWeight: 500 }}>
          Client Secret
        </label>
        <input 
          type="text" 
          readOnly 
          value={credentials?.client_secret || "Loading..."} 
          style={{
            width: "100%",
            padding: "10px 12px",
            background: "#0F1720",
            border: "1px solid #1F2B38",
            borderRadius: "6px",
            color: "#E2E8F0",
            fontFamily: "monospace",
            fontSize: "13px",
            outline: "none",
            boxSizing: "border-box"
          }}
        />
      </div>

      {/* Token Endpoint URL */}
      <div>
        <label style={{ display: "block", color: "#94A3B8", fontSize: "13px", marginBottom: "6px", fontWeight: 500 }}>
          Token Endpoint URL
        </label>
        <input 
          type="text" 
          readOnly 
          value={credentials?.token_endpoint_url || "Loading..."} 
          style={{
            width: "100%",
            padding: "10px 12px",
            background: "#0F1720",
            border: "1px solid #1F2B38",
            borderRadius: "6px",
            color: "#E2E8F0",
            fontFamily: "monospace",
            fontSize: "13px",
            outline: "none",
            boxSizing: "border-box"
          }}
        />
      </div>
    </div>
  </div>
)}

        {/* Analytics Telemetry Section */}
        <h2 style={{ fontSize: "18px", marginBottom: "16px", display: "flex", alignItems: "center", gap: "8px" }}>
          <BarChart2 size={20} color="#2563eb" /> Live API Consumption Metrics
        </h2>

        {loading ? (
          <p style={{ color: "#94A3B8" }}>Loading telemetry data...</p>
        ) : (
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
            {metrics.length === 0 ? (
              <div style={{ background: "#131D27", padding: "20px", borderRadius: "10px", gridColumn: "span 2", textAlign: "center", color: "#94A3B8" }}>
                No API calls logged yet.
              </div>
            ) : (
              metrics.map((m, idx) => (
                <div key={idx} style={{ background: "#131D27", border: "1px solid #1F2B38", borderRadius: "10px", padding: "16px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "8px", color: "#38BDF8", fontWeight: "bold", fontSize: "16px" }}>
                    <Database size={18} /> Object: {m.Object_Name__c}
                  </div>
                  <div style={{ marginTop: "12px", display: "flex", justifyContent: "space-between", fontSize: "14px", color: "#E2E8F0" }}>
                    <span>Total Calls:</span>
                    <strong>{m.totalCalls}</strong>
                  </div>
                  <div style={{ marginTop: "8px", display: "flex", justifyContent: "space-between", fontSize: "14px", color: "#E2E8F0" }}>
                    <span>Records Fetched:</span>
                    <strong>{m.totalRecords}</strong>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

      </div>
    </div>
  );
}