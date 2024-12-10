async function getData() {
  try {
    // Busca dados do modelo (fix/crud-funcionario)
    const dataFromModel = await EmployeesModel.buscar();

    // Busca dados das APIs (full)
    const responseMedicos = await api.get("/medicos");
    const responseFuncionais = await api.get("/funcionais");

    const combinedData = [...dataFromModel];

    // Processa dados de médicos
    if (responseMedicos.data.length !== 0) {
      responseMedicos.data.forEach((medico) => {
        combinedData.push({
          id: medico.id,
          fullName: `${medico.nome} ${medico.sobrenome ? medico.sobrenome : ''}`,
          name: medico.nome,
          surname: medico.sobrenome,
          email: medico.email,
          crm: medico.crm,
          phone: medico.telefone,
          department: "Médico",
          specialization: medico.especializacao,
          cpf: medico.cpf,
          dateBirth: medico.dataNascimento,
        });
      });
    }

    // Processa dados funcionais
    if (responseFuncionais.data.length !== 0) {
      responseFuncionais.data.forEach((funcional) => {
        combinedData.push({
          id: funcional.id,
          fullName: `${funcional.nome} ${funcional.sobrenome ? funcional.sobrenome : ''}`,
          name: funcional.nome,
          email: funcional.email,
          phone: funcional.telefone,
          department: funcional.departamento,
          specialization: "-",
          cpf: funcional.cpf,
          dateBirth: funcional.dataNascimento,
        });
      });
    }

    // Atualiza estado com os dados consolidados
    setTableInformation((prevTableInformation) => ({
      ...prevTableInformation,
      data: combinedData,
      dataNotFilter: combinedData,
    }));
  } catch (e) {
    // Exibe modal de erro em caso de falha
    setGenericModalError((prev) => ({
      ...prev,
      view: true,
      title: 'Ops.... Tivemos um erro ao concluir a ação',
      description: e.message,
      icon: 'iconErro',
    }));
  }
}
