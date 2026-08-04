import { useEffect, useState } from 'react';
import * as styles from './modal.module.css';

const emptyForm = {
    id: null,
    name: '',
    inn: '',
    address: '',
    kpp: ''
};

export function ContragentModal({ isOpen, contragent, onSave, onCancel }) {
    const [formData, setFormData] = useState(emptyForm);

    useEffect(() => {
        if (!isOpen) {
            return;
        }

        if (contragent) {
            setFormData({
                id: contragent.id,
                name: contragent.name,
                inn: contragent.inn,
                address: contragent.address,
                kpp: contragent.kpp
            });
        } else {
            setFormData(emptyForm);
        }
    }, [isOpen, contragent]);

    if (!isOpen) {
        return null;
    }

    function handleSubmit(event) {
        event.preventDefault();

        onSave({
            id: formData.id,
            name: formData.name.trim(),
            inn: formData.inn.trim(),
            address: formData.address.trim(),
            kpp: formData.kpp.trim()
        });
    }

    function handleBackdropClick(event) {
        if (event.target === event.currentTarget) {
            onCancel();
        }
    }

    function handleChange(event) {
        const { name, value } = event.target;
        setFormData((previousFormData) => ({
            ...previousFormData,
            [name]: value
        }));
    }

    return (
        <div
            className={`fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4 ${styles.overlay}`}
            onClick={handleBackdropClick}
        >
            <div className={`w-full max-w-lg bg-white rounded-lg shadow ${styles.modal}`}>
                <div className="flex items-center justify-between p-4 border-b border-gray-200">
                    <h2 className="text-lg font-semibold text-gray-900">Контрагент</h2>
                    <button
                        type="button"
                        onClick={onCancel}
                        className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 inline-flex justify-center items-center"
                    >
                        <span className="sr-only">Закрыть</span>
                        <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                        </svg>
                    </button>
                </div>
                <form className="p-4 md:p-5" onSubmit={handleSubmit}>
                    <div className="grid gap-4 mb-4">
                        <div>
                            <label htmlFor="contragent-name" className="block mb-2 text-sm font-medium text-gray-900">Наименование</label>
                            <input
                                id="contragent-name"
                                name="name"
                                type="text"
                                required
                                value={formData.name}
                                onChange={handleChange}
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                placeholder='ООО "Ромашка"'
                            />
                        </div>
                        <div>
                            <label htmlFor="contragent-inn" className="block mb-2 text-sm font-medium text-gray-900">ИНН</label>
                            <input
                                id="contragent-inn"
                                name="inn"
                                type="text"
                                required
                                value={formData.inn}
                                onChange={handleChange}
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                placeholder="7701234567"
                            />
                        </div>
                        <div>
                            <label htmlFor="contragent-address" className="block mb-2 text-sm font-medium text-gray-900">Адрес</label>
                            <input
                                id="contragent-address"
                                name="address"
                                type="text"
                                required
                                value={formData.address}
                                onChange={handleChange}
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                placeholder="г. Москва, ул. Пример, 1"
                            />
                        </div>
                        <div>
                            <label htmlFor="contragent-kpp" className="block mb-2 text-sm font-medium text-gray-900">КПП</label>
                            <input
                                id="contragent-kpp"
                                name="kpp"
                                type="text"
                                required
                                value={formData.kpp}
                                onChange={handleChange}
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                placeholder="770101001"
                            />
                        </div>
                    </div>
                    <div className="flex items-center justify-end gap-3">
                        <button
                            type="button"
                            onClick={onCancel}
                            className="py-2.5 px-5 text-sm font-medium text-gray-900 bg-white rounded-lg border border-gray-300 hover:bg-gray-100 hover:text-blue-700 focus:outline-none focus:ring-4 focus:ring-gray-100"
                        >
                            Отменить
                        </button>
                        <button
                            type="submit"
                            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 focus:outline-none"
                        >
                            Сохранить
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
