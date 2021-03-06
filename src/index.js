// les imports obligatoires
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import apikey from './api-key'; // pensez à générer votre clé API

/** api-key.js devrait ressembler à :
 * let apikey = 'VOTRE_API_KEY';
 * export default apikey;
 */

// la liste des devises supportées
// pour bien faire, il faudrait d'ailleurs regrouper ça et l'apikey dans un config.js par exemple
// et penser à le "gitignorer" du coup
const devisesSupportees = {
    USD: 'Dollar américain',
    CAD: 'Dollar canadien',
    JPY: 'Yen',
    GBP: 'Livre sterling',
    NOK: 'Couronne norvégienne',
    BTC: 'Bitcoin'
};


// mon composant principal, qui sera ici le seul composant de l'appli
class FixerUI extends React.Component {
    // besoin d'un constructeur dès qu'on veut utiliser les états
    constructor(props) {
        super(props);
        this.state = {
            statut: 'starting',
            montantEntree: 0,
            deviseSortie: Object.keys(devisesSupportees)[0], // plutôt qu'hardcoder ;-)
            taux: {} // vide, comme ça on peut vérifier si l'appli est prête ou pas
        };

        // le body va avoir pour class le statut de l'application
        document.body.classList.add(this.state.statut);

        // appel à l'API
        let xhr = new XMLHttpRequest();
        xhr.onload = () => {
            let rep;
            if (
                xhr.status === 200 && // le strict minimum : vérifier que l'appel a retourné un HTTP OK
                (rep = JSON.parse(xhr.responseText)).success // on vérifie en plus le flag success qui peut être à false malgré un HTTP OK
            ) { 
                this.setState({
                    statut: 'running',
                    taux: rep.rates
                });
            } else {
                this.setState({
                    statut: 'crashing'
                });
                console.log(rep.error || xhr.status); // si error existe, on le log, sinon c'est une erreur réseau, on log le code HTTP
            }
        };

        xhr.open('GET', 'http://data.fixer.io/api/latest?access_key=' + apikey + '&symbols=' + Object.keys(devisesSupportees).join(','));
        xhr.send();


        // nécessaire au bon fonctionnement des écouteurs d'événements
        this.handleMontantChange = this.handleMontantChange.bind(this);
        this.handleDeviseSortieChange = this.handleDeviseSortieChange.bind(this);
    }

    // on verrouille le "re-rendu" du composant si l'API n'a pas répondu OK
    shouldComponentUpdate(nProps, nState) {
        // on profite de chaque appel pour vérifier s'il faut mettre à jour la class du body
        if (this.state.statut !== nState.statut) document.body.classList.replace(this.state.statut, nState.statut);

        return this.state.statut === 'running' || nState.statut === 'running';
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
        if (s.statut !== 'running') return (0).toFixed(2);
        return (s.montantEntree * s.taux[s.deviseSortie]).toFixed(2);
    }

    render() {
        // on calcule le montant converti à chaque nouveau rendu
        // car le rendu ne se redéclenchera que lorsque l'utilisateur modifiera le montant ou la devise
        let montantSortie = this.convertir();

        
        return (
            <main>
                <h1>FixerUI</h1>
                <form>
                    <input type="number" value={this.state.montantEntree} onChange={this.handleMontantChange} />
                    <select value={this.state.deviseSortie} onChange={this.handleDeviseSortieChange}>
                        {Object.keys(devisesSupportees).map((dev, index) => 
                            <option key={index} value={dev}>{devisesSupportees[dev]}</option>
                        )}
                    </select>
                    <output>{montantSortie}</output>
                </form>
            </main>
        );
    }
}

ReactDOM.render(
    <FixerUI />,
    document.getElementById('root')
);