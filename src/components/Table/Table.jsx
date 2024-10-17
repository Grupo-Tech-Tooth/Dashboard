import React, { useState } from 'react';
import style from './Table.module.css';
import FormUser from '../FormUser/FormUserEdit/FormUserEdit';


const Table = ({ tableInformation }) => {
    const [count, setCount] = useState(0);
    const [formUser, setFormUser] = useState("none");
    const [userEdit, setUserEdit] = useState([]);

    return (
        <div className="table-responsive">
            <table className="table table-hover" id={tableInformation.tableId}>
                <thead>
                    <tr>
                        {tableInformation.columns &&
                            tableInformation.columns.map((item) =>
                                <th scope="col" className={style['title']}>{item.name}</th>
                            )}
                    </tr>
                </thead>
                <tbody id={tableInformation.tbodyId}>
                    {tableInformation.data &&
                        tableInformation.data.map((item, index) =>
                            <tr>
                                <td>{item.id}</td>
                                <td>{item.name} {item.surname}</td>
                                <td>{item.email}</td>
                                <td>{item.phone}</td>
                                <td>{item.lastVisit}</td>
                                <td style={{ display: 'flex', gap: '5px' }}>
                                    <button className="btn btn-warning btn-sm" onClick={() => editPatient(item)}>Editar</button>
                                    <button className="btn btn-danger btn-sm" onClick={() => deletePatient(item.id)}>Excluir</button>
                                </td>
                            </tr>
                        )}
                </tbody>
            </table>
            {formUser !== "none" && (
                <FormUser display={formUser} userData={userEdit} close={closeForm} />
            )}
        </div>
    )


    function closeForm(userEdit) {
        const position = tableInformation.data.findIndex((item) => item.id === userEdit.id);
        if (position !== -1) {
            tableInformation.data[position] = {
                ...tableInformation.data[position],
                name: userEdit.name,
                surname: userEdit.surname,
                email: userEdit.email,
                phone: userEdit.phone,
                lastVisit: userEdit.lastVisit
            };
            setFormUser("none");
        }
    }

    function editPatient(user) {
        setFormUser("block");
        setUserEdit(user);
    }

    function deletePatient(id) {
        if (window.confirm('Deseja realmente excluir este paciente?')) {
            tableInformation.data = tableInformation.data.filter((item) => item.id != id);
            setCount(count + 1);
        }
    }
}

export default Table;