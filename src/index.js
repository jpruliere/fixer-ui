// les imports obligatoires
import React from 'react';
import ReactDOM from 'react-dom';

// mon composant principal, qui sera ici le seul composant de l'appli
class FixerUI extends React.Component {
    // besoin d'un constructeur dès qu'on veut utiliser les états
    constructor(props) {
        super(props);
        this.state = {
            montantEntree: 0,
            deviseSortie: 'USD'
        };
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
        return (s.montantEntree * 2.34567).toFixed(2);
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