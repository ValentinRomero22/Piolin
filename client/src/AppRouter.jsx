import React from 'react'
import { Routes, Route, Navigate } from "react-router-dom"
import { Header } from './components/Header'
import { Home } from './pages/Home'

export const AppRouter = () => {
    return (
        <Routes>
            <Route path='/' element={<Header />}>
                <Route index element={<Home />} />
            </Route>
            <Route path='*' element={<Navigate to='/' />} />
        </Routes>
    )
}