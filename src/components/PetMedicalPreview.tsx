
function PetMedicalPreview() {
  return (
    <div className="pet-preview">
      <div className="pet-preview-header">
        <span className="pet-preview-logo">petmedical.</span>
        <span className="pet-preview-status">● Online</span>
      </div>

      <div className="pet-preview-body">
        <div className="pet-preview-sidebar">
          <span className="active">Overview</span>
          <span>My Pets</span>
          <span>Appointments</span>
          <span>Medical Records</span>
        </div>

        <div className="pet-preview-content">
          <span className="pet-preview-label">DASHBOARD</span>
          <strong>Welcome back.</strong>

          <div className="pet-preview-stats">
            <div>
              <strong>02</strong>
              <span>My pets</span>
            </div>
            <div>
              <strong>01</strong>
              <span>Appointments</span>
            </div>
          </div>

          <div className="pet-preview-appointment">
            <span>UPCOMING</span>
            <strong>Veterinary visit</strong>
            <small>Scheduled appointment</small>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PetMedicalPreview;
