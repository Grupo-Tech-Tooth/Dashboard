import style from './EditService.module.css';
import React, { useEffect, useState } from 'react';
import Input from '../../../Input/Input';
import 'bootstrap/dist/css/bootstrap.min.css';
import logo from "../../../../assets/Tech-Tooth-Logo.png";
import SuccessAlert from '../../../AlertSuccess/AlertSuccess';
import api from '../../../../api';

const EditService = ({ serviceData, display, close }) => {
    
    const [serviceEdit, setServiceEdit] = useState(serviceData || {});
    const [AlertSuccess, setAlertSucess] = useState(false);
    const [disabled, setDisabled] = useState(true);

    const [dtoServico, setDtoServico] = useState({
        nome: '',
        descricao: '',
        preco: 0,
        duracaoMinutos: 0
    });

    return (
        <div className={style['bottom']} style={{ display: display }}>
            {AlertSuccess && <SuccessAlert text={'Serviço alterado com sucesso!'} />}
            <form className={`${style['form']} row g-3`} onSubmit={saveFields}>
                <div className={style['lineTitle']}>
                    <div>
                        <img className="logo" src={logo} width={'40px'} />
                        <h3>Editar Serviço</h3>
                    </div>
                    <label className={style['button']} onClick={() => close(serviceEdit)}>X</label>
                </div>

                <div className="col-md-6">
                    <Input
                        name={'name'}
                        type={'text'}
                        label={'Nome do Serviço'}
                        placeholder={'Digite o nome do serviço'}
                        required={'true'}
                        disabled={disabled}
                        value={serviceEdit.nome}
                        onChange={(e) => setServiceEdit({ ...serviceEdit, nome: e.target.value })}
                    />
                </div>
                <div className="col-md-6">
                    <Input
                        name={'description'}
                        type={'text'}
                        label={'Descrição'}
                        placeholder={'Digite a descrição do serviço'}
                        disabled={disabled}
                        value={serviceEdit.descricao}
                        onChange={(e) => setServiceEdit({ ...serviceEdit, descricao: e.target.value })}
                    />
                </div>
                <div className="col-md-6">
                    <Input
                        name={'price'}
                        type={'number'}
                        label={'Preço'}
                        placeholder={'Digite o preço do serviço'}
                        disabled={disabled}
                        value={serviceEdit.preco}
                        onChange={(e) => setServiceEdit({ ...serviceEdit, preco: parseFloat(e.target.value) })}
                    />
                </div>
                <div className="col-md-6">
                    <Input
                        name={'duration'}
                        type={'number'}
                        label={'Duração (min)'}
                        placeholder={'Digite a duração do serviço'}
                        disabled={disabled}
                        value={serviceEdit.duracaoMinutos}
                        onChange={(e) => setServiceEdit({ ...serviceEdit, duracaoMinutos: parseInt(e.target.value) })}
                    />
                </div>
                <div className={style['lineButton']}>
                    {
                        disabled ? (
                            <>
                                <label className="btn btn-primary" onClick={() => editService()}>Editar</label>
                                <button type="submit" className="btn" disabled>Salvar</button>
                            </>
                        ) : (
                            <>
                                <label className={style['btnSecund']} onClick={() => editService()}>Editar</label>
                                <button type="submit" className="btn btn-primary">Salvar</button>
                            </>
                        )
                    }
                </div>
            </form>
        </div>
    );

    function editService() {
        setDisabled(!disabled);
    }

    async function saveFields(e) {
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
