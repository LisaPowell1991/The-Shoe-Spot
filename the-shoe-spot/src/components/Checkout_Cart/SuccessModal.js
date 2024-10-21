import React, { useEffect } from 'react';
import { Modal } from 'bootstrap';

const SuccessModal = ({ message, redirectUrl }) => {
    useEffect(() => {
        const modal = new Modal(document.getElementById('successModal'), {
            backdrop: 'static',
            keyboard: false
        });
        modal.show();
        setTimeout(() => {
            window.location.href = redirectUrl;
        }, 3000);
    }, [redirectUrl]);

    return (
        <div className="modal fade" id="successModal" tabIndex="-1" aria-labelledby="successModalLabel" inert>
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="successModalLabel">Success</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        {message}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SuccessModal;
