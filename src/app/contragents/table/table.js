import html from './table.html';
import './table.css';

export function createContragentsTable(containerElement, handlers) {
    containerElement.innerHTML = html;

    const tbodyElement = containerElement.querySelector('[data-contragents-tbody]');

    tbodyElement.addEventListener('click', (event) => {
        const deleteButton = event.target.closest('[data-delete-id]');
        if (!deleteButton) {
            return;
        }

        const id = Number(deleteButton.dataset.deleteId);
        handlers.onDelete(id);
    });

    tbodyElement.addEventListener('dblclick', (event) => {
        const row = event.target.closest('[data-row-id]');
        if (!row) {
            return;
        }

        const id = Number(row.dataset.rowId);
        handlers.onEdit(id);
    });

    function render(contragents) {
        if (contragents.length === 0) {
            tbodyElement.innerHTML = `
                <tr class="bg-white border-b border-gray-200">
                    <td colspan="5" class="px-6 py-4 text-center text-gray-500">
                        Контрагенты не найдены
                    </td>
                </tr>
            `;

            return;
        }

        tbodyElement.innerHTML = contragents
            .map((contragent) => {
                return `
                    <tr data-row-id="${contragent.id}" class="contragents-row bg-white border-b border-gray-200 hover:bg-gray-50">
                        <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">${escapeHtml(contragent.name)}</th>
                        <td class="px-6 py-4">${escapeHtml(contragent.inn)}</td>
                        <td class="px-6 py-4">${escapeHtml(contragent.address)}</td>
                        <td class="px-6 py-4">${escapeHtml(contragent.kpp)}</td>
                        <td class="px-6 py-4 text-right">
                            <button
                                type="button"
                                data-delete-id="${contragent.id}"
                                class="font-medium text-red-600 hover:underline"
                            >
                                Удалить
                            </button>
                        </td>
                    </tr>
                `;
            })
            .join('');
    }

    return {
        render
    };
}

function escapeHtml(value) {
    return String(value)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');
}
