# 🔧 Guide de Configuration Google OAuth - Correction

## ❌ Problème actuel
L'erreur "Accès bloqué : erreur d'autorisation" indique que l'application LeadPilot n'est pas correctement configurée dans Google Cloud Console.

## ✅ Solution

### 1. **Configuration Google Cloud Console**

1. **Aller sur [Google Cloud Console](https://console.cloud.google.com/)**
2. **Sélectionner votre projet** ou en créer un nouveau
3. **Activer l'API Google+** :
   - Menu → APIs & Services → Library
   - Rechercher "Google+ API" et l'activer

### 2. **Créer les identifiants OAuth**

1. **Menu → APIs & Services → Credentials**
2. **Cliquer sur "Create Credentials" → "OAuth 2.0 Client IDs"**
3. **Configurer l'application** :
   - **Application type** : "Web application"
   - **Name** : "LeadPilot"
   - **Authorized JavaScript origins** :
     ```
     http://localhost:3000
     https://get-leadpilot.vercel.app
     ```
   - **Authorized redirect URIs** :
     ```
     http://localhost:3000/api/oauth/google/callback
     https://get-leadpilot.vercel.app/api/oauth/google/callback
     ```

### 3. **Variables d'environnement**

Ajouter dans votre `.env.local` :
```env
GOOGLE_CLIENT_ID=votre_client_id_ici
GOOGLE_CLIENT_SECRET=votre_client_secret_ici
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

### 4. **Mode développement vs Production**

**Pour le développement local** :
- Utiliser `http://localhost:3000` dans les URIs autorisés
- `NEXT_PUBLIC_SITE_URL=http://localhost:3000`

**Pour la production Vercel** :
- Utiliser `https://get-leadpilot.vercel.app` dans les URIs autorisés
- `NEXT_PUBLIC_SITE_URL=https://get-leadpilot.vercel.app`

### 5. **Test de la configuration**

1. **Redémarrer le serveur de développement** :
   ```bash
   npm run dev
   ```

2. **Tester l'OAuth** :
   - Aller sur `/settings`
   - Cliquer sur "Connecter avec Google"
   - Vérifier que la redirection fonctionne

## 🔄 Corrections apportées

### **Scopes simplifiés**
- Retiré `gmail.send` (nécessite une validation Google)
- Gardé seulement `userinfo.email` et `userinfo.profile`

### **Mode d'accès**
- Changé de `offline` à `online` pour éviter les problèmes de consentement

### **Quotas corrigés**
- API `/api/user/quotas` maintenant retourne la structure attendue
- Les quotas reflètent maintenant l'utilisation réelle des leads

## 📝 Notes importantes

1. **Pour l'envoi d'emails Gmail** : Il faudra plus tard demander la validation Google pour le scope `gmail.send`
2. **Pour le développement** : Les scopes actuels permettent de récupérer les infos utilisateur
3. **Quotas** : Maintenant mis à jour en temps réel depuis la base de données

## 🚀 Prochaines étapes

1. **Configurer Google Cloud Console** selon ce guide
2. **Tester l'OAuth** en local
3. **Déployer sur Vercel** avec les bonnes variables d'environnement
4. **Plus tard** : Demander la validation Google pour Gmail API
