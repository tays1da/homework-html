import { createForm } from 'final-form';
import { useEffect, useMemo, useState } from 'react';
import * as styles from './modal.module.css';
import { validateContragent } from './validation';

const emptyForm = {
    id: null,
    name: '',
    inn: '',
    address: '',
    kpp: ''
};

export function ContragentModal({ isOpen, contragent, onSave, onCancel }) {
    const form = useMemo(() => {
        return createForm({
            initialValues: emptyForm,
            validate: validateContragent,
            onSubmit: async (values) => {
                await onSave({
                    id: values.id ?? null,
                    name: (values.name || '').trim(),
                    inn: (values.inn || '').trim(),
                    address: (values.address || '').trim(),
                    kpp: (values.kpp || '').trim()
                });
            }
        });
    }, [onSave]);

    const [formState, setFormState] = useState(form.getState());

    useEffect(() => {
        const unsubscribe = form.subscribe((nextState) => {
            setFormState(nextState);
        }, {
            values: true,
            errors: true,
            touched: true,
            submitFailed: true,
            invalid: true,
            submitting: true
        });

        return () => {
            unsubscribe();
        };
    }, [form]);

    useEffect(() => {
        if (!isOpen) {
            return;
        }

        if (contragent) {
            form.restart({
                id: contragent.id,
                name: contragent.name,
                inn: contragent.inn,
                address: contragent.address,
                kpp: contragent.kpp
            });
        } else {
            form.restart(emptyForm);
        }
    }, [isOpen, contragent, form]);

    if (!isOpen) {
        return null;
    }

    function handleSubmit(event) {
        event.preventDefault();
        form.submit();
    }

    function handleBackdropClick(event) {
        if (event.target === event.currentTarget) {
            onCancel();
        }
    }

    function handleChange(event) {
        form.change(event.target.name, event.target.value);
    }

    const values = formState.values || emptyForm;
    const errors = formState.errors || {};
    const touched = formState.touched || {};

    function getError(name) {
        if (!errors[name]) {
            return null;
        }

        const value = values[name];
        const hasInput = typeof value === 'string' ? value.trim().length > 0 : Boolean(value);

        if (hasInput || touched[name] || formState.submitFailed) {
            return errors[name];
        }

        return null;
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
                                value={values.name || ''}
                                onChange={handleChange}
                                onBlur={() => form.blur('name')}
                                onFocus={() => form.focus('name')}
                                className={`bg-gray-50 border text-gray-900 text-sm rounded-lg block w-full p-2.5 ${
                                    getError('name')
                                        ? 'border-red-500 focus:ring-red-500 focus:border-red-500'
                                        : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500'
                                }`}
                                placeholder='ООО "Ромашка"'
                            />
                            {getError('name') && (
                                <p className="mt-1 text-xs text-red-600">{getError('name')}</p>
                            )}
                        </div>
                        <div>
                            <label htmlFor="contragent-inn" className="block mb-2 text-sm font-medium text-gray-900">ИНН</label>
                            <input
                                id="contragent-inn"
                                name="inn"
                                type="text"
                                value={values.inn || ''}
                                onChange={handleChange}
                                onBlur={() => form.blur('inn')}
                                onFocus={() => form.focus('inn')}
                                className={`bg-gray-50 border text-gray-900 text-sm rounded-lg block w-full p-2.5 ${
                                    getError('inn')
                                        ? 'border-red-500 focus:ring-red-500 focus:border-red-500'
                                        : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500'
                                }`}
                                placeholder="7701234567"
                            />
                            {getError('inn') && (
                                <p className="mt-1 text-xs text-red-600">{getError('inn')}</p>
                            )}
                        </div>
                        <div>
                            <label htmlFor="contragent-address" className="block mb-2 text-sm font-medium text-gray-900">Адрес</label>
                            <input
                                id="contragent-address"
                                name="address"
                                type="text"
                                value={values.address || ''}
                                onChange={handleChange}
                                onBlur={() => form.blur('address')}
                                onFocus={() => form.focus('address')}
                                className={`bg-gray-50 border text-gray-900 text-sm rounded-lg block w-full p-2.5 ${
                                    getError('address')
                                        ? 'border-red-500 focus:ring-red-500 focus:border-red-500'
                                        : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500'
                                }`}
                                placeholder="г. Москва, ул. Пример, 1"
                            />
                            {getError('address') && (
                                <p className="mt-1 text-xs text-red-600">{getError('address')}</p>
                            )}
                        </div>
                        <div>
                            <label htmlFor="contragent-kpp" className="block mb-2 text-sm font-medium text-gray-900">КПП</label>
                            <input
                                id="contragent-kpp"
                                name="kpp"
                                type="text"
                                value={values.kpp || ''}
                                onChange={handleChange}
                                onBlur={() => form.blur('kpp')}
                                onFocus={() => form.focus('kpp')}
                                className={`bg-gray-50 border text-gray-900 text-sm rounded-lg block w-full p-2.5 ${
                                    getError('kpp')
                                        ? 'border-red-500 focus:ring-red-500 focus:border-red-500'
                                        : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500'
                                }`}
                                placeholder="770101001"
                            />
                            {getError('kpp') && (
                                <p className="mt-1 text-xs text-red-600">{getError('kpp')}</p>
                            )}
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
                            disabled={formState.invalid || formState.submitting}
                            className="text-white bg-blue-700 hover:bg-blue-800 disabled:bg-blue-400 disabled:cursor-not-allowed focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 focus:outline-none"
                        >
                            {formState.submitting ? 'Сохранение...' : 'Сохранить'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
