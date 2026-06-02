import { useState } from 'react'

export function ButtonApply () {
    const [aplicado, setAplicado] = useState(false);
    const text = aplicado ? '¡Aplicado!' : 'Aplicar';
    function handleClick(event) {
        const element = event.target
        if (element.classList.contains('button-apply-job')) {
            setAplicado(true)
        }
    }
    return (
        <button 
            className={aplicado ? 'button-apply-job is-applied' : 'button-apply-job'}
            disabled={aplicado}
            onClick={handleClick}
        >{text}</button>
    )
}

export default ButtonApply