import { useState } from 'react'
import { Header } from './components/Header'
import './global.css';
import { Input } from './components/Input';
import { CreatedTasks } from './components/CreatedTasks';

export function App() {
  return (
    <>
    <Header />
    <Input />
    <CreatedTasks />
    </>
  )
}
