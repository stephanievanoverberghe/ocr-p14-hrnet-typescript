'use client';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    message: string;
}

const Modal = ({ isOpen, onClose, message }: ModalProps) => {
    if (!isOpen) return null;

    return (
        <div role="dialog" aria-labelledby="modalTitle" aria-describedby="modalMessage" className="fixed inset-0 flex items-center justify-center bg-black/75 z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg mx-auto text-center max-w-sm">
                <h2 id="modalTitle" className="text-lg font-semibold mb-2">
                    Message
                </h2>
                <p id="modalMessage">{message}</p>
                <button className="mt-4 bg-[#5a6f07] hover:bg-[#4e5d06] text-white px-4 py-2 rounded transition" onClick={onClose}>
                    OK
                </button>
            </div>
        </div>
    );
};

export default Modal;
