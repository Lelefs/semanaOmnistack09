import React, { useState, useMemo } from 'react';
import api from '../../services/api';

import camera from '../../assets/camera.svg';

import './styles.css';

export default function New({ history }) {
    const [empresa, setEmpresa] = useState('');
    const [techs, setTechs] = useState('');
    const [valor, setValor] = useState('');
    const [imagem, setImagem] = useState(null);

    const preview = useMemo(() => {
        return imagem ? URL.createObjectURL(imagem) : null;
    }, [imagem])

    async function handleSubmit(e) {
        e.preventDefault();

        const data = new FormData();
        const userid = localStorage.getItem('user');
        
        data.append('imagem', imagem);
        data.append('empresa', empresa);
        data.append('techs', techs);
        data.append('valor', valor);

        await api.post('/spots', data, {
            headers: { userid }
        })

        history.push('/dashboard');
    }

    return (
        <form onSubmit={handleSubmit}>
            <label 
                id="imagem" 
                style={{ backgroundImage: `url(${preview})` }}
                className={imagem ? 'tem-imagem' : ''}
            >
                <input type="file" onChange={event => setImagem(event.target.files[0])} />
                <img src={camera} alt="Selecionar imagem" />
            </label>

            <label htmlFor="empresa">EMPRESA *</label>
            <input id="empresa" placeholder="Sua empresa incrível" value={empresa} onChange={event => setEmpresa(event.target.value)} />

            <label htmlFor="techs">TECNOLOGIAS * <span>(separadas por vírgula)</span></label>
            <input id="techs" placeholder="Quais tecnologias usam?" value={techs} onChange={event => setTechs(event.target.value)} />

            <label htmlFor="valor">VALOR DA DIÁRIA * <span>(em branco para GRATUITO)</span></label>
            <input id="valor" placeholder="Valor cobrado por dia" value={valor} onChange={event => setValor(event.target.value)} />

            <button type="submit" className="btn">CADASTRAR</button>
        </form>
    )
}