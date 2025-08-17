export interface EmailTemplate {
  id: string
  name: string
  category: string
  plan: 'free' | 'starter' | 'pro' | 'growth'
  subject: string
  body: string
  description: string
  timesUsed: number
  openRate: number
  tags: string[]
}

export const emailTemplates: EmailTemplate[] = [
  // FREE TEMPLATES (1/30)
  {
    id: 'intro-simple',
    name: 'Introduction Simple',
    category: 'Introduction',
    plan: 'free',
    subject: 'Bonjour [PRENOM] - Une solution pour [ENTREPRISE]',
    body: `Bonjour [PRENOM],

Je me permets de vous contacter car je pense que [ENTREPRISE] pourrait être intéressée par notre solution.

Nous aidons les entreprises comme la vôtre à [BENEFICE_PRINCIPAL].

Seriez-vous disponible pour un échange de 15 minutes cette semaine ?

Cordialement,
[EXPEDITEUR]`,
    description: 'Template simple pour une première prise de contact',
    timesUsed: 4,
    openRate: 0,
    tags: ['introduction', 'simple']
  },

  // STARTER TEMPLATES (5/30)
  {
    id: 'intro-personnalisee',
    name: 'Introduction Personnalisée',
    category: 'Introduction',
    plan: 'starter',
    subject: '[PRENOM], j\'ai remarqué [DETAIL_ENTREPRISE]',
    body: `Bonjour [PRENOM],

J\'ai remarqué que [ENTREPRISE] [DETAIL_ENTREPRISE] et je pense que notre solution pourrait vous intéresser.

Nous avons aidé [NOMBRE] entreprises similaires à [BENEFICE_CONCRET].

Auriez-vous 15 minutes pour discuter de vos besoins ?

Cordialement,
[EXPEDITEUR]`,
    description: 'Introduction avec personnalisation basée sur l\'entreprise',
    timesUsed: 12,
    openRate: 78,
    tags: ['introduction', 'personnalisée']
  },
  {
    id: 'offre-speciale',
    name: 'Offre Spéciale',
    category: 'Commercial',
    plan: 'starter',
    subject: 'Offre exclusive pour [ENTREPRISE] - [POURCENTAGE]% de réduction',
    body: `Bonjour [PRENOM],

J\'ai préparé une offre exclusive pour [ENTREPRISE] : [POURCENTAGE]% de réduction sur notre solution [NOM_SOLUTION].

Cette offre est valable jusqu\'au [DATE_LIMITE].

Voulez-vous en discuter ?

Cordialement,
[EXPEDITEUR]`,
    description: 'Template pour promouvoir une offre ou une promotion',
    timesUsed: 8,
    openRate: 82,
    tags: ['commercial', 'offre']
  },
  {
    id: 'suivi-relance',
    name: 'Suivi et Relance',
    category: 'Suivi',
    plan: 'starter',
    subject: 'Re: [SUJET_PRECEDENT] - Un petit rappel',
    body: `Bonjour [PRENOM],

Je me permets de revenir vers vous concernant [SUJET_PRECEDENT].

Avez-vous eu le temps de réfléchir à notre proposition ?

Je reste à votre disposition pour toute question.

Cordialement,
[EXPEDITEUR]`,
    description: 'Template pour relancer un prospect après un premier contact',
    timesUsed: 15,
    openRate: 65,
    tags: ['suivi', 'relance']
  },
  {
    id: 'newsletter-basique',
    name: 'Newsletter Basique',
    category: 'Newsletter',
    plan: 'starter',
    subject: '[MOIS] - Newsletter [ENTREPRISE]',
    body: `Bonjour [PRENOM],

Voici notre newsletter de [MOIS] :

📊 [STATISTIQUE_IMPORTANTE]
💡 [CONSEIL_PRATIQUE]
🎯 [ACTUALITE_SECTEUR]

N\'hésitez pas à me contacter pour plus d\'informations.

Cordialement,
[EXPEDITEUR]`,
    description: 'Template simple pour newsletters mensuelles',
    timesUsed: 6,
    openRate: 45,
    tags: ['newsletter', 'mensuel']
  },
  {
    id: 'presentation-entreprise',
    name: 'Présentation Entreprise',
    category: 'Présentation',
    plan: 'starter',
    subject: 'Découvrez [VOTRE_ENTREPRISE] - [VOTRE_VALEUR_AJOUTEE]',
    body: `Bonjour [PRENOM],

Je vous présente [VOTRE_ENTREPRISE], spécialisée dans [DOMAINE_EXPERTISE].

Nous aidons les entreprises à [BENEFICE_PRINCIPAL] grâce à [VOTRE_SOLUTION].

Nos clients témoignent : "[TEMOIGNAGE_CLIENT]"

Souhaitez-vous en savoir plus ?

Cordialement,
[EXPEDITEUR]`,
    description: 'Template pour présenter votre entreprise et vos services',
    timesUsed: 12,
    openRate: 78,
    tags: ['présentation', 'entreprise']
  },

  // PRO TEMPLATES (15/30) - Ajoutons 10 templates supplémentaires
  {
    id: 'introduction-avancee',
    name: 'Introduction Avancée',
    category: 'Introduction',
    plan: 'pro',
    subject: '[PRENOM], comment [ENTREPRISE] peut [BENEFICE_SPECIFIQUE]',
    body: `Bonjour [PRENOM],

Après avoir analysé [ENTREPRISE], j\'ai identifié que vous pourriez [BENEFICE_SPECIFIQUE] grâce à notre solution.

Nous avons déjà aidé [NOMBRE] entreprises dans votre secteur à [RESULTAT_CONCRET].

Puis-je vous présenter comment nous pourrions vous accompagner ?

Cordialement,
[EXPEDITEUR]`,
    description: 'Introduction sophistiquée avec analyse préalable',
    timesUsed: 25,
    openRate: 89,
    tags: ['introduction', 'avancée', 'analyse']
  },
  {
    id: 'proposition-valeur',
    name: 'Proposition de Valeur',
    category: 'Commercial',
    plan: 'pro',
    subject: 'Proposition de valeur pour [ENTREPRISE] - [ROI_ATTENDU]',
    body: `Bonjour [PRENOM],

J\'ai préparé une proposition de valeur spécifique pour [ENTREPRISE] :

🎯 Problème identifié : [PROBLEME]
💡 Solution proposée : [SOLUTION]
📈 ROI attendu : [ROI_ATTENDU]
⏱️ Délai de mise en place : [DELAI]

Souhaitez-vous en discuter ?

Cordialement,
[EXPEDITEUR]`,
    description: 'Template avec proposition de valeur détaillée',
    timesUsed: 18,
    openRate: 92,
    tags: ['commercial', 'proposition', 'valeur']
  },
  {
    id: 'webinar-invitation',
    name: 'Invitation Webinar',
    category: 'Événement',
    plan: 'pro',
    subject: 'Webinar exclusif : [SUJET_WEBINAR] - [DATE]',
    body: `Bonjour [PRENOM],

Je vous invite à notre webinar exclusif "[SUJET_WEBINAR]" le [DATE] à [HEURE].

Au programme :
• [POINT_1]
• [POINT_2]
• [POINT_3]

Inscription gratuite : [LIEN_INSCRIPTION]

À bientôt !
[EXPEDITEUR]`,
    description: 'Template pour inviter à un webinar ou événement',
    timesUsed: 32,
    openRate: 76,
    tags: ['événement', 'webinar', 'invitation']
  },
  {
    id: 'case-study',
    name: 'Case Study',
    category: 'Social Proof',
    plan: 'pro',
    subject: 'Comment [CLIENT_TEMOIN] a [RESULTAT_OBTENU]',
    body: `Bonjour [PRENOM],

Je partage avec vous le cas de [CLIENT_TEMOIN] qui a [RESULTAT_OBTENU] grâce à notre solution.

Avant : [SITUATION_AVANT]
Après : [SITUATION_APRES]
Résultat : [RESULTAT_QUANTIFIE]

Pensez-vous que cela pourrait intéresser [ENTREPRISE] ?

Cordialement,
[EXPEDITEUR]`,
    description: 'Template pour partager un cas d\'usage client',
    timesUsed: 14,
    openRate: 88,
    tags: ['social proof', 'case study', 'témoignage']
  },
  {
    id: 'newsletter-avancee',
    name: 'Newsletter Avancée',
    category: 'Newsletter',
    plan: 'pro',
    subject: '[MOIS] - [NOMBRE] insights pour [ENTREPRISE]',
    body: `Bonjour [PRENOM],

Voici [NOMBRE] insights pour [ENTREPRISE] ce [MOIS] :

📊 [STATISTIQUE_1]
💡 [CONSEIL_1]
🎯 [ACTUALITE_1]

📊 [STATISTIQUE_2]
💡 [CONSEIL_2]
🎯 [ACTUALITE_2]

📊 [STATISTIQUE_3]
💡 [CONSEIL_3]
🎯 [ACTUALITE_3]

Bonne lecture !
[EXPEDITEUR]`,
    description: 'Newsletter détaillée avec multiples insights',
    timesUsed: 22,
    openRate: 67,
    tags: ['newsletter', 'avancée', 'insights']
  },
  {
    id: 'relance-creative',
    name: 'Relance Créative',
    category: 'Suivi',
    plan: 'pro',
    subject: 'Re: [SUJET_PRECEDENT] - Une idée pour [ENTREPRISE]',
    body: `Bonjour [PRENOM],

J\'ai pensé à vous en lisant cet article sur [SUJET_ACTUALITE].

Cela m\'a rappelé notre discussion sur [SUJET_PRECEDENT] et j\'ai une idée pour [ENTREPRISE].

Auriez-vous 10 minutes pour en discuter ?

Cordialement,
[EXPEDITEUR]`,
    description: 'Relance créative basée sur l\'actualité',
    timesUsed: 19,
    openRate: 71,
    tags: ['suivi', 'relance', 'créative']
  },
  {
    id: 'partenariat',
    name: 'Proposition Partenariat',
    category: 'Partenariat',
    plan: 'pro',
    subject: 'Partenariat [VOTRE_ENTREPRISE] x [ENTREPRISE] - Opportunité [SECTEUR]',
    body: `Bonjour [PRENOM],

Je vous contacte pour explorer une opportunité de partenariat entre [VOTRE_ENTREPRISE] et [ENTREPRISE].

Notre expertise en [DOMAINE_1] + votre positionnement en [DOMAINE_2] = [VALEUR_AJOUTEE].

Puis-je vous présenter notre proposition ?

Cordialement,
[EXPEDITEUR]`,
    description: 'Template pour proposer un partenariat',
    timesUsed: 8,
    openRate: 83,
    tags: ['partenariat', 'opportunité', 'collaboration']
  },
  {
    id: 'feedback-request',
    name: 'Demande de Feedback',
    category: 'Feedback',
    plan: 'pro',
    subject: 'Votre avis sur [PRODUIT_SERVICE] - 2 minutes',
    body: `Bonjour [PRENOM],

J\'espère que [PRODUIT_SERVICE] vous donne satisfaction.

Pourriez-vous prendre 2 minutes pour me donner votre avis ?

Cela m\'aiderait à améliorer notre service.

Merci d\'avance !
[EXPEDITEUR]`,
    description: 'Template pour demander un feedback client',
    timesUsed: 45,
    openRate: 58,
    tags: ['feedback', 'satisfaction', 'amélioration']
  },
  {
    id: 'anniversary',
    name: 'Anniversaire Client',
    category: 'Fidélisation',
    plan: 'pro',
    subject: 'Félicitations [PRENOM] ! [ENTREPRISE] fête ses [NOMBRE] ans',
    body: `Bonjour [PRENOM],

Félicitations ! [ENTREPRISE] fête ses [NOMBRE] ans cette année.

C\'est un moment spécial et nous sommes fiers de vous accompagner depuis [DUREE].

Pour célébrer, nous vous offrons [OFFRE_SPECIALE].

À bientôt !
[EXPEDITEUR]`,
    description: 'Template pour célébrer l\'anniversaire d\'un client',
    timesUsed: 12,
    openRate: 94,
    tags: ['fidélisation', 'anniversaire', 'célébration']
  },
  {
    id: 'seasonal-promo',
    name: 'Promotion Saisonnière',
    category: 'Commercial',
    plan: 'pro',
    subject: '[SAISON] - Offre spéciale [POURCENTAGE]% pour [ENTREPRISE]',
    body: `Bonjour [PRENOM],

Pour célébrer [SAISON], nous proposons une offre spéciale de [POURCENTAGE]% à nos clients fidèles.

Cette offre est valable jusqu\'au [DATE_LIMITE] et inclut [AVANTAGES].

Voulez-vous en profiter ?

Cordialement,
[EXPEDITEUR]`,
    description: 'Template pour promotions saisonnières',
    timesUsed: 28,
    openRate: 79,
    tags: ['commercial', 'promotion', 'saisonnière']
  },

  // GROWTH TEMPLATES (30/30) - Ajoutons 15 templates supplémentaires
  {
    id: 'introduction-ultra-personnalisee',
    name: 'Introduction Ultra-Personnalisée',
    category: 'Introduction',
    plan: 'growth',
    subject: '[PRENOM], j\'ai analysé [ENTREPRISE] et voici ce que j\'ai trouvé',
    body: `Bonjour [PRENOM],

Après avoir analysé en détail [ENTREPRISE], j\'ai identifié [NOMBRE] opportunités d\'amélioration.

Voici mes observations :
• [OBSERVATION_1]
• [OBSERVATION_2]
• [OBSERVATION_3]

Notre solution pourrait vous aider à [BENEFICE_SPECIFIQUE].

Puis-je vous présenter ma proposition détaillée ?

Cordialement,
[EXPEDITEUR]`,
    description: 'Introduction ultra-personnalisée avec analyse approfondie',
    timesUsed: 67,
    openRate: 95,
    tags: ['introduction', 'ultra-personnalisée', 'analyse']
  },
  {
    id: 'proposition-strategique',
    name: 'Proposition Stratégique',
    category: 'Commercial',
    plan: 'growth',
    subject: 'Plan stratégique [DURATION] pour [ENTREPRISE] - [OBJECTIF]',
    body: `Bonjour [PRENOM],

J\'ai préparé un plan stratégique [DURATION] pour [ENTREPRISE] visant [OBJECTIF].

Phase 1 ([MOIS_1]) : [ACTION_1]
Phase 2 ([MOIS_2]) : [ACTION_2]
Phase 3 ([MOIS_3]) : [ACTION_3]

ROI attendu : [ROI_ATTENDU]
Délai de mise en place : [DELAI]

Souhaitez-vous en discuter ?

Cordialement,
[EXPEDITEUR]`,
    description: 'Proposition stratégique avec plan détaillé',
    timesUsed: 34,
    openRate: 91,
    tags: ['commercial', 'stratégique', 'plan']
  },
  {
    id: 'event-exclusive',
    name: 'Événement Exclusif',
    category: 'Événement',
    plan: 'growth',
    subject: 'Invitation exclusive : [EVENEMENT] - [DATE] - Places limitées',
    body: `Bonjour [PRENOM],

Je vous invite personnellement à [EVENEMENT] le [DATE] à [HEURE].

Cet événement exclusif réunit [NOMBRE] dirigeants de votre secteur.

Au programme :
• [INTERVENANT_1] - [SUJET_1]
• [INTERVENANT_2] - [SUJET_2]
• [INTERVENANT_3] - [SUJET_3]

Places limitées à [NOMBRE] participants.

Inscription : [LIEN_INSCRIPTION]

À bientôt !
[EXPEDITEUR]`,
    description: 'Invitation à un événement exclusif',
    timesUsed: 23,
    openRate: 87,
    tags: ['événement', 'exclusif', 'invitation']
  },
  {
    id: 'success-story',
    name: 'Success Story',
    category: 'Social Proof',
    plan: 'growth',
    subject: 'Success Story : Comment [CLIENT] a [RESULTAT] en [DELAI]',
    body: `Bonjour [PRENOM],

Je partage avec vous l\'incroyable success story de [CLIENT] :

🎯 Défi initial : [DEFI]
💡 Solution mise en place : [SOLUTION]
📈 Résultats obtenus : [RESULTATS]
⏱️ Délai : [DELAI]

Témoignage client : "[TEMOIGNAGE]"

Pensez-vous que [ENTREPRISE] pourrait bénéficier d\'une approche similaire ?

Cordialement,
[EXPEDITEUR]`,
    description: 'Success story détaillée avec témoignage client',
    timesUsed: 41,
    openRate: 89,
    tags: ['social proof', 'success story', 'témoignage']
  },
  {
    id: 'newsletter-premium',
    name: 'Newsletter Premium',
    category: 'Newsletter',
    plan: 'growth',
    subject: '[MOIS] - [NOMBRE] insights exclusifs + [BONUS]',
    body: `Bonjour [PRENOM],

Voici votre newsletter premium de [MOIS] :

🔥 INSIGHT EXCLUSIF #1
[CONTENU_1]

🔥 INSIGHT EXCLUSIF #2
[CONTENU_2]

🔥 INSIGHT EXCLUSIF #3
[CONTENU_3]

🎁 BONUS : [BONUS_SPECIAL]

Bonne lecture !
[EXPEDITEUR]`,
    description: 'Newsletter premium avec contenu exclusif',
    timesUsed: 56,
    openRate: 73,
    tags: ['newsletter', 'premium', 'exclusif']
  },
  {
    id: 'relance-vip',
    name: 'Relance VIP',
    category: 'Suivi',
    plan: 'growth',
    subject: 'Re: [SUJET_PRECEDENT] - Message personnel',
    body: `Bonjour [PRENOM],

J\'ai pensé à vous aujourd\'hui en [CONTEXTE_PERSONNEL].

Cela m\'a rappelé notre discussion sur [SUJET_PRECEDENT] et j\'ai une idée qui pourrait vraiment aider [ENTREPRISE].

Puis-je vous appeler [JOUR] à [HEURE] ?

Cordialement,
[EXPEDITEUR]`,
    description: 'Relance VIP avec touche personnelle',
    timesUsed: 38,
    openRate: 82,
    tags: ['suivi', 'relance', 'vip', 'personnel']
  },
  {
    id: 'partenariat-strategique',
    name: 'Partenariat Stratégique',
    category: 'Partenariat',
    plan: 'growth',
    subject: 'Partenariat stratégique [VOTRE_ENTREPRISE] x [ENTREPRISE] - [OPPORTUNITE]',
    body: `Bonjour [PRENOM],

Je vous propose un partenariat stratégique entre [VOTRE_ENTREPRISE] et [ENTREPRISE].

Notre analyse montre que :
• [VOTRE_ENTREPRISE] : [FORCE_1]
• [ENTREPRISE] : [FORCE_2]
• Synergie : [OPPORTUNITE]

Puis-je vous présenter notre proposition détaillée ?

Cordialement,
[EXPEDITEUR]`,
    description: 'Proposition de partenariat stratégique',
    timesUsed: 15,
    openRate: 85,
    tags: ['partenariat', 'stratégique', 'synergie']
  },
  {
    id: 'feedback-avance',
    name: 'Feedback Avancé',
    category: 'Feedback',
    plan: 'growth',
    subject: 'Votre feedback sur [PRODUIT_SERVICE] - Questionnaire personnalisé',
    body: `Bonjour [PRENOM],

J\'ai préparé un questionnaire personnalisé pour recueillir votre feedback sur [PRODUIT_SERVICE].

Ce questionnaire de 5 minutes m\'aidera à :
• [OBJECTIF_1]
• [OBJECTIF_2]
• [OBJECTIF_3]

Questionnaire : [LIEN_QUESTIONNAIRE]

Merci d\'avance !
[EXPEDITEUR]`,
    description: 'Demande de feedback avec questionnaire personnalisé',
    timesUsed: 89,
    openRate: 62,
    tags: ['feedback', 'avancé', 'questionnaire']
  },
  {
    id: 'loyalty-program',
    name: 'Programme de Fidélité',
    category: 'Fidélisation',
    plan: 'growth',
    subject: 'Programme VIP [ENTREPRISE] - Avantages exclusifs',
    body: `Bonjour [PRENOM],

Félicitations ! [ENTREPRISE] accède au programme VIP.

Vos avantages exclusifs :
• [AVANTAGE_1]
• [AVANTAGE_2]
• [AVANTAGE_3]

Offre de lancement : [OFFRE_SPECIALE]

Bienvenue dans le club !
[EXPEDITEUR]`,
    description: 'Invitation au programme de fidélité VIP',
    timesUsed: 27,
    openRate: 96,
    tags: ['fidélisation', 'vip', 'programme']
  },
  {
    id: 'seasonal-campaign',
    name: 'Campagne Saisonnière',
    category: 'Commercial',
    plan: 'growth',
    subject: 'Campagne [SAISON] - [NOMBRE] offres exclusives pour [ENTREPRISE]',
    body: `Bonjour [PRENOM],

Pour [SAISON], j\'ai préparé [NOMBRE] offres exclusives pour [ENTREPRISE] :

🎁 Offre #1 : [OFFRE_1]
🎁 Offre #2 : [OFFRE_2]
🎁 Offre #3 : [OFFRE_3]

Ces offres sont valables jusqu\'au [DATE_LIMITE].

Quelle offre vous intéresse le plus ?

Cordialement,
[EXPEDITEUR]`,
    description: 'Campagne saisonnière avec multiples offres',
    timesUsed: 44,
    openRate: 81,
    tags: ['commercial', 'campagne', 'saisonnière']
  },
  {
    id: 'industry-report',
    name: 'Rapport Secteur',
    category: 'Contenu',
    plan: 'growth',
    subject: 'Rapport exclusif [SECTEUR] [ANNEE] - [NOMBRE] insights',
    body: `Bonjour [PRENOM],

J\'ai préparé un rapport exclusif sur le secteur [SECTEUR] pour [ANNEE].

Ce rapport contient [NOMBRE] insights inédits :
• [INSIGHT_1]
• [INSIGHT_2]
• [INSIGHT_3]

Téléchargement gratuit : [LIEN_RAPPORT]

Bonne lecture !
[EXPEDITEUR]`,
    description: 'Partage d\'un rapport sectoriel exclusif',
    timesUsed: 31,
    openRate: 78,
    tags: ['contenu', 'rapport', 'secteur']
  },
  {
    id: 'expert-interview',
    name: 'Interview Expert',
    category: 'Contenu',
    plan: 'growth',
    subject: 'Interview exclusive : [EXPERT] sur [SUJET]',
    body: `Bonjour [PRENOM],

J\'ai interviewé [EXPERT] sur [SUJET].

Points clés de l\'interview :
• [POINT_1]
• [POINT_2]
• [POINT_3]

Interview complète : [LIEN_INTERVIEW]

Pensez-vous que cela pourrait intéresser votre équipe ?

Cordialement,
[EXPEDITEUR]`,
    description: 'Partage d\'une interview d\'expert',
    timesUsed: 19,
    openRate: 84,
    tags: ['contenu', 'interview', 'expert']
  },
  {
    id: 'product-launch',
    name: 'Lancement Produit',
    category: 'Commercial',
    plan: 'growth',
    subject: 'Lancement exclusif : [PRODUIT] - [DATE] - Accès anticipé',
    body: `Bonjour [PRENOM],

Je vous annonce le lancement exclusif de [PRODUIT] le [DATE].

En tant que client privilégié, vous avez un accès anticipé du [DATE_ACCES] au [DATE_LIMITE].

Avantages de l\'accès anticipé :
• [AVANTAGE_1]
• [AVANTAGE_2]
• [AVANTAGE_3]

Réservation : [LIEN_RESERVATION]

À bientôt !
[EXPEDITEUR]`,
    description: 'Annonce de lancement de produit avec accès anticipé',
    timesUsed: 52,
    openRate: 88,
    tags: ['commercial', 'lancement', 'produit']
  },
  {
    id: 'crisis-communication',
    name: 'Communication de Crise',
    category: 'Communication',
    plan: 'growth',
    subject: 'Message important concernant [SITUATION]',
    body: `Bonjour [PRENOM],

Je vous contacte concernant [SITUATION] qui pourrait impacter [ENTREPRISE].

Notre équipe a analysé la situation et voici nos recommandations :
• [RECOMMANDATION_1]
• [RECOMMANDATION_2]
• [RECOMMANDATION_3]

Nous restons à votre disposition pour vous accompagner.

Cordialement,
[EXPEDITEUR]`,
    description: 'Template pour communication de crise',
    timesUsed: 7,
    openRate: 97,
    tags: ['communication', 'crise', 'urgence']
  },
  {
    id: 'annual-review',
    name: 'Bilan Annuel',
    category: 'Fidélisation',
    plan: 'growth',
    subject: 'Bilan annuel [ENTREPRISE] - [ANNEE] - [NOMBRE] réalisations',
    body: `Bonjour [PRENOM],

Voici le bilan annuel de [ENTREPRISE] pour [ANNEE] :

🎯 Objectifs atteints : [NOMBRE] sur [TOTAL]
📈 Croissance : [POURCENTAGE]%
🏆 Réalisations majeures :
• [REALISATION_1]
• [REALISATION_2]
• [REALISATION_3]

Merci pour votre confiance !

Cordialement,
[EXPEDITEUR]`,
    description: 'Bilan annuel avec réalisations',
    timesUsed: 13,
    openRate: 91,
    tags: ['fidélisation', 'bilan', 'annuel']
  }
]

// Fonction pour obtenir les templates selon le plan
export function getTemplatesByPlan(plan: 'free' | 'starter' | 'pro' | 'growth'): EmailTemplate[] {
  const planOrder = { free: 1, starter: 2, pro: 3, growth: 4 }
  return emailTemplates.filter(template => planOrder[template.plan] <= planOrder[plan])
}

// Fonction pour obtenir les statistiques par plan
export function getPlanStats(plan: 'free' | 'starter' | 'pro' | 'growth') {
  const templates = getTemplatesByPlan(plan)
  const totalTemplates = emailTemplates.length
  
  return {
    available: templates.length,
    total: totalTemplates,
    percentage: Math.round((templates.length / totalTemplates) * 100)
  }
}
