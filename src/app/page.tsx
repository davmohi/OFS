/* 
University: Universidad Nacional
School: Escuela de Informatica
Course: Paradigmas de Programación EIF 400
Semester: 2 Year: 2023
Team 02-1pm 
Members:
Luis Lopez Castro id: 402420889
Anderson Mora Aguero id: 115600170
David Morales Hidalgo id: 116300616
Alberto Aguero Herdocia id: 118450651
Project: OneFlowStream (OFS)
*/
//to run this file, use the command: npm run dev
//app/page.tsx 

"use client";
import Header from '../../components/Header'
import EditorArea from '../../components/EditorArea'
import TranspilationArea from '../../components/TranspilationArea'
import ResponseArea from '../../components/ResponseArea'

import React, { useState } from 'react'
import OtrosProductos from '../../components/buttons/OtherProducts';

export default function Home() {
  const [transpiledCode, setTranspiledCode] = useState<string>('');
  const [response, setResponse] = useState<string>('');
  const [mostrarProductos, setMostrarProductos] = useState<boolean>(false);
  const [fileName, setFileName] = useState<string>('');
  
  const changeWindow = () =>{
    setMostrarProductos(!mostrarProductos);
  }

  return (
    <>
    {!mostrarProductos? (<div>
        <Header changeWindow = {changeWindow}/>
        <div className="table-container">
            <table>
                <tbody>
                    <tr>
                        <td className="half-width">
                          <EditorArea setTranspiledCode={setTranspiledCode} setResponse={setResponse} setFileName={setFileName}/>
                        </td>
                        <td className="half-width">
                          <TranspilationArea transpiledCode={transpiledCode} setResponse={setResponse}  fileName={fileName}/>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <ResponseArea responseText={response} />
    </div>)
    :(<OtrosProductos changeWindow = {changeWindow}/>)}
    </>
  )
}
