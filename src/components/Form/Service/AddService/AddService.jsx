import style from './AddService.module.css';
import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import SuccessAlert from '../../../AlertSuccess/AlertSuccess';
import ServiceControl from '../../../../pages/Services/ServiceControl';

const AddService = ({ Display, close }) => {
    const [newService, setNewService] = useState({});
    const [error, setError] = useState('');
    const [AlertSuccess, setAlertSuccess] = useState(false);

    const [carregando, setCarregando] = useState(false)
    const [consultaConfirmada, setConsultaConfirmada] = useState(true);

    const [listaCategorias, setListaCategorias] = useState([
        { key: 'CONSULTAS_GERAIS', name: 'Consultas Gerais' },
        { key: 'PREVENCAO', name: 'Prevenção' },
        { key: 'ODONTOPEDIATRIA', name: 'Odontopediatria' },
        { key: 'ORTODONTIA', name: 'Ortodontia' },
        { key: 'PERIODONTIA', name: 'Periodontia' },
        { key: 'ENDODONTIA', name: 'Endodontia' },
        { key: 'CIRURGIAS_ODONTOLOGICAS', name: 'Cirurgias Odontológicas' },
        { key: 'IMPLANTODONTIA', name: 'Implantodontia' },
        { key: 'PROTESE_DENTARIA', name: 'Prótese Dentária' },
        { key: 'ESTETICA_DENTAL', name: 'Estética Dental' },
        { key: 'ODONTOGERIATRIA', name: 'Odontogeriatria' },
        { key: 'RADIOLOGIA_ODONTOLOGICA', name: 'Radiologia Odontológica' },
        { key: 'ODONTOLOGIA_DE_URGENCIA', name: 'Odontologia de Urgência' },
        { key: 'DISFUNCAO_TEMPOROMANDIBULAR', name: 'Disfunção Temporomandibular (DTM) e Dor Orofacial' },
        { key: 'ODONTOLOGIA_DO_SONO', name: 'Odontologia do Sono' },
        { key: 'ODONTOLOGIA_HOSPITALAR', name: 'Odontologia Hospitalar' },
        { key: 'ODONTOLOGIA_LEGAL', name: 'Odontologia Legal' },
        { key: 'LASERTERAPIA', name: 'Laserterapia' }
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
                                <button type="submit" className="btn btn-primary" hidden={carregando}>Salvar</button>
                                {consultaConfirmada && carregando && (
                                    <div className={style.carregamento} id="carregamento">
                                        <div className={style.loader}></div>  
                                    </div>
                                )}
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );

    function saveFields(e) {
        setCarregando(true);
        e.preventDefault();

        const service = {
            nome: e.target.serviceName.value,
            descricao: e.target.serviceDescription.value,
            preco: e.target.servicePrice.value,
            duracaoMinutos: e.target.serviceDuration.value,
            categoria: e.target.serviceCategory.value
        };

        let servicoCriado = ServiceControl.adicionar(service).then((response) => {
            setNewService(response);
            setAlertSuccess(true);
            setTimeout(() => {
                setCarregando(false);
                close(newService);
            }, 2000);
        }).catch((error) => {
            setError(error.message);
        });

    }
}

export default AddService;
