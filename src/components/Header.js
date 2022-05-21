import { useNavigate, useLocation } from 'react-router-dom';
import styled from 'styled-components';

export default function Header() {

    const navigate = useNavigate();
    const location = useLocation();

    return (
        <TopBar>
            {location.pathname !== "/" ? 
                <ion-icon onClick={()=> navigate(-1)} name="caret-back-circle"></ion-icon> :
                null
            }
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