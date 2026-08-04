import html from './app.html';
import './app.css';

import { createContragentsTable } from './contragents/table/table';
import { createContragentsModal } from './contragents/modal/modal';

const contragentsSeed = [
    {
        id: 1,
        name: 'ООО "Альфа Трейд"',
        inn: '7701234567',
        address: 'г. Москва, ул. Ленина, 10',
        kpp: '770101001'
    },
    {
        id: 2,
        name: 'ИП Петров И.И.',
        inn: '781234567890',
        address: 'г. Санкт-Петербург, Невский пр., 28',
        kpp: '780201001'
    },
    {
        id: 3,
        name: 'АО "ТехСнаб"',
        inn: '5409876543',
        address: 'г. Новосибирск, Красный проспект, 100',
        kpp: '540901001'
    }
];

let contragents = [...contragentsSeed];
let nextId = Math.max(...contragents.map((contragent) => contragent.id), 0) + 1;

const rootElement = document.getElementById('root');
rootElement.innerHTML = html;

const tableContainer = document.getElementById('contragents-table-container');
const modalContainer = document.getElementById('contragents-modal-container');
const addButton = document.getElementById('add-contragent-button');

const tableComponent = createContragentsTable(tableContainer, {
    onDelete: deleteContragent,
    onEdit: editContragent
});

const modalComponent = createContragentsModal(modalContainer, {
    onSave: saveContragent
});

addButton.addEventListener('click', () => {
    modalComponent.open();
});

renderContragentsTable();

function renderContragentsTable() {
    tableComponent.render(contragents);
}

function saveContragent(contragentPayload) {
    if (contragentPayload.id == null) {
        contragents.push({
            ...contragentPayload,
            id: nextId
        });
        nextId += 1;
    } else {
        contragents = contragents.map((contragent) => {
            if (contragent.id === contragentPayload.id) {
                return { ...contragentPayload };
            }

            return contragent;
        });
    }

    renderContragentsTable();
}

function deleteContragent(id) {
    contragents = contragents.filter((contragent) => contragent.id !== id);
    renderContragentsTable();
}

function editContragent(id) {
    const selectedContragent = contragents.find((contragent) => contragent.id === id);

    if (!selectedContragent) {
        return;
    }

    modalComponent.open(selectedContragent);
}
