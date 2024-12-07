import style from './AddService.module.css';
import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import SuccessAlert from '../../../AlertSuccess/AlertSuccess';
import ServiceControl from '../../../../pages/Services/ServiceControl';

const AddService = ({ Display, close }) => {
    const [newService, setNewService] = useState({});
    const [error, setError] = useState('');
    const [AlertSuccess, setAlertSuccess] = useState(false);
    const [listaCategorias, setListaCategorias] = useState([
        {
            key: 'Consulta',
            name: 'Consulta'
        },
        {
            key: 'Limpeza',
            name: 'Limpeza'
        },
        {
            key: 'Cirurgia',
            name: 'Cirurgia'
        },
        {
            key: 'Manutencao',
            name: 'Manutenção'
        }
    ]);

    return (
        <>
            <div className={`${style['bottom']} modal`} id="addServiceModal" tabIndex="-1" aria-labelledby="addServiceModalLabel"
                aria-hidden="true" style={{ display: Display, padding: '0', borderRadius: '5px' }}>
                {AlertSuccess &&
                    <SuccessAlert text={'Serviço salvo com sucesso!'} />
                }
                <div className={`${style['form']} modal-dialog modal-lg modal-dialog-scrollable`} style={{height: 'fit-content'}}>
                    <div className={`modal-content`} >
                        <div className="modal-header">
                            <h5 className={`${style['title']} modal-title text-primary`} id="addServiceModalLabel">Adicionar Serviço</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={() => close(newService)}></button>
                        </div>
                        <div className="modal-body" >
                            <form id="addServiceForm" onSubmit={saveFields}>
                                <div className="row" >
                                    <div className="col-md-6 mb-3">
                                        <label htmlFor="serviceName" className="form-label">Nome do Serviço*</label>
                                        <input type="text" className="form-control" id="serviceName"
                                            placeholder="Digite o nome do serviço" required />
                                    </div>
                                    <div className="col-md-6 mb-3">
                                        <label htmlFor="serviceCategory" className="form-label">Categoria*</label>
                                        <select className="form-control" id="serviceCategory">
                                        {listaCategorias && listaCategorias.map((item)=> (
                                            <option value={item.key} >{item.name}</option>
                                        ))}
                                    </select>
                                    </div>
                                    <div className="col-md-6 mb-3">
                                        <label htmlFor="servicePrice" className="form-label">Preço*</label>
                                        <input type="number" className="form-control" id="servicePrice" placeholder="Preço do serviço"
                                            required />
                                    </div>
                                    <div className="col-md-6 mb-3">
                                        <label htmlFor="serviceDuration" className="form-label">Duração (minutos)*</label>
                                        <input type="number" className="form-control" id="serviceDuration"
                                            placeholder="Duração do serviço" required />
                                    </div>
                                    <div className="col-md-12 mb-6">
                                        <label htmlFor="serviceDescription" className="form-label">Descrição*</label>
                                        <textarea className="form-control" id="serviceDescription" rows="3"
                                            placeholder="Descrição do serviço" required></textarea>
                                    </div>
                                </div>
                                <button type="submit" className="btn btn-primary">Salvar</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );

    function saveFields(e) {
        e.preventDefault();
        const service = {
            id: null,
            name: e.target.serviceName.value,
            description: e.target.serviceDescription.value,
            price: e.target.servicePrice.value,
            duration: e.target.serviceDuration.value,
            category: e.target.serviceCategory.value
        };
        setNewService(service);

        ServiceControl.adicionar(service).then(() => {
            setAlertSuccess(true);
        }).catch((e) => {
            setError(e.message);
        });

        setTimeout(() => setAlertSuccess(false), 1500);
        setTimeout(() => {
            close(service);
        }, 2500);
    }
}

export default AddService;
