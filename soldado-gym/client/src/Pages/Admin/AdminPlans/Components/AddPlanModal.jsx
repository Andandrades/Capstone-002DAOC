import React from 'react';

const AddPlanModal = ({ isOpen, onClose }) => {
  if (!isOpen)
    return null;

  return (
    <div className="modal fade show absolute " style={{ display: 'block' }} tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div className="modal-dialog " role="document">
        <div className="modal-content bg-[#999]">
          <div className="modal-header ">
            <h3 className="modal-title" id="exampleModalLabel">Añadir Plan</h3>
            <button type="button" className="close absolute" onClick={onClose} aria-label="Close" >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">
            <form>
              <div className="form-group">
                <label htmlFor="planName">Nombre del Plan</label>
                <input type="text" className="form-control" id="planName" />
              </div>
              <div className="form-group">
                <label htmlFor="planDescription">Descripcion del plan</label>
                <input type="text" className="form-control " id="PlanDescriocion" />
              </div>
              <div className="form-group">
                <label htmlFor="planPrice">Precio</label>
                <input type="number" className="form-control" id="planPrice" />
              </div>
              <div className="form-group">
                <label htmlFor="planPrice">N° de clases</label>
                <input type="number" className="form-control" id="planPrice" />
              </div>
              <div className="form-group">
                <label htmlFor="planPrice">Color</label>
                <input type="number" className="form-control" id="planPrice" />
              </div>
            </form>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={onClose}>Cerrar</button>
            <button type="button" className="btn btn-primary">Guardar Plan</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddPlanModal;
