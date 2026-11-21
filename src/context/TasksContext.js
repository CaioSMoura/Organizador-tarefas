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

  const adicionarTarefa = ({ titulo, descricao, categoria, prioridade, dataVencimento }) => {
    const novaTarefa = {
      id: `${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      titulo: titulo.trim(),
      descricao: descricao ? descricao.trim() : '',
      categoria: categoria.trim() || 'Geral',
      prioridade,
      dataVencimento: dataVencimento.trim() || 'Sem data',
      concluida: false,
    };

    setTarefas((prevTarefas) => [novaTarefa, ...prevTarefas]);
  };

  const editarTarefa = (id, dadosAtualizados) => {
    setTarefas((prevTarefas) =>
      prevTarefas.map((tarefa) =>
        tarefa.id === id ? { ...tarefa, ...dadosAtualizados } : tarefa
      )
    );
  };

  const alternarStatusTarefa = (id) => {
    setTarefas((prevTarefas) =>
      prevTarefas.map((tarefa) =>
        tarefa.id === id ? { ...tarefa, concluida: !tarefa.concluida } : tarefa
      )
    );
  };

  const removerTarefa = (id) => {
    setTarefas((prevTarefas) => prevTarefas.filter((tarefa) => tarefa.id !== id));
  };

  const buscarTarefaPorId = (id) => tarefas.find((tarefa) => tarefa.id === id);

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
