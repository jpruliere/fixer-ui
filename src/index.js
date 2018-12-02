// les imports obligatoires
import React from 'react';
import ReactDOM from 'react-dom';

// mon composant principal, qui sera ici le seul composant de l'appli
class FixerUI extends React.Component {
    render() {
        return (
            <div>
                <input type="number" />
                <select>
                    <option value="USD">USD</option>
                    <option value="CAD">CAD</option>
                    <option value="GBP">GBP</option>
                </select>
                <output>42</output>
            </div>
        );
    }
}

ReactDOM.render(
    <FixerUI />,
    document.getElementById('root')
);