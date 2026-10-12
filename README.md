# Landing Page de Alto Padrão — Ana Carolina | Terapeuta Manual

Esta é uma Landing Page moderna, responsiva e de alta conversão, desenvolvida especialmente para o mercado de bem-estar, estética integrada e saúde de alto padrão para a cliente **Ana Carolina**.

---

## 💎 Identidade Visual e Diretrizes de Marca

- **Paleta de Cores Oficial:**
  - **Fundo Principal:** Creme / Off-White suave (`#F9F7F2` e nuances `#FDFBF8` / `#F2EDE2`).
  - **Títulos e Textos Principais:** Verde Escuro Profundo / Verde Folha (`#1A3C34` e `#112823`).
  - **Destaques, Botões e Divisórias:** Dourado Elegante Real (`#C5A059`, `#DFC288` e `#A4813A`).
- **Tipografia:**
  - **Títulos e Destaques:** *Playfair Display* (Serifada clássica e sofisticada).
  - **Textos e Formulários:** *Plus Jakarta Sans* (Sans-serif moderna e ultra-legível).
  - **Assinatura e Slogans:** *Alex Brush* (Caligráfica para a frase *"Cuidar de você, transformar sua essência. ♡"*).
- **Regra Fundamental de Posicionamento:**
  - Título profissional exclusivo: **Terapeuta Manual** (sem uso de termos genéricos ou massagista).

---

## 📁 Estrutura de Arquivos

```
Ana_carolina_terapeuta_manual/
│
├── index.html                 # Código HTML5 semântico completo da Landing Page
├── server.js                  # Servidor local Node.js zero-dependency para preview
├── README.md                  # Instruções de uso e personalização
│
├── assets/
│   ├── css/
│   │   └── style.css          # Estilos complementares, gradientes dourados, animações suaves
│   └── js/
│       └── main.js            # Lógica interativa, formulário, WhatsApp e FAQ accordion
│
├── fotos/
│   ├── logomarca.png          # Logomarca oficial (Header e Footer)
│   ├── cliente-1.jpg          # Foto da profissional na seção Hero (Primeira Dobra)
│   └── cliente-2.jpg          # Foto da profissional na seção Sobre a Terapeuta
│
└── public/
    └── fotos/                 # Cópia dos arquivos originais e compatibilidade
```

---

## 🚀 Como Executar o Projeto

Você tem duas maneiras muito simples de visualizar o site:

### Opção 1: Diretamente no Navegador (Sem servidor)
Basta dar um duplo clique no arquivo [`index.html`](file:///d:/job_ssd/Ana_carolina_terapeuta_manual/index.html) para abri-lo em qualquer navegador (Google Chrome, Edge, Safari, etc.).

### Opção 2: Via Servidor Local Node.js
Se preferir rodar em um servidor HTTP local:
```bash
node server.js
```
Em seguida, acesse no navegador:
👉 `http://localhost:3000`

---

## ⚙️ Como Personalizar

### 1. Número do WhatsApp
O WhatsApp oficial já está configurado no arquivo [`assets/js/main.js`](file:///d:/job_ssd/Ana_carolina_terapeuta_manual/assets/js/main.js):
```javascript
const WHATSAPP_PHONE = '5562994467074'; // Telefone da Ana Carolina (Goiânia - GO)
```

### 2. Endereço e Horários de Atendimento
No arquivo [`index.html`](file:///d:/job_ssd/Ana_carolina_terapeuta_manual/index.html), localize a seção `<!-- Coluna 4: Informações de Contato & Localização -->` no rodapé (Footer) para personalizar o endereço físico da clínica e os horários de funcionamento.
