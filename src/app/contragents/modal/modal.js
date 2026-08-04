import html from './modal.html';
import './modal.css';

export function createContragentsModal(containerElement, handlers) {
    containerElement.innerHTML = html;

    const overlayElement = containerElement.querySelector('[data-contragent-modal-overlay]');
    const formElement = containerElement.querySelector('[data-contragent-form]');
    const cancelButtons = containerElement.querySelectorAll('[data-cancel-button]');

    let editingId = null;

    formElement.addEventListener('submit', (event) => {
        event.preventDefault();

        const formData = new FormData(formElement);

        handlers.onSave({
            id: editingId,
            name: String(formData.get('name')).trim(),
            inn: String(formData.get('inn')).trim(),
            address: String(formData.get('address')).trim(),
            kpp: String(formData.get('kpp')).trim()
        });

        close();
    });

    cancelButtons.forEach((button) => {
        button.addEventListener('click', () => {
            close();
        });
    });

    overlayElement.addEventListener('click', (event) => {
        if (event.target === overlayElement) {
            close();
        }
    });

    function open(contragent = null) {
        editingId = contragent ? contragent.id : null;

        formElement.elements.name.value = contragent ? contragent.name : '';
        formElement.elements.inn.value = contragent ? contragent.inn : '';
        formElement.elements.address.value = contragent ? contragent.address : '';
        formElement.elements.kpp.value = contragent ? contragent.kpp : '';

        overlayElement.classList.remove('hidden');
    }

    function close() {
        editingId = null;
        formElement.reset();
        overlayElement.classList.add('hidden');
    }

    return {
        open,
        close
    };
}
