# Instructions pour la Configuration Email des Réservations

## ✅ Solution Actuelle (Mailto - Fonctionne immédiatement)

Le formulaire de réservation est actuellement configuré pour ouvrir le client de messagerie de l'utilisateur avec un email pré-rempli envoyé à **skepilaser@gmail.com**.

**Fonctionnement :**
- L'utilisateur remplit le formulaire et clique sur "Confirmer la réservation"
- Son client de messagerie (Gmail, Outlook, etc.) s'ouvre automatiquement
- L'email est pré-rempli avec toutes les informations de réservation
- L'utilisateur doit cliquer sur "Envoyer" dans son client de messagerie

**Avantages :**
- ✅ Fonctionne immédiatement, pas de configuration nécessaire
- ✅ Aucun service tiers requis
- ✅ Simple et direct

**Inconvénients :**
- ⚠️ Nécessite que l'utilisateur ait un client de messagerie configuré
- ⚠️ L'utilisateur doit manuellement envoyer l'email

---

## 🚀 Solution Recommandée : Service Email Professionnel

Pour un système plus professionnel qui envoie automatiquement les emails sans intervention de l'utilisateur, vous avez plusieurs options :

### Option 1 : Formspree (Recommandé - Le Plus Simple)

1. Allez sur https://formspree.io/
2. Créez un compte gratuit
3. Créez un nouveau formulaire
4. Ajoutez votre email : **skepilaser@gmail.com**
5. Copiez l'URL du formulaire (ex: https://formspree.io/f/YOUR_FORM_ID)
6. Remplacez la fonction de soumission dans `script.js` avec cette URL

**Limite gratuite :** 50 soumissions/mois

### Option 2 : EmailJS (Gratuit jusqu'à 200 emails/mois)

1. Allez sur https://www.emailjs.com/
2. Créez un compte gratuit
3. Créez un service email (Gmail, Outlook, etc.)
4. Créez un template d'email
5. Configurez les variables dans `script.js`

**Avantages :**
- Envoi automatique
- Pas de redirection nécessaire
- Interface utilisateur plus fluide

### Option 3 : Backend Simple (Netlify Functions, Vercel, etc.)

Si vous hébergez sur Netlify ou Vercel, vous pouvez créer une fonction serveur simple pour envoyer les emails.

---

## 📧 Email de Destination Configuré

**Email :** skepilaser@gmail.com

Cet email est déjà configuré dans le code et recevra toutes les demandes de réservation.

---

## 🔧 Pour Mettre à Jour vers une Solution Automatique

Contactez votre développeur pour :
1. Intégrer Formspree ou EmailJS
2. Ou créer un backend personnalisé
3. Tester que les emails arrivent bien à skepilaser@gmail.com

---

## 📝 Format de l'Email Reçu

Lorsqu'une réservation est effectuée, vous recevrez un email avec :
- Nom complet du client
- Email du client
- Numéro de téléphone
- Date et heure de la consultation souhaitée
- Toutes les informations nécessaires pour confirmer le rendez-vous

