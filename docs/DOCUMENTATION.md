# 🔗 Roadmap Technique – Redirection vers Confluence

Cette documentation est une synthèse des étapes clés de la roadmap de sécurisation, structuration et industrialisation des services.  
[Résumé du projet](https://t-nsa-810.atlassian.net/wiki/spaces/dop/pages/98309/CIA+-+Consolidate+Investigate+Administrate)

## 1. Sécurisation de l’infrastructure

**Objectif :** Protéger l’infrastructure et corriger les vulnérabilités avant tout changement.  
**Lien Confluence :**
- [Tests de pénétration VM 01](https://t-nsa-810.atlassian.net/wiki/spaces/dop/pages/15204374/Rapport+PenTest+-+VM+1) - [Details d'attaque](https://t-nsa-810.atlassian.net/wiki/spaces/dop/pages/14024705/Exploit+-+VM+1)

- [Tests de pénétration VM 02](https://t-nsa-810.atlassian.net/wiki/spaces/dop/pages/19628033/Rapport+PenTest+-+VM+2) - [Details d'attaque](https://t-nsa-810.atlassian.net/wiki/spaces/dop/pages/24576001/Exploit+-+VM+2)

- [Tests de pénétration VM 03](https://t-nsa-810.atlassian.net/wiki/spaces/dop/pages/20119553/Rapport+PenTest+-+VM+3) - [Details d'attaque](https://t-nsa-810.atlassian.net/wiki/spaces/dop/pages/19922957/Exploit+-+VM+3)

- [Audit frontend](https://t-nsa-810.atlassian.net/wiki/spaces/dop/pages/2031669/Audit+Frontend) - [Document de migration](https://t-nsa-810.atlassian.net/wiki/spaces/dop/pages/3670035/Document+de+Migration+-+Frontend)
- [Audit backend](https://t-nsa-810.atlassian.net/wiki/spaces/dop/pages/1998934/Audit+Backend) - [Document de migration](https://t-nsa-810.atlassian.net/wiki/spaces/dop/pages/6717441/Document+de+Migration+-+Backend)

### Actions clés
- Audit de sécurité (API & WebApp)
- Exploitation contrôlée de failles (ex: Dirty COW)
- Renforcement des mots de passe
- Correction des accès non sécurisés
- Documentation complète des vulnérabilités et correctifs

### Livrable
- Rapport d’audit et de patching

---

## 2. Système de logs pour l’API

**Objectif :** Garantir la traçabilité des actions API.  
**Lien Confluence :** [Voir la section complète](https://t-nsa-810.atlassian.net/wiki/spaces/dop/pages/9109505/Logs)

### Actions clés
- Mise en place d’un système de logs centralisé

### Livrables
- Système de logs testé

---

## 3. Séparation & Conteneurisation

**Objectif :** Isoler et sécuriser les services via des conteneurs.  
**Lien Confluence :**
- [Audit docker](https://t-nsa-810.atlassian.net/wiki/spaces/dop/pages/2031617/Audit+Docker+Docker-compose) - [Evolution de la structure](https://t-nsa-810.atlassian.net/wiki/spaces/dop/pages/1933339/volution+de+la+structure+Docker)

### Actions clés
- API & WebApp sur VM séparées
- Scripts de lancement sécurisés

### Livrables
- Architecture mise à jour
- Conteneurs sécurisés

---

## 4. CI/CD via Github

**Objectif :** Automatiser les livraisons pour fiabilité et rapidité.  
**Lien Confluence :** [Voir la section complète](https://t-nsa-810.atlassian.net/wiki/spaces/dop/pages/6455309/Build+Push+Docker+images)

### Actions clés
- Installation Github
- Pipeline CI/CD (build, test, déploiement)
- Tests de validation

### Livrable
- Pipeline Github opérationnelle

---

## 5. Gestion des artefacts

**Objectif :** Centraliser et tracer les livraisons logicielles.  
**Lien Confluence :** [Voir la section complète](https://t-nsa-810.atlassian.net/wiki/spaces/dop/pages/6520838/Nexus)

### Actions clés
- Installation (Nexus)
- Intégration à CI/CD
- Tests du flux complet

### Livrable
- Système de gestion d’artefacts fonctionnel
