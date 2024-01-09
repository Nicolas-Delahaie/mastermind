import { useContext } from 'react';
// import { contexte } from '../App';

interface JetonProps {
  codeCouleur: string;
  selectionne?: boolean;
  lettre?: string;
}

function Jeton(props: JetonProps) {
  const largeur = 40;

  const style: React.CSSProperties = {
    backgroundColor: props.codeCouleur,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontWeight: 'bold',
    fontSize: 25,
    width: largeur,
    height: largeur,
    borderRadius: '50%',
    border: '2px solid black',
    boxShadow: props.selectionne ? '4px 4px 6px rgba(0, 0, 0, 1)' : '',
  };

  return <div style={style}>{props.lettre}</div>;
}

export default Jeton;
