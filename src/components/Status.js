import styled from 'styled-components';

export default function Status({ children }) {
    return (
        <StatusMessage>
            { children }
        </StatusMessage>
    );
}

const StatusMessage = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 24px;
    height: 100px;
`