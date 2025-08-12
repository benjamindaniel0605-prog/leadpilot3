# LeadPilot SaaS - Next.js

Votre SaaS de génération de leads est maintenant prêt pour le déploiement sur Vercel !

## 🚀 **Statut actuel**

✅ **Complété :**
- Migration vers Next.js App Router
- Configuration Supabase (base de données + authentification)
- Intégration Stripe avec webhooks
- Authentification Google OAuth
- Routes API complètes
- Interface utilisateur de base
- Variables d'environnement configurées

## 📋 **Prochaines étapes**

### 1. **Configuration des variables d'environnement dans Vercel**

Suivez les instructions dans `ENV_SETUP.md` pour ajouter toutes les variables d'environnement dans votre projet Vercel.

### 2. **Configuration Google OAuth**

Dans Google Cloud Console :
- **Origines JavaScript autorisées :** `https://get-leadpilot.vercel.app`
- **URIs de redirection autorisés :** `https://get-leadpilot.vercel.app/api/oauth/google/callback`

### 3. **Configuration Stripe Webhook**

Dans Stripe Dashboard :
- **URL :** `https://get-leadpilot.vercel.app/api/payments/webhook`
- **Événements :** `checkout.session.completed`, `customer.subscription.updated`, `customer.subscription.deleted`, `invoice.payment_succeeded`

## 🔧 **Fonctionnalités disponibles**

### Authentification
- ✅ Connexion avec Google OAuth
- ✅ Gestion des sessions
- ✅ Protection des routes

### Paiements
- ✅ Intégration Stripe complète
- ✅ Webhooks pour les abonnements
- ✅ Gestion des plans utilisateur

### Base de données
- ✅ Schéma complet avec Drizzle ORM
- ✅ Relations entre toutes les tables
- ✅ Prêt pour les migrations

### API Routes
- ✅ `/api/auth/*` - Authentification
- ✅ `/api/oauth/google/*` - OAuth Google
- ✅ `/api/payments/*` - Paiements Stripe
- ✅ `/api/leads/*` - Gestion des leads

## 🎯 **URLs importantes**

- **Application :** `https://get-leadpilot.vercel.app`
- **Page de connexion :** `https://get-leadpilot.vercel.app/login`
- **Dashboard :** `https://get-leadpilot.vercel.app/dashboard`
- **Callback OAuth :** `https://get-leadpilot.vercel.app/api/oauth/google/callback`
- **Webhook Stripe :** `https://get-leadpilot.vercel.app/api/payments/webhook`

## 🛠 **Développement local**

```bash
# Installer les dépendances
npm install

# Démarrer le serveur de développement
npm run dev

# Accéder à l'application
open http://localhost:3000
```

## 📊 **Structure du projet**

```
src/
├── app/
│   ├── api/           # Routes API
│   ├── dashboard/     # Page dashboard
│   ├── login/         # Page de connexion
│   └── page.tsx       # Page d'accueil
├── lib/
│   ├── database.ts    # Configuration Drizzle
│   ├── schema.ts      # Schéma de base de données
│   ├── stripe.ts      # Configuration Stripe
│   └── supabase.ts    # Configuration Supabase
└── middleware.ts      # Middleware d'authentification
```

## 🔄 **Mises à jour futures**

Pour ajouter de nouvelles fonctionnalités :
1. Développez localement
2. Testez avec `npm run dev`
3. Poussez sur GitHub
4. Vercel déploie automatiquement

## 🆘 **Support**

Si vous rencontrez des problèmes :
1. Vérifiez les variables d'environnement dans Vercel
2. Consultez les logs dans Vercel Dashboard
3. Testez les routes API individuellement

---

**🎉 Votre SaaS LeadPilot est maintenant 100% fonctionnel et prêt pour la production !**
