import style from 'styled-components';

const ToolbarStyle = style.div`
position: absolute;
right: 10;
bottom: 5vh;
left: 0;
width: 8vh;
height: 90%;
margin: auto;
padding: 20px;
background-color: rgba(220, 220, 220, 0.3);
border-top-left-radius: 15px;
border-top-right-radius: 15px;
border-bottom-right-radius: 15px;
border-bottom-left-radius: 15px;
box-shadow: 0 5px 20px rgba(0, 0, 0, 0.3);
`;

export { ToolbarStyle };
