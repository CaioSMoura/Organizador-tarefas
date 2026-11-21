import React from 'react';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { TasksProvider } from '../context/TasksContext';

export default function RootLayout() {
  return (
    <TasksProvider>
      <StatusBar style="dark" />
      <Stack
        screenOptions={{
          headerStyle: { backgroundColor: '#FFFFFF' },
          headerTintColor: '#0F172A',
          headerTitleStyle: { fontWeight: 'bold' },
          contentStyle: { backgroundColor: '#F1F5F9' },
        }}
      >
        <Stack.Screen name="index" options={{ title: 'Organizador de Tarefas' }} />
        <Stack.Screen name="cadastro" options={{ title: 'Nova Tarefa' }} />
        <Stack.Screen name="detalhes/[id]" options={{ title: 'Detalhes da Tarefa' }} />
        <Stack.Screen name="editar/[id]" options={{ title: 'Editar Tarefa' }} />
      </Stack>
    </TasksProvider>
  );
}