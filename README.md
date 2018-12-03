# FixerUI

Cette application React permet de convertir un montant en euros vers une autre devise. Le calcul est instantané et basé sur les taux de change du jour, récupérés via l'API [fixer.io](https://fixer.io/)

Projet bootstrappé avec [Create React App](https://github.com/facebook/create-react-app).

## Choix techniques

Ce projet utilise React (et ReactDOM), tout le reste est vanilla.

## Configuration

Pour faire fonctionner l'application, créez un dossier vide puis dans ce dossier :
```
git clone URL_DE_VOTRE_FORK_OU_DE_CE_REPO .
npm install
```

A ce stade, il ne vous manquera qu'une clé d'API que vous pouvez générer gratuitement sur le site de Fixer. Créez alors le fichier src/api-key.js suivant :
```
let apikey = 'VOTRE_CLE';
export default apikey;
```

De retour dans votre terminal, lancer `npm start` pour tester l'appli et `npm run build` pour compiler l'application dans un dossier `build`.

## Problèmes connus

### Erreur 105 `Access Restricted - Your current Subscription Plan does not support HTTPS Encryption.`

Fixer semble avoir mis en place une politique HSTS. Si vous visitez manuellement une url du sous-domaine `http://data.fixer.io`, votre navigateur "apprendra" la redirection systématique vers HTTPS.

Pour corriger ce problème, lancez l'application en navigation privée ou suivez ce [guide](https://www.thesslstore.com/blog/clear-hsts-settings-chrome-firefox/) pour effacer le HSTS de Fixer.

## Licence

Ce code est libre de droit, vous pouvez le copier, le modifier, vous l'approprier et tenter de faire fortune avec. Les licences propres aux technologies et modules NPM utilisés s'appliquent.
