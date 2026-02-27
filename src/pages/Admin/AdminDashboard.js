import React, { useEffect, useState } from "react";
import { db } from "../../config/firebase";
import { collection, getDocs, doc, updateDoc } from "firebase/firestore";
import "../../styles/AdminDashboard.css";

const AdminDashboard = () => {
  const [tab, setTab] = useState("stats");
  const [projects, setProjects] = useState([]);
  const [payments, setPayments] = useState([]);
  const [hireRequests, setHireRequests] = useState([]);

  /* ================= FETCH ALL DATA ================= */
  useEffect(() => {
    const fetchAllData = async () => {
      const projectSnap = await getDocs(collection(db, "projects"));
      const paymentSnap = await getDocs(collection(db, "payments"));
      const hireSnap = await getDocs(collection(db, "hireRequests"));

      setProjects(projectSnap.docs.map(d => ({ id: d.id, ...d.data() })));
      setPayments(paymentSnap.docs.map(d => ({ id: d.id, ...d.data() })));
      setHireRequests(hireSnap.docs.map(d => ({ id: d.id, ...d.data() })));
    };

    fetchAllData();
  }, []);

  /* ================= APPROVE / REJECT ================= */
  const approveProject = async (id) => {
    await updateDoc(doc(db, "projects", id), { approved: true });
    setProjects(prev => prev.map(p => p.id === id ? { ...p, approved: true } : p));
  };

  const rejectProject = async (id) => {
    await updateDoc(doc(db, "projects", id), { approved: false });
    setProjects(prev => prev.map(p => p.id === id ? { ...p, approved: false } : p));
  };

  /* ================= STATS ================= */
  const totalProjects = projects.length;
  const approvedProjects = projects.filter(p => p.approved).length;
  const pendingProjects = totalProjects - approvedProjects;
  const totalPurchases = payments.length;
  const totalHireRequests = hireRequests.length;

  return (
    <div className="admin-dashboard">
      <h2>Admin Dashboard</h2>

      {/* ================= TABS ================= */}
      <div className="dashboard-tabs">
        <button className={tab === "stats" ? "active" : ""} onClick={() => setTab("stats")}>Stats</button>
        <button className={tab === "projects" ? "active" : ""} onClick={() => setTab("projects")}>Projects</button>
        <button className={tab === "buyers" ? "active" : ""} onClick={() => setTab("buyers")}>Buyers</button>
        <button className={tab === "hire" ? "active" : ""} onClick={() => setTab("hire")}>Hire Requests</button>
      </div>

      {/* ================= STATS ================= */}
      {tab === "stats" && (
        <div className="stats-grid">
          <div className="stat-card">
            <h3>{totalProjects}</h3>
            <p>Total Projects</p>
          </div>
          <div className="stat-card approved">
            <h3>{approvedProjects}</h3>
            <p>Approved Projects</p>
          </div>
          <div className="stat-card pending">
            <h3>{pendingProjects}</h3>
            <p>Pending Projects</p>
          </div>
          <div className="stat-card">
            <h3>{totalPurchases}</h3>
            <p>Total Purchases</p>
          </div>
          <div className="stat-card">
            <h3>{totalHireRequests}</h3>
            <p>Hire Requests</p>
          </div>
        </div>
      )}

      {/* ================= PROJECTS ================= */}
      {tab === "projects" && (
        <div className="project-approval-grid">
          {projects.map(proj => (
            <div key={proj.id} className="project-card">
              <img src={proj.imageUrl} alt={proj.title} />

              <div className="card-body">
                <h3>{proj.title}</h3>
                <p><b>Seller:</b> {proj.sellerName}</p>
                <p><b>Category:</b> {proj.category}</p>

                <span className={`status ${proj.approved ? "approved" : "pending"}`}>
                  {proj.approved ? "Approved" : "Pending"}
                </span>

                <div className="admin-buttons">
                  {!proj.approved ? (
                    <button className="approve-btn" onClick={() => approveProject(proj.id)}>Approve</button>
                  ) : (
                    <button className="reject-btn" onClick={() => rejectProject(proj.id)}>Reject</button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ================= BUYERS ================= */}
      {tab === "buyers" && (
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Project</th>
                <th>Buyer</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Amount</th>
              </tr>
            </thead>
            <tbody>
             {payments.map(p => (
  <tr key={p.id}>
    <td>{projects.find(proj => proj.id === p.projectId)?.title || p.projectId}</td>
    <td>{p.name}</td>
    <td>{p.email}</td>
    <td>{p.phone}</td>
    <td>₹{p.amount}</td>
  </tr>
))}
            </tbody>
          </table>
        </div>
      )}

      {/* ================= HIRE REQUESTS ================= */}
      {tab === "hire" && (
        <div className="hire-grid">
          {hireRequests.map(h => (
            <div key={h.id} className="hire-card">
             
              <p><b>Email:</b> {h.email}</p>
              <p><b>name:</b> {h.name}</p>
              <p><b>Details:</b> {h.projectDetails}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
