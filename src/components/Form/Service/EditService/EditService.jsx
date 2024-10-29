import style from './EditService.module.css';
import React, { useState } from 'react';
import Input from '../../../Input/Input';
import 'bootstrap/dist/css/bootstrap.min.css';
import logo from "../../../../assets/Tech-Tooth-Logo.png";
import SuccessAlert from '../../../AlertSuccess/AlertSuccess';

const EditService = ({ serviceData, display, close }) => {
    const [serviceEdit, setServiceEdit] = useState(serviceData || {});
    const [AlertSuccess, setAlertSucess] = useState(false);
    const [disabled, setDisabled] = useState(true);

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
                        value={serviceEdit.name}
                        onChange={(e) => setServiceEdit({ ...serviceEdit, name: e.target.value })}
                    />
                </div>
                <div className="col-md-6">
                    <Input
                        name={'description'}
                        type={'text'}
                        label={'Descrição'}
                        placeholder={'Digite a descrição do serviço'}
                        disabled={disabled}
                        value={serviceEdit.description}
                        onChange={(e) => setServiceEdit({ ...serviceEdit, description: e.target.value })}
                    />
                </div>
                <div className="col-md-6">
                    <Input
                        name={'price'}
                        type={'number'}
                        label={'Preço'}
                        placeholder={'Digite o preço do serviço'}
                        disabled={disabled}
                        value={serviceEdit.price}
                        onChange={(e) => setServiceEdit({ ...serviceEdit, price: parseFloat(e.target.value) })}
                    />
                </div>
                <div className="col-md-6">
                    <Input
                        name={'duration'}
                        type={'number'}
                        label={'Duração (min)'}
                        placeholder={'Digite a duração do serviço'}
                        disabled={disabled}
                        value={serviceEdit.duration}
                        onChange={(e) => setServiceEdit({ ...serviceEdit, duration: parseInt(e.target.value) })}
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

    function saveFields(e) {
        e.preventDefault();
        setAlertSucess(true);
        setTimeout(() => setAlertSucess(false), 1500);
        // Aqui você pode adicionar a lógica para atualizar o serviço no estado global ou fazer a chamada API para salvar as alterações
    }
}

export default EditService;
