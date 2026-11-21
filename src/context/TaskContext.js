import React, { createContext, useContext, useState } from 'react';

const TasksContext = createContext();

const TAREFAS_INICIAIS = [
  {
    id: '1',
    titulo: 'Estudar Expo Router',
    descricao: 'Revisar navegação em pilha e parâmetros dinâmicos [id].',
    categoria: 'Estudos',
    prioridade: 'alta',
    dataVencimento: '22/11/2026',
    concluida: false,
  },
  {
    id: '2',
    titulo: 'Entregar projeto no AVA',
    descricao: 'Subir o código-fonte completo antes do prazo.',
    categoria: 'Faculdade',
    prioridade: 'media',
    dataVencimento: '22/11/2026',
    concluida: true,
  },
];

export function TasksProvider({ children }) {
  const [tarefas, setTarefas] = useState(TAREFAS_INICIAIS);

  // RF02: Cadastrar tarefa (ID único sem duplicação, status inicial pendente)
  const adicionarTarefa = ({ titulo, descricao, categoria, prioridade, dataVencimento }) => {
    const novaTarefa = {
      id: `${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      titulo: titulo.trim(),
      descricao: descricao ? descricao.trim() : '',
      categoria: categoria.trim() || 'Geral',
      prioridade, // 'baixa' | 'media' | 'alta'
      dataVencimento: dataVencimento.trim() || 'Sem data',
      concluida: false,
    };

    setTarefas((prevTarefas) => [novaTarefa, ...prevTarefas]);
  };

  // RF05: Editar somente a tarefa selecionada
  const editarTarefa = (id, dadosAtualizados) => {
    setTarefas((prevTarefas) =>
      prevTarefas.map((tarefa) =>
        tarefa.id === id ? { ...tarefa, ...dadosAtualizados } : tarefa
      )
    );
  };

  // RF06 & Regra 4: Alternar status entre pendente e concluída
  const alternarStatusTarefa = (id) => {
    setTarefas((prevTarefas) =>
      prevTarefas.map((tarefa) =>
        tarefa.id === id ? { ...tarefa, concluida: !tarefa.concluida } : tarefa
      )
    );
  };

  // RF07: Excluir somente a tarefa selecionada
  const removerTarefa = (id) => {
    setTarefas((prevTarefas) => prevTarefas.filter((tarefa) => tarefa.id !== id));
  };

  // RF04: Buscar tarefa por ID usando find
  const buscarTarefaPorId = (id) => tarefas.find((tarefa) => tarefa.id === id);

  // RF01: Indicadores derivados diretamente do estado (sem useEffect desnecessário)
  const totalTarefas = tarefas.length;
  const totalConcluidas = tarefas.reduce((acc, item) => (item.concluida ? acc + 1 : acc), 0);
  const totalPendentes = totalTarefas - totalConcluidas;

  return (
    <TasksContext.Provider
      value={{
        tarefas,
        adicionarTarefa,
        editarTarefa,
        alternarStatusTarefa,
        removerTarefa,
        buscarTarefaPorId,
        totalTarefas,
        totalConcluidas,
        totalPendentes,
      }}
    >
      {children}
    </TasksContext.Provider>
  );
}

export const useTasks = () => useContext(TasksContext);