export function validateContragent(values) {
    const errors = {};
    const name = (values.name || '').trim();
    const inn = (values.inn || '').trim();
    const address = (values.address || '').trim();
    const kpp = (values.kpp || '').trim();

    if (!name) {
        errors.name = 'Укажите наименование';
    }

    if (!inn) {
        errors.inn = 'Укажите ИНН';
    } else if (!/^\d+$/.test(inn)) {
        errors.inn = 'ИНН должен содержать только цифры';
    } else if (inn.length !== 10 && inn.length !== 12) {
        errors.inn = 'ИНН должен содержать 10 или 12 цифр';
    }

    if (!address) {
        errors.address = 'Укажите адрес';
    }

    if (!kpp) {
        errors.kpp = 'Укажите КПП';
    } else if (!/^\d+$/.test(kpp)) {
        errors.kpp = 'КПП должен содержать только цифры';
    } else if (kpp.length !== 9) {
        errors.kpp = 'КПП должен содержать 9 цифр';
    }

    return errors;
}
