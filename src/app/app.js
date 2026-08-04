import { useMemo, useState } from 'react';
import { ContragentsTable } from './contragents/table/table';
import { ContragentModal } from './contragents/modal/modal';
import * as styles from './app.module.css';

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

export function App() {
    const [contragents, setContragents] = useState(contragentsSeed);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingContragentId, setEditingContragentId] = useState(null);

    const editingContragent = useMemo(() => {
        if (editingContragentId == null) {
            return null;
        }

        return contragents.find((contragent) => contragent.id === editingContragentId) || null;
    }, [contragents, editingContragentId]);

    function handleOpenCreateModal() {
        setEditingContragentId(null);
        setIsModalOpen(true);
    }

    function handleCloseModal() {
        setIsModalOpen(false);
        setEditingContragentId(null);
    }

    function handleSaveContragent(contragentPayload) {
        setContragents((previousContragents) => {
            if (contragentPayload.id == null) {
                const nextId = Math.max(...previousContragents.map((contragent) => contragent.id), 0) + 1;

                return [
                    ...previousContragents,
                    {
                        ...contragentPayload,
                        id: nextId
                    }
                ];
            }

            return previousContragents.map((contragent) => {
                if (contragent.id === contragentPayload.id) {
                    return {
                        ...contragentPayload
                    };
                }

                return contragent;
            });
        });

        handleCloseModal();
    }

    function handleDeleteContragent(id) {
        setContragents((previousContragents) => {
            return previousContragents.filter((contragent) => contragent.id !== id);
        });
    }

    function handleEditContragent(id) {
        setEditingContragentId(id);
        setIsModalOpen(true);
    }

    return (
        <div className={`min-h-screen bg-gray-50 text-gray-900 flex flex-col ${styles.layout}`}>
            <header className="bg-white border-b border-gray-200">
                <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div>
                            <svg width="208" height="32" viewBox="0 0 208 32" fill="none" xmlns="http://www.w3.org/2000/svg" xmlns="http://www.w3.org/1999/xlink">
                                <rect width="208" height="32" fill="url(#pattern0_3_6)"/>
                                <defs>
                                    <pattern id="pattern0_3_6" patternContentUnits="objectBoundingBox" width="1" height="1">
                                        <use xlinkHref="#image0_3_6" transform="scale(0.00320513 0.0208333)"/>
                                    </pattern>
                                    <image id="image0_3_6" width="312" height="48" preserveAspectRatio="none" xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAATgAAAAwCAYAAACFW2azAAANt0lEQVR4Xu1dPY8cuRHVT/BPUHKn/VCwcOLQii40DGtnJBk2sDitBEHRAv4BEvwHLMM/QIpt62YONnxwYglwcMFpNc4MR/LFF8iBHbf7cYYjzmORVezumenV8QEPh9OQ3U2y6rFYZPdeu1ZRUVFRsXs8WjTXzxfNk4dvmtn9y+bZ55fNGZepqKiouHI4v2wu7r9t3rf/bUK2//bu8aI54fIVFRUVVwKI2ljYBF5wvYqKiopR4/NFcyaIWYpV5CoqKq4GkHO7v2jeCUKW5KNvmlt8nYqKiorR4fxN84IFTOXb5v2jr5vrfK2KioqKYhyfvrw4OJ2/OpjO3+G/xz+bnXGZLkAkFomXlYvmFV+voqKiwoyTs9n1gzutqE1mTcTTL59w+VKULk0F1nxcRUVFOY4ns5Ojyfx9JGwDiVzhxoLMulStqKgohUncVrx59w+3uL4FA0RvS9al6l5xcnd2/dPpH3+KNMYnrd3w7zfvzm7hN9jJJ5PfR79XVOwU2WWpxOn8HV9DwyDRW8C6q7pbHNyeP3f5WLaFyTyabFzulsrdmMwXbdnnXHYItPb7AwgpBNWLKv6Ny1V8T7E0PjbcPI+mL5/ydXI4f9O8YpHqxR1EcU744azEPhsuWOLz9cCxO+SN09mcbWDNtk14fvDwzpe/iX5fcxiBw30QId6YzmfZVYcT5PlzRJt8jYrvCQ5O//QkMgwDW1F8b3XKXjunGW47ijtsHYPb7dghggWcYPK1VpSWemPC4XQm90UBcQ2+bglgbxDTrKil2I5Zn4mp4goi53AWWqO4TufeLNxyFHc8mT3jNnt2yUPmJpOr4HxYjvJzm9lxUvA4Pp1ddBI2ZvscyCHy9Ss+Qhyezl5EBlBASxTnvhTCwjQgtxnFSbmkD4xzTxpyec7D27NnXH5sKM7VevYUlfyytwPb5xl7xFzRE9jpiga+A7UobmvRm+cWozgtYiiJ4tpo8Izrb7JcMPcBiFzJxHh0Zz7TJsEckEPjaw5BTM5V5D5i5KMTO2EofG2PbUdvnheLprMDpQDj57bGtIuSFvnk+nGMgNAtl42z+eFk9vpw8sW/wYPpF/+AAOK3PsIGDB65Ed0KpEdkWTFSDBW9eabyR8bPIfXmw2+ap3zvvkhuMBAtUZwevS05hLO53cz2Olf9uIS1z/qyFefRpwa2jY/BXjZQssSwUY5kBjvYq/FtM3j0g6V33E6J+tEHLXrzTE0UGmCc6XNq7TKxjVRwpKL0+nyUhcnlQ7hnEup45p6lS65vGUHOXvuIUksvLOtsitv6/esEU+kY97xCeaY0GaIfuFwfYpz5HhL8+Ej9hGNj4fjccrvX8b1C5iZnS/1SJtMLfXdOU+TBG/pgr8ahNxtcRwrtlJgb3JJIpHSjAee7SoWg5LhEVJfI5T3ccQ7luVJiAZRMwMjxYUXC1wBc30vP0faBVEe97215MhPvQTy6K7fXPpEaqexWr8WY60lcbQ5ZNCPnA5b6pWS9WaPE4cq4OaPvLHpbEX/LIbx/X0gzW4o5ZzUbU0scpuX6EiAgcGyuX8b8rAvEdTbJ5T0subNUn7nZ3iAYIGyZ6zPgXEfBQXZEd6llWBeBs7QVERHX89ilwHWJjJGntJyBzNnSTgWuxOFK6W+66+jNccBlqnMyoX0ppo7LlOY6LRsNMJYub56IVI5vROWJXB6wGnNK4KwTcCtGF1w3BS+aWp1SgXPLPC7DVPp4VwLXRdxKmGtjqR9YKAqc1fi6cxnFPXjTLCIB2gGHWqZ2GRDJYVWHEZgzFGAwcVsR15PEGeCyTC4PWJ1I6i8g+0rYiojCuN4QUMcrEDirYOAjFuE9GLsSuG0GNmDObrv4k0ZR4KyzYx9+9rt/PWHh2RWH2k3tYnQcxXWdTHKvM+XehOhDLLP4XgCXY0blC54vJXDhcjJF0bgHQInAqWUn6bxbiC62lqUgcLvw+1EInGV27MvJ7LtIeHbGgQ79du2n0GktDiDx8PSluIwqEUzkD7GrWJJHlAyGyzDDsiXPB6YEjssxLcv4rlDHbCVwFsHgHdoUcgLnxzGkOqaCwFmjN3dtnGNsI2RLdBqyj8BxG915SqFcSMlezcuHrjw5/2ssOjvmEId+LVGERO98pc6+cY3ERoPqfKjbPjfvDiZ3EonSDi6XYW6UNdwjpCRwln7b1vIUUPu4FTjT0hR5t8Syn5F731lqa04Q/b3D8pY+Xd3rGT8zbEcV1BVzAqdNCJJYcRlmVKc0cd6FP3nxbSQ4u2bfPFzffsIRDNVRchRmYEAztFwuDW3SRJuX2ACXYa7LFSxNPa+qwKnRkLKpwMjdU2prqcBp4gLmltLIIXJ5ibk2460WLh8yEqtruu1FdbQwsS/HEL2tKC7xrND6yQlFdgZvHSDzu+V4BwuN9kyuTsbAAMs12Gj4dybKWERJYleBQ/9zvaGQE5vVvbOTDPhpJocqIZcOGUjgkhGiVF7C0XSWv+ckb3/aM0uHdrkMk21VVdG+HEP0BvY9D6f1EwxSK5MjDEHLMfDgafeTHEGC9rkjzv/x70xXJiPmOUoCZ4me95qDU5iLhFLIRYRSukITCxas3PVBKTXBsEyOOYHT+pUndIDLMNlHdCXvwR/96u+R0OyLD940kVGUIDejgjCw1ZJPnc1jLpPU2j1YaDSjthgpoNkAiw7/HrHD0tST7+Vh6dfIuAeC5ogaedwsyKYOhIPFmi2UCpzlrRbLxJMTOO0ZuDzAZZiRDWhO1Yf3vvpPJDT7Is7gbTS8EFmDa+mPcVjCdqY3Ak1o2LA1o7YKnHYdFh3+vYz5zxzxvTy0KBNMHWvpi74C1+XrJHyNkNK4amO4DYEDuB4z1+7cpJVKOXA5ZiRwWkO78se/voxEZp+8/7ZRcwo5cPuYPl9QGsWFyw018ct5FGWJyq/JpaBNchyB8O9WYqmmOWJK4KwTh5S3SQFLILeUVv7kZV+BW9I2FoD2SS4eD0DrV7Ydze9T4xBCe04wJXBaXlVahgNcjhkJnBaZdOUv//a/SGT2yT4Cpw0k53+szgiGA6INOhjmJSyfbpLyGCFwT02Q2Wj4dxNXDqY5YsqxLH3j75NyqhDol423PzL1NIE7ms5nlpyjJEwStIlLOvSt9SsLnNYmiyBb3rdN9ak2maciSC7HZFu9piW2u/Cz3/4zEph9s88SVRsMTuZboziuB2j1wgjFkgPRPpNjMtLCYyISvaFrjpgSOMCyTHWc5r+MAieQBAkTlVRPFYPb8+eWhDuur0WY66hSqO8pXUPrVxY4TUTBnCC7CUd5TjAlcFqfSm0EuBxz6wI3omMhG3zwtnm90fACaLkxOSeiR3GSM2kRNRudxekhcmxocCSLuElLBS6jMdxF1BwxJ3AWEdlg69TuTwhOV0vjzLfxQqJfNiJlxRmDNxmydgIiavzQog+ADeEZLe8Uc11A61cWOGtfsr0BVnED2e48svUzR1SissRI4DSHKuVeX8nKsM8xES1fIRmBGl0lBlFzJhZTq6E6oh2tM6p/NzRgZDDXdCPbILVTc8ScwAGW84LD8MMSTRsTL3DmyF3YDOEyKaaS71q/8jgA5uCmresFWPMFZihw/kC0JuKIdN19JArlQzo9W5VFCkdNMJdwjEtTz0eXzdmHoS2DZrSSCAA5x5CiN0BbOkgGboniujE+jgDE5dLkV8Q0R9QEruS7cH2Ik/r+nrlxdAxftjd8Iw1km+HfU+QJzkPrV0ngLKuMvgwFziyoA9H5mCWstnCsS1PPi6+bdUeXQNtgcG1PJPKTiXHB2Dy0iIw3NICSJYOZmaR7VDZB6cVyzRE1gQMgPtqk04fIuYb3KxE4wDThoH9XdqNG+wFTuSmtXyWb28VksXeB0xzKQojb2HZNQz64bMRIxAJtp1KKqEJIxp6K3gCLsUvCM6TT4zrSPTy4vMjAgUNojmgROMC9C7kF52RxA0oFzrIzDfqlanIi5PLCppSH1q+SwAGuH7mskZY27lPg1rvNlgdN8eYv/tzc+8t4DvRK7Bq9AVqEKyXhQ0QTSMLQQmiGkBLIQSK5TOTmEdURyEtTD80RrQIHDNJez6n89xiAUoFb1cmmGjyxVLWsEsDcuGj9mrM77ZSARGhGZNsC9ylw6zSAdTCYELexvGua4sPLfh+71BKbFocMozjLe4laXjSVhwHg9KpDJih9GkcC12NKS1MPzREt/clwDtpR6OCoR3dnT3PtVvtTEDhAit4jIoGvrBJAKbIMofVrTuCAooi4vRbKWyLPUQgcYBqMsPIViNzOF82LdQM7Yvmhv/jDe2sKhy4Z4UyXm4U9kPyN7hMwlfwPsRY6xWjXDm54Lg9+npC5zzMB2EThOiHxO9exAiLgPsootJOJcpqweSCK5+fcpCzoTgA0+2mJnWFpFYV/w3OmIssQWr/mlrceSI8c32uDnYTN8GTgbCy6zyZLBI7rapT6LOSGwFm+DeaJl+jHnHMD+xwL2QYQlaUcYdvAbAshdn9xvp3pnRC0/18ialcNEIWNNrf/RbtXkYcqavsAngtj4sm/7xJrm1n22SD9pgkcl9egRa28U+2QC/chbGM95+aJA719P25ZUVExPEYhcB6hgv/w8auzn3/13zP82b+x8vGiOXk6wGfJKyoqtoOswCk5Qgm9BK6ioqJiSFSBq6io+GiBHDQ2viRiI4fLa8Bn4Pk6IZHH/D//Z5ZSr3ohxAAAAABJRU5ErkJggg=="/>
                                </defs>
                            </svg>
                        </div>
                    </div>
                    <button
                        type="button"
                        onClick={handleOpenCreateModal}
                        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 focus:outline-none"
                    >
                        Добавить
                    </button>
                </div>
            </header>

            <main className="flex-1">
                <div className="max-w-6xl mx-auto px-4 py-8">
                    <ContragentsTable
                        contragents={contragents}
                        onDelete={handleDeleteContragent}
                        onEdit={handleEditContragent}
                    />
                </div>
            </main>

            <footer className="bg-white border-t border-gray-200">
                <div className="max-w-6xl mx-auto px-4 py-4 flex justify-center">
                    <p className="text-sm text-gray-500">© 2007-2024 ООО "Логнекс"</p>
                </div>
            </footer>

            <ContragentModal
                isOpen={isModalOpen}
                contragent={editingContragent}
                onSave={handleSaveContragent}
                onCancel={handleCloseModal}
            />
        </div>
    );
}
