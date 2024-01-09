import { Jeton } from './';

interface LigneProps {
  jetons: number[];
  jetonSelectionne?: number;
}

function Ligne(props: LigneProps) {
  const couleursJetons = [
    { nom: 'vide', code: '#FFFFFF' },
    { nom: 'rouge', code: '#FF0000' },
    { nom: 'bleu', code: '#0000FF' },
    { nom: 'vert', code: '#00FF00' },
    { nom: 'jaune', code: '#FFFF00' },
    { nom: 'orange', code: '#FFA500' },
    { nom: 'violet', code: '#800080' },
    { nom: 'rose', code: '#FFC0CB' },
    { nom: 'marron', code: '#A52A2A' },
  ];

  return (
    <div
      style={{
        display: 'flex',
      }}
    >
      {props.jetons.map((jeton, index) => {
        return (
          <Jeton
            codeCouleur={couleursJetons[jeton].code}
            key={index}
            selectionne={props.jetonSelectionne === index}
          />
        );
      })}
    </div>
  );
}

export default Ligne;
