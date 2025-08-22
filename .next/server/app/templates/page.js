(()=>{var e={};e.id=0,e.ids=[0],e.modules={7849:e=>{"use strict";e.exports=require("next/dist/client/components/action-async-storage.external")},5403:e=>{"use strict";e.exports=require("next/dist/client/components/request-async-storage.external")},4749:e=>{"use strict";e.exports=require("next/dist/client/components/static-generation-async-storage.external")},399:e=>{"use strict";e.exports=require("next/dist/compiled/next-server/app-page.runtime.prod.js")},5528:e=>{"use strict";e.exports=require("next/dist\\client\\components\\action-async-storage.external.js")},1877:e=>{"use strict";e.exports=require("next/dist\\client\\components\\request-async-storage.external.js")},5319:e=>{"use strict";e.exports=require("next/dist\\client\\components\\static-generation-async-storage.external.js")},1782:(e,t,r)=>{"use strict";r.r(t),r.d(t,{GlobalError:()=>i.a,__next_app__:()=>p,originalPathname:()=>d,pages:()=>u,routeModule:()=>m,tree:()=>c});var s=r(482),a=r(9108),n=r(2563),i=r.n(n),o=r(8300),l={};for(let e in o)0>["default","tree","pages","GlobalError","originalPathname","__next_app__","routeModule"].indexOf(e)&&(l[e]=()=>o[e]);r.d(t,l);let c=["",{children:["templates",{children:["__PAGE__",{},{page:[()=>Promise.resolve().then(r.bind(r,4585)),"C:\\Users\\benja\\Desktop\\LeadPilot SaaS\\LeadPilot\\app\\templates\\page.tsx"]}]},{}]},{layout:[()=>Promise.resolve().then(r.bind(r,2917)),"C:\\Users\\benja\\Desktop\\LeadPilot SaaS\\LeadPilot\\app\\layout.tsx"],"not-found":[()=>Promise.resolve().then(r.t.bind(r,9361,23)),"next/dist/client/components/not-found-error"]}],u=["C:\\Users\\benja\\Desktop\\LeadPilot SaaS\\LeadPilot\\app\\templates\\page.tsx"],d="/templates/page",p={require:r,loadChunk:()=>Promise.resolve()},m=new s.AppPageRouteModule({definition:{kind:a.x.APP_PAGE,page:"/templates/page",pathname:"/templates",bundlePath:"",filename:"",appPaths:[]},userland:{loaderTree:c}})},1130:(e,t,r)=>{Promise.resolve().then(r.bind(r,4913))},1676:(e,t,r)=>{Promise.resolve().then(r.t.bind(r,2583,23)),Promise.resolve().then(r.t.bind(r,6840,23)),Promise.resolve().then(r.t.bind(r,8771,23)),Promise.resolve().then(r.t.bind(r,3225,23)),Promise.resolve().then(r.t.bind(r,9295,23)),Promise.resolve().then(r.t.bind(r,3982,23))},9130:(e,t,r)=>{Promise.resolve().then(r.bind(r,4755))},4913:(e,t,r)=>{"use strict";r.r(t),r.d(t,{default:()=>g});var s=r(2295),a=r(3729),n=r(3759),i=r(3969),o=r(7993),l=r(2954),c=r(454),u=r(7602),d=r(8138),p=r(4596),m=r(4755);let E=[{id:"intro-simple",name:"Introduction Simple",category:"Introduction",plan:"free",subject:"Bonjour [PRENOM] - Une solution pour [ENTREPRISE]",body:`Bonjour [PRENOM],

Je me permets de vous contacter car je pense que [ENTREPRISE] pourrait \xeatre int\xe9ress\xe9e par notre solution.

Nous aidons les entreprises comme la v\xf4tre \xe0 [BENEFICE_PRINCIPAL].

Seriez-vous disponible pour un \xe9change de 15 minutes cette semaine ?

Cordialement,
[EXPEDITEUR]`,description:"Template simple pour une premi\xe8re prise de contact",timesUsed:0,openRate:0,tags:["introduction","simple"]},{id:"intro-personnalisee",name:"Introduction Personnalis\xe9e",category:"Introduction",plan:"starter",subject:"[PRENOM], j'ai remarqu\xe9 [DETAIL_ENTREPRISE]",body:`Bonjour [PRENOM],

J'ai remarqu\xe9 que [ENTREPRISE] [DETAIL_ENTREPRISE] et je pense que notre solution pourrait vous int\xe9resser.

Nous avons aid\xe9 [NOMBRE] entreprises similaires \xe0 [BENEFICE_CONCRET].

Auriez-vous 15 minutes pour discuter de vos besoins ?

Cordialement,
[EXPEDITEUR]`,description:"Introduction avec personnalisation bas\xe9e sur l'entreprise",timesUsed:0,openRate:0,tags:["introduction","personnalis\xe9e"]},{id:"offre-speciale",name:"Offre Sp\xe9ciale",category:"Commercial",plan:"starter",subject:"Offre exclusive pour [ENTREPRISE] - [POURCENTAGE]% de r\xe9duction",body:`Bonjour [PRENOM],

J'ai pr\xe9par\xe9 une offre exclusive pour [ENTREPRISE] : [POURCENTAGE]% de r\xe9duction sur notre solution [NOM_SOLUTION].

Cette offre est valable jusqu'au [DATE_LIMITE].

Voulez-vous en discuter ?

Cordialement,
[EXPEDITEUR]`,description:"Template pour promouvoir une offre ou une promotion",timesUsed:0,openRate:0,tags:["commercial","offre"]},{id:"suivi-relance",name:"Suivi et Relance",category:"Suivi",plan:"starter",subject:"Re: [SUJET_PRECEDENT] - Un petit rappel",body:`Bonjour [PRENOM],

Je me permets de revenir vers vous concernant [SUJET_PRECEDENT].

Avez-vous eu le temps de r\xe9fl\xe9chir \xe0 notre proposition ?

Je reste \xe0 votre disposition pour toute question.

Cordialement,
[EXPEDITEUR]`,description:"Template pour relancer un prospect apr\xe8s un premier contact",timesUsed:0,openRate:0,tags:["suivi","relance"]},{id:"newsletter-basique",name:"Newsletter Basique",category:"Newsletter",plan:"starter",subject:"[MOIS] - Newsletter [ENTREPRISE]",body:`Bonjour [PRENOM],

Voici notre newsletter de [MOIS] :

📊 [STATISTIQUE_IMPORTANTE]
💡 [CONSEIL_PRATIQUE]
🎯 [ACTUALITE_SECTEUR]

N'h\xe9sitez pas \xe0 me contacter pour plus d'informations.

Cordialement,
[EXPEDITEUR]`,description:"Template simple pour newsletters mensuelles",timesUsed:6,openRate:45,tags:["newsletter","mensuel"]},{id:"presentation-entreprise",name:"Pr\xe9sentation Entreprise",category:"Pr\xe9sentation",plan:"starter",subject:"D\xe9couvrez [VOTRE_ENTREPRISE] - [VOTRE_VALEUR_AJOUTEE]",body:`Bonjour [PRENOM],

Je vous pr\xe9sente [VOTRE_ENTREPRISE], sp\xe9cialis\xe9e dans [DOMAINE_EXPERTISE].

Nous aidons les entreprises \xe0 [BENEFICE_PRINCIPAL] gr\xe2ce \xe0 [VOTRE_SOLUTION].

Nos clients t\xe9moignent : "[TEMOIGNAGE_CLIENT]"

Souhaitez-vous en savoir plus ?

Cordialement,
[EXPEDITEUR]`,description:"Template pour pr\xe9senter votre entreprise et vos services",timesUsed:12,openRate:78,tags:["pr\xe9sentation","entreprise"]},{id:"introduction-avancee",name:"Introduction Avanc\xe9e",category:"Introduction",plan:"pro",subject:"[PRENOM], comment [ENTREPRISE] peut [BENEFICE_SPECIFIQUE]",body:`Bonjour [PRENOM],

Apr\xe8s avoir analys\xe9 [ENTREPRISE], j'ai identifi\xe9 que vous pourriez [BENEFICE_SPECIFIQUE] gr\xe2ce \xe0 notre solution.

Nous avons d\xe9j\xe0 aid\xe9 [NOMBRE] entreprises dans votre secteur \xe0 [RESULTAT_CONCRET].

Puis-je vous pr\xe9senter comment nous pourrions vous accompagner ?

Cordialement,
[EXPEDITEUR]`,description:"Introduction sophistiqu\xe9e avec analyse pr\xe9alable",timesUsed:25,openRate:89,tags:["introduction","avanc\xe9e","analyse"]},{id:"proposition-valeur",name:"Proposition de Valeur",category:"Commercial",plan:"pro",subject:"Proposition de valeur pour [ENTREPRISE] - [ROI_ATTENDU]",body:`Bonjour [PRENOM],

J'ai pr\xe9par\xe9 une proposition de valeur sp\xe9cifique pour [ENTREPRISE] :

🎯 Probl\xe8me identifi\xe9 : [PROBLEME]
💡 Solution propos\xe9e : [SOLUTION]
📈 ROI attendu : [ROI_ATTENDU]
⏱️ D\xe9lai de mise en place : [DELAI]

Souhaitez-vous en discuter ?

Cordialement,
[EXPEDITEUR]`,description:"Template avec proposition de valeur d\xe9taill\xe9e",timesUsed:18,openRate:92,tags:["commercial","proposition","valeur"]},{id:"webinar-invitation",name:"Invitation Webinar",category:"\xc9v\xe9nement",plan:"pro",subject:"Webinar exclusif : [SUJET_WEBINAR] - [DATE]",body:`Bonjour [PRENOM],

Je vous invite \xe0 notre webinar exclusif "[SUJET_WEBINAR]" le [DATE] \xe0 [HEURE].

Au programme :
• [POINT_1]
• [POINT_2]
• [POINT_3]

Inscription gratuite : [LIEN_INSCRIPTION]

\xc0 bient\xf4t !
[EXPEDITEUR]`,description:"Template pour inviter \xe0 un webinar ou \xe9v\xe9nement",timesUsed:32,openRate:76,tags:["\xe9v\xe9nement","webinar","invitation"]},{id:"case-study",name:"Case Study",category:"Social Proof",plan:"pro",subject:"Comment [CLIENT_TEMOIN] a [RESULTAT_OBTENU]",body:`Bonjour [PRENOM],

Je partage avec vous le cas de [CLIENT_TEMOIN] qui a [RESULTAT_OBTENU] gr\xe2ce \xe0 notre solution.

Avant : [SITUATION_AVANT]
Apr\xe8s : [SITUATION_APRES]
R\xe9sultat : [RESULTAT_QUANTIFIE]

Pensez-vous que cela pourrait int\xe9resser [ENTREPRISE] ?

Cordialement,
[EXPEDITEUR]`,description:"Template pour partager un cas d'usage client",timesUsed:14,openRate:88,tags:["social proof","case study","t\xe9moignage"]},{id:"newsletter-avancee",name:"Newsletter Avanc\xe9e",category:"Newsletter",plan:"pro",subject:"[MOIS] - [NOMBRE] insights pour [ENTREPRISE]",body:`Bonjour [PRENOM],

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
[EXPEDITEUR]`,description:"Newsletter d\xe9taill\xe9e avec multiples insights",timesUsed:22,openRate:67,tags:["newsletter","avanc\xe9e","insights"]},{id:"relance-creative",name:"Relance Cr\xe9ative",category:"Suivi",plan:"pro",subject:"Re: [SUJET_PRECEDENT] - Une id\xe9e pour [ENTREPRISE]",body:`Bonjour [PRENOM],

J'ai pens\xe9 \xe0 vous en lisant cet article sur [SUJET_ACTUALITE].

Cela m'a rappel\xe9 notre discussion sur [SUJET_PRECEDENT] et j'ai une id\xe9e pour [ENTREPRISE].

Auriez-vous 10 minutes pour en discuter ?

Cordialement,
[EXPEDITEUR]`,description:"Relance cr\xe9ative bas\xe9e sur l'actualit\xe9",timesUsed:19,openRate:71,tags:["suivi","relance","cr\xe9ative"]},{id:"partenariat",name:"Proposition Partenariat",category:"Partenariat",plan:"pro",subject:"Partenariat [VOTRE_ENTREPRISE] x [ENTREPRISE] - Opportunit\xe9 [SECTEUR]",body:`Bonjour [PRENOM],

Je vous contacte pour explorer une opportunit\xe9 de partenariat entre [VOTRE_ENTREPRISE] et [ENTREPRISE].

Notre expertise en [DOMAINE_1] + votre positionnement en [DOMAINE_2] = [VALEUR_AJOUTEE].

Puis-je vous pr\xe9senter notre proposition ?

Cordialement,
[EXPEDITEUR]`,description:"Template pour proposer un partenariat",timesUsed:8,openRate:83,tags:["partenariat","opportunit\xe9","collaboration"]},{id:"feedback-request",name:"Demande de Feedback",category:"Feedback",plan:"pro",subject:"Votre avis sur [PRODUIT_SERVICE] - 2 minutes",body:`Bonjour [PRENOM],

J'esp\xe8re que [PRODUIT_SERVICE] vous donne satisfaction.

Pourriez-vous prendre 2 minutes pour me donner votre avis ?

Cela m'aiderait \xe0 am\xe9liorer notre service.

Merci d'avance !
[EXPEDITEUR]`,description:"Template pour demander un feedback client",timesUsed:45,openRate:58,tags:["feedback","satisfaction","am\xe9lioration"]},{id:"anniversary",name:"Anniversaire Client",category:"Fid\xe9lisation",plan:"pro",subject:"F\xe9licitations [PRENOM] ! [ENTREPRISE] f\xeate ses [NOMBRE] ans",body:`Bonjour [PRENOM],

F\xe9licitations ! [ENTREPRISE] f\xeate ses [NOMBRE] ans cette ann\xe9e.

C'est un moment sp\xe9cial et nous sommes fiers de vous accompagner depuis [DUREE].

Pour c\xe9l\xe9brer, nous vous offrons [OFFRE_SPECIALE].

\xc0 bient\xf4t !
[EXPEDITEUR]`,description:"Template pour c\xe9l\xe9brer l'anniversaire d'un client",timesUsed:12,openRate:94,tags:["fid\xe9lisation","anniversaire","c\xe9l\xe9bration"]},{id:"seasonal-promo",name:"Promotion Saisonni\xe8re",category:"Commercial",plan:"pro",subject:"[SAISON] - Offre sp\xe9ciale [POURCENTAGE]% pour [ENTREPRISE]",body:`Bonjour [PRENOM],

Pour c\xe9l\xe9brer [SAISON], nous proposons une offre sp\xe9ciale de [POURCENTAGE]% \xe0 nos clients fid\xe8les.

Cette offre est valable jusqu'au [DATE_LIMITE] et inclut [AVANTAGES].

Voulez-vous en profiter ?

Cordialement,
[EXPEDITEUR]`,description:"Template pour promotions saisonni\xe8res",timesUsed:28,openRate:79,tags:["commercial","promotion","saisonni\xe8re"]},{id:"introduction-ultra-personnalisee",name:"Introduction Ultra-Personnalis\xe9e",category:"Introduction",plan:"growth",subject:"[PRENOM], j'ai analys\xe9 [ENTREPRISE] et voici ce que j'ai trouv\xe9",body:`Bonjour [PRENOM],

Apr\xe8s avoir analys\xe9 en d\xe9tail [ENTREPRISE], j'ai identifi\xe9 [NOMBRE] opportunit\xe9s d'am\xe9lioration.

Voici mes observations :
• [OBSERVATION_1]
• [OBSERVATION_2]
• [OBSERVATION_3]

Notre solution pourrait vous aider \xe0 [BENEFICE_SPECIFIQUE].

Puis-je vous pr\xe9senter ma proposition d\xe9taill\xe9e ?

Cordialement,
[EXPEDITEUR]`,description:"Introduction ultra-personnalis\xe9e avec analyse approfondie",timesUsed:67,openRate:95,tags:["introduction","ultra-personnalis\xe9e","analyse"]},{id:"proposition-strategique",name:"Proposition Strat\xe9gique",category:"Commercial",plan:"growth",subject:"Plan strat\xe9gique [DURATION] pour [ENTREPRISE] - [OBJECTIF]",body:`Bonjour [PRENOM],

J'ai pr\xe9par\xe9 un plan strat\xe9gique [DURATION] pour [ENTREPRISE] visant [OBJECTIF].

Phase 1 ([MOIS_1]) : [ACTION_1]
Phase 2 ([MOIS_2]) : [ACTION_2]
Phase 3 ([MOIS_3]) : [ACTION_3]

ROI attendu : [ROI_ATTENDU]
D\xe9lai de mise en place : [DELAI]

Souhaitez-vous en discuter ?

Cordialement,
[EXPEDITEUR]`,description:"Proposition strat\xe9gique avec plan d\xe9taill\xe9",timesUsed:34,openRate:91,tags:["commercial","strat\xe9gique","plan"]},{id:"event-exclusive",name:"\xc9v\xe9nement Exclusif",category:"\xc9v\xe9nement",plan:"growth",subject:"Invitation exclusive : [EVENEMENT] - [DATE] - Places limit\xe9es",body:`Bonjour [PRENOM],

Je vous invite personnellement \xe0 [EVENEMENT] le [DATE] \xe0 [HEURE].

Cet \xe9v\xe9nement exclusif r\xe9unit [NOMBRE] dirigeants de votre secteur.

Au programme :
• [INTERVENANT_1] - [SUJET_1]
• [INTERVENANT_2] - [SUJET_2]
• [INTERVENANT_3] - [SUJET_3]

Places limit\xe9es \xe0 [NOMBRE] participants.

Inscription : [LIEN_INSCRIPTION]

\xc0 bient\xf4t !
[EXPEDITEUR]`,description:"Invitation \xe0 un \xe9v\xe9nement exclusif",timesUsed:23,openRate:87,tags:["\xe9v\xe9nement","exclusif","invitation"]},{id:"success-story",name:"Success Story",category:"Social Proof",plan:"growth",subject:"Success Story : Comment [CLIENT] a [RESULTAT] en [DELAI]",body:`Bonjour [PRENOM],

Je partage avec vous l'incroyable success story de [CLIENT] :

🎯 D\xe9fi initial : [DEFI]
💡 Solution mise en place : [SOLUTION]
📈 R\xe9sultats obtenus : [RESULTATS]
⏱️ D\xe9lai : [DELAI]

T\xe9moignage client : "[TEMOIGNAGE]"

Pensez-vous que [ENTREPRISE] pourrait b\xe9n\xe9ficier d'une approche similaire ?

Cordialement,
[EXPEDITEUR]`,description:"Success story d\xe9taill\xe9e avec t\xe9moignage client",timesUsed:41,openRate:89,tags:["social proof","success story","t\xe9moignage"]},{id:"newsletter-premium",name:"Newsletter Premium",category:"Newsletter",plan:"growth",subject:"[MOIS] - [NOMBRE] insights exclusifs + [BONUS]",body:`Bonjour [PRENOM],

Voici votre newsletter premium de [MOIS] :

🔥 INSIGHT EXCLUSIF #1
[CONTENU_1]

🔥 INSIGHT EXCLUSIF #2
[CONTENU_2]

🔥 INSIGHT EXCLUSIF #3
[CONTENU_3]

🎁 BONUS : [BONUS_SPECIAL]

Bonne lecture !
[EXPEDITEUR]`,description:"Newsletter premium avec contenu exclusif",timesUsed:56,openRate:73,tags:["newsletter","premium","exclusif"]},{id:"relance-vip",name:"Relance VIP",category:"Suivi",plan:"growth",subject:"Re: [SUJET_PRECEDENT] - Message personnel",body:`Bonjour [PRENOM],

J'ai pens\xe9 \xe0 vous aujourd'hui en [CONTEXTE_PERSONNEL].

Cela m'a rappel\xe9 notre discussion sur [SUJET_PRECEDENT] et j'ai une id\xe9e qui pourrait vraiment aider [ENTREPRISE].

Puis-je vous appeler [JOUR] \xe0 [HEURE] ?

Cordialement,
[EXPEDITEUR]`,description:"Relance VIP avec touche personnelle",timesUsed:38,openRate:82,tags:["suivi","relance","vip","personnel"]},{id:"partenariat-strategique",name:"Partenariat Strat\xe9gique",category:"Partenariat",plan:"growth",subject:"Partenariat strat\xe9gique [VOTRE_ENTREPRISE] x [ENTREPRISE] - [OPPORTUNITE]",body:`Bonjour [PRENOM],

Je vous propose un partenariat strat\xe9gique entre [VOTRE_ENTREPRISE] et [ENTREPRISE].

Notre analyse montre que :
• [VOTRE_ENTREPRISE] : [FORCE_1]
• [ENTREPRISE] : [FORCE_2]
• Synergie : [OPPORTUNITE]

Puis-je vous pr\xe9senter notre proposition d\xe9taill\xe9e ?

Cordialement,
[EXPEDITEUR]`,description:"Proposition de partenariat strat\xe9gique",timesUsed:15,openRate:85,tags:["partenariat","strat\xe9gique","synergie"]},{id:"feedback-avance",name:"Feedback Avanc\xe9",category:"Feedback",plan:"growth",subject:"Votre feedback sur [PRODUIT_SERVICE] - Questionnaire personnalis\xe9",body:`Bonjour [PRENOM],

J'ai pr\xe9par\xe9 un questionnaire personnalis\xe9 pour recueillir votre feedback sur [PRODUIT_SERVICE].

Ce questionnaire de 5 minutes m'aidera \xe0 :
• [OBJECTIF_1]
• [OBJECTIF_2]
• [OBJECTIF_3]

Questionnaire : [LIEN_QUESTIONNAIRE]

Merci d'avance !
[EXPEDITEUR]`,description:"Demande de feedback avec questionnaire personnalis\xe9",timesUsed:89,openRate:62,tags:["feedback","avanc\xe9","questionnaire"]},{id:"loyalty-program",name:"Programme de Fid\xe9lit\xe9",category:"Fid\xe9lisation",plan:"growth",subject:"Programme VIP [ENTREPRISE] - Avantages exclusifs",body:`Bonjour [PRENOM],

F\xe9licitations ! [ENTREPRISE] acc\xe8de au programme VIP.

Vos avantages exclusifs :
• [AVANTAGE_1]
• [AVANTAGE_2]
• [AVANTAGE_3]

Offre de lancement : [OFFRE_SPECIALE]

Bienvenue dans le club !
[EXPEDITEUR]`,description:"Invitation au programme de fid\xe9lit\xe9 VIP",timesUsed:27,openRate:96,tags:["fid\xe9lisation","vip","programme"]},{id:"seasonal-campaign",name:"Campagne Saisonni\xe8re",category:"Commercial",plan:"growth",subject:"Campagne [SAISON] - [NOMBRE] offres exclusives pour [ENTREPRISE]",body:`Bonjour [PRENOM],

Pour [SAISON], j'ai pr\xe9par\xe9 [NOMBRE] offres exclusives pour [ENTREPRISE] :

🎁 Offre #1 : [OFFRE_1]
🎁 Offre #2 : [OFFRE_2]
🎁 Offre #3 : [OFFRE_3]

Ces offres sont valables jusqu'au [DATE_LIMITE].

Quelle offre vous int\xe9resse le plus ?

Cordialement,
[EXPEDITEUR]`,description:"Campagne saisonni\xe8re avec multiples offres",timesUsed:44,openRate:81,tags:["commercial","campagne","saisonni\xe8re"]},{id:"industry-report",name:"Rapport Secteur",category:"Contenu",plan:"growth",subject:"Rapport exclusif [SECTEUR] [ANNEE] - [NOMBRE] insights",body:`Bonjour [PRENOM],

J'ai pr\xe9par\xe9 un rapport exclusif sur le secteur [SECTEUR] pour [ANNEE].

Ce rapport contient [NOMBRE] insights in\xe9dits :
• [INSIGHT_1]
• [INSIGHT_2]
• [INSIGHT_3]

T\xe9l\xe9chargement gratuit : [LIEN_RAPPORT]

Bonne lecture !
[EXPEDITEUR]`,description:"Partage d'un rapport sectoriel exclusif",timesUsed:31,openRate:78,tags:["contenu","rapport","secteur"]},{id:"expert-interview",name:"Interview Expert",category:"Contenu",plan:"growth",subject:"Interview exclusive : [EXPERT] sur [SUJET]",body:`Bonjour [PRENOM],

J'ai interview\xe9 [EXPERT] sur [SUJET].

Points cl\xe9s de l'interview :
• [POINT_1]
• [POINT_2]
• [POINT_3]

Interview compl\xe8te : [LIEN_INTERVIEW]

Pensez-vous que cela pourrait int\xe9resser votre \xe9quipe ?

Cordialement,
[EXPEDITEUR]`,description:"Partage d'une interview d'expert",timesUsed:19,openRate:84,tags:["contenu","interview","expert"]},{id:"product-launch",name:"Lancement Produit",category:"Commercial",plan:"growth",subject:"Lancement exclusif : [PRODUIT] - [DATE] - Acc\xe8s anticip\xe9",body:`Bonjour [PRENOM],

Je vous annonce le lancement exclusif de [PRODUIT] le [DATE].

En tant que client privil\xe9gi\xe9, vous avez un acc\xe8s anticip\xe9 du [DATE_ACCES] au [DATE_LIMITE].

Avantages de l'acc\xe8s anticip\xe9 :
• [AVANTAGE_1]
• [AVANTAGE_2]
• [AVANTAGE_3]

R\xe9servation : [LIEN_RESERVATION]

\xc0 bient\xf4t !
[EXPEDITEUR]`,description:"Annonce de lancement de produit avec acc\xe8s anticip\xe9",timesUsed:52,openRate:88,tags:["commercial","lancement","produit"]},{id:"crisis-communication",name:"Communication de Crise",category:"Communication",plan:"growth",subject:"Message important concernant [SITUATION]",body:`Bonjour [PRENOM],

Je vous contacte concernant [SITUATION] qui pourrait impacter [ENTREPRISE].

Notre \xe9quipe a analys\xe9 la situation et voici nos recommandations :
• [RECOMMANDATION_1]
• [RECOMMANDATION_2]
• [RECOMMANDATION_3]

Nous restons \xe0 votre disposition pour vous accompagner.

Cordialement,
[EXPEDITEUR]`,description:"Template pour communication de crise",timesUsed:7,openRate:97,tags:["communication","crise","urgence"]},{id:"annual-review",name:"Bilan Annuel",category:"Fid\xe9lisation",plan:"growth",subject:"Bilan annuel [ENTREPRISE] - [ANNEE] - [NOMBRE] r\xe9alisations",body:`Bonjour [PRENOM],

Voici le bilan annuel de [ENTREPRISE] pour [ANNEE] :

🎯 Objectifs atteints : [NOMBRE] sur [TOTAL]
📈 Croissance : [POURCENTAGE]%
🏆 R\xe9alisations majeures :
• [REALISATION_1]
• [REALISATION_2]
• [REALISATION_3]

Merci pour votre confiance !

Cordialement,
[EXPEDITEUR]`,description:"Bilan annuel avec r\xe9alisations",timesUsed:13,openRate:91,tags:["fid\xe9lisation","bilan","annuel"]}],x=async(e,t)=>{try{let r=await fetch(`/api/templates/${e}/stats`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({action:t})});if(r.ok)return await r.json()}catch(e){console.error("Erreur mise \xe0 jour stats template:",e)}return null};function g(){let[e,t]=(0,a.useState)(null),[r,g]=(0,a.useState)("all"),[N,b]=(0,a.useState)(!1),[v,h]=(0,a.useState)(!1),[R,T]=(0,a.useState)(!1),[f,j]=(0,a.useState)(!1),[I,y]=(0,a.useState)(null),[P,O]=(0,a.useState)({name:"",subject:"",content:""}),[w,S]=(0,a.useState)({name:"",subject:"",content:""}),[C,A]=(0,a.useState)(!1);(0,a.useEffect)(()=>{U()},[]);let U=async()=>{try{let e=await fetch("/api/user/quotas");if(e.ok){let r=await e.json();t(r)}}catch(e){console.error("Erreur chargement quotas:",e)}},_=()=>e?function(e){let t={free:1,starter:2,pro:3,growth:4};return E.filter(r=>t[r.plan]<=t[e])}(e.plan):[],M=async e=>{y(e),b(!0);try{await x(e.id,"open")}catch(e){console.error("Erreur mise \xe0 jour stats:",e)}},L=async e=>{try{m.toast.success(`Template "${e}" ajout\xe9 \xe0 Mes Emails !`),b(!1)}catch(e){m.toast.error("Erreur lors de l'ajout du template")}},B=async()=>{if(I&&!C){A(!0);try{let e=await fetch("/api/ai/generate-email-variation",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({originalSubject:I.subject,originalContent:I.body,category:I.category})});if(e.ok){let t=await e.json();S({...w,subject:t.variation.subject,content:t.variation.content}),m.toast.success("Variation g\xe9n\xe9r\xe9e avec succ\xe8s !")}else{let t=await e.json();m.toast.error(`Erreur: ${t.message||"Impossible de g\xe9n\xe9rer la variation"}`)}}catch(e){console.error("Erreur g\xe9n\xe9ration variation:",e),m.toast.error("Erreur lors de la g\xe9n\xe9ration de la variation")}finally{A(!1)}}},D=e=>{switch(e){case"free":return"bg-green-100 text-green-800";case"starter":return"bg-blue-100 text-blue-800";case"pro":return"bg-purple-100 text-purple-800";case"growth":return"bg-orange-100 text-orange-800";default:return"bg-gray-100 text-gray-800"}},k=e=>{switch(e){case"free":return"Free";case"starter":return"Starter";case"pro":return"Pro";case"growth":return"Growth";default:return e}},q=(()=>{let e=_();return"all"===r?e:e.filter(e=>e.plan===r)})(),V=(()=>{let e=_();return{all:{count:e.length,total:30},free:{count:e.filter(e=>"free"===e.plan).length,total:1},starter:{count:e.filter(e=>"starter"===e.plan).length,total:5},pro:{count:e.filter(e=>"pro"===e.plan).length,total:15},growth:{count:e.filter(e=>"growth"===e.plan).length,total:30}}})();return e?s.jsx("div",{className:"min-h-screen bg-gray-900",children:(0,s.jsxs)("div",{className:"max-w-7xl mx-auto p-6",children:[(0,s.jsxs)("div",{className:"flex items-center justify-between mb-8",children:[(0,s.jsxs)("div",{children:[s.jsx("h1",{className:"text-3xl font-bold text-white",children:"Templates d'Emails"}),s.jsx("p",{className:"text-gray-400 mt-2",children:"30 templates optimis\xe9s avec variations IA"})]}),(0,s.jsxs)("button",{onClick:()=>{T(!0)},className:"inline-flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition-colors",children:[s.jsx(n.Z,{className:"w-5 h-5"}),s.jsx("span",{children:"\xc9crire Email Personnel"})]})]}),s.jsx("div",{className:"flex space-x-2 mb-8 overflow-x-auto pb-2",children:Object.entries(V).map(([t,a])=>{let n=r===t,o="all"!==t&&"free"!==t&&"starter"===t&&"free"===e.plan||"pro"===t&&["free","starter"].includes(e.plan)||"growth"===t&&["free","starter","pro"].includes(e.plan);return(0,s.jsxs)("button",{onClick:()=>!o&&g(t),className:`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-colors whitespace-nowrap ${n?"bg-blue-600 text-white":o?"bg-gray-700 text-gray-400 cursor-not-allowed":"bg-gray-700 text-gray-300 hover:bg-gray-600"}`,disabled:o,children:[s.jsx("span",{children:"all"===t?"Tous":k(t)}),(0,s.jsxs)("span",{className:"text-sm opacity-75",children:["(",a.count,"/",a.total,")"]}),o&&s.jsx(i.Z,{className:"w-4 h-4"})]},t)})}),s.jsx("div",{className:"grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6",children:q.map(e=>(0,s.jsxs)("div",{className:"bg-gray-800 rounded-xl p-6 border border-gray-700 hover:border-gray-600 transition-colors",children:[s.jsx("div",{className:"flex items-start justify-between mb-4",children:(0,s.jsxs)("div",{className:"flex-1",children:[s.jsx("h3",{className:"text-lg font-semibold text-white mb-2",children:e.name}),s.jsx("span",{className:`inline-block px-2 py-1 text-xs font-medium rounded-full ${D(e.plan)}`,children:k(e.plan)})]})}),s.jsx("p",{className:"text-gray-400 text-sm mb-4 line-clamp-2",children:e.description}),(0,s.jsxs)("div",{className:"flex items-center justify-between text-sm text-gray-400 mb-4",children:[(0,s.jsxs)("span",{children:["Utilis\xe9 ",e.timesUsed," fois"]}),(0,s.jsxs)("span",{children:["Taux ouverture: ",e.openRate,"%"]})]}),(0,s.jsxs)("div",{className:"flex space-x-2",children:[(0,s.jsxs)("button",{onClick:()=>M(e),className:"flex-1 flex items-center justify-center space-x-2 bg-gray-700 hover:bg-gray-600 text-gray-300 py-2 px-4 rounded-lg transition-colors",children:[s.jsx(o.Z,{className:"w-4 h-4"}),s.jsx("span",{children:"Voir"})]}),(0,s.jsxs)("button",{onClick:()=>{y(e),S({name:e.name,subject:e.subject,content:e.body}),j(!0)},className:"flex-1 flex items-center justify-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition-colors",children:[s.jsx(l.Z,{className:"w-4 h-4"}),s.jsx("span",{children:"Choisir Template"})]})]})]},e.id))}),0===q.length&&(0,s.jsxs)("div",{className:"text-center py-12",children:[s.jsx(c.Z,{className:"w-16 h-16 text-gray-600 mx-auto mb-4"}),s.jsx("h3",{className:"text-xl font-semibold text-gray-300 mb-2",children:"Aucun template disponible"}),s.jsx("p",{className:"text-gray-500",children:"all"===r?"Aucun template disponible pour votre plan actuel.":`Aucun template ${k(r)} disponible.`})]}),N&&I&&s.jsx("div",{className:"fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50",children:(0,s.jsxs)("div",{className:"bg-gray-800 rounded-xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto",children:[(0,s.jsxs)("div",{className:"flex items-center justify-between mb-6",children:[(0,s.jsxs)("div",{children:[s.jsx("h2",{className:"text-2xl font-bold text-white",children:I.name}),s.jsx("span",{className:`inline-block px-2 py-1 text-xs font-medium rounded-full mt-2 ${D(I.plan)}`,children:k(I.plan)})]}),s.jsx("button",{onClick:()=>b(!1),className:"text-gray-400 hover:text-white",children:"✕"})]}),(0,s.jsxs)("div",{className:"space-y-4 mb-6",children:[(0,s.jsxs)("div",{children:[s.jsx("h3",{className:"text-sm font-medium text-gray-300 mb-2",children:"Objet"}),s.jsx("p",{className:"text-white bg-gray-700 p-3 rounded-lg",children:I.subject})]}),(0,s.jsxs)("div",{children:[s.jsx("h3",{className:"text-sm font-medium text-gray-300 mb-2",children:"Contenu"}),s.jsx("div",{className:"text-white bg-gray-700 p-3 rounded-lg whitespace-pre-wrap",children:I.body})]})]}),(0,s.jsxs)("div",{className:"flex items-center justify-between text-sm text-gray-400 mb-6",children:[(0,s.jsxs)("span",{children:["Utilis\xe9: ",I.timesUsed," fois"]}),(0,s.jsxs)("span",{children:["Taux ouverture: ",I.openRate,"%"]})]}),(0,s.jsxs)("div",{className:"flex space-x-3",children:[s.jsx("button",{onClick:()=>b(!1),className:"flex-1 bg-gray-700 hover:bg-gray-600 text-white py-2 px-4 rounded-lg transition-colors",children:"Annuler"}),s.jsx("button",{onClick:()=>L(I.name),className:"flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition-colors",children:"Choisir Template"})]})]})}),v&&s.jsx("div",{className:"fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50",children:(0,s.jsxs)("div",{className:"bg-gray-800 rounded-xl p-6 max-w-md w-full",children:[(0,s.jsxs)("div",{className:"flex items-center justify-between mb-6",children:[s.jsx("h2",{className:"text-xl font-bold text-white",children:"Cr\xe9er un email personnel"}),s.jsx("button",{onClick:()=>h(!1),className:"text-gray-400 hover:text-white",children:"✕"})]}),s.jsx("p",{className:"text-gray-400 mb-6",children:'Cr\xe9ez votre propre email \xe0 partir de z\xe9ro. Il sera ajout\xe9 \xe0 "Mes Emails" o\xf9 vous pourrez le modifier et g\xe9n\xe9rer des variations IA.'}),(0,s.jsxs)("div",{className:"flex space-x-3",children:[s.jsx("button",{onClick:()=>h(!1),className:"flex-1 bg-gray-700 hover:bg-gray-600 text-white py-2 px-4 rounded-lg transition-colors",children:"Annuler"}),s.jsx("button",{onClick:()=>{m.toast.success("Email personnel cr\xe9\xe9 ! Redirection vers Mes Emails..."),h(!1)},className:"flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition-colors",children:"Cr\xe9er"})]})]})}),R&&s.jsx("div",{className:"fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50",children:(0,s.jsxs)("div",{className:"bg-gray-800 rounded-lg p-6 w-full max-w-2xl mx-4",children:[(0,s.jsxs)("div",{className:"flex justify-between items-start mb-6",children:[(0,s.jsxs)("div",{children:[s.jsx("h3",{className:"text-xl font-semibold text-white mb-2",children:"Cr\xe9er un Email Personnalis\xe9"}),s.jsx("p",{className:"text-gray-300 text-sm",children:"R\xe9digez votre propre template d'email. Disponible pour tous les plans."})]}),s.jsx("button",{onClick:()=>T(!1),className:"text-gray-400 hover:text-white",children:s.jsx(u.Z,{className:"h-6 w-6"})})]}),(0,s.jsxs)("div",{className:"space-y-4",children:[(0,s.jsxs)("div",{children:[s.jsx("label",{className:"block text-sm font-medium text-gray-300 mb-2",children:"Nom de l'email"}),s.jsx("input",{type:"text",placeholder:"Ex: Email de pr\xe9sentation",value:P.name,onChange:e=>O({...P,name:e.target.value}),className:"w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"})]}),(0,s.jsxs)("div",{children:[s.jsx("label",{className:"block text-sm font-medium text-gray-300 mb-2",children:"Objet de l'email"}),s.jsx("input",{type:"text",placeholder:"Ex: Collaboration avec [ENTREPRISE]",value:P.subject,onChange:e=>O({...P,subject:e.target.value}),className:"w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"})]}),(0,s.jsxs)("div",{children:[s.jsx("label",{className:"block text-sm font-medium text-gray-300 mb-2",children:"Contenu de l'email"}),s.jsx("textarea",{rows:8,value:P.content,onChange:e=>O({...P,content:e.target.value}),className:"w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none",placeholder:"Bonjour [PRENOM], J'esp\xe8re que vous allez bien. Je me permets de vous contacter car...  Cordialement, [EXPEDITEUR]"})]})]}),(0,s.jsxs)("div",{className:"flex justify-end space-x-3 mt-6",children:[s.jsx("button",{onClick:()=>T(!1),className:"px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-500 transition-colors",children:"Annuler"}),s.jsx("button",{onClick:()=>{m.toast.success('Email personnalis\xe9 cr\xe9\xe9 et ajout\xe9 \xe0 "Mes Emails"'),T(!1),O({name:"",subject:"",content:""})},className:"px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-500 transition-colors",children:"Cr\xe9er l'Email"})]})]})}),f&&I&&s.jsx("div",{className:"fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50",children:(0,s.jsxs)("div",{className:"bg-gray-800 rounded-lg p-6 w-full max-w-6xl mx-4 max-h-[90vh] overflow-y-auto",children:[(0,s.jsxs)("div",{className:"flex justify-between items-start mb-6",children:[(0,s.jsxs)("div",{className:"flex items-center space-x-3",children:[s.jsx("h3",{className:"text-xl font-semibold text-white",children:"Cr\xe9er un Email Personnalis\xe9"}),s.jsx("span",{className:"px-3 py-1 bg-blue-600 text-white text-sm rounded-full",children:I.category})]}),s.jsx("button",{onClick:()=>j(!1),className:"text-gray-400 hover:text-white",children:s.jsx(u.Z,{className:"h-6 w-6"})})]}),(0,s.jsxs)("div",{className:"grid grid-cols-1 lg:grid-cols-2 gap-6",children:[(0,s.jsxs)("div",{className:"space-y-4",children:[(0,s.jsxs)("div",{className:"flex items-center space-x-2 mb-4",children:[s.jsx(c.Z,{className:"h-5 w-5 text-blue-400"}),s.jsx("h4",{className:"text-lg font-medium text-white",children:"Template de Base"})]}),(0,s.jsxs)("div",{children:[s.jsx("label",{className:"block text-sm font-medium text-gray-300 mb-2",children:"OBJET ORIGINAL"}),s.jsx("div",{className:"px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white min-h-[40px] flex items-center",children:I.subject})]}),(0,s.jsxs)("div",{children:[s.jsx("label",{className:"block text-sm font-medium text-gray-300 mb-2",children:"CONTENU ORIGINAL"}),s.jsx("div",{className:"px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white min-h-[200px] whitespace-pre-wrap",children:I.body})]})]}),(0,s.jsxs)("div",{className:"space-y-4",children:[(0,s.jsxs)("div",{className:"flex items-center space-x-2 mb-4",children:[s.jsx(d.Z,{className:"h-5 w-5 text-blue-400"}),s.jsx("h4",{className:"text-lg font-medium text-white",children:"Votre Version"})]}),(0,s.jsxs)("div",{className:"flex space-x-2 mb-4",children:[s.jsx("button",{onClick:B,disabled:C,className:`px-3 py-1 text-sm rounded-md transition-colors ${C?"bg-gray-600 text-gray-400 cursor-not-allowed":"bg-blue-600 text-white hover:bg-blue-500"}`,children:C?"G\xe9n\xe9ration...":"Variation"}),s.jsx("button",{className:"px-3 py-1 bg-gray-600 text-gray-300 text-sm rounded-md hover:bg-gray-500",children:"Proposer RDV"}),s.jsx("button",{className:"px-3 py-1 bg-gray-600 text-gray-300 text-sm rounded-md hover:bg-gray-500",children:"Original"})]}),(0,s.jsxs)("div",{children:[s.jsx("label",{className:"block text-sm font-medium text-gray-300 mb-2",children:"Objet de l'email"}),s.jsx("input",{type:"text",value:w.subject,onChange:e=>S({...w,subject:e.target.value}),className:"w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"})]}),(0,s.jsxs)("div",{children:[s.jsx("label",{className:"block text-sm font-medium text-gray-300 mb-2",children:"Contenu de l'email"}),s.jsx("textarea",{rows:10,value:w.content,onChange:e=>S({...w,content:e.target.value}),className:"w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"})]})]})]}),(0,s.jsxs)("div",{className:"flex justify-between mt-6",children:[(0,s.jsxs)("button",{onClick:()=>j(!1),className:"px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-500 transition-colors flex items-center space-x-2",children:[s.jsx(u.Z,{className:"h-4 w-4"}),s.jsx("span",{children:"Annuler"})]}),(0,s.jsxs)("button",{onClick:()=>{m.toast.success('Template personnalis\xe9 cr\xe9\xe9 et ajout\xe9 \xe0 "Mes Emails"'),j(!1)},className:"px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-500 transition-colors flex items-center space-x-2",children:[s.jsx(p.Z,{className:"h-4 w-4"}),s.jsx("span",{children:"Enregistrer"})]})]})]})})]})}):s.jsx("div",{className:"min-h-screen bg-gray-900",children:s.jsx("div",{className:"max-w-7xl mx-auto p-6",children:(0,s.jsxs)("div",{className:"animate-pulse",children:[s.jsx("div",{className:"h-8 bg-gray-700 rounded w-1/3 mb-4"}),s.jsx("div",{className:"h-64 bg-gray-700 rounded"})]})})})}},2295:(e,t,r)=>{"use strict";e.exports=r(6372).vendored["react-ssr"].ReactJsxRuntime},2917:(e,t,r)=>{"use strict";r.r(t),r.d(t,{default:()=>l,metadata:()=>o});var s=r(5036),a=r(265),n=r.n(a);r(7272);var i=r(7171);let o={title:"LeadPilot - Plateforme de G\xe9n\xe9ration de Leads B2B",description:"G\xe9n\xe9rez, qualifiez et g\xe9rez vos leads B2B avec l'IA et l'automatisation des s\xe9quences d'emails."};function l({children:e}){return s.jsx("html",{lang:"fr",children:(0,s.jsxs)("body",{className:n().className,children:[s.jsx("div",{className:"min-h-screen bg-gray-50",children:e}),s.jsx(i.x7,{position:"top-right",richColors:!0,closeButton:!0})]})})}},4585:(e,t,r)=>{"use strict";r.r(t),r.d(t,{$$typeof:()=>n,__esModule:()=>a,default:()=>i});let s=(0,r(6843).createProxy)(String.raw`C:\Users\benja\Desktop\LeadPilot SaaS\LeadPilot\app\templates\page.tsx`),{__esModule:a,$$typeof:n}=s,i=s.default},7272:()=>{},4596:(e,t,r)=>{"use strict";r.d(t,{Z:()=>a});var s=r(3729);let a=s.forwardRef(function({title:e,titleId:t,...r},a){return s.createElement("svg",Object.assign({xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24",strokeWidth:1.5,stroke:"currentColor","aria-hidden":"true","data-slot":"icon",ref:a,"aria-labelledby":t},r),e?s.createElement("title",{id:t},e):null,s.createElement("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"m4.5 12.75 6 6 9-13.5"}))})},454:(e,t,r)=>{"use strict";r.d(t,{Z:()=>a});var s=r(3729);let a=s.forwardRef(function({title:e,titleId:t,...r},a){return s.createElement("svg",Object.assign({xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24",strokeWidth:1.5,stroke:"currentColor","aria-hidden":"true","data-slot":"icon",ref:a,"aria-labelledby":t},r),e?s.createElement("title",{id:t},e):null,s.createElement("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z"}))})},7993:(e,t,r)=>{"use strict";r.d(t,{Z:()=>a});var s=r(3729);let a=s.forwardRef(function({title:e,titleId:t,...r},a){return s.createElement("svg",Object.assign({xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24",strokeWidth:1.5,stroke:"currentColor","aria-hidden":"true","data-slot":"icon",ref:a,"aria-labelledby":t},r),e?s.createElement("title",{id:t},e):null,s.createElement("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"}),s.createElement("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"}))})},3969:(e,t,r)=>{"use strict";r.d(t,{Z:()=>a});var s=r(3729);let a=s.forwardRef(function({title:e,titleId:t,...r},a){return s.createElement("svg",Object.assign({xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24",strokeWidth:1.5,stroke:"currentColor","aria-hidden":"true","data-slot":"icon",ref:a,"aria-labelledby":t},r),e?s.createElement("title",{id:t},e):null,s.createElement("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z"}))})},8138:(e,t,r)=>{"use strict";r.d(t,{Z:()=>a});var s=r(3729);let a=s.forwardRef(function({title:e,titleId:t,...r},a){return s.createElement("svg",Object.assign({xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24",strokeWidth:1.5,stroke:"currentColor","aria-hidden":"true","data-slot":"icon",ref:a,"aria-labelledby":t},r),e?s.createElement("title",{id:t},e):null,s.createElement("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125"}))})},3759:(e,t,r)=>{"use strict";r.d(t,{Z:()=>a});var s=r(3729);let a=s.forwardRef(function({title:e,titleId:t,...r},a){return s.createElement("svg",Object.assign({xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24",strokeWidth:1.5,stroke:"currentColor","aria-hidden":"true","data-slot":"icon",ref:a,"aria-labelledby":t},r),e?s.createElement("title",{id:t},e):null,s.createElement("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M12 4.5v15m7.5-7.5h-15"}))})},2954:(e,t,r)=>{"use strict";r.d(t,{Z:()=>a});var s=r(3729);let a=s.forwardRef(function({title:e,titleId:t,...r},a){return s.createElement("svg",Object.assign({xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24",strokeWidth:1.5,stroke:"currentColor","aria-hidden":"true","data-slot":"icon",ref:a,"aria-labelledby":t},r),e?s.createElement("title",{id:t},e):null,s.createElement("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456ZM16.894 20.567 16.5 21.75l-.394-1.183a2.25 2.25 0 0 0-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 0 0 1.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 0 0 1.423 1.423l1.183.394-1.183.394a2.25 2.25 0 0 0-1.423 1.423Z"}))})},7602:(e,t,r)=>{"use strict";r.d(t,{Z:()=>a});var s=r(3729);let a=s.forwardRef(function({title:e,titleId:t,...r},a){return s.createElement("svg",Object.assign({xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24",strokeWidth:1.5,stroke:"currentColor","aria-hidden":"true","data-slot":"icon",ref:a,"aria-labelledby":t},r),e?s.createElement("title",{id:t},e):null,s.createElement("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M6 18 18 6M6 6l12 12"}))})}};var t=require("../../webpack-runtime.js");t.C(e);var r=e=>t(t.s=e),s=t.X(0,[638,634],()=>r(1782));module.exports=s})();