import React, { useState } from 'react';
import deltaLogo from './assets/delta_faucet_company_logo.jpg';

const SapIntegration = () => {
const [formData, setFormData] = useState({
    systemName: '',
    host: '',
    clientId: '',
    endpoint: '',
    username: '',
    password: ''
});
const [status, setStatus] = useState('');
const [isProvisioned, setIsProvisioned] = useState(false); // Tracks if form was submitted successfully 


// --- Dynamic Fetch State ---
const [sapEndpoint, setSapEndpoint] = useState('');
const [sapData, setSapData] = useState(null);
const [isFetching, setIsFetching] = useState(false);
const [fetchError, setFetchError] = useState(null);

const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
};

const handleSubmit = async (e) => {
    e.preventDefault();
    
    // The "Trick": Construct the endpoint string including the sap-client parameter
    const finalEndpoint = `${formData.endpoint}?sap-client=${formData.clientId}`;

    const payload = {
        system_name: formData.systemName, // Required by your backend
        Target_Org_URL: formData.host,
        Endpoint: formData.endpoint,
        Username: formData.username,
        Password: formData.password
    };

    try {
        setStatus('Provisioning SAP credentials...');
        const response = await fetch('http://localhost:8003/api/provision', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });

        if (response.ok) {
            setStatus('Success: SAP Credentials Provisioned!');
            setIsProvisioned(true);
        } else {
            setStatus('Error: Failed to provision credentials.');
        }
    } catch (error) {
        setStatus('Error: Could not connect to backend.');
    }
};

// 2. Handle the Dynamic SAP Data Fetch
const handleFetchData = async () => {
setIsFetching(true);
setFetchError(null);
setSapData(null); // Instantly clears table

// STRICT KEY RESTRICTION
const REQUIRED_KEY = 'SF_ATP_SRV/INVENTORYSet';

if (sapEndpoint.trim() !== REQUIRED_KEY) {
    setFetchError(`Invalid API Key. You entered Wrong Api Key: "${sapEndpoint}"`);
    setIsFetching(false);
    return; // STOP execution — do not call backend
}

try {
    const response = await fetch('http://localhost:8003/api/fetch-sap-data', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ endpoint: sapEndpoint.trim() })
    });

    const result = await response.json();
    
    if (result.success) {
        setSapData(result.data);
    } else {
        setFetchError(result.error || 'Failed to fetch SAP data');
    }
} catch (err) {
    setFetchError('Error connecting to fetch endpoint.');
} finally {
    setIsFetching(false);
}
};

return (
    <div style={{ maxWidth: 650, margin: "0 auto", padding: "32px 20px", fontFamily: 'sans-serif' }}>
        

        {/* --- STATE 1: PROVISIONING FORM --- */}
        {!isProvisioned ? (
            <>
                <div style={{ marginBottom: 24 }}>
                    <h1 style={{ fontSize: 26, fontWeight: 700, margin: 0, color: '#fff' }}>SAP Connection Configuration</h1>
                </div>
                <form onSubmit={handleSubmit} style={{ background: "#131D27", border: "1px solid #1F2B38", borderRadius: 14, padding: 26, display: "flex", flexDirection: "column", gap: 20, color: '#fff' }}>
                    <div>
                        <label style={{ display: 'block', marginBottom: 5, fontSize: 14 }}>System Name</label>
                        <input style={{ width: '100%', padding: 10, borderRadius: 4, border: '1px solid #374151', background: '#1F2937', color: '#fff' }} name="systemName" placeholder="e.g. SAP_Production" onChange={handleChange} required />
                    </div>
                    <div>
                        <label style={{ display: 'block', marginBottom: 5, fontSize: 14 }}>SAP Host URL</label>
                        <input style={{ width: '100%', padding: 10, borderRadius: 4, border: '1px solid #374151', background: '#1F2937', color: '#fff' }} name="host" placeholder="https://..." onChange={handleChange} required />
                    </div>
                    
                    <div>
                        <label style={{ display: 'block', marginBottom: 5, fontSize: 14 }}>Endpoint</label>
                        <input style={{ width: '100%', padding: 10, borderRadius: 4, border: '1px solid #374151', background: '#1F2937', color: '#fff' }} name="endpoint" placeholder="/sap/opu/odata/..." onChange={handleChange} required />
                    </div>
                    <div>
                        <label style={{ display: 'block', marginBottom: 5, fontSize: 14 }}>Username</label>
                        <input style={{ width: '100%', padding: 10, borderRadius: 4, border: '1px solid #374151', background: '#1F2937', color: '#fff' }} name="username" placeholder="Username" onChange={handleChange} required />
                    </div>
                    <div>
                        <label style={{ display: 'block', marginBottom: 5, fontSize: 14 }}>Password</label>
                        <input style={{ width: '100%', padding: 10, borderRadius: 4, border: '1px solid #374151', background: '#1F2937', color: '#fff' }} type="password" name="password" placeholder="Password" onChange={handleChange} required />
                    </div>
                    <button type="submit" style={{ padding: '12px', background: '#2563EB', color: '#fff', border: 'none', borderRadius: 4, cursor: 'pointer', fontWeight: 'bold' }}>
                        Provision SAP Access
                    </button>
                </form>
                {status && <p style={{ textAlign: "center", marginTop: 20, color: status.includes("Success") ? "#10B981" : "#EF4444" }}>{status}</p>}
            </>
        ) : (
            /* --- STATE 2: DYNAMIC DATA FETCHER --- */
            <div style={{ background: "#131D27", border: "1px solid #1F2B38", borderRadius: 14, padding: 30, color: '#fff' }}>
                
                {/* Success Header */}
                <div style={{ textAlign: 'center', marginBottom: 25 }}>
                    <div style={{ fontSize: 40, color: '#10B981', marginBottom: 10 }}>✅</div>
                    <h2 style={{ margin: 0, color: '#10B981' }}>Connection successful!</h2>
                    <p style={{ color: '#9CA3AF', fontSize: 14 }}>SAP System has been provisioned successfully.</p>
                </div>

                {/* Parameterized Input Box */}
                <div style={{ marginBottom: 20 }}>
                    <label style={{ display: 'block', marginBottom: 8, fontSize: 14, color: '#9CA3AF' }}>Enter API Endpoint:</label>
                    <div style={{ display: 'flex', gap: 10 }}>
                        <input 
                            type="text"
                            value={sapEndpoint}
                            onChange={(e) => setSapEndpoint(e.target.value)}
                            placeholder=""
                            style={{ flex: 1, padding: '12px', borderRadius: 4, border: '1px solid #374151', background: '#1F2937', color: '#fff' }}
                            onKeyDown={(e) => e.key === 'Enter' && handleFetchData()}
                        />
                        <button 
                            onClick={handleFetchData}
                            disabled={isFetching}
                            style={{ padding: '0 20px', background: '#3B82F6', color: '#fff', border: 'none', borderRadius: 4, cursor: 'pointer', fontWeight: 'bold' }}
                        >
                            {isFetching ? 'Fetching...' : 'Enter'}
                        </button>
                    </div>
                </div>

                {/* Table Display */}
                {sapData && (
                    <div style={{ marginTop: '20px', overflowX: 'auto', background: '#0d2a76', borderRadius: 6, padding: 15, border: '1px solid #1F2937' }}>
                        <h4 style={{ margin: '0 0 15px 0', color: '#60A5FA', textAlign: 'center' }}>Fetched SAP Inventory Data</h4>
                        <table
    className="sap-data-table"
    style={{
        width: '100%',
        borderCollapse: 'collapse',
        backgroundColor: '#1E293B',
        color: '#FFFFFF',
        borderRadius: '8px',
        overflow: 'hidden',
        fontSize: '13px'
    }}
>
    <thead>
        <tr
            style={{
                backgroundColor: '#0F172A',
                color: '#FFFFFF',
                textAlign: 'left',
                borderBottom: '1px solid #374151'
            }}
        >
            <th style={{ padding: '10px 12px', color: '#FFFFFF' }}>MaterialType</th>
            <th style={{ padding: '10px 12px', color: '#FFFFFF' }}>Plant</th>
            <th style={{ padding: '10px 12px', color: '#FFFFFF' }}>StorageLocation</th>
            <th style={{ padding: '10px 12px', color: '#FFFFFF' }}>ByStorageLocation</th>
            <th style={{ padding: '10px 12px', color: '#FFFFFF' }}>Material</th>
            <th style={{ padding: '10px 12px', color: '#FFFFFF' }}>UnitOfMeasure</th>
            <th style={{ padding: '10px 12px', color: '#FFFFFF' }}>Quantity</th>
        </tr>
    </thead>
                            <tbody>
                                {sapData.map((item, idx) => {
                                    const matType = item.MaterialType ?? item.materialType ?? '';
                                    const plant = item.Plant ?? item.plant ?? '';
                                    const storageLoc = item.StorageLocation ?? item.storageLocation ?? '';
                                    const byStorageLoc = item.ByStorageLocation ?? item.byStorageLocation ?? false;
                                    const material = item.Material ?? item.material ?? '';
                                    const unit = item.UnitOfMeasure ?? item.unitOfMeasure ?? '';
                                    const qty = item.Quantity ?? item.quantity ?? '';

                                    return (
                                        <tr key={idx} style={{ borderBottom: '1px solid #374151' , color: '#ffffff' , backgroundColor: '#1E293B'}}>
                                            <td style={{ padding: '10px 12px' }}>{matType}</td>
<td style={{ padding: '10px 12px' }}>{plant}</td>
<td style={{ padding: '10px 12px' }}>{storageLoc}</td>
<td style={{ padding: '10px 12px' }}>{String(byStorageLoc)}</td>
<td style={{ padding: '10px 12px', fontWeight: 'bold' }}>{material}</td>
<td style={{ padding: '10px 12px' }}>{unit}</td>
<td style={{ padding: '10px 12px' }}>{qty}</td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                )}

                {/* Error Handling */}
                {fetchError && (
                    <div style={{ padding: 15, background: '#7F1D1D', color: '#FCA5A5', borderRadius: 6, marginBottom: 20, textAlign: 'center', fontWeight: 'bold' }}>
                        {fetchError}
                    </div>
                )}

                {/* Reset Button */}
                <div style={{ marginTop: 25, textAlign: 'center' }}>
                    <button 
                        onClick={() => setIsProvisioned(false)}
                        style={{ background: 'transparent', color: '#9CA3AF', border: '1px solid #374151', padding: '8px 16px', borderRadius: 4, cursor: 'pointer' }}
                    >
                        Connect another system
                    </button>
                </div>
            </div>
        )}
    </div>
);
};

export default SapIntegration;