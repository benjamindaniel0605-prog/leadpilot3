# LeadPilot SaaS

Plateforme de génération de leads qualifiés avec IA et intégration Apollo.io

## 🚀 Démarrage rapide

```bash
# Installer les dépendances
npm install

# Configurer les variables d'environnement
cp env.example .env.local
# Éditer .env.local avec vos clés API

# Démarrer le serveur de développement
npm run dev

# Ouvrir http://localhost:3000
```

## 🔑 Configuration requise

- **Supabase** : URL et clé anonyme
- **Apollo.io** : Clé API pour la génération de leads
- **Stripe** : Clés publiques et secrètes pour les paiements

## 🧪 Tests de l'API

### Test manuel rapide

```bash
# Démarrer le serveur
npm run dev

# Dans un autre terminal, tester l'API
npm run leads:smoke
```

Le script `leads:smoke` teste l'API avec différents scénarios :
- Technologie + France + 1-10 employés
- Informatique + Paris + 11-50 employés  
- Finance + Lyon + 51-200 employés

### Test manuel avec curl

```bash
# Test basique
curl -X POST http://localhost:3000/api/leads/generate \
  -H "Content-Type: application/json" \
  -d '{
    "sector": "Technologie",
    "companySize": "1-10 employés",
    "location": "France",
    "numberOfLeads": 1,
    "targetPositions": "CEO,CTO"
  }'
```

## 📊 Fonctionnalités

- **Génération intelligente** : IA scoring des prospects
- **Relaxation automatique** : Assouplissement des filtres si 0 résultat
- **Normalisation FR→EN** : Mapping automatique des secteurs français
- **Fallback multi-villes** : Test automatique des villes françaises
- **Logs structurés** : Observabilité complète des requêtes

## 🔧 Architecture

- **Next.js 14** avec App Router
- **Supabase** pour l'auth et la DB
- **Drizzle ORM** pour la gestion des données
- **Apollo.io** comme provider de leads
- **Stripe** pour les paiements

## 📝 Logs et Debugging

L'API génère des logs structurés pour chaque étape :
- Payload reçu et normalisé
- Requêtes Apollo avec critères
- Réponses et nombre de prospects
- Tentatives de relaxation des filtres
- Scores IA et qualification

## 🚨 Gestion d'erreurs

L'API retourne des raisons précises pour chaque échec :
- `MISSING_API_KEY:APOLLO` : Clé manquante
- `NO_MATCHES_FROM_PROVIDER` : Aucun prospect trouvé
- `TOO_STRICT_FILTERS:ai_score` : Filtres trop restrictifs
- `UNAUTHORIZED` : Session expirée

## 📈 Déploiement

```bash
# Build de production
npm run build

# Déploiement Vercel
vercel --prod
```

## 🤝 Support

Pour toute question ou problème :
1. Vérifier les logs Vercel
2. Tester avec `npm run leads:smoke`
3. Vérifier la configuration des clés API
