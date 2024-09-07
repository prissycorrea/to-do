import { useState } from 'react'
import { Header } from './components/Header'
import './global.css';
import { CreatedTasks } from './components/CreatedTasks';

export function App() {
  return (
    <>
    <Header />
    <CreatedTasks />
    </>
  )
}
