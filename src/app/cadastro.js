import React from 'react';
import { useRouter } from 'expo-router';
import { useTasks } from '../context/TasksContext';
import { TaskForm } from '../components/TaskForm';

export default function CadastroScreen() {
  const router = useRouter();
  const { adicionarTarefa } = useTasks();

  const handleCadastrar = (dados) => {
    adicionarTarefa(dados);
    router.back();
  };

  return <TaskForm textoBotao="Cadastrar Tarefa" onSubmit={handleCadastrar} />;
}