//to run this file, use the command: npm run dev


"use client";
import Header from '../../components/Header'
import EditorArea from '../../components/EditorArea'
import TranspilationArea from '../../components/TranspilationArea'
import ResponseArea from '../../components/ResponseArea'

import React, { useState } from 'react'

export default function Home() {
  const [transpiledCode, setTranspiledCode] = useState<string>('');
  const [response, setResponse] = useState<string>('');
  
  return (
    <div>
        <Header />
        <div className="table-container">
            <table>
                <tbody>
                    <tr>
                        <td className="half-width">
                          <EditorArea setTranspiledCode={setTranspiledCode} />
                        </td>
                        <td className="half-width">
                          <TranspilationArea transpiledCode={transpiledCode} setResponse={setResponse} />
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <ResponseArea responseText={response} />
    </div>
  )
}
