// les imports obligatoires
import React from 'react';
import ReactDOM from 'react-dom';
import apikey from './api-key'; // pensez à générer votre clé API

/** api-key.js devrait ressembler à :
 * let apikey = 'VOTRE_API_KEY';
 * export default apikey;
 */

// mon composant principal, qui sera ici le seul composant de l'appli
class FixerUI extends React.Component {
    // besoin d'un constructeur dès qu'on veut utiliser les états
    constructor(props) {
        super(props);
        this.state = {
            montantEntree: 0,
            deviseSortie: 'USD',
            taux: {} // vide, comme ça on peut vérifier si l'appli est prête ou pas
        };

        // appel à l'API
        let xhr = new XMLHttpRequest();
        xhr.onload = () => {
            if (xhr.status === 200) { // le strict minimum : vérifier que l'appel a retourné un HTTP OK
                let rep = JSON.parse(xhr.responseText);
                this.setState({
                    taux: rep.rates
                });
            } else {
                console.log('Erreur :-/');
            }
        };

        xhr.open('GET', 'http://data.fixer.io/api/latest?access_key=' + apikey);
        xhr.send();


        // nécessaire au bon fonctionnement des écouteurs d'événements
        this.handleMontantChange = this.handleMontantChange.bind(this);
        this.handleDeviseSortieChange = this.handleDeviseSortieChange.bind(this);
    }

    // convention : handle + nature de l'action + nom de l'event
    handleMontantChange(e) {
        // la modification de l'état va entraîner un nouveau rendu
        // du coup, l'input aura systématiquement la valeur correspondant à l'état du composant
        this.setState({montantEntree: e.target.value});
    }

    // idem handleMontantChange
    handleDeviseSortieChange(e) {
        this.setState({deviseSortie: e.target.value});
    }

    // fonction de conversion, qui se base sur les états du composant
    convertir() {
        // on va beaucoup piocher dans les états, créons-nous un petit raccourci
        let s = this.state;
        // maintenant, on peut éviter une conversion faite trop tôt
        if (!s.taux) return 0;
        return (s.montantEntree * s.taux[s.deviseSortie]).toFixed(2);
    }

    render() {
        // on calcule le montant converti à chaque nouveau rendu
        // car le rendu ne se redéclenchera que lorsque l'utilisateur modifiera le montant ou la devise
        let montantSortie = this.convertir();
        
        return (
            <div>
                <input type="number" value={this.state.montantEntree} onChange={this.handleMontantChange} />
                <select value={this.state.deviseSortie} onChange={this.handleDeviseSortieChange}>
                    <option value="USD">USD</option>
                    <option value="CAD">CAD</option>
                    <option value="GBP">GBP</option>
                </select>
                <output>{montantSortie}</output>
            </div>
        );
    }
}

ReactDOM.render(
    <FixerUI />,
    document.getElementById('root')
);