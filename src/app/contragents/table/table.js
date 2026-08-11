import * as styles from './table.module.css';

export function ContragentsTable({ contragents, onDelete, onEdit }) {
    return (
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table className="w-full text-sm text-left text-gray-500">
                <thead className="text-xs text-gray-700 uppercase bg-gray-100">
                    <tr>
                        <th scope="col" className="px-6 py-3">Наименование</th>
                        <th scope="col" className="px-6 py-3">ИНН</th>
                        <th scope="col" className="px-6 py-3">Адрес</th>
                        <th scope="col" className="px-6 py-3">КПП</th>
                        <th scope="col" className="px-6 py-3 text-right">Действие</th>
                    </tr>
                </thead>
                <tbody>
                    {contragents.length === 0 && (
                        <tr className="bg-white border-b border-gray-200">
                            <td colSpan={5} className="px-6 py-4 text-center text-gray-500">
                                Контрагенты не найдены
                            </td>
                        </tr>
                    )}
                    {contragents.map((contragent) => (
                        <tr
                            key={contragent.id}
                            onDoubleClick={() => onEdit(contragent.id)}
                            className={`bg-white border-b border-gray-200 hover:bg-gray-50 ${styles.row}`}
                        >
                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                                {contragent.name}
                            </th>
                            <td className="px-6 py-4">{contragent.inn}</td>
                            <td className="px-6 py-4">{contragent.address}</td>
                            <td className="px-6 py-4">{contragent.kpp}</td>
                            <td className="px-6 py-4 text-right">
                                <button
                                    type="button"
                                    onClick={() => onDelete(contragent.id)}
                                    className="font-medium text-red-600 hover:underline"
                                >
                                    Удалить
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
