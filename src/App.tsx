import { createContext, useEffect, useState } from 'react';
import { Jeton, Ligne } from './components';

// export const contexte = createContext<T_couleurJeton[] | undefined>(undefined);

type T_couleurJeton = {
  nom: string;
  code: string;
  toucheLiee?: string;
};

function App() {
  /* ------------------------------- Constantes ------------------------------- */
  const largeurLignes = 4;
  const couleursJetons = [
    { nom: 'vide', code: '#FFFFFF' },
    { nom: 'rouge', code: '#FF0000', toucheLiee: 'a' },
    { nom: 'bleu', code: '#0000FF', toucheLiee: 'z' },
    { nom: 'vert', code: '#00FF00', toucheLiee: 'e' },
    { nom: 'jaune', code: '#FFFF00', toucheLiee: 'r' },
    { nom: 'orange', code: '#FFA500', toucheLiee: 'q' },
    { nom: 'violet', code: '#800080', toucheLiee: 's' },
    { nom: 'rose', code: '#FFC0CB', toucheLiee: 'd' },
    { nom: 'marron', code: '#A52A2A', toucheLiee: 'f' },
  ];
  const [grille, setGrille] = useState<number[][]>([
    [8, 1, 5, 3],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
  ]);

  /* -------------------------------- Variables ------------------------------- */
  const [ligneCourante, setLigneCourante] = useState<number>(1);
  const [colonneCourante, setColonneCourante] = useState<number>(0);
  const [message, setMessage] = useState<string>('');

  /* -------------------------------- Fonction -------------------------------- */
  const validationLigne = () => {
    // Validation uniquement si la ligne est complète
    if (!grille[ligneCourante].includes(0)) {
      setLigneCourante(ligneCourante + 1);
    } else {
      setMessage("La ligne n'est pas complète");
    }
  };
  const changementCouleur = (couleur: T_couleurJeton, indexCouleur: number) => {
    // Verification presence doublon
    const indexDoublon = grille[ligneCourante].indexOf(indexCouleur);

    const nouvelleGrille = [...grille];
    nouvelleGrille[ligneCourante][colonneCourante] = indexCouleur;

    // On retire le doublon s il y en a
    if (indexDoublon !== -1) {
      nouvelleGrille[ligneCourante][indexDoublon] = 0;
    }

    setGrille(nouvelleGrille);
  };

  const handleKeyPress = (event: KeyboardEvent) => {
    if (event.key === 'ArrowRight') {
      // Fleche droite --> deplacement vers la droite
      if (colonneCourante < largeurLignes - 1) {
        setColonneCourante(colonneCourante + 1);
      }
    } else if (event.key === 'ArrowLeft') {
      // Fleche gauche --> deplacement vers la gauche
      if (colonneCourante > 0) {
        setColonneCourante(colonneCourante - 1);
      }
    }

    if (event.key === 'Enter') {
      // Touche entrée --> déplacement vers la ligne suivante
      validationLigne();
    }

    couleursJetons.forEach((couleur, index) => {
      if (event.key === couleur.toucheLiee) {
        // Touche correspondant à une couleur --> changement de la couleur dans la grille
        changementCouleur(couleur, index);
      }
    });
  };

  useEffect(() => {
    // Ajoute l'écouteur d'événements lors de l'initialisation du composant
    window.addEventListener('keydown', handleKeyPress);

    // Retire l'écouteur d'événements lors du démontage du composant
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [ligneCourante, colonneCourante]);

  useEffect(() => {
    // timeout de 5 secondes avant d'effacer
    setTimeout(() => {
      setMessage('');
    }, 4000);
  }, [message]);

  return (
    <div className="App">
      {/* <contexte.Provider value={couleursJetons}> */}
      <header></header>
      <main>
        <section className="grille">
          {grille.map((ligne, indexLigne) => (
            <Ligne
              jetons={ligne}
              jetonSelectionne={indexLigne === ligneCourante ? colonneCourante : undefined}
              key={indexLigne}
            />
          ))}
        </section>
        <section className="selectionCouleurs">
          {couleursJetons
            .filter((couleur, index) => index !== 0)
            .map((couleur, index) => (
              <Jeton codeCouleur={couleur.code} selectionne={false} lettre={couleur.toucheLiee} key={index} />
            ))}
        </section>
        <p className="message">{message}</p>
      </main>
      <footer></footer>
      {/* </contexte.Provider> */}
    </div>
  );
}

export default App;
