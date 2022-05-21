import styled from 'styled-components';

export default function Header() {
    return (
        <TopBar>
            <h1>CINEFLEX</h1>
        </TopBar>
    );
}

const TopBar = styled.div`
    background-color: #C3CFD9;
    height: 67px;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;

        h1 {
            color: #E8833A;
            font-size: 34px;
        }
`