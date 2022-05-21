import styled from 'styled-components';

export default function Footer({ children }) {
    return (
        <SessionDetails>
            {children}
        </SessionDetails>
    );
}

const SessionDetails = styled.div`
    display: flex;
    justify-content: center;
    background-color: #DFE6ED;
    height: 115px;
    border: 1px solid #9EADBA;
    width: 100%;
    position: fixed;
    bottom: 0;
    left: 0;
    box-sizing: border-box;
`