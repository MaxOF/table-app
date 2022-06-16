import React from 'react';
import './Modal.css'

type PropsType = {
    active: boolean
    setActive: any
    children: React.ReactNode
}


export const Modal = ({active, setActive, children}: PropsType) => {
    return (
        <div className={active ? 'modal active' : 'modal'} onClick={() => setActive(false)}>
            <div className={active ? 'modal__content active' : 'modal__content'} onClick={e => e.stopPropagation()}>
                {active && children}
            </div>
        </div>
    );
};
