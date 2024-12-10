import style from './EditService.module.css';
import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import SuccessAlert from '../../../AlertSuccess/AlertSuccess';
import api from '../../../../api';

const EditService = ({ serviceData, display, close }) => {
    
    const [serviceEdit, setServiceEdit] = useState(serviceData || {});
    const [AlertSuccess, setAlertSucess] = useState(false);
    const [disabled, setDisabled] = useState(true);

    const [carregando, setCarregando] = useState(false)
    const [consultaConfirmada, setConsultaConfirmada] = useState(true);

    const [dtoServico, setDtoServico] = useState({
        nome: '',
        descricao: '',
        preco: 0,
        duracaoMinutos: 0
    });

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
        <div className={`${style['bottom']} modal`} id="addServiceModal" tabIndex="-1" aria-labelledby="addServiceModalLabel"
            aria-hidden="true" style={{ display: display, padding: '0', borderRadius: '5px' }}>
            {AlertSuccess && <SuccessAlert text={'Serviço alterado com sucesso!'} />}
            <div className={`${style['form']} modal-dialog modal-lg modal-dialog-scrollable`} style={{height: 'fit-content'}}>
                <div className={`modal-content`}>
                    <div className="modal-header">
                        <h5 className="modal-title text-primary" id="addServiceModalLabel">Editar Serviço</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={() => close()}></button>
                    </div>
                    <div className="modal-body">
                        <form id="addServiceForm" onSubmit={saveFields}>
                            <div className="row">
                                <div className="col-md-6 mb-3">
                                    <label htmlFor="serviceName" className="form-label">Nome do Serviço*</label>
                                    <input type="text" className="form-control" id="serviceName"
                                        placeholder="Digite o nome do serviço" required={'true'}
                                        disabled={disabled}
                                        value={serviceEdit.name}
                                        onChange={(e) => setServiceEdit({ ...serviceEdit, name: e.target.value })} />
                                </div>
                                <div className="col-md-6 mb-3">
                                    <label htmlFor="serviceCategory" className="form-label">Categoria*</label>
                                    <select className="form-control" id="serviceCategory" disabled={disabled}>
                                        {listaCategorias && listaCategorias.map((item)=> (
                                            <option value={item.key} onClick={(e) => setServiceEdit({ ...serviceEdit, description: e.target.value })}>{item.name}</option>
                                        ))}
                                    </select>
                                </div>
                                <div className="col-md-6 mb-3">
                                    <label htmlFor="servicePrice" className="form-label">Preço*</label>
                                    <input type="number" className="form-control" id="servicePrice" placeholder="Preço do serviço"
                                        disabled={disabled}
                                        value={serviceEdit.price}
                                        onChange={(e) => setServiceEdit({ ...serviceEdit, price: parseFloat(e.target.value) })} />
                                </div>
                                <div className="col-md-6 mb-3">
                                    <label htmlFor="serviceDuration" className="form-label">Duração (minutos)*</label>
                                    <input type="number" className="form-control" id="serviceDuration"
                                        placeholder="Duração do serviço" disabled={disabled}
                                        value={serviceEdit.duration}
                                        onChange={(e) => setServiceEdit({ ...serviceEdit, duration: parseInt(e.target.value) })} />
                                </div>
                                <div className="col-md-12 mb-6">
                                    <label htmlFor="serviceDescription" className="form-label">Descrição*</label>
                                    <textarea className="form-control" id="serviceDescription" rows="3"
                                        placeholder="Descrição do serviço"  disabled={disabled} required></textarea>
                                </div>
                                <div className={style['lineButton']}>
                                    {
                                        disabled ? (
                                            <>
                                                <label  className="btn btn-primary" onClick={() => editService()}>Editar</label>
                                                <button type="submit" className="btn" disabled>Salvar</button>
                                            </>
                                        ) : (
                                            <>
                                                <label hidden={carregando} className={style['btnSecund']} onClick={() => editService()}>Editar</label>
                                                <button hidden={carregando} type="submit" className="btn btn-primary">Salvar</button>
                                                
                                                {consultaConfirmada && carregando && (
                                                    <div className={style.carregamento} id="carregamento">
                                                        <div className={style.loader}></div>  
                                                    </div>
                                                )}
                                            </>
                                        )
                                    }
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );

    function editService() {
        setDisabled(!disabled);
    }

    async function saveFields(e) {
        setCarregando(true);
        e.preventDefault();
        setAlertSucess(true);
    
        // Crie um objeto local com os valores atualizados
        const dtoServicoAtualizado = {
            nome: serviceEdit?.nome,
            descricao: serviceEdit?.descricao,
            preco: serviceEdit?.preco,
            duracaoMinutos: serviceEdit?.duracaoMinutos,
        };
    
        console.log("dtoServicoAtualizado", dtoServicoAtualizado);
    
        try {
            const response = await api.put(`/servicos/${serviceEdit.id}`, dtoServicoAtualizado);
            console.log(response);
    
            if (response.status === 200) {
                setAlertSucess(true);
                setTimeout(() => {
                    setAlertSucess(false);
                    setCarregando(false);
                    close(serviceEdit);
                }, 2000);
            }
        } catch (error) {
            console.error("Erro ao salvar os campos:", error);
            setAlertSucess(false);
        }
    }
    
}

export default EditService;
