// ChargeButton.tsx
import React, { useState } from 'react';

const ChargeButton: React.FC<{ inputValue: string, setEditorContent: (content: string) => void }> = ({ inputValue, setEditorContent }) => {
  const [loading, setLoading] = useState(false);

  const handleChargeClick = async () => {
    !inputValue
    ?alert('El ID es requerido')
    :(async()=>{
      try {
        const response = await fetch(`/api/script/${inputValue}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          }
        });
        !response.ok
        ?alert('No se pudo encontrar el script')
        :(async () => {
          const data = await response.json();
          setEditorContent(data.content);
        })()
      } catch (error) {
        console.error("Error al cargar", error);
      } finally {
        setLoading(false);
      }
    })()



    /*
    if (!inputValue) {
      alert('El ID es requerido');
      return;
    }
    setLoading(true);

    try {
      const response = await fetch(`/api/script/${inputValue}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      if (!response.ok) {
        alert('No se pudo encontrar el script')
      }
      else {
        const data = await response.json()
        setEditorContent(data.content);
      }
    } catch (error) {
      console.error("Error al cargar", error);
    } finally {
      setLoading(false);
    }*/
  };

  return (
    <div>
      <button onClick={handleChargeClick} title="Cargar" >
        <img src="/cargar.svg" alt="Cargar" />
      </button>
     
    </div>
  );
};

export default ChargeButton;
