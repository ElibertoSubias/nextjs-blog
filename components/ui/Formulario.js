import styled from '@emotion/styled';

export const Formulario = styled.form`
    width: 100%;
    padding-bottom: 5rem;
    font-size: 12px;

    fieldset {
        margin: 2rem 0;
        border: 1px solid #e1e1e1;
        font-size: 2rem;
        /* padding: 2rem; */
    }
`;

export const Campo = styled.div`
    margin-bottom: 2rem;
    display: flex;
    @media screen and (max-width: 800px){
        display: block;
        label {
            display:block;
            font-size: 12px !important;
        }
        input {
            width: 100%;
            font-size: 12px;
        }
    }
    align-items: center;

    label {
        flex: 0 0 100px;
        font-size: 1.8rem;
        font-weight: 600;
    }

    input, textarea {
        flex: 1;
        padding: 1rem;
        border: 1px solid var(--gris3);
    }

    textarea {
        height: 400px;
    }
`;

export const InputSubmit = styled.input`
    background-color: var(--naranja);
    width: 100%;
    padding: 1.5rem;
    text-align: center;
    color: #FFF;
    font-size: 18px;
    border-radius: 5px;
    border: none;
    font-family: 'PT Sans', sans-serif;
    font-weight: 700;

    &:hover {
        cursor: pointer;
    }
`;

export const Error = styled.p`
    font-family: 'PT Sans', sans-serif;
    font-weight: 700;
    font-size: 2rem;
    color: red;
    margin: 0;
`;