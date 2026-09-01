// Estudo Profundo & Prática Diária: A Bíblia em Blocos

const CURADORIA_EXEGETICA = [
  // 1. O PENTATEUCO (A LEI)
  {
    livroId: 'genesis',
    capitulo: 1,
    versiculo: 27,
    referenciaCompleta: 'Gênesis 1:27',
    blocoNome: 'Gênesis - Bloco 1 (Cap. 1-11: Origens)',
    profundidadeExegetica: 'O termo hebraico Tselem (imagem) e Demuth (semelhança) indica que o ser humano foi criado para ser um representante visível da autoridade do Criador na terra, não apenas um ser biológico.',
    conexaoHumana: 'Revela a busca incessante do ser humano por identidade e valor, frequentemente esquecendo que sua dignidade já é inata e dada por Deus.',
    aplicacaoPratica: 'Olhe no espelho hoje e, antes de criticar sua aparência ou status, declare em voz alta que você carrega a imagem do Criador. Trate a próxima pessoa que encontrar com essa mesma dignidade.'
  },
  {
    livroId: 'genesis',
    capitulo: 12,
    versiculo: 1,
    referenciaCompleta: 'Gênesis 12:1-2',
    blocoNome: 'Gênesis - Bloco 2 (Cap. 12-36: Os Patriarcas)',
    profundidadeExegetica: 'O imperativo Lekh-lekha (sai/vai para ti mesmo) exige que Abrão abandone sua segurança geográfica e familiar em troca de uma promessa invisível, marcando o início da fé pactual.',
    conexaoHumana: 'Expõe nossa dependência do conforto e do controle, mostrando como o medo do desconhecido paralisa nosso propósito.',
    aplicacaoPratica: 'Identifique uma "zona de conforto" que está impedindo seu crescimento (um hábito, um medo) e tome hoje a primeira atitude prática para abandoná-la.'
  },
  {
    livroId: 'genesis',
    capitulo: 50,
    versiculo: 20,
    referenciaCompleta: 'Gênesis 50:20',
    blocoNome: 'Gênesis - Bloco 3 (Cap. 37-50: A História de José)',
    profundidadeExegetica: 'O verbo hebraico Chashab (intencionar/planejar) é usado duas vezes de forma contrastante: a intenção humana para o mal foi "recalculada" pela providência divina para a salvação.',
    conexaoHumana: 'Mostra a nossa tendência de guardar rancor e focar apenas na ofensa sofrida, em vez de enxergar o quadro maior do propósito na dor.',
    aplicacaoPratica: 'Libere perdão hoje a alguém que lhe prejudicou no passado, reconhecendo que essa experiência dolorosa forjou a maturidade que você tem agora.'
  },

  // --- SUPER EXPANSÃO: O ANTIGO TESTAMENTO COMPLETO ---
  // PENTATEUCO
  {
    livroId: 'genesis',
    capitulo: 3,
    versiculo: 15,
    referenciaCompleta: 'Gênesis 3:15',
    blocoNome: 'Gênesis (O Protoevangelho)',
    profundidadeExegetica: 'O "Protoevangelho". A promessa de que a "semente" (Zera) da mulher esmagaria a cabeça da serpente. É a primeira profecia messiânica, estabelecendo que a redenção humana não viria por um esforço moral, mas por um libertador que sofreria (calcanhar ferido) para aniquilar o mal.',
    conexaoHumana: 'Revela que, desde o primeiro segundo da nossa falha e rebelião, a resposta de Deus não foi o extermínio, mas o planejamento imediato de um resgate.',
    aplicacaoPratica: 'Ao falhar miseravelmente em algo hoje, não se esconda (como Adão fez). Vá direto a Deus em oração, sabendo que a graça dEle sempre se move mais rápido que o seu pecado.'
  },
  {
    livroId: 'exodo',
    capitulo: 14,
    versiculo: 14,
    referenciaCompleta: 'Êxodo 14:14',
    blocoNome: 'Êxodo (O Livramento no Mar)',
    profundidadeExegetica: '"O Senhor pelejará por vós, e vós vos calareis (Charash)." O verbo hebraico denota ficar em silêncio absoluto, ser surdo às ameaças. Diante do Mar Vermelho e do exército egípcio, a ordem não era lutar, mas silenciar o pânico para ver o livramento divino.',
    conexaoHumana: 'O instinto humano diante do desespero é gritar, reclamar e tentar controlar as variáveis. O pânico nos ensurdece para as instruções de Deus.',
    aplicacaoPratica: 'Diante de um conflito ou crise hoje, antes de tentar se justificar ou entrar em desespero vocal, fique literalmente em silêncio por 2 minutos entregando a defesa a Deus.'
  },
  {
    livroId: 'levitico',
    capitulo: 10,
    versiculo: 3,
    referenciaCompleta: 'Levítico 10:3',
    blocoNome: 'Levítico (Reverência na Adoração)',
    profundidadeExegetica: 'Após Nadabe e Abiú oferecerem "fogo estranho" (Esh zarah - fogo não autorizado/profano), Deus declara: "Serei santificado naqueles que se cheguem a mim". A adoração não pode ser moldada pela criatividade carnal; ela tem regras estabelecidas pelo Criador.',
    conexaoHumana: 'Confronta a soberba moderna de querer adorar a Deus "do nosso próprio jeito", ignorando a reverência e tratando o sagrado de forma leviana e comum.',
    aplicacaoPratica: 'Avalie a sua postura física e mental no próximo culto ou momento de oração. Remova as distrações e aja com profunda reverência, não tratando a oração como um bate-papo banal.'
  },
  {
    livroId: 'numeros',
    capitulo: 23,
    versiculo: 19,
    referenciaCompleta: 'Números 23:19',
    blocoNome: 'Números (Imutabilidade de Deus)',
    profundidadeExegetica: '"Deus não é homem, para que minta; nem filho do homem, para que se arrependa (Nacham)." O oráculo de Balaão decreta a imutabilidade absoluta das promessas divinas. A palavra de Deus não sofre flutuações de humor ou de circunstância.',
    conexaoHumana: 'Nós projetamos as falhas das nossas figuras de autoridade terrenas (pais, chefes, políticos) em Deus, vivendo com medo de que Ele mude de ideia a nosso respeito.',
    aplicacaoPratica: 'Escreva uma promessa bíblica que você conhece em um post-it hoje. Olhe para ela e declare: "Isso não vai mudar, independentemente de como eu estou me sentindo hoje."'
  },
  {
    livroId: 'deuteronomio',
    capitulo: 8,
    versiculo: 17,
    referenciaCompleta: 'Deuteronômio 8:17-18',
    blocoNome: 'Deuteronômio (A Origem da Força)',
    profundidadeExegetica: 'O aviso contra dizer: "A minha força me adquiriu estas riquezas". A ordem é lembrar (Zakar) que é o Senhor quem dá o poder (Koach) para adquirir riqueza. A inteligência financeira e a força de trabalho são dons delegados, não méritos autônomos.',
    conexaoHumana: 'Denuncia a arrogância do homem próspero. Quanto mais ricos ou bem-sucedidos nos tornamos, mais fácil é esquecermos de Deus e idolatrarmos o nosso próprio currículo.',
    aplicacaoPratica: 'Antes de iniciar o seu expediente de trabalho hoje, ore reconhecendo que até mesmo a sua capacidade de pensar, respirar e produzir são presentes da misericórdia de Deus.'
  },

  // LIVROS HISTÓRICOS
  {
    livroId: 'josue',
    capitulo: 7,
    versiculo: 13,
    referenciaCompleta: 'Josué 7:13',
    blocoNome: 'Josué (A Consequência do Pecado Oculto)',
    profundidadeExegetica: '"Há anátema (Cherem - coisa consagrada à destruição) no meio de ti, Israel." O pecado oculto de um único homem (Acã) paralisou todo o exército de Israel em Ai. A santidade é comunitária, e o pecado privado tem consequências públicas.',
    conexaoHumana: 'Destrói a mentira de que "o meu pecado não faz mal a ninguém além de mim". Nossas concessões secretas vazam e afetam nossa família e ambiente de trabalho.',
    aplicacaoPratica: 'Identifique um comportamento destrutivo que você faz "escondido". Jogue fora hoje o objeto, arquivo ou aplicativo que funciona como gatilho para esse erro oculto.'
  },
  {
    livroId: 'juizes',
    capitulo: 6,
    versiculo: 12,
    referenciaCompleta: 'Juízes 6:12',
    blocoNome: 'Juízes (Visão Divina do Potencial)',
    profundidadeExegetica: 'O anjo chama Gideão de "homem valoroso" (Gibbor chayil - guerreiro poderoso) enquanto ele estava escondido num lagar malhando trigo por medo. Deus define Gideão pelo potencial da aliança, não pela sua covardia momentânea.',
    conexaoHumana: 'Sofremos de síndrome do impostor e nos rotulamos pelas nossas falhas e medos, enquanto Deus nos rotula pelo que Ele pode fazer através de nós.',
    aplicacaoPratica: 'Quando o pensamento "eu não sou capaz de fazer isso" surgir hoje, responda em voz alta lembrando de como Deus chamou você antes mesmo de você estar pronto.'
  },
  {
    livroId: 'rute',
    capitulo: 4,
    versiculo: 14,
    referenciaCompleta: 'Rute 4:14',
    blocoNome: 'Rute (O Resgatador)',
    profundidadeExegetica: 'As mulheres celebram porque Deus não deixou Noemi sem um "Resgatador" (Go\'el). O Go\'el era o parente próximo com o dever legal de resgatar terras perdidas e proteger viúvas. Boaz é a tipologia exata de Cristo redimindo a humanidade falida.',
    conexaoHumana: 'Mostra o desamparo humano perante as tragédias (Noemi perdeu marido, filhos e bens). Nossa redenção não vem de lutar mais forte, mas de sermos resgatados por Alguém maior.',
    aplicacaoPratica: 'Se você está tentando resolver um problema impossível com suas próprias forças, pare hoje. Peça socorro a alguém mais experiente ou ore transferindo a causa para Jesus.'
  },
  {
    livroId: '1samuel',
    capitulo: 16,
    versiculo: 7,
    referenciaCompleta: '1 Samuel 16:7',
    blocoNome: '1 Samuel (O Olhar no Coração)',
    profundidadeExegetica: '"O Senhor não vê como vê o homem, pois o homem vê o que está diante dos olhos, porém o Senhor olha para o coração (Lev)." A rejeição do biotipo de rei (Eliabe) em favor do pastor esquecido (Davi) prova que a avaliação divina ignora currículos estéticos.',
    conexaoHumana: 'Vivemos na "sociedade da imagem" (Instagram/LinkedIn), onde o valor é medido por embalagem, beleza e status, gerando um teatro de aparências exaustivo e deprimente.',
    aplicacaoPratica: 'Não tome hoje nenhuma decisão importante sobre pessoas (contratar, fazer parceria ou iniciar namoro) baseando-se apenas na primeira impressão estética ou no carisma.'
  },
  {
    livroId: '2samuel',
    capitulo: 12,
    versiculo: 7,
    referenciaCompleta: '2 Samuel 12:7',
    blocoNome: '2 Samuel (O Confronto Moral)',
    profundidadeExegetica: '"Tu és este homem!" (Attah ha-ish). A frase fulminante do profeta Natã despedaça a hipocrisia de Davi, que condenou a injustiça da parábola da ovelha, ignorando que o vilão adúltero e assassino era ele mesmo.',
    conexaoHumana: 'Expõe nossa cegueira moral seletiva. Somos rápidos e implacáveis para condenar os erros dos outros nas redes sociais, mas geniais em dar desculpas para os nossos próprios crimes morais.',
    aplicacaoPratica: 'Se você está irritado com o comportamento de alguém hoje, olhe no espelho primeiro. Analise se você não está cometendo uma variação do mesmo erro na sua própria casa.'
  },
  {
    livroId: '1reis',
    capitulo: 19,
    versiculo: 11,
    referenciaCompleta: '1 Reis 19:11-12',
    blocoNome: '1 Reis (O Sussurro Silencioso)',
    profundidadeExegetica: 'Deus não estava no vento, no terremoto ou no fogo, mas em uma "voz mansa e delicada" (Qol demamah daqah - um sussurro silencioso). Elias, viciado em demonstrações de poder e fogo (Carmelo), precisava aprender a ouvir Deus na normalidade.',
    conexaoHumana: 'Queremos eventos espetaculares, sinais no céu e profecias dramáticas para "sentirmos" Deus, ignorando que a verdadeira maturidade se encontra no cotidiano e no silêncio.',
    aplicacaoPratica: 'Desligue a música, o rádio do carro ou a TV por 15 minutos hoje. Fique no silêncio absoluto para acalmar seus pensamentos e ouvir o "sussurro" de Deus através da Bíblia.'
  },
  {
    livroId: '2reis',
    capitulo: 6,
    versiculo: 16,
    referenciaCompleta: '2 Reis 6:16',
    blocoNome: '2 Reis (Os Olhos da Fé)',
    profundidadeExegetica: '"Não temas; porque mais são os que estão conosco do que os que estão com eles." Eliseu pede a Deus para abrir os olhos de seu servo assustado para ver o monte cheio de cavalos e carros de fogo (providência angelical invisível).',
    conexaoHumana: 'O pânico é resultado da nossa visão limitada. Quando focamos apenas na oposição visível (dívidas, diagnósticos, inimigos), esquecemos os recursos invisíveis que nos sustentam.',
    aplicacaoPratica: 'Quando sentir medo de uma ameaça iminente hoje, ore pedindo a Deus não para mudar o problema, mas para "abrir os seus olhos" para enxergar as soluções ocultas.'
  },
  {
    livroId: '1cronicas',
    capitulo: 4,
    versiculo: 10,
    referenciaCompleta: '1 Crônicas 4:10',
    blocoNome: '1 Crônicas (A Oração de Jabez)',
    profundidadeExegetica: 'Jabez, cujo nome significa "Dor", recusa-se a ser definido pelo seu passado. Ele pede a Deus que "alargue suas fronteiras" e que Sua mão o preserve do mal. É a rejeição do fatalismo.',
    conexaoHumana: 'Muitas pessoas aceitam a miséria, o vício familiar ou o trauma como seu "destino" irreversível, aceitando passivamente rótulos tóxicos colocados pelos outros.',
    aplicacaoPratica: 'Rejeite um rótulo limitante que alguém colocou em você (ex: "você é desorganizado igual seu pai"). Assuma uma atitude hoje que prove o contrário.'
  },
  {
    livroId: '2cronicas',
    capitulo: 20,
    versiculo: 12,
    referenciaCompleta: '2 Crônicas 20:12',
    blocoNome: '2 Crônicas (A Dependência em Crises)',
    profundidadeExegetica: '"Não sabemos nós o que fazer; porém os nossos olhos estão postos em ti." A oração do Rei Josafá diante de três exércitos invasores é a admissão perfeita de incapacidade estratégica atrelada à submissão total.',
    conexaoHumana: 'Escondemos nossa ignorância por orgulho, fingindo saber o que fazer. A vulnerabilidade de admitir "eu não sei" é a chave que destranca a sabedoria divina.',
    aplicacaoPratica: 'Em vez de tentar adivinhar a resposta num problema complexo do trabalho hoje, diga abertamente "eu não sei a resposta agora, mas vou buscar orientação" (e leve isso a Deus).'
  },
  {
    livroId: 'esdras',
    capitulo: 9,
    versiculo: 6,
    referenciaCompleta: 'Esdras 9:6',
    blocoNome: 'Esdras (Confissão Corporativa)',
    profundidadeExegetica: 'Esdras ora: "Estou confuso e envergonhado... porque as nossas iniquidades se multiplicaram." Ele não pecou na questão dos casamentos mistos, mas assumiu a culpa corporativa da nação, orando na primeira pessoa do plural.',
    conexaoHumana: 'Vivemos na era da terceirização de culpa. Líderes jogam a culpa na equipe, e maridos culpam as esposas. O verdadeiro líder assume a responsabilidade pelo grupo.',
    aplicacaoPratica: 'Se a sua equipe, família ou setor do trabalho cometeu um erro hoje, não aponte dedos. Assuma a responsabilidade junto com eles para consertar o problema.'
  },
  {
    livroId: 'neemias',
    capitulo: 8,
    versiculo: 10,
    referenciaCompleta: 'Neemias 8:10',
    blocoNome: 'Neemias (A Alegria que Fortalece)',
    profundidadeExegetica: '"A alegria do Senhor é a vossa força (Ma\'oz - fortaleza/refúgio)." Quando o povo chorou ao entender a Lei e perceber seus pecados, Neemias ordenou festa. A força não vem de viver chorando de remorso, mas da alegria do perdão concedido.',
    conexaoHumana: 'Muitas vezes associamos santidade à depressão ou tristeza severa. O luto pelo pecado deve existir, mas tem que dar lugar à alegria imensa da reconciliação, que é o nosso motor.',
    aplicacaoPratica: 'Não passe o dia inteiro se culpando. Substitua o clima pesado de remorso hoje por uma atitude leve e comemore uma pequena vitória diária no seu lar ou trabalho.'
  },
  {
    livroId: 'ester',
    capitulo: 3,
    versiculo: 2,
    referenciaCompleta: 'Ester 3:2',
    blocoNome: 'Ester (A Integridade de Mardoqueu)',
    profundidadeExegetica: '"Porém Mardoqueu não se inclinava, nem se prostrava" diante de Hamã. Em um império persa onde todos se curvaram por pressão política e medo, a recusa de Mardoqueu evidencia a desobediência civil baseada no Primeiro Mandamento.',
    conexaoHumana: 'Revela a pressão brutal da cultura para que o indivíduo "se curve" (ceda, negocie princípios, minta) para ser aceito ou promovido.',
    aplicacaoPratica: 'Se alguém no ambiente acadêmico ou corporativo lhe pedir hoje para fazer algo que fira sua integridade cristã, diga "não" de forma educada, porém inegociável.'
  },

  // LIVROS POÉTICOS
  {
    livroId: 'jo',
    capitulo: 19,
    versiculo: 25,
    referenciaCompleta: 'Jó 19:25',
    blocoNome: 'Jó (A Visão do Redentor)',
    profundidadeExegetica: '"Porque eu sei que o meu Redentor (Go\'el) vive, e que por fim se levantará sobre a terra." No auge do sofrimento e com a pele caindo, Jó tem uma visão profética absurda de um vindicador vivo que garantirá sua justiça pós-morte.',
    conexaoHumana: 'A dor física ou emocional extrema frequentemente rouba nossa capacidade de ver o futuro. A fé verdadeira projeta a esperança para além da circunstância dolorosa imediata.',
    aplicacaoPratica: 'Declare esperança ativa. Quando estiver desanimado com o cenário de hoje, declare em voz alta qual é a verdade imutável que te aguarda no futuro.'
  },
  {
    livroId: 'salmos',
    capitulo: 139,
    versiculo: 23,
    referenciaCompleta: 'Salmos 139:23-24',
    blocoNome: 'Salmos (O Sonda-me de Davi)',
    profundidadeExegetica: '"Sonda-me (Chaqar - investigar a fundo), ó Deus, e conhece o meu coração... e vê se há em mim algum caminho mau." Davi não confia no seu próprio autodiagnóstico moral e convida o tribunal divino para expor seus pontos cegos.',
    conexaoHumana: 'Nossa capacidade de nos autoenganarmos é assustadora. Sempre achamos que nossos motivos são puros. Precisamos de uma força externa para expor a malícia que escondemos de nós mesmos.',
    aplicacaoPratica: 'Faça esta oração exata antes de dormir hoje, pedindo a Deus que mostre a você (e não aos outros) em que ponto você está agindo com motivações erradas.'
  },
  {
    livroId: 'proverbios',
    capitulo: 15,
    versiculo: 1,
    referenciaCompleta: 'Provérbios 15:1',
    blocoNome: 'Provérbios (A Resposta Branda)',
    profundidadeExegetica: '"A resposta branda desvia o furor, mas a palavra dura suscita a ira." A palavra Maneh (resposta gentil) tem o poder físico de redirecionar a energia destrutiva da raiva. A sabedoria é desarmar o agressor com mansidão.',
    conexaoHumana: 'Somos viciados em ter a última palavra. O orgulho nos manda gritar mais alto quando alguém eleva o tom, resultando em destruição de amizades e casamentos.',
    aplicacaoPratica: 'Quando alguém lhe abordar com grosseria ou tom agressivo hoje (pessoalmente ou por mensagem), responda intencionalmente num tom extremamente baixo e calmo.'
  },
  {
    livroId: 'eclesiastes',
    capitulo: 12,
    versiculo: 13,
    referenciaCompleta: 'Eclesiastes 12:13',
    blocoNome: 'Eclesiastes (O Conclusão do Dever)',
    profundidadeExegetica: '"Teme a Deus, e guarda os seus mandamentos; porque isto é o dever de todo o homem." Após testar e provar a vaidade (Hebel) do dinheiro, sexo, filosofia e poder, Salomão conclui que o sentido ontológico da vida humana é a reverência e obediência ao Criador.',
    conexaoHumana: 'Desmascara o existencialismo moderno que procura o "sentido da vida" em viagens, carreiras ou experiências místicas. A vida só ganha eixo quando ancorada na ordem de Deus.',
    aplicacaoPratica: 'Pare de correr atrás do vento. Faça uma lista hoje das três obrigações fundamentais que Deus te deu (ex: cuidar do casamento, trabalhar honestamente) e gaste sua energia apenas nisso.'
  },
  {
    livroId: 'cantares',
    capitulo: 2,
    versiculo: 15,
    referenciaCompleta: 'Cantares 2:15',
    blocoNome: 'Cantares (As Raposinhas na Vinha)',
    profundidadeExegetica: '"Apanhai-nos as raposas, as raposinhas, que fazem mal às vinhas." A ordem na poesia nupcial é destruir as ameaças pequenas (raposinhas) que roem as raízes da videira antes que destruam os frutos do relacionamento.',
    conexaoHumana: 'Grandes casamentos e grandes amizades raramente são destruídos por explosões gigantes, mas pelas "raposinhas": alfinetadas, pequenas mentiras, falta de tempo e frieza não resolvida.',
    aplicacaoPratica: 'Resolva uma "raposinha" conjugal hoje. Sente-se com seu parceiro e trate um incômodo pequeno de rotina que vocês têm ignorado antes que se torne ressentimento.'
  },

  // PROFETAS MAIORES
  {
    livroId: 'isaias',
    capitulo: 40,
    versiculo: 31,
    referenciaCompleta: 'Isaías 40:31',
    blocoNome: 'Isaías (A Espera que Renova)',
    profundidadeExegetica: '"Os que esperam (Qavah - entrelaçar, aguardar ativamente) no Senhor renovarão as forças, subirão com asas como águias." A força humana natural e jovem se esgota (v. 30). A energia vital que vence o esgotamento vem exclusivamente de descansar ativamente na agenda de Deus.',
    conexaoHumana: 'Retrata nossa exaustão crônica porque tentamos resolver os problemas empurrando-os com nossa própria força e prazos estressantes.',
    aplicacaoPratica: 'Se você não aguenta mais o cansaço de um problema não resolvido, desista de tentar forçar a porta hoje. Confesse a Deus que você descansará até Ele abrir o caminho.'
  },
  {
    livroId: 'jeremias',
    capitulo: 17,
    versiculo: 9,
    referenciaCompleta: 'Jeremias 17:9',
    blocoNome: 'Jeremias (A Enganosa Natureza do Coração)',
    profundidadeExegetica: '"Enganoso (Aqov - tortuoso, cheio de curvas) é o coração, mais do que todas as coisas, e perverso; quem o conhecerá?" A refutação teológica máxima de que o ser humano é "bom em sua essência". O centro emocional é corrompido e mestre em disfarçar motivos impuros.',
    conexaoHumana: 'Destrói a frase motivacional moderna "Siga o seu coração". Seguir o coração não regenerado é o caminho mais rápido para a autodestruição ética e espiritual.',
    aplicacaoPratica: 'Desconfie das suas próprias intuições fortes de hoje. Não tome decisões radicais motivadas por chateação passageira; submeta essa emoção à racionalidade bíblica.'
  },
  {
    livroId: 'lamentacoes',
    capitulo: 3,
    versiculo: 21,
    referenciaCompleta: 'Lamentações 3:21',
    blocoNome: 'Lamentações (A Disciplina da Memória)',
    profundidadeExegetica: '"Disto me recordarei (Shuv lev - trazer de volta à mente) na minha mente; por isso esperarei." No abismo da destruição de Jerusalém, Jeremias interrompe seus pensamentos depressivos, forçando seu cérebro a focar na memória da misericórdia divina.',
    conexaoHumana: 'Mostra o princípio cognitivo da esperança: nós somos escravos daquilo em que pensamos. Se focarmos só na dor, desmoronamos. A esperança exige disciplina mental violenta.',
    aplicacaoPratica: 'Quando um pensamento angustiante ou depressivo atacar você hoje, interrompa-o falando em voz alta um motivo real e objetivo que você tem para ser grato.'
  },
  {
    livroId: 'ezequiel',
    capitulo: 33,
    versiculo: 6,
    referenciaCompleta: 'Ezequiel 33:6',
    blocoNome: 'Ezequiel (A Responsabilidade do Atalaia)',
    profundidadeExegetica: 'O princípio do atalaia (Tsaphah). Se o guarda vir a espada vir sobre a terra e não tocar a trombeta para avisar o povo, o sangue será cobrado de suas mãos. A liderança espiritual e a pregação carregam responsabilidade de vida ou morte.',
    conexaoHumana: 'Denuncia a covardia do "politicamente correto". Por medo de ofender as pessoas com a verdade bíblica, deixamos que caminhem cegamente para a ruína.',
    aplicacaoPratica: 'Não seja omisso. Alerte respeitosa e firmemente hoje um amigo cristão que está, de forma clara, caminhando em direção a um pecado ou hábito destrutivo.'
  },
  {
    livroId: 'daniel',
    capitulo: 1,
    versiculo: 8,
    referenciaCompleta: 'Daniel 1:8',
    blocoNome: 'Daniel (O Limite Inegociável)',
    profundidadeExegetica: '"Daniel assentou no seu coração (Sum lev) não se contaminar com a porção da iguaria do rei." O jovem exilado, privado dos pais e do Templo, traça uma linha vermelha inegociável em sua dieta antes mesmo da pressão começar. A santidade é predeterminada.',
    conexaoHumana: 'Mostra que as pessoas que vencem as grandes pressões da sociedade já decidiram o que vão fazer antes da tentação aparecer, não na hora da fome.',
    aplicacaoPratica: 'Tome uma decisão moral preventiva hoje pela manhã. Decida, antes de sair de casa, o limite do que você NÃO vai fazer (ou beber, ou falar) durante a confraternização ou reunião mais tarde.'
  },

  // PROFETAS MENORES
  {
    livroId: 'oseias',
    capitulo: 4,
    versiculo: 6,
    referenciaCompleta: 'Oséias 4:6',
    blocoNome: 'Oséias (A Falta de Conhecimento)',
    profundidadeExegetica: '"O meu povo foi destruído, porque lhe faltou o conhecimento (Da\'at)." A nação não pereceu por falta de armas ou exércitos, mas pela profunda ignorância intencional da teologia e da Lei do Senhor.',
    conexaoHumana: 'Ataca a apatia cristã moderna. Muitos fiéis querem bênçãos, mas recusam-se a estudar a Bíblia, tornando-se vítimas de seitas, charlatões e de seus próprios erros lógicos.',
    aplicacaoPratica: 'Pare de viver de "pílulas de internet". Dedique hoje pelo menos 20 minutos ininterruptos para a leitura profunda e estudo de um capítulo da Bíblia.'
  },
  {
    livroId: 'joel',
    capitulo: 2,
    versiculo: 25,
    referenciaCompleta: 'Joel 2:25',
    blocoNome: 'Joel (A Restituição dos Anos)',
    profundidadeExegetica: '"E restituir-vos-ei os anos que comeu o gafanhoto, a locusta..." A promessa de redenção do tempo. Deus é o único capaz de restaurar não apenas a colheita, mas os anos perdidos pela desobediência e pelo juízo.',
    conexaoHumana: 'Cura a depressão do passado. Frequentemente sofremos sentindo que jogamos fora os melhores anos de nossas vidas em casamentos ruins, vícios ou más escolhas, achando que o futuro acabou.',
    aplicacaoPratica: 'Abandone o luto pelo tempo perdido. Ore pedindo a Deus que traga produtividade e profundidade tão absurdas ao seu presente que compensem a década que passou.'
  },
  {
    livroId: 'amos',
    capitulo: 3,
    versiculo: 3,
    referenciaCompleta: 'Amós 3:3',
    blocoNome: 'Amós (Acordo e Caminhada)',
    profundidadeExegetica: '"Andarão dois juntos, se não estiverem de acordo (Ya\'ad)?" A raiz hebraica significa "fazer uma consulta conjunta, marcar um encontro". Implica que a comunhão e a caminhada só existem onde há alinhamento de direção e valores.',
    conexaoHumana: 'O texto fulmina parcerias desalinhadas (namoros em jugo desigual, sociedades comerciais sem ética compartilhada). Não podemos caminhar rumo a Deus de mãos dadas com quem corre para o pecado.',
    aplicacaoPratica: 'Avalie criticamente com quem você está planejando se associar (comercial ou romanticamente) hoje. Se os valores centrais estiverem conflitantes, interrompa o processo.'
  },
  {
    livroId: 'obadias',
    capitulo: 1,
    versiculo: 15,
    referenciaCompleta: 'Obadias 1:15',
    blocoNome: 'Obadias (A Lei do Retorno)',
    profundidadeExegetica: '"O dia do Senhor está perto sobre todas as nações; como tu fizeste, assim se fará contigo; o teu feito tornará sobre a tua cabeça." O princípio inescapável da retribuição divina contra Edom por ter rido da queda do irmão Israel (Judá).',
    conexaoHumana: 'É a resposta de Deus à nossa crueldade oculta. Quando nós nos alegramos com o tropeço de um rival ou de alguém de quem não gostamos, atraímos o mesmo juízo para nós.',
    aplicacaoPratica: 'Pare de celebrar a derrota alheia. Ore abençoando alguém que "caiu" e não repasse nenhuma notícia que se deleite com o escândalo ou fracasso dos outros.'
  },
  {
    livroId: 'jonas',
    capitulo: 2,
    versiculo: 9,
    referenciaCompleta: 'Jonas 2:9',
    blocoNome: 'Jonas (A Salvação Vem do Senhor)',
    profundidadeExegetica: '"A salvação vem do Senhor." Jonas profere esta teologia impecável debaixo d\'água, no ventre do grande peixe. O resgate ocorre apenas quando o orgulho acaba e o homem reconhece que é impotente para salvar a si mesmo.',
    conexaoHumana: 'Muitas vezes Deus precisa nos permitir afundar no caos das nossas próprias rebeldias até que toda a nossa autoconfiança quebre, para só então clamarmos por socorro genuíno.',
    aplicacaoPratica: 'Se você está tentando se livrar de um pecado oculto com seu próprio esforço e sempre falha, pare agora. Confesse seu fracasso total a Cristo e aceite que só Ele pode quebrar a corrente.'
  },
  {
    livroId: 'miqueias',
    capitulo: 7,
    versiculo: 18,
    referenciaCompleta: 'Miqueias 7:18',
    blocoNome: 'Miqueias (Deus que Lança o Pecado no Mar)',
    profundidadeExegetica: '"Quem, ó Deus, é semelhante a ti, que perdoas a iniquidade e te esqueces da transgressão...?" O nome de Miqueias significa "Quem é como Yahweh?". O perdão divino (Nasa - levantar/carregar embora) não é uma tolerância passiva, é remover a culpa e atirá-la nas profundezas do mar.',
    conexaoHumana: 'A sociedade do "cancelamento" nunca perdoa; sempre resgata tweets e erros antigos. Deus se recusa a reter a Sua ira e nos trata com uma misericórdia que a humanidade desconhece.',
    aplicacaoPratica: 'Aja como Deus hoje. "Jogue no mar" um erro que um familiar cometeu no passado. Nunca mais traga esse assunto à tona em meio a uma discussão.'
  },
  {
    livroId: 'naum',
    capitulo: 1,
    versiculo: 3,
    referenciaCompleta: 'Naum 1:3',
    blocoNome: 'Naum (Tardio em Irar-se, mas Justo)',
    profundidadeExegetica: '"O Senhor é tardio em irar-se, mas grande em poder, e ao culpado não tem por inocente." É o contrapeso teológico. Ele perdoa quem se arrepende, mas usa Seu poder colossal para destruir impérios impenitentes (Nínive).',
    conexaoHumana: 'Resolvemos o erro de achar que a bondade de Deus O torna "permissivo" com opressores. A justiça cósmica não falha, apenas aguarda o Seu próprio cronômetro.',
    aplicacaoPratica: 'Não faça justiça com as próprias mãos. Abandone qualquer sentimento de vingança que você esteja nutrindo e deixe a retribuição do agressor inteiramente nas mãos de Deus.'
  },
  {
    livroId: 'habacuque',
    capitulo: 3,
    versiculo: 17,
    referenciaCompleta: 'Habacuque 3:17-18',
    blocoNome: 'Habacuque (A Alegria Incondicional)',
    profundidadeExegetica: '"Ainda que a figueira não floresça... todavia eu me alegrarei no Senhor." O pico da maturidade de estudo profundo & prática diária no Antigo Testamento. A alegria (Gil) e a exultação não estão no campo fértil nem no curral cheio, mas na pessoa do Salvador, separando Deus das Suas bênçãos.',
    conexaoHumana: 'Desmonta a fé condicional baseada na troca. Muitas pessoas só amam a Deus se a conta bancária estiver alta. Habacuque ensina a adorar no meio do colapso econômico e agrícola absoluto.',
    aplicacaoPratica: 'Levante as mãos e agradeça a Deus em oração hoje, listando exclusivamente o caráter de quem Ele é (amoroso, soberano, bom), sem mencionar absolutamente nenhum bem material que você possua.'
  },
  {
    livroId: 'sofanias',
    capitulo: 1,
    versiculo: 12,
    referenciaCompleta: 'Sofonias 1:12',
    blocoNome: 'Sofonias (O Castigo dos Complacentes)',
    profundidadeExegetica: 'Deus declara que vai esquadrinhar Jerusalém com lanternas e castigar os homens que dizem: "O Senhor não faz o bem nem faz o mal." O alvo do juízo não são ateus declarados, mas o "Deísmo Prático", homens complacentes assentados na indiferença espiritual.',
    conexaoHumana: 'É o perigo de vivermos como se Deus estivesse "aposentado" no céu, perdendo o senso de urgência espiritual, oração fervente e temor pelas nossas decisões secretas diárias.',
    aplicacaoPratica: 'Quebre o marasmo espiritual hoje. Tire um período de oração proativo buscando quebrar o estado "morno" e reacenda o zelo nas áreas em que você se acostumou com o erro.'
  },
  {
    livroId: 'ageu',
    capitulo: 2,
    versiculo: 9,
    referenciaCompleta: 'Ageu 2:9',
    blocoNome: 'Ageu (A Glória da Segunda Casa)',
    profundidadeExegetica: '"A glória (Kavod - peso/importância) desta última casa será maior do que a da primeira... e neste lugar darei a paz." A reconstrução pobre de Zorobabel não tinha o ouro do Templo de Salomão, mas teve uma glória maior porque seria visitada pelo próprio Messias encarnado.',
    conexaoHumana: 'Curamos nosso "complexo de inferioridade" ao pararmos de comparar as conquistas materiais (ouro, tamanho, luxo) de nossos começos com a grandeza alheia. A verdadeira glória é a presença de Jesus.',
    aplicacaoPratica: 'Se o seu projeto, igreja ou lar atual não é tão luxuoso quanto o anterior, não despreze esse recomeço. Faça o seu melhor hoje exatamente com os recursos simples que você tem em mãos.'
  },
  {
    livroId: 'zacarias',
    capitulo: 9,
    versiculo: 9,
    referenciaCompleta: 'Zacarias 9:9',
    blocoNome: 'Zacarias (O Rei Humilde)',
    profundidadeExegetica: 'O profeta manda a filha de Sião exultar, pois o Rei vem "justo e salvador, humilde, e montado sobre um jumento". O animal subverte as expectativas de um Messias militar montado num cavalo de guerra, provando que a conquista do Seu reino não ocorreria por armas.',
    conexaoHumana: 'Confronta nossa fascinação pelas demonstrações agressivas de autoridade e poder, provando que a mansidão, a vulnerabilidade e a humilhação têm um poder cósmico superior ao orgulho.',
    aplicacaoPratica: 'Escolha a rota da humildade. Ao deparar-se com um conflito onde você tem o poder de humilhar o outro hoje, decline o uso dessa força.'
  },
  {
    livroId: 'malaquias',
    capitulo: 3,
    versiculo: 10,
    referenciaCompleta: 'Malaquias 3:10',
    blocoNome: 'Malaquias (A Prova do Dízimo)',
    profundidadeExegetica: '"Trazei todos os dízimos à casa do tesouro... e fazei prova de mim nisto." É a única vez nas Escrituras que Deus convida o homem a testá-Lo (Bachan - provar a qualidade como se faz com metal). O ato é sobre confiar na provisão matemática de Deus mais do que na nossa própria retenção.',
    conexaoHumana: 'Nossa falta de generosidade reflete um medo oculto (avareza). Acreditamos que se devolvermos parte daquilo que Deus nos deu, faltará para o nosso próprio sustento futuro.',
    aplicacaoPratica: 'Exercite a generosidade. Separe hoje fielmente aquilo que pertence a Deus ou oferte uma quantia a alguém em necessidade, crendo ativamente que o Senhor providenciará o restante da sua despensa.'
  },
  {
    livroId: 'exodo',
    capitulo: 3,
    versiculo: 14,
    referenciaCompleta: 'Êxodo 3:14',
    blocoNome: 'Êxodo - Bloco 1 (Cap. 1-18: A Libertação)',
    profundidadeExegetica: 'Eheyeh asher eheyeh ("Eu Sou o que Sou") revela um Deus autoexistente, atemporal e que não depende de nada para ser. Ele é a própria realidade.',
    conexaoHumana: 'Revela a fragilidade humana e nossa constante necessidade de definir nossa identidade através do que fazemos, enquanto Deus simplesmente é.',
    aplicacaoPratica: 'Pare de tentar provar seu valor através de excesso de trabalho. Descanse hoje sabendo que sua força vem Daquele que é eterno e inabalável.'
  },
  {
    livroId: 'exodo',
    capitulo: 20,
    versiculo: 3,
    referenciaCompleta: 'Êxodo 20:3-4',
    blocoNome: 'Êxodo - Bloco 2 (Cap. 19-40: A Lei e o Tabernáculo - Os Dez Mandamentos)',
    profundidadeExegetica: 'A proibição de ter "outros deuses" (Elohim Acherim) e fazer imagens de escultura (Pesel) visava impedir que Deus fosse reduzido a um amuleto manipulável. Deus exige exclusividade pactual, não aceitando dividir o trono do coração com falsas seguranças.',
    conexaoHumana: 'A idolatria moderna raramente envolve estátuas de madeira. Nossos ídolos de estimação são o dinheiro, o status, o corpo perfeito ou a aprovação social — coisas nas quais depositamos nossa confiança e pelas quais sacrificamos nossa família e ética.',
    aplicacaoPratica: 'Identifique qual é o seu maior "ídolo moderno" (aquilo que te causa mais desespero se você perder). Entregue isso a Deus em oração hoje, declarando que apenas Ele é a sua fonte de segurança.'
  },
  {
    livroId: 'exodo',
    capitulo: 20,
    versiculo: 8,
    referenciaCompleta: 'Êxodo 20:8',
    blocoNome: 'Êxodo - Bloco 2 (Cap. 19-40: A Lei e o Tabernáculo - Os Dez Mandamentos)',
    profundidadeExegetica: '"Lembra-te do dia de sábado (Shabbat), para o santificar". O verbo Shavat significa "parar/cessar". Embora não guardemos o sábado judaico cerimonialmente, o princípio moral do descanso é perpétuo: parar de produzir para lembrar que o mundo não desmorona se nós não trabalharmos.',
    conexaoHumana: 'Nossa sociedade vive uma epidemia de esgotamento (burnout) porque transformamos a produtividade em um falso deus. Sentimos culpa quando descansamos, achando que somos máquinas ininterruptas.',
    aplicacaoPratica: 'Defina um bloco de 24 horas nesta semana onde você se desconectará completamente de e-mails de trabalho e tarefas produtivas. Use esse tempo estritamente para adoração, família e descanso físico.'
  },
  {
    livroId: 'exodo',
    capitulo: 20,
    versiculo: 12,
    referenciaCompleta: 'Êxodo 20:12',
    blocoNome: 'Êxodo - Bloco 2 (Cap. 19-40: A Lei e o Tabernáculo - Os Dez Mandamentos)',
    profundidadeExegetica: '"Honra (Kaved) teu pai e tua mãe". A raiz Kaved significa "dar peso, atribuir importância". É o primeiro mandamento com promessa. Não exige concordância cega com pais abusivos, mas exige que a estrutura familiar seja tratada com dignidade, cuidado e respeito, especialmente na velhice deles.',
    conexaoHumana: 'Confronta a cultura moderna do descarte, onde os idosos e os pais são frequentemente abandonados em asilos emocionais ou tratados com sarcasmo e desrespeito pelos filhos que se acham mais intelectualizados.',
    aplicacaoPratica: 'Entre em contato com seus pais hoje (ou uma figura parental, caso não os tenha). Não peça nada; apenas expresse gratidão por um sacrifício específico que eles fizeram por você no passado.'
  },
  {
    livroId: 'exodo',
    capitulo: 20,
    versiculo: 13,
    referenciaCompleta: 'Êxodo 20:13 (Mateus 5:21-22)',
    blocoNome: 'Êxodo - Bloco 2 (Cap. 19-40: A Lei e o Tabernáculo - Os Dez Mandamentos)',
    profundidadeExegetica: '"Não matarás" (Ratsach - assassinato intencional). Jesus aprofunda a aplicação desta lei mostrando que o assassinato não começa com uma faca, mas com a ira retida, o insulto e o ódio no coração contra o irmão.',
    conexaoHumana: 'Facilmente nos sentimos "santos" por nunca termos tirado a vida de ninguém fisicamente, enquanto assassinamos rotineiramente a reputação de colegas de trabalho e de irmãos com palavras carregadas de raiva.',
    aplicacaoPratica: 'Se você tem falado mal ou nutrido ódio por alguém, pare hoje. Peça perdão a Deus pelo "assassinato de reputação" e comprometa-se a não falar mais sobre essa pessoa se não for para abençoar.'
  },
  {
    livroId: 'exodo',
    capitulo: 20,
    versiculo: 14,
    referenciaCompleta: 'Êxodo 20:14 (Mateus 5:27-28)',
    blocoNome: 'Êxodo - Bloco 2 (Cap. 19-40: A Lei e o Tabernáculo - Os Dez Mandamentos)',
    profundidadeExegetica: '"Não adulterarás" (Na\'aph). Protege a santidade e a exclusividade da aliança conjugal. Jesus eleva o padrão, afirmando que a cobiça intencional no coração ou no olhar já é uma quebra da fidelidade exigida pela Lei.',
    conexaoHumana: 'Bate de frente com a cultura hipersexualizada da pornografia e dos flertes digitais. Tentamos nos convencer de que "olhar não arranca pedaço", quando, na verdade, destrói a intimidade e objetifica o ser humano.',
    aplicacaoPratica: 'Instale bloqueadores de conteúdo no seu celular ou rompa imediatamente uma conversa/contato digital que está cruzando a linha do respeito e flertando com a cobiça.'
  },
  {
    livroId: 'exodo',
    capitulo: 20,
    versiculo: 15,
    referenciaCompleta: 'Êxodo 20:15-16',
    blocoNome: 'Êxodo - Bloco 2 (Cap. 19-40: A Lei e o Tabernáculo - Os Dez Mandamentos)',
    profundidadeExegetica: '"Não furtarás" (Ganav) e "Não dirás falso testemunho" (Ed Sheqer). Deus protege a propriedade privada e a justiça forense. Falso testemunho não é apenas mentir, mas usar a mentira para destruir a vida do próximo.',
    conexaoHumana: 'Acreditamos que roubar é apenas assaltar um banco, mas furtamos tempo do nosso empregador, sonegamos impostos, usamos softwares piratas e espalhamos mentiras e boatos (fake news) que destroem a imagem dos outros.',
    aplicacaoPratica: 'Verifique a veracidade de uma informação antes de repassá-la. Não encaminhe absolutamente nenhuma fofoca ou notícia hoje se não puder provar que é verdade, protegendo o nome do próximo.'
  },
  {
    livroId: 'exodo',
    capitulo: 20,
    versiculo: 17,
    referenciaCompleta: 'Êxodo 20:17',
    blocoNome: 'Êxodo - Bloco 2 (Cap. 19-40: A Lei e o Tabernáculo - Os Dez Mandamentos)',
    profundidadeExegetica: '"Não cobiçarás" (Chamad). Este é o único mandamento puramente interno. A cobiça é um desejo ardente e doentio por algo que pertence legitimamente a outra pessoa (casa, cônjuge, bens). É a raiz do roubo e do adultério.',
    conexaoHumana: 'O marketing e as redes sociais são máquinas de gerar cobiça, projetadas para nos fazer sentir que nossa vida é miserável porque não temos o carro, a viagem ou o corpo do outro, destruindo o contentamento.',
    aplicacaoPratica: 'Faça um exercício de gratidão. Ao ver uma foto da conquista de alguém hoje que normalmente lhe causaria inveja, ore imediatamente abençoando a vida daquela pessoa e agradeça pelo que você tem.'
  },
  {
    livroId: 'levitico',
    capitulo: 19,
    versiculo: 2,
    referenciaCompleta: 'Levítico 19:2',
    blocoNome: 'Levítico - Bloco Único (Santidade, Sacrifícios e Festas)',
    profundidadeExegetica: 'A raiz Qadosh (santo) significa "separado" ou "cortado". A santidade exigida não é apenas moralidade, mas ser distinto dos padrões corrompidos das nações vizinhas.',
    conexaoHumana: 'Mostra a nossa necessidade desesperada de pertencimento, que muitas vezes nos faz ceder à pressão social e imitar comportamentos destrutivos só para sermos aceitos.',
    aplicacaoPratica: 'Diga "não" a um convite, fofoca ou transação financeira hoje que fira seus princípios, assumindo o risco de ser diferente.'
  },
  {
    livroId: 'levitico',
    capitulo: 19,
    versiculo: 18,
    referenciaCompleta: 'Levítico 19:18',
    blocoNome: 'Levítico - Bloco Único (Santidade, Sacrifícios e Festas)',
    profundidadeExegetica: '"Amarás o teu próximo como a ti mesmo" (Ahavta Lere\'acha Kamocha). Esta ordem no meio do código levítico foi apontada por Cristo (junto com amar a Deus) como o resumo de toda a Lei e dos Profetas. A ética bíblica se baseia no amor prático.',
    conexaoHumana: 'Revela o nosso terrível egocentrismo. Somos excelentes advogados para nós mesmos e péssimos juízes para os outros. A lei nos chama a usar o mesmo zelo e cuidado que temos conosco a favor do próximo.',
    aplicacaoPratica: 'Coloque-se ativamente no lugar de outra pessoa hoje. Ao tomar uma decisão no trânsito, na fila do mercado ou no escritório, dê a preferência e trate o outro exatamente como você gostaria de ser tratado.'
  },
  {
    livroId: 'numeros',
    capitulo: 6,
    versiculo: 24,
    referenciaCompleta: 'Números 6:24-26',
    blocoNome: 'Números - Bloco 1 (Cap. 1-12: Preparação)',
    profundidadeExegetica: 'A bênção araônica usa o verbo Shamar (guardar/proteger como com uma cerca) e o conceito de Shalom (paz/plenitude), indicando uma proteção divina ativa.',
    conexaoHumana: 'Reflete a angústia humana diante da vulnerabilidade da vida e a necessidade de segurança emocional e espiritual.',
    aplicacaoPratica: 'Em vez de apenas dizer "tchau", abençoe verbalmente seus filhos, cônjuge ou amigos hoje, desejando a paz e a proteção de Deus sobre eles.'
  },
  {
    livroId: 'numeros',
    capitulo: 14,
    versiculo: 11,
    referenciaCompleta: 'Números 14:11',
    blocoNome: 'Números - Bloco 2 (Cap. 13-36: Peregrinação e Desobediência)',
    profundidadeExegetica: 'A raiz Na\'ats (desprezar) usada por Deus mostra que a incredulidade do povo diante dos gigantes de Canaã não era apenas medo, mas um insulto deliberado aos milagres já vivenciados no Egito.',
    conexaoHumana: 'Revela nossa amnésia espiritual: esquecemos rapidamente os livramentos do passado assim que o próximo grande problema aparece.',
    aplicacaoPratica: 'Escreva em um papel três grandes problemas que Deus já resolveu na sua vida e leia-os em voz alta para combater a ansiedade atual.'
  },
  {
    livroId: 'deuteronomio',
    capitulo: 6,
    versiculo: 4,
    referenciaCompleta: 'Deuteronômio 6:4-5',
    blocoNome: 'Deuteronômio - Bloco 1 (Cap. 1-11: Revisão da Lei)',
    profundidadeExegetica: 'O Shemá exige amor com todo o Levav (coração/mente), Nephesh (alma/vida) e Me\'od (força/muito). É a devoção total do ser humano a um Deus único.',
    conexaoHumana: 'Demonstra que fomos criados para o foco e a paixão, mas vivemos fragmentados, dividindo nossa energia em dezenas de prioridades rasas.',
    aplicacaoPratica: 'Remova as notificações não essenciais do seu celular hoje para cultivar períodos de foco total, tanto no seu trabalho quanto no seu tempo com Deus.'
  },
  {
    livroId: 'deuteronomio',
    capitulo: 30,
    versiculo: 19,
    referenciaCompleta: 'Deuteronômio 30:19',
    blocoNome: 'Deuteronômio - Bloco 2 (Cap. 12-34: O Pacto e a Morte de Moisés)',
    profundidadeExegetica: 'O verbo Bachar (escolher) estabelece o livre-arbítrio pactual. A aliança não é mecânica; exige a responsabilidade moral de escolher o caminho da obediência (vida).',
    conexaoHumana: 'Confronta o vitimismo humano. Temos a tendência de culpar as circunstâncias ou os outros, ignorando que nosso destino é moldado por nossas escolhas.',
    aplicacaoPratica: 'Identifique uma área da sua vida onde você está apenas "deixando rolar" e tome hoje uma decisão intencional e difícil para mudar o rumo das coisas.'
  },

  // 2. LIVROS HISTÓRICOS
  {
    livroId: 'josue',
    capitulo: 1,
    versiculo: 9,
    referenciaCompleta: 'Josué 1:9',
    blocoNome: 'Josué - Bloco 1 (Cap. 1-12: A Conquista)',
    profundidadeExegetica: 'A ordem "Esforça-te" (Chazaq) e "Tem bom ânimo" (Amats) está atrelada diretamente à promessa da presença de Deus, provando que a coragem bíblica não é ausência de medo, mas obediência apesar dele.',
    conexaoHumana: 'Expõe nossa tendência a recuar diante de desafios colossais quando focamos nas nossas próprias limitações em vez de focarmos em quem nos acompanha.',
    aplicacaoPratica: 'Encare hoje uma tarefa ou conversa que você tem evitado por medo, lembrando-se de que a autoridade do Senhor está com você.'
  },
  {
    livroId: 'josue',
    capitulo: 24,
    versiculo: 15,
    referenciaCompleta: 'Josué 24:15',
    blocoNome: 'Josué - Bloco 2 (Cap. 13-24: A Divisão da Terra)',
    profundidadeExegetica: 'Josué usa o termo Avad (servir) para forçar Israel a sair da neutralidade. O pluralismo religioso era tolerado em Canaã, mas é inaceitável na aliança com Yahweh.',
    conexaoHumana: 'Revela a inclinação humana a "ficar em cima do muro" e tentar agradar a todas as culturas e visões ao redor para evitar conflitos.',
    aplicacaoPratica: 'Estabeleça (ou reafirme) um princípio inegociável dentro da sua casa hoje (ex: não mentir, orar juntos) e não permita que influências externas o derrubem.'
  },
  {
    livroId: 'juizes',
    capitulo: 2,
    versiculo: 10,
    referenciaCompleta: 'Juízes 2:10',
    blocoNome: 'Juízes: Expansão Exclusiva (O Colapso Geracional)',
    profundidadeExegetica: '"E levantou-se outra geração após eles, que não conhecia ao Senhor, nem tampouco a obra que ele fizera a Israel." O verbo Yada (conhecer) aqui denota experiência relacional. A geração de Josué falhou catastroficamente em transmitir a fé viva e o testemunho dos milagres aos seus filhos.',
    conexaoHumana: 'Revela a perigosa ilusão de que nossos valores e nossa fé serão transmitidos por "osmose" ou genética. Assumimos que nossos filhos terão os mesmos princípios morais que nós, negligenciando o ensino intencional.',
    aplicacaoPratica: 'Reserve 10 minutos hoje à noite para contar intencionalmente a um filho, sobrinho ou pessoa mais nova da família um livramento ou milagre real que Deus já fez na sua história.'
  },
  {
    livroId: 'juizes',
    capitulo: 7,
    versiculo: 2,
    referenciaCompleta: 'Juízes 7:2',
    blocoNome: 'Juízes: Expansão Exclusiva (A Estratégia da Dependência - Gideão)',
    profundidadeExegetica: 'O Senhor diz a Gideão: "Muito é o povo que está contigo... para que Israel não se glorie contra mim, dizendo: A minha própria mão me livrou." Deus intencionalmente reduz o exército de 32 mil para apenas 300 homens para destruir qualquer possibilidade de o homem roubar a glória divina (Pa\'ar - vangloriar-se).',
    conexaoHumana: 'Bate de frente com a nossa obsessão por "segurança em números". Só nos sentimos seguros quando temos muito dinheiro na conta, muitos recursos ou muitos contatos. O orgulho humano tem aversão à dependência absoluta.',
    aplicacaoPratica: 'Se você está enfrentando uma situação hoje em que seus recursos (dinheiro, equipe, tempo) são claramente insuficientes, mude sua perspectiva: ore agradecendo a Deus pelo cenário, pois Ele preparou o palco perfeito para um milagre incontestável.'
  },
  {
    livroId: 'juizes',
    capitulo: 16,
    versiculo: 20,
    referenciaCompleta: 'Juízes 16:20',
    blocoNome: 'Juízes: Expansão Exclusiva (A Erosão Silenciosa - Sansão)',
    profundidadeExegetica: '"E ele não sabia que o Senhor já se tinha retirado dele." Esta é uma das frases mais trágicas do Antigo Testamento. A força de Sansão não estava na queratina do seu cabelo, mas no voto do nazireado (separação). O Espírito (Ruach) retirou-se sem alarde após o acúmulo de quebras da aliança.',
    conexaoHumana: 'Ilustra o engano do pecado e da quebra de princípios éticos. A ruína moral ou o fim de um casamento raramente acontece por um grande erro repentino, mas por uma sucessão de pequenos limites que vamos cruzando e tolerando ao longo dos anos.',
    aplicacaoPratica: 'Faça uma autoavaliação brutal hoje: identifique um pequeno hábito ruim ou um limite ético "inofensivo" que você começou a tolerar nos últimos meses, e corte-o imediatamente pela raiz.'
  },
  {
    livroId: 'juizes',
    capitulo: 21,
    versiculo: 25,
    referenciaCompleta: 'Juízes 21:25',
    blocoNome: 'Juízes: Expansão Exclusiva (O Relativismo Moral - Conclusão do Livro)',
    profundidadeExegetica: '"Naqueles dias não havia rei em Israel; porém cada um fazia o que parecia reto aos seus olhos." O termo Yashar (reto/justo) foi sequestrado pelo indivíduo. Sem a autoridade absoluta da lei de Deus, a nação afundou na guerra civil e em barbáries, provando que o autogoverno humano é um fracasso.',
    conexaoHumana: 'É o retrato perfeito do relativismo pós-moderno. A sociedade atual diz "siga o seu coração" ou "essa é a sua verdade", o que inevitavelmente leva ao caos social, familiar e psicológico, pois o coração humano é enganoso.',
    aplicacaoPratica: 'Ao deparar-se com um dilema ético no trabalho ou na vida pessoal hoje, recuse o argumento de "o que eu acho que é melhor". Submeta a decisão estritamente ao que a Bíblia diz.'
  },
  {
    livroId: 'rute',
    capitulo: 1,
    versiculo: 16,
    referenciaCompleta: 'Rute 1:16',
    blocoNome: 'Juízes & Rute - Bloco 2 (Rute: Redenção e Lealdade)',
    profundidadeExegetica: 'O hebraico Chesed (amor leal/bondade pactual) permeia a atitude de Rute. Ela abandona seus deuses e sua terra por amor a Noemi, rompendo as barreiras étnicas e culturais.',
    conexaoHumana: 'Mostra o poder curativo da lealdade humana e da empatia, em contraste com relacionamentos utilitários que descartam pessoas quando elas não têm mais nada a oferecer.',
    aplicacaoPratica: 'Demonstre hoje um ato de bondade radical e sem segundas intenções a alguém da sua família que está atravessando um momento amargo.'
  },
  {
    livroId: 'rute',
    capitulo: 2,
    versiculo: 12,
    referenciaCompleta: 'Rute 2:12',
    blocoNome: 'Rute - Expansão de Auditoria (Versículo Alternativo)',
    profundidadeExegetica: 'Boaz declara que Rute veio se abrigar sob as "asas" (Kanaph) do Deus de Israel. Curiosamente, no capítulo 3, Rute pede que Boaz estenda a sua "capa" (Kanaph - a mesma palavra) sobre ela. A providência divina e a ação humana se encontram: Boaz se torna a resposta física da oração que ele mesmo fez.',
    conexaoHumana: 'Revela nossa tendência de orar terceirizando problemas para Deus, quando muitas vezes Ele nos colocou no cenário com os recursos exatos para sermos a resposta à oração de alguém.',
    aplicacaoPratica: 'Em vez de apenas dizer "vou orar por você" para alguém que está com um problema material ou emocional hoje, tome uma atitude prática para ser a solução que a pessoa precisa.'
  },
  {
    livroId: '1samuel',
    capitulo: 15,
    versiculo: 22,
    referenciaCompleta: '1 Samuel 15:22',
    blocoNome: '1 e 2 Samuel - Bloco 1 (1Sm: Samuel e Saul)',
    profundidadeExegetica: 'O termo Shama (ouvir/obedecer) é colocado acima do Zebach (sacrifício). Deus rejeita rituais religiosos externos que tentam encobrir a desobediência e a rebeldia interna.',
    conexaoHumana: 'Confronta a hipocrisia de tentar "comprar" Deus ou pessoas com presentes sociais ou financeiros enquanto ignoramos princípios morais básicos e o respeito devido.',
    aplicacaoPratica: 'Pare de usar sua "agenda cheia" ou "suas boas obras" como desculpa para o descuido familiar. Cumpra o básico: obedeça naquilo que é sua responsabilidade primária hoje.'
  },
  {
    livroId: '2samuel',
    capitulo: 7,
    versiculo: 16,
    referenciaCompleta: '2 Samuel 7:16',
    blocoNome: '1 e 2 Samuel - Bloco 2 (2Sm: O Reinado de Davi)',
    profundidadeExegetica: 'O estabelecimento eterno do trono (Kisse) e reino de Davi firma a Aliança Davídica, cujo ápice e cumprimento absoluto se dará em Jesus Cristo.',
    conexaoHumana: 'Revela a necessidade humana de estabilidade política e liderança justa, apontando que toda estrutura de poder humano falha, mas a promessa de Deus permanece intacta.',
    aplicacaoPratica: 'Não coloque sua esperança de futuro em governos, economias ou líderes terrenos. Descanse sua mente hoje lembrando-se de quem realmente governa a história.'
  },
  {
    livroId: '1reis',
    capitulo: 3,
    versiculo: 9,
    referenciaCompleta: '1 Reis 3:9',
    blocoNome: '1 e 2 Reis - Bloco 1 (1Rs: Salomão e a Divisão do Reino)',
    profundidadeExegetica: 'Salomão pede um Lev shomea (um coração que ouve/discernimento). Ele entende que a liderança exige capacidade moral para discernir entre o bem e o mal, não apenas inteligência técnica.',
    conexaoHumana: 'Destaca nossa falha em buscar poder, dinheiro ou status antes de buscar a maturidade emocional e o caráter necessário para sustentar essas coisas.',
    aplicacaoPratica: 'Ao tomar uma decisão hoje, não pergunte apenas "o que é mais lucrativo?", mas pergunte a Deus "o que é justo e correto?".'
  },
  {
    livroId: '2reis',
    capitulo: 17,
    versiculo: 13,
    referenciaCompleta: '2 Reis 17:13-14',
    blocoNome: '1 e 2 Reis - Bloco 2 (2Rs: Elias, Eliseu e o Exílio)',
    profundidadeExegetica: 'O termo Qashah Orep (endurecer a cerviz) metaforicamente descreve um animal de tração que resiste ao jugo do dono. O exílio foi o resultado da teimosia de Israel em rejeitar os profetas.',
    conexaoHumana: 'Ilustra o orgulho humano que se recusa a aceitar correção. Preferimos sofrer as consequências dos nossos erros a admitir que estávamos no caminho errado.',
    aplicacaoPratica: 'Se alguém lhe der um feedback construtivo (ou uma repreensão justa) hoje, não justifique e não se ofenda. Apenas diga "obrigado" e corrija a rota.'
  },
  {
    livroId: '2cronicas',
    capitulo: 7,
    versiculo: 14,
    referenciaCompleta: '2 Crônicas 7:14',
    blocoNome: '1 e 2 Crônicas - Bloco Único (Destaques da linhagem e do Templo)',
    profundidadeExegetica: 'Os verbos Kana (humilhar), Palal (orar), Baqash (buscar) e Shuv (converter/voltar) são as condições absolutas para a restauração. Arrependimento exige ação, não apenas sentimento.',
    conexaoHumana: 'Revela que a verdadeira restauração (de uma vida, família ou nação) não vem de estratégias novas, mas do quebrantamento e da renúncia aos "maus caminhos".',
    aplicacaoPratica: 'Admita um erro específico que você cometeu recentemente para a pessoa ofendida, peça desculpas abertamente e mude seu comportamento a partir de agora.'
  },
  {
    livroId: 'neemias',
    capitulo: 6,
    versiculo: 3,
    referenciaCompleta: 'Neemias 6:3',
    blocoNome: 'Esdras, Neemias & Ester - Bloco 1 (Esdras/Neemias: Reconstrução)',
    profundidadeExegetica: 'A frase "Estou fazendo uma grande obra, de modo que não poderei descer" (Melakhah gedolah) mostra a capacidade de Neemias de manter o foco e repelir as distrações dos inimigos.',
    conexaoHumana: 'Expõe nossa vulnerabilidade às distrações críticas. Muitas vezes paramos projetos importantes apenas para debater com pessoas que não querem construir nada, mas apenas nos parar.',
    aplicacaoPratica: 'Ignore provocações ou comentários negativos (pessoalmente ou nas redes sociais) hoje. Mantenha seu foco no seu trabalho e não "desça" para debates inúteis.'
  },
  {
    livroId: 'ester',
    capitulo: 4,
    versiculo: 14,
    referenciaCompleta: 'Ester 4:14',
    blocoNome: 'Esdras, Neemias & Ester - Bloco 2 (Ester: Providência Divina)',
    profundidadeExegetica: 'A expressão "para tal tempo como este" (La\'et hazot) captura a providência silenciosa de Deus. Ele orquestrou a ascensão de Ester ao trono para um propósito redentivo específico.',
    conexaoHumana: 'Revela que nosso status, posição e riqueza não são nossos, mas ferramentas concedidas para servir aos outros em momentos de crise.',
    aplicacaoPratica: 'Use sua influência, posição no trabalho ou recursos hoje para defender, ajudar ou abrir portas para alguém que está em posição de desvantagem.'
  },
  {
    livroId: 'ester',
    capitulo: 4,
    versiculo: 16,
    referenciaCompleta: 'Ester 4:16',
    blocoNome: 'Ester - Expansão de Auditoria (Versículo Alternativo)',
    profundidadeExegetica: '"E, se perecer, pereci" (Ka\'asher avadeti avadeti). Ester toma a decisão de quebrar a lei real e entrar na presença do rei Assuero sem ser chamada. A fé dela não é uma garantia de sobrevivência física, mas uma rendição ao propósito acima do instinto de autopreservação.',
    conexaoHumana: 'Confronta o medo do risco que paralisa nosso crescimento. Frequentemente, preferimos a segurança de não fazer nada a enfrentar o medo da rejeição ou do fracasso na busca pelo que é certo.',
    aplicacaoPratica: 'Tome uma decisão corajosa hoje que você vem adiando por "medo do que as pessoas vão pensar" (ex: iniciar um projeto, mudar de carreira, pedir perdão).'
  },

  // 3. LIVROS POÉTICOS E SAPIENCIAIS
  {
    livroId: 'jo',
    capitulo: 42,
    versiculo: 2,
    referenciaCompleta: 'Jó 42:2',
    blocoNome: 'Jó - Bloco Único (O Sofrimento, os Diálogos e a Soberania)',
    profundidadeExegetica: 'Após questionar a justiça divina, Jó declara que nenhum propósito (Mezimmah) de Deus pode ser frustrado. O estudo profundo & prática diária não explica o sofrimento, mas ancora a fé na grandeza insondável de Deus.',
    conexaoHumana: 'Mostra que nosso maior problema não é a dor, mas a necessidade de ter explicações matemáticas para tudo, limitando Deus à nossa própria lógica.',
    aplicacaoPratica: 'Diante de uma oração não respondida ou frustração atual, pare de exigir explicações de Deus e silencie, apenas adorando a Sua soberania.'
  },
  {
    livroId: 'salmos',
    capitulo: 23,
    versiculo: 1,
    referenciaCompleta: 'Salmos 23:1',
    blocoNome: 'Salmos - Bloco 1 (Salmos 1-41)',
    profundidadeExegetica: 'Yahweh como Ro\'eh (Pastor) indica provisão, guia e proteção contínua. "Nada me faltará" não significa riqueza extrema, mas ausência de carência naquilo que é essencial.',
    conexaoHumana: 'Confronta o nosso instinto crônico de insatisfação e a ansiedade consumista de sempre querer mais do que já temos.',
    aplicacaoPratica: 'Faça uma lista mental de 3 coisas fundamentais que Deus já lhe deu e aja com contentamento durante o dia, sem reclamar do que falta.'
  },
  {
    livroId: 'salmos',
    capitulo: 51,
    versiculo: 10,
    referenciaCompleta: 'Salmos 51:10',
    blocoNome: 'Salmos - Bloco 2 (Salmos 42-72)',
    profundidadeExegetica: 'O termo Bara (criar do nada) é usado para o coração puro. Davi reconhece que não precisa de uma reforma moral, mas de uma recriação milagrosa do seu interior.',
    conexaoHumana: 'Evidencia a falência da autodisciplina isolada. Sozinhos, não podemos limpar a culpa e a podridão dos nossos próprios corações.',
    aplicacaoPratica: 'Em vez de prometer a si mesmo "eu vou ser melhor", ore hoje pedindo que Deus arranque o desejo por aquele pecado específico da sua mente.'
  },
  {
    livroId: 'salmos',
    capitulo: 90,
    versiculo: 12,
    referenciaCompleta: 'Salmos 90:12',
    blocoNome: 'Salmos - Bloco 3 (Salmos 73-106)',
    profundidadeExegetica: '"Ensina-nos a contar os nossos dias" não é uma fórmula matemática, mas um pedido por sabedoria (Chokmah) para viver focado no que tem peso eterno, reconhecendo a brevidade da vida.',
    conexaoHumana: 'Revela como vivemos na ilusão da imortalidade terrena, desperdiçando anos preciosos com mágoas, vaidades e procrastinação.',
    aplicacaoPratica: 'Gerencie seu tempo hoje como se este fosse o seu último mês de vida. Ligue para quem você ama e não adie decisões importantes.'
  },
  {
    livroId: 'salmos',
    capitulo: 119,
    versiculo: 105,
    referenciaCompleta: 'Salmos 119:105',
    blocoNome: 'Salmos - Bloco 4 (Salmos 107-150)',
    profundidadeExegetica: 'A Palavra é comparada a Ner (lâmpada para os pés, passos imediatos) e Or (luz para o caminho, direção longa). A escritura fornece ética diária e visão de longo prazo.',
    conexaoHumana: 'Mostra que andamos tateando na escuridão, buscando gurus ou tendências modernas para orientar decisões que a Bíblia já resolveu.',
    aplicacaoPratica: 'Leia pelo menos um capítulo da Bíblia antes de tomar qualquer decisão ou enviar qualquer mensagem complexa de trabalho hoje.'
  },
  {
    livroId: 'proverbios',
    capitulo: 3,
    versiculo: 5,
    referenciaCompleta: 'Provérbios 3:5-6',
    blocoNome: 'Provérbios, Eclesiastes & Cantares - Bloco 1 (Sabedoria Prática)',
    profundidadeExegetica: 'O hebraico Batah (confiar) significa encostar seu peso em algo. O texto proíbe o apoio exclusivo no próprio Binah (entendimento lógico).',
    conexaoHumana: 'Destaca a arrogância intelectual de achar que somos espertos o suficiente para gerenciar o futuro sozinhos.',
    aplicacaoPratica: 'Submeta a sua principal meta de carreira ou finanças a Deus em oração, reconhecendo verbalmente que Seus planos são melhores que a sua lógica.'
  },
  {
    livroId: 'proverbios',
    capitulo: 4,
    versiculo: 23,
    referenciaCompleta: 'Provérbios 4:23',
    blocoNome: 'Provérbios: Os Eixos da Sabedoria (Gestão da Mente e do Coração)',
    profundidadeExegetica: 'O termo Mishmar (guarda/vigilância extrema, como um posto militar) é aplicado ao Lev (coração, que no hebraico abrange a mente, o intelecto e as emoções). A razão é física e espiritual: dele procedem as Tots\'ot (fontes/saídas) da vida.',
    conexaoHumana: 'Revela uma falha brutal da nossa era: investimos pesado em sistemas de segurança para nossas casas e senhas para nosso dinheiro, mas deixamos nossa mente completamente vulnerável ao consumo de conteúdos tóxicos, fofocas e negatividade.',
    aplicacaoPratica: 'Faça hoje uma "auditoria" no seu consumo digital. Deixe de seguir pelo menos uma conta ou pessoa nas redes sociais que frequentemente gera em você ansiedade, inveja ou irritação.'
  },
  {
    livroId: 'proverbios',
    capitulo: 16,
    versiculo: 32,
    referenciaCompleta: 'Provérbios 16:32',
    blocoNome: 'Provérbios: Os Eixos da Sabedoria (Domínio Próprio e Controle Emocional)',
    profundidadeExegetica: 'O homem que é Erek apayim (longânimo/lento para se irar) é considerado superior ao Gibbor (guerreiro heroico). Governar o próprio Ruach (espírito/temperamento) é uma conquista maior do que conquistar uma cidade inteira militarmente.',
    conexaoHumana: 'Evidencia como a sociedade valoriza o sucesso externo e a agressividade. Aplaudimos quem "destrói" o oponente num argumento corporativo, enquanto a Bíblia exalta aquele que tem a força monumental de calar a própria boca no momento da raiva.',
    aplicacaoPratica: 'Hoje, quando você ler ou ouvir algo que faça o seu sangue ferver, aplique a regra dos 5 segundos: conte mentalmente até cinco antes de responder. Se necessário, diga que responderá mais tarde.'
  },
  {
    livroId: 'proverbios',
    capitulo: 18,
    versiculo: 21,
    referenciaCompleta: 'Provérbios 18:21',
    blocoNome: 'Provérbios: Os Eixos da Sabedoria (Poder e Destruição da Língua)',
    profundidadeExegetica: 'O hebraico é literal e assustador: "A morte (Mavet) e a vida (Chayyim) estão no poder (Yad - na mão/sob o controle) da língua". As palavras não são apenas sons comunicativos; elas têm força criativa ou destrutiva material na vida das pessoas.',
    conexaoHumana: 'Denuncia a irresponsabilidade com que tratamos nossas palavras. Ferimos familiares com sarcasmo e destruímos reputações com críticas disfarçadas de "opinião", ignorando que estamos operando uma arma letal.',
    aplicacaoPratica: 'Envie hoje uma mensagem de texto (ou fale pessoalmente) para alguém do seu convívio, elogiando uma qualidade específica dessa pessoa que você admira, mas que nunca teve coragem de dizer.'
  },
  {
    livroId: 'proverbios',
    capitulo: 22,
    versiculo: 7,
    referenciaCompleta: 'Provérbios 22:7',
    blocoNome: 'Provérbios: Os Eixos da Sabedoria (Finanças, Dívidas e Trabalho)',
    profundidadeExegetica: 'A afirmação "o que toma emprestado (Laveh) é servo (Eved - escravo) do que empresta" não é uma metáfora, mas uma realidade socioeconômica antiga e atual. A dívida anula a liberdade do indivíduo e transfere a propriedade do seu tempo futuro para o credor.',
    conexaoHumana: 'Expõe a raiz do consumismo e do endividamento crônico. O ser humano sacrifica sua paz e sua liberdade futura apenas para sustentar um padrão de vida artificial e impressionar pessoas no presente.',
    aplicacaoPratica: 'Identifique um gasto supérfluo que você faria hoje (como um delivery não planejado ou uma compra por impulso). Cancele a compra e transfira esse exato valor para abater uma dívida sua ou investir.'
  },
  {
    livroId: 'proverbios',
    capitulo: 27,
    versiculo: 17,
    referenciaCompleta: 'Provérbios 27:17',
    blocoNome: 'Provérbios: Os Eixos da Sabedoria (Relacionamentos e Filtro de Amizades)',
    profundidadeExegetica: '"Como o ferro (Barzel) afia o ferro, assim o homem afia (Chada - torna cortante/aprimora) o rosto do seu amigo". O atrito entre duas peças de ferro produz faíscas e calor, indicando que a verdadeira amizade exige confrontos saudáveis que moldam o caráter.',
    conexaoHumana: 'Mostra o nosso medo da vulnerabilidade. Preferimos nos cercar de bajuladores que aplaudem nossos erros do que suportar o "calor" de amigos que nos dizem a verdade desconfortável para o nosso crescimento.',
    aplicacaoPratica: 'Peça a um amigo maduro e de extrema confiança hoje que lhe dê um feedback honesto sobre algum defeito ou "ponto cego" que você não está conseguindo enxergar no seu próprio comportamento.'
  },
  {
    livroId: 'eclesiastes',
    capitulo: 3,
    versiculo: 1,
    referenciaCompleta: 'Eclesiastes 3:1',
    blocoNome: 'Provérbios, Eclesiastes & Cantares - Bloco 2 (Sentido da vida)',
    profundidadeExegetica: 'Para todo propósito há um Zeman (tempo designado). A sabedoria não é controlar o tempo, mas alinhar-se à estação soberanamente estabelecida por Deus.',
    conexaoHumana: 'Evidencia nossa impaciência e a ansiedade de querer "colher" fora do tempo, o que gera frustração crônica.',
    aplicacaoPratica: 'Aceite a sua estação atual. Se for tempo de plantar (estudar, trabalhar anonimamente), pare de se cobrar pelos resultados que só vêm no tempo da colheita.'
  },
  {
    livroId: 'eclesiastes',
    capitulo: 4,
    versiculo: 9,
    referenciaCompleta: 'Eclesiastes 4:9-10',
    blocoNome: 'Eclesiastes - Expansão de Auditoria (Versículo Alternativo)',
    profundidadeExegetica: '"Melhor é serem dois do que um... porque se caírem, um levanta o companheiro". O texto usa o pragmatismo (Tov - bom/vantajoso) para provar que a solidão não é apenas triste, é estrategicamente perigosa. O isolamento torna a queda irreversível.',
    conexaoHumana: 'Bate de frente com o hiperindividualismo moderno. Achamos que ser "independente" e não precisar de ninguém é um sinal de força, quando na verdade é um sinal de extrema vulnerabilidade.',
    aplicacaoPratica: 'Envie uma mensagem para um amigo hoje com o qual você não fala há semanas, apenas para marcar um café ou se reconectar. Fortaleça intencionalmente sua rede de apoio.'
  },
  {
    livroId: 'cantares',
    capitulo: 8,
    versiculo: 6,
    referenciaCompleta: 'Cantares 8:6',
    blocoNome: 'Provérbios, Eclesiastes & Cantares - Bloco 3 (Amor Conjugal)',
    profundidadeExegetica: 'O amor é comparado a algo tão inabalável e inevitável quanto o Maveth (morte) e tão ciumento/exclusivo quanto o Sheol (sepultura). É uma chama que não se apaga.',
    conexaoHumana: 'Contrastando com os relacionamentos líquidos modernos, o texto defende o compromisso exclusivo, feroz e permanente entre marido e mulher.',
    aplicacaoPratica: 'Demonstre hoje ao seu cônjuge, por meio de um ato de serviço prático e exclusivo, que ele/ela é a prioridade da sua vida terrena.'
  },

  // 4. PROFETAS MAIORES
  {
    livroId: 'isaias',
    capitulo: 6,
    versiculo: 8,
    referenciaCompleta: 'Isaías 6:8',
    blocoNome: 'Isaías - Bloco 1 (Cap. 1-39: Juízo)',
    profundidadeExegetica: 'O "Eis-me aqui" (Hineni) é a resposta imediata de disponibilidade de um homem que acabou de ser purificado pela brasa do altar. A graça gera serviço, não passividade.',
    conexaoHumana: 'Revela nossa tendência de fugir da responsabilidade, esperando que outros resolvam os problemas na igreja ou na sociedade.',
    aplicacaoPratica: 'Ofereça-se como voluntário hoje para resolver um problema (no trabalho, na sua casa ou comunidade) em vez de reclamar que ninguém faz nada.'
  },
  {
    livroId: 'isaias',
    capitulo: 53,
    versiculo: 5,
    referenciaCompleta: 'Isaías 53:5',
    blocoNome: 'Isaías - Bloco 2 (Cap. 40-66: O Messias)',
    profundidadeExegetica: 'As palavras Chalal (traspassado) e Daka (esmagado/moído) descrevem o sofrimento vicário do Messias. O castigo que nos traz a paz (Shalom) foi suportado por Ele.',
    conexaoHumana: 'Quebra o orgulho de acharmos que podemos conquistar a salvação pelas nossas próprias obras. Somos totalmente dependentes do sacrifício de Jesus.',
    aplicacaoPratica: 'Durante o seu dia, toda vez que cometer um erro, não tente se punir emocionalmente. Agradeça em oração imediata porque o castigo já foi pago na cruz.'
  },
  {
    livroId: 'jeremias',
    capitulo: 29,
    versiculo: 11,
    referenciaCompleta: 'Jeremias 29:11',
    blocoNome: 'Jeremias & Lamentações - Bloco 1 (Avisos de Queda)',
    profundidadeExegetica: '"Pensamentos de paz" (Shalom) referem-se ao bem-estar final de Israel. O contexto é duro: o povo ficaria 70 anos cativo. A promessa não é de conforto imediato, mas de um futuro garantido.',
    conexaoHumana: 'Desmascara a teologia da prosperidade. Queremos soluções e fugas imediatas para a dor, mas Deus frequentemente nos faz atravessar a provação para construir nosso futuro.',
    aplicacaoPratica: 'Abrace o processo difícil pelo qual você está passando hoje (ex: desemprego, crise) sem vitimismo, confiando que o propósito de Deus para o seu caráter é seguro.'
  },
  {
    livroId: 'lamentacoes',
    capitulo: 3,
    versiculo: 22,
    referenciaCompleta: 'Lamentações 3:22-23',
    blocoNome: 'Jeremias & Lamentações - Bloco 2 (A dor do Exílio)',
    profundidadeExegetica: 'O termo Chesed (misericórdias leais) e Racham (compaixão/útero) mostram que a fidelidade de Deus não se esgota. Elas se renovam (Chadash) toda manhã, dando chance a novos começos.',
    conexaoHumana: 'Mostra que somos propensos ao desespero crônico e achamos que os fracassos de ontem arruinaram para sempre nossa vida.',
    aplicacaoPratica: 'Ao acordar, antes de pegar o celular, agradeça a Deus pela página em branco do novo dia e decida não carregar a culpa dos erros já perdoados de ontem.'
  },
  {
    livroId: 'lamentacoes',
    capitulo: 3,
    versiculo: 27,
    referenciaCompleta: 'Lamentações 3:27',
    blocoNome: 'Lamentações - Expansão de Auditoria (Versículo Alternativo)',
    profundidadeExegetica: '"Bom é para o homem suportar o jugo (Ol - o instrumento de madeira colocado sobre animais de carga) na sua mocidade". Jeremias ensina que a disciplina severa, o sofrimento e a frustração precoces quebram a rebeldia natural humana e formam o caráter adulto.',
    conexaoHumana: 'Explica a fragilidade da geração atual, que foi blindada de toda frustração pelos pais e pela sociedade, resultando em adultos que desmoronam diante da primeira crítica ou "não" que recebem na vida.',
    aplicacaoPratica: 'Quando você receber uma crítica ou um "não" hoje, não reclame e não se defenda. Absorva o "jugo", procure a lição na frustração e use isso para amadurecer.'
  },
  {
    livroId: 'ezequiel',
    capitulo: 11,
    versiculo: 19,
    referenciaCompleta: 'Ezequiel 11:19',
    blocoNome: 'Ezequiel - Bloco 1 (Queda de Jerusalém)',
    profundidadeExegetica: 'A troca do "coração de pedra" (Lev even) por um "coração de carne" (Lev basar) aponta para a cirurgia espiritual da Nova Aliança, onde o Espírito Santo quebra a insensibilidade moral.',
    conexaoHumana: 'Mostra o estado calcificado da natureza humana perante o pecado: tornamo-nos frios e insensíveis à voz de Deus e à dor alheia sem a intervenção divina.',
    aplicacaoPratica: 'Peça a Deus hoje que mostre qual área do seu caráter se tornou fria e rígida (orgulho, cinismo, egoísmo) e permita-se quebrar em arrependimento.'
  },
  {
    livroId: 'ezequiel',
    capitulo: 37,
    versiculo: 14,
    referenciaCompleta: 'Ezequiel 37:14',
    blocoNome: 'Ezequiel - Bloco 2 (Restauração e o Novo Templo)',
    profundidadeExegetica: 'O "fôlego/espírito" (Ruach) é soprado no vale de ossos secos. Representa a promessa incondicional da ressurreição nacional e espiritual de Israel quando não havia mais esperança.',
    conexaoHumana: 'Ilustra o desespero absoluto. A sociedade, assim como indivíduos, chega a pontos de ruína onde apenas uma intervenção externa miraculosa pode trazer vida.',
    aplicacaoPratica: 'Fale palavras de encorajamento e vida sobre o projeto, casamento ou filho que você considera uma "causa perdida" ou sem solução lógica hoje.'
  },
  {
    livroId: 'daniel',
    capitulo: 3,
    versiculo: 17,
    referenciaCompleta: 'Daniel 3:17-18',
    blocoNome: 'Daniel - Bloco 1 (Cap. 1-6: Histórias na Babilônia)',
    profundidadeExegetica: 'A expressão "e, se não" (ve\'im la) mostra uma fé que não barganha. Sadraque, Mesaque e Abede-Nego creem no livramento, mas sua devoção não depende de resultados favoráveis.',
    conexaoHumana: 'Revela a fragilidade da nossa fé, que frequentemente evapora quando Deus diz "não" ou quando as orações não são respondidas do nosso jeito.',
    aplicacaoPratica: 'Declare em oração hoje: "Deus, mesmo que a situação \'X\' não se resolva como eu quero, eu continuarei Te servindo com alegria."'
  },
  {
    livroId: 'daniel',
    capitulo: 12,
    versiculo: 3,
    referenciaCompleta: 'Daniel 12:3',
    blocoNome: 'Daniel - Bloco 2 (Cap. 7-12: Visões Proféticas)',
    profundidadeExegetica: 'O termo Maskil (sábios) se refere aos que permanecem fiéis na perseguição e "ensinam a justiça a muitos". Eles receberão um galardão cósmico e brilharão eternamente.',
    conexaoHumana: 'Contrasta a busca humana por fama terrena efêmera (likes e status) com a verdadeira glória que repousa sobre aqueles que ganham almas.',
    aplicacaoPratica: 'Intencionalmente, compartilhe a verdade bíblica (ensine a justiça) ou dê seu testemunho hoje para uma pessoa que não conhece a Deus.'
  },

  // 5. PROFETAS MENORES
  {
    livroId: 'miqueias',
    capitulo: 6,
    versiculo: 8,
    referenciaCompleta: 'Miqueias 6:8',
    blocoNome: 'Oséias a Miqueias - Bloco 1 (Amor de Deus e Justiça)',
    profundidadeExegetica: 'Mishpat (fazer justiça pragmática) e Chesed (amar a misericórdia) devem ser aliados a "andar humildemente" (Tsana). A religião verdadeira é justiça social equilibrada com santidade interna.',
    conexaoHumana: 'Expõe a discrepância entre liturgia e ética diária: gostamos dos cultos e rituais confortáveis, mas fugimos da exigência de sermos justos com o próximo.',
    aplicacaoPratica: 'Seja rigorosamente honesto e justo hoje em algo onde ninguém está vigiando (ex: pagar corretamente um imposto, ser íntegro nas horas de trabalho).'
  },
  {
    livroId: 'malaquias',
    capitulo: 4,
    versiculo: 2,
    referenciaCompleta: 'Malaquias 4:2',
    blocoNome: 'Naum a Malaquias - Bloco 2 (O Dia do Senhor)',
    profundidadeExegetica: 'O "Sol da Justiça" (Shemesh tsedaqah) traz cura em suas asas (raios). Uma promessa Messiânica definitiva que trará calor, restauração e cura plena para aqueles que temem a Deus.',
    conexaoHumana: 'Revela as marcas, os traumas e as "doenças espirituais" enraizadas no ser humano, que só podem ser curadas sob a luz da revelação de Cristo.',
    aplicacaoPratica: 'Exponha hoje uma ferida emocional ou um pecado oculto à "luz" por meio de confissão a um líder ou mentor de confiança, permitindo o início da cura.'
  },

  // 6. EVANGELHOS E ATOS
  {
    livroId: 'mateus',
    capitulo: 6,
    versiculo: 33,
    referenciaCompleta: 'Mateus 6:33',
    blocoNome: 'Mateus - Bloco 1 (Cap. 1-13: O Rei e o Reino)',
    profundidadeExegetica: '"Buscai" (Zeteo) no imperativo presente denota um hábito contínuo. "Primeiro" (Proton) indica a prioridade matemática e moral da expansão do Reino sobre a ansiedade das necessidades materiais (Tauta panta).',
    conexaoHumana: 'Destrói a raiz da ansiedade, mostrando que focamos no supérfluo para garantir o controle, perdendo a visão da missão divina.',
    aplicacaoPratica: 'Antes de checar e-mails, olhar o saldo bancário ou começar o trabalho hoje, gaste os primeiros 15 minutos do seu dia lendo a Bíblia e orando.'
  },
  {
    livroId: 'mateus',
    capitulo: 13,
    versiculo: 23,
    referenciaCompleta: 'Mateus 13:23',
    blocoNome: 'As Parábolas de Jesus - Ensinos do Reino (Parábola do Semeador)',
    profundidadeExegetica: 'O verbo grego Suniemi (entender/compreender) define a boa terra. O fruto não nasce apenas de ouvir a Palavra, mas de internalizá-la e juntar as peças mentalmente. Os "espinhos" (Akantha) representam a sufocação pela ansiedade e riqueza.',
    conexaoHumana: 'Revela como a nossa mente moderna é rasa e hiperestimulada. Ouvimos dezenas de mensagens boas, mas a ansiedade e as distrações sufocam qualquer mudança real de hábito.',
    aplicacaoPratica: 'Ao ler a Bíblia ou ouvir um sermão hoje, deixe o celular em outro cômodo para garantir foco total e evitar que as "distrações" sufoquem o que você está aprendendo.'
  },
  {
    livroId: 'mateus',
    capitulo: 18,
    versiculo: 32,
    referenciaCompleta: 'Mateus 18:32-33',
    blocoNome: 'As Parábolas de Jesus - Ensinos do Reino (Parábola do Credor Incompassivo)',
    profundidadeExegetica: 'O contraste é absurdo: o servo foi perdoado de 10 mil talentos (uma dívida astronômica e impagável para um operário), mas quase estrangula seu conservo por 100 denários (uma dívida pequena, de 3 meses de trabalho). Faltou a ele Eleos (misericórdia).',
    conexaoHumana: 'O texto é um espelho doloroso da nossa falta de empatia. Exigimos graça e tolerância absolutas quando erramos, mas exigimos justiça punitiva e implacável quando os outros nos ofendem.',
    aplicacaoPratica: 'Libere o perdão imediatamente hoje para uma ofensa pequena do cotidiano (uma fechada no trânsito, uma resposta atravessada no trabalho), lembrando da dívida impagável que Jesus já perdoou de você.'
  },
  {
    livroId: 'mateus',
    capitulo: 25,
    versiculo: 21,
    referenciaCompleta: 'Mateus 25:21',
    blocoNome: 'As Parábolas de Jesus - Ensinos do Reino (Parábola dos Talentos)',
    profundidadeExegetica: 'O senhor elogia o servo não por ser genial, mas por ser "bom e fiel" (Agathos kai pistos). O grande pecado do terceiro servo foi o medo (Phobeomai), que o paralisou e o fez "enterrar" o potencial que lhe foi confiado.',
    conexaoHumana: 'Mostra a "paralisia por análise". Muitas vezes deixamos de fazer o bem ou de usar nossos dons por medo de falhar, de sermos criticados ou de acharmos que nosso talento é pequeno demais.',
    aplicacaoPratica: 'Use uma habilidade que você tem (ex: escrever, aconselhar, organizar, cozinhar) para abençoar de forma gratuita pelo menos uma pessoa no dia de hoje, sem medo de críticas.'
  },
  {
    livroId: 'mateus',
    capitulo: 28,
    versiculo: 19,
    referenciaCompleta: 'Mateus 28:19',
    blocoNome: 'Mateus - Bloco 2 (Cap. 14-28: Morte e Ressurreição)',
    profundidadeExegetica: 'O particípio "Indo" (Poreuthentes) associado ao imperativo primário "fazei discípulos" (Matheteusate) tira a Grande Comissão do passivo para o cotidiano intencional, abarcando todas as etnias (Ethne).',
    conexaoHumana: 'Mostra o comodismo da igreja, que prefere reter o conforto e os membros em vez de treinar e enviar pessoas para fazer a diferença real no mundo.',
    aplicacaoPratica: 'Invista seu tempo hoje ensinando algo valioso ou discipulando alguém mais jovem/novo na fé, em vez de apenas focar em você mesmo.'
  },
  {
    livroId: 'marcos',
    capitulo: 10,
    versiculo: 45,
    referenciaCompleta: 'Marcos 10:45',
    blocoNome: 'Marcos - Bloco Único (O Servo Sofredor)',
    profundidadeExegetica: 'A expressão Lutron (resgate/preço de alforria) revela a teologia da substituição. O Filho do Homem não veio ser o alvo dos serviços humanos, mas para libertar os escravos com a própria vida.',
    conexaoHumana: 'Confronta a natureza egocêntrica do ser humano, que busca a todo custo títulos, chefias e status para "ser servido" pelos outros.',
    aplicacaoPratica: 'Faça hoje uma tarefa que não é sua responsabilidade oficial (ex: lavar a louça do escritório, ajudar com um peso) sem esperar agradecimentos.'
  },
  {
    livroId: 'lucas',
    capitulo: 9,
    versiculo: 23,
    referenciaCompleta: 'Lucas 9:23',
    blocoNome: 'Lucas - Bloco 1 (Cap. 1-13: O Filho do Homem)',
    profundidadeExegetica: 'A negação de si mesmo (Arneomai) e o "tomar a cruz diariamente" referem-se à crucificação dos desejos da carne e à morte pública do orgulho. Não é dor física apenas, é rendição da vontade.',
    conexaoHumana: 'Mostra que seguir a Cristo não é uma adesão a um clube de vantagens, mas uma execução diária da vaidade e dos interesses egoístas.',
    aplicacaoPratica: 'Hoje, ceda deliberadamente a sua razão numa discussão fútil, engolindo seu orgulho e priorizando a paz em vez de "vencer o argumento".'
  },
  {
    livroId: 'lucas',
    capitulo: 10,
    versiculo: 33,
    referenciaCompleta: 'Lucas 10:33-34',
    blocoNome: 'As Parábolas de Jesus - Ensinos do Reino (Parábola do Bom Samaritano)',
    profundidadeExegetica: 'O samaritano "moveu-se de íntima compaixão" (Splagchnizomai - compaixão que revira as entranhas). Enquanto o sacerdote e o levita evitaram o ferido por medo da impureza ritual (tocar num cadáver), o samaritano quebrou a barreira do ódio étnico para demonstrar amor ativo.',
    conexaoHumana: 'Denuncia a hipocrisia de usar a "agenda religiosa" ou os "deveres importantes" como desculpa para ignorar o sofrimento de pessoas bem na nossa frente.',
    aplicacaoPratica: 'Ajude financeiramente ou de forma prática hoje alguém cuja classe social, visão política ou origem seja completamente diferente da sua.'
  },
  {
    livroId: 'lucas',
    capitulo: 15,
    versiculo: 20,
    referenciaCompleta: 'Lucas 15:20',
    blocoNome: 'As Parábolas de Jesus - Ensinos do Reino (Parábola do Filho Pródigo)',
    profundidadeExegetica: 'O pai idoso "correu" (Trecho). No Oriente Médio do primeiro século, um patriarca correr com as vestes levantadas era uma vergonha pública. O pai assumiu a humilhação para abraçar o filho antes que a aldeia o apedrejasse por ter perdido a herança.',
    conexaoHumana: 'Destrói a nossa visão de um Deus implacável com os braços cruzados esperando para nos punir. Mostra nossa dificuldade em aceitar que somos amados apesar do nosso fracasso.',
    aplicacaoPratica: 'Pare de se punir emocionalmente por um erro que você já abandonou e confessou. Aceite o perdão de Deus hoje e siga em frente de cabeça erguida.'
  },
  {
    livroId: 'lucas',
    capitulo: 18,
    versiculo: 13,
    referenciaCompleta: 'Lucas 18:13-14',
    blocoNome: 'As Parábolas de Jesus - Ensinos do Reino (Parábola do Fariseu e o Publicano)',
    profundidadeExegetica: 'O publicano bate no peito e diz: "Sê propício a mim" (Hilaskomai). Ele não pede que Deus ignore seu pecado, mas pede a misericórdia através do sangue do sacrifício. O fariseu, por outro lado, tenta se justificar (Dikaioo) pelo próprio mérito.',
    conexaoHumana: 'Expõe a arrogância secreta do coração humano: a necessidade de comparar nossos acertos com as falhas dos outros para nos sentirmos espiritualmente superiores.',
    aplicacaoPratica: 'Na sua oração de hoje, não cite nenhuma de suas qualidades, sacrifícios ou acertos. Aborde Deus focando 100% na dependência que você tem da misericórdia dEle.'
  },
  {
    livroId: 'lucas',
    capitulo: 19,
    versiculo: 10,
    referenciaCompleta: 'Lucas 19:10',
    blocoNome: 'Lucas - Bloco 2 (Cap. 14-24: O Caminho para a Cruz)',
    profundidadeExegetica: 'O termo Zeteo (buscar) e Sozo (salvar/resgatar da destruição). Jesus assume o papel ativamente do caçador, revertendo a lógica religiosa onde o homem precisa encontrar Deus.',
    conexaoHumana: 'Destaca que todos estamos "perdidos" (fora de rota) até sermos interceptados pela graça de Cristo. Nós não achamos Jesus; Ele nos acha.',
    aplicacaoPratica: 'Procure intencionalmente interagir (conversar, tomar um café) com alguém no seu círculo social que se sente rejeitado ou marginalizado hoje.'
  },
  {
    livroId: 'joao',
    capitulo: 1,
    versiculo: 14,
    referenciaCompleta: 'João 1:14',
    blocoNome: 'João - Bloco 1 (Cap. 1-12: Os Sinais de Cristo)',
    profundidadeExegetica: 'O Logos (Palavra) "fez-se carne" (Sarx) e "habitou/tabernaculou" (Skenoo) entre nós. A divindade máxima se humilha nas restrições da biologia humana para se revelar plenamente (Cheio de graça e verdade).',
    conexaoHumana: 'Encerra a angústia filosófica de tentar imaginar como Deus é distante. Ele tocou a nossa realidade, conheceu nossa fome, frio e dor.',
    aplicacaoPratica: 'Demonstre empatia real. "Tabernacule" na dor de um amigo: vá até ele hoje e ouça-o sem oferecer clichês religiosos rápidos, apenas oferecendo sua presença.'
  },
  {
    livroId: 'joao',
    capitulo: 14,
    versiculo: 6,
    referenciaCompleta: 'João 14:6',
    blocoNome: 'João - Bloco 2 (Cap. 13-21: Cenáculo e Cruz)',
    profundidadeExegetica: 'O artigo definido triplo (Hodos, Aletheia, Zoe) decreta exclusividade. Ele não é "um" caminho, Ele é O único acesso exato, a única realidade e a única fonte orgânica de vida eterna.',
    conexaoHumana: 'Quebra o universalismo moderno que diz que "todos os caminhos levam a Deus". O homem perdido precisa de uma bússola e de um Salvador singular, não de opiniões.',
    aplicacaoPratica: 'Agradeça a Jesus hoje em oração específica, reconhecendo que seu acesso ao Pai independe das suas falhas, mas depende inteiramente Dele.'
  },
  {
    livroId: 'atos',
    capitulo: 1,
    versiculo: 8,
    referenciaCompleta: 'Atos 1:8',
    blocoNome: 'Atos - Bloco 1 (Cap. 1-12: A Igreja em Jerusalém/Pedro)',
    profundidadeExegetica: 'Dunamis (poder/capacitação sobrenatural) é dado aos Martys (testemunhas/mártires). O poder do Espírito não é para arrepios místicos pessoais, mas é combustível para a evangelização global, de perto (Jerusalém) a longe.',
    conexaoHumana: 'Revela que a força de vontade humana falha sob perseguição. Sem o Espírito Santo, cederíamos à pressão e silenciaríamos sobre o evangelho.',
    aplicacaoPratica: 'Peça ousadia ao Espírito Santo hoje para não esconder sua fé no ambiente de trabalho ou escola quando o assunto surgir naturally.'
  },
  {
    livroId: 'atos',
    capitulo: 20,
    versiculo: 24,
    referenciaCompleta: 'Atos 20:24',
    blocoNome: 'Atos - Bloco 2 (Cap. 13-28: Viagens Missionárias/Paulo)',
    profundidadeExegetica: 'Paulo considera sua vida como "não tendo valor" (Timios) se não for para completar a "carreira" (Dromos). Ele vive focado no dever, desapegado da autopreservação física.',
    conexaoHumana: 'Choca com a nossa atual obsessão por segurança e conforto acima de tudo. A missão importa mais do que o instinto de sobrevivência.',
    aplicacaoPratica: 'Comprometa-se a cumprir o que foi pedido a você em seu ministério ou vocação hoje, mesmo se as circunstâncias ao redor forem duras ou cansativas.'
  },

  // 7. EPÍSTOLAS (CARTAS)
  {
    livroId: 'romanos',
    capitulo: 8,
    versiculo: 1,
    referenciaCompleta: 'Romanos 8:1',
    blocoNome: 'Romanos - Bloco 1 (Cap. 1-8: Justificação)',
    profundidadeExegetica: '"Nenhuma condenação há" (Ouden katakrima). Um veredito forense divino de inocência foi baixado de uma vez por todas para aqueles cuja posição pactual está "em Cristo" (en Christo).',
    conexaoHumana: 'Libertação definitiva da culpa tóxica e do complexo de inferioridade que o acusador e nossa própria consciência tentam nos impor constantemente.',
    aplicacaoPratica: 'Identifique um pecado do passado que você já confessou, mas do qual o diabo ainda usa para te acusar, e rejeite essa condenação em voz alta.'
  },
  {
    livroId: 'romanos',
    capitulo: 12,
    versiculo: 2,
    referenciaCompleta: 'Romanos 12:2',
    blocoNome: 'Romanos - Bloco 2 (Cap. 9-16: Aplicação Prática)',
    profundidadeExegetica: 'Paulo ordena: Não vos Suschematizo (modelem/conformem externamente com esta era), mas Metamorphoo (sejam transformados internamente pela mudança da mente).',
    conexaoHumana: 'Mostra o enorme perigo do mimetismo social, onde nós passamos a agir, falar e postar exatamente como o sistema decaído apenas para pertencer à massa.',
    aplicacaoPratica: 'Pare de consumir um tipo específico de conteúdo (filme, música, rede social) hoje que está sutilmente moldando seus valores para longe de Deus.'
  },
  {
    livroId: '1corintios',
    capitulo: 13,
    versiculo: 4,
    referenciaCompleta: '1 Coríntios 13:4-5',
    blocoNome: '1 e 2 Coríntios - Bloco 1 (1Co: Correções na Igreja)',
    profundidadeExegetica: 'O amor (Agape) é descrito não como um sentimento passivo, mas com verbos ativos (sofre, suporta, não busca seus interesses). O Agape anula o dom carismático quando a ética relacional falta.',
    conexaoHumana: 'Destrói a ideia romântica dos filmes de que amor é emoção. O amor ágape exige sacrifício e recusa o egoísmo crônico humano.',
    aplicacaoPratica: 'Tenha hoje uma atitude de paciência radical com uma pessoa difícil do seu convívio, em vez de revidar ou falar de forma grosseira.'
  },
  {
    livroId: '2corintios',
    capitulo: 12,
    versiculo: 9,
    referenciaCompleta: '1 e 2 Coríntios - Bloco 2 (2Co: Ministério e Consolação)',
    profundidadeExegetica: 'A fraqueza (Astheneia) é exatamente a tenda onde o poder (Dunamis) de Cristo repousa. A graça não é para nos tornar super-homens, mas para operar apesar das nossas limitações físicas/emocionais ("espinho na carne").',
    conexaoHumana: 'Confronta o orgulho do perfeccionismo e a cultura do "invencível". A fraqueza reconhecida é a maior plataforma para a força de Deus.',
    aplicacaoPratica: 'Ao invés de tentar disfarçar seu cansaço ou limite diante de um desafio complexo hoje, ore declarando que a graça de Cristo completará o que lhe falta.'
  },
  {
    livroId: 'efesios',
    capitulo: 2,
    versiculo: 8,
    referenciaCompleta: 'Efésios 2:8-9',
    blocoNome: 'Gálatas, Efésios, Filipenses, Colossenses - Bloco 1',
    profundidadeExegetica: 'A salvação é por graça (Charis - favor imerecido) mediante a fé (Pistis - confiança). "E isto não vem de vós, é dom (Doron) de Deus". Bloqueia-se, assim, o orgulho de salvação por moralidade ("para que ninguém se glorie").',
    conexaoHumana: 'Fulmina o instinto meritocrático humano que tenta criar sistemas de "boas obras" para tentar obrigar Deus a nos abençoar em troca.',
    aplicacaoPratica: 'Faça hoje uma avaliação profunda e pare de cobrar as outras pessoas com uma régua de perfeição que nem você alcança; seja gracioso.'
  },
  {
    livroId: '2timoteo',
    capitulo: 3,
    versiculo: 16,
    referenciaCompleta: '2 Timóteo 3:16',
    profundidadeExegetica: 'Theopneustos significa "soprada/respirada por Deus". Afirma a origem e autoridade divina de todas as escrituras, útil para ensinar (doutrina), repreender (mostrar erro), corrigir (restaurar o estado) e instruir.',
    conexaoHumana: 'Responde à busca do homem por absolutos num mundo instável, evidenciando que nossas opiniões variam, mas o compasso moral de Deus é fixo.',
    aplicacaoPratica: 'Permita que a Bíblia repreenda você hoje: leia um capítulo e identifique deliberadamente um hábito que precisa de correção segundo o texto.'
  },

  // 2. LIVROS HISTÓRICOS (COMPLEMENTO)
  {
    livroId: '1cronicas',
    capitulo: 29,
    versiculo: 14,
    referenciaCompleta: '1 Crônicas 29:14',
    blocoNome: '1 Crônicas - Bloco Único',
    profundidadeExegetica: 'Davi reconhece que a capacidade de ofertar voluntariamente (Nadav) vem do próprio Deus. Tudo pertence a Ele (Miyadkha - da tua mão), destruindo a ilusão de que o homem é dono de algo.',
    conexaoHumana: 'Confronta o nosso sentimento de propriedade e avareza. Achamos que somos donos do nosso dinheiro e talentos, quando na verdade somos apenas administradores temporários.',
    aplicacaoPratica: 'Faça hoje uma doação financeira ou doe um bem material que você gosta muito (não o que sobra) para reconhecer na prática que Deus é o verdadeiro dono dos seus recursos.'
  },
  {
    livroId: 'esdras',
    capitulo: 7,
    versiculo: 10,
    referenciaCompleta: 'Esdras 7:10',
    blocoNome: 'Esdras - Bloco 1',
    profundidadeExegetica: 'Esdras "preparou o coração" (Kun levav) para buscar a lei, praticar e ensinar. A ordem dos verbos hebraicos é vital: primeiro o coração é firmado, depois há o estudo, seguido da ação, e só então o ensino aos outros.',
    conexaoHumana: 'Revela o perigo da hipocrisia moderna de querer ensinar, postar ou cobrar dos outros aquilo que nós mesmos ainda não vivemos na prática.',
    aplicacaoPratica: 'Antes de corrigir a atitude de alguém da sua família ou equipe hoje, faça uma autoavaliação silenciosa e corrija primeiro essa mesma falha em você.'
  },

  // 5. PROFETAS MENORES (COMPLEMENTO)
  {
    livroId: 'oseias',
    capitulo: 6,
    versiculo: 6,
    referenciaCompleta: 'Oséias 6:6',
    blocoNome: 'Oséias - Bloco 1',
    profundidadeExegetica: 'Deus exige Chesed (amor leal/misericórdia) e Da\'at Elohim (conhecimento íntimo de Deus) em vez de sacrifícios rituais. A religião externa de Israel não encobria a quebra da aliança.',
    conexaoHumana: 'Mostra nossa tendência de tentar compensar falhas de caráter (como arrogância ou frieza) com ativismo religioso, achando que Deus pode ser "comprado".',
    aplicacaoPratica: 'Cancele uma atividade secundária hoje para simplesmente perdoar, ouvir ou ajudar ativamente um familiar que está precisando da sua misericórdia.'
  },
  {
    livroId: 'joel',
    capitulo: 2,
    versiculo: 13,
    referenciaCompleta: 'Joel 2:13',
    blocoNome: 'Joel - Bloco 1',
    profundidadeExegetica: '"Rasgai o vosso coração, e não as vossas vestes". Rasgar as vestes (Qara beged) era um teatro cultural de luto. Deus exige uma contrição interna e verdadeira, não um espetáculo externo de arrependimento.',
    conexaoHumana: 'Denuncia a nossa cultura de aparências. Pedimos desculpas da boca para fora apenas para evitar punições ou desgaste de imagem, sem nunca mudar o coração.',
    aplicacaoPratica: 'Faça uma confissão sincera a Deus de um erro que só você sabe que cometeu. Não dê desculpas e não tente minimizar o que fez.'
  },
  {
    livroId: 'amos',
    capitulo: 5,
    versiculo: 24,
    referenciaCompleta: 'Amós 5:24',
    blocoNome: 'Amós - Bloco 1',
    profundidadeExegetica: 'O clamor para que o juízo/justiça social (Mishpat) e a retidão (Tsedaqah) corram como um ribeiro perene. Deus rejeita cultos luxuosos quando os pobres estão sendo esmagados nos tribunais e mercados.',
    conexaoHumana: 'Mostra que espiritualidade e ética comercial não se separam. Adorar a Deus no domingo e ser desonesto nos negócios na segunda-feira é uma abominação.',
    aplicacaoPratica: 'Pague hoje uma dívida atrasada, cumpra um acordo financeiro esquecido ou remunere de forma justa um serviço que lhe foi prestado.'
  },
  {
    livroId: 'obadias',
    capitulo: 1,
    versiculo: 3,
    referenciaCompleta: 'Obadias 1:3',
    blocoNome: 'Obadias - Bloco 1',
    profundidadeExegetica: 'A "soberba do coração" (Zadon levav) enganou Edom, que confiava em suas fortalezas nas fendas das rochas. Deus decreta que nenhuma defesa humana pode impedir Seu julgamento contra o orgulho.',
    conexaoHumana: 'Revela a falsa sensação de segurança que o ser humano cria ao acumular dinheiro, status ou diplomas, achando que é inatingível.',
    aplicacaoPratica: 'Identifique um privilégio que você tem (cargo, formação, dinheiro) e faça hoje, de forma intencional, um trabalho simples e braçal para exercitar a humildade.'
  },
  {
    livroId: 'jonas',
    capitulo: 4,
    versiculo: 2,
    referenciaCompleta: 'Jonas 4:2',
    blocoNome: 'Jonas - Bloco 1',
    profundidadeExegetica: 'Jonas foge não por medo de falhar, mas porque sabia da teologia da graça (Channun - gracioso / Rachum - compassivo). Ele se revolta porque Deus decidiu salvar seus inimigos (os assírios).',
    conexaoHumana: 'Expõe o lado mais feio da natureza humana: queremos a graça e o perdão de Deus para os nossos erros, mas desejamos justiça implacável e destruição para quem nos ofendeu.',
    aplicacaoPratica: 'Ore hoje abençoando especificamente uma pessoa que você não gosta ou que tem visões políticas/sociais radicalmente diferentes das suas.'
  },
  {
    livroId: 'naum',
    capitulo: 1,
    versiculo: 7,
    referenciaCompleta: 'Naum 1:7',
    blocoNome: 'Naum - Bloco 2',
    profundidadeExegetica: 'O Senhor é bom, uma "fortaleza" (Ma\'oz) no dia da angústia, e "conhece" (Yada - conhecimento íntimo relacional) os que se refugiam nEle, mesmo enquanto despeja ira sobre os inimigos de Nínive.',
    conexaoHumana: 'Mostra a dualidade que nossa mente moderna tenta rejeitar: Deus é amor absoluto para os que nEle se abrigam, mas é juiz terrível contra o mal.',
    aplicacaoPratica: 'No momento de maior estresse do seu dia hoje, faça uma pausa de 1 minuto, respire fundo e declare: "Deus é meu refúgio e Ele tem o controle desta situação."'
  },
  {
    livroId: 'habacuque',
    capitulo: 2,
    versiculo: 4,
    referenciaCompleta: 'Habacuque 2:4',
    blocoNome: 'Habacuque - Bloco 2',
    profundidadeExegetica: 'Contrastando com a alma inchada e orgulhosa do babilônio, o texto afirma que o justo viverá pela sua "fé/fidelidade" (Emunah). A salvação não está no entendimento lógico do caos, mas na confiança firme.',
    conexaoHumana: 'Em tempos de crise global ou ansiedade pessoal, nossa primeira reação é o desespero. O texto prova que a sobrevivência emocional depende de onde ancoramos nossa confiança.',
    aplicacaoPratica: 'Diante de uma notícia ruim ou preocupação financeira hoje, recuse a ansiedade e escolha verbalizar a sua total dependência da provisão de Deus.'
  },
  {
    livroId: 'sofanias',
    capitulo: 3,
    versiculo: 17,
    referenciaCompleta: 'Sofonias 3:17',
    blocoNome: 'Sofonias - Bloco 2',
    profundidadeExegetica: 'O Deus "Poderoso" (Gibbor) não apenas salva, mas se regozija sobre Seu povo com alegria e cânticos (Rinnah). É a mais forte imagem afetiva de Deus em todo o Antigo Testamento.',
    conexaoHumana: 'Destrói a imagem distorcida de que Deus é um ditador sempre decepcionado conosco. Ele encontra prazer e alegria naqueles que redimiu.',
    aplicacaoPratica: 'Substitua a culpa pela adoração. Agradeça a Deus hoje sabendo que Ele sorri ao ver o seu esforço genuíno em obedecê-lo, mesmo com suas imperfeições.'
  },
  {
    livroId: 'ageu',
    capitulo: 1,
    versiculo: 5,
    referenciaCompleta: 'Ageu 1:5-6',
    blocoNome: 'Ageu - Bloco 2',
    profundidadeExegetica: '"Considerai os vossos caminhos" (Sim levav). O povo semeava muito e colhia pouco, ganhava salários para pôr em "sacos furados" porque cuidavam apenas de suas casas luxuosas enquanto o Templo (prioridade de Deus) estava em ruínas.',
    conexaoHumana: 'Diagnostica a epidemia moderna de esgotamento (burnout): trabalhamos intensamente e ganhamos dinheiro, mas não há satisfação, pois nossas prioridades espirituais estão invertidas.',
    aplicacaoPratica: 'Reveja seu orçamento financeiro ou sua agenda da semana e ajuste-os para garantir que o Reino de Deus (ofertas, tempo de igreja, ajuda social) esteja em primeiro lugar.'
  },
  {
    livroId: 'zacarias',
    capitulo: 4,
    versiculo: 6,
    referenciaCompleta: 'Zacarias 4:6',
    blocoNome: 'Zacarias - Bloco 2',
    profundidadeExegetica: 'A reconstrução não aconteceria por "força" (Chayil - exércitos/recursos) nem por "violência/poder" (Koach), mas pelo "Espírito" (Ruach) do Senhor. Um lembrete de que a obra divina depende do poder divino.',
    conexaoHumana: 'Abate o orgulho dos nossos métodos de gestão, estratégias de marketing e carisma pessoal. Todo esforço humano é inútil sem a capacitação do Espírito.',
    aplicacaoPratica: 'Pare de forçar portas que estão trancadas na sua vida pessoal. Entregue esse bloqueio ao Espírito Santo em oração e aguarde Ele agir de forma natural.'
  },

  // EPÍSTOLAS (COMPLEMENTO DO BLOCO 1)
  {
    livroId: 'galatas',
    capitulo: 5,
    versiculo: 1,
    referenciaCompleta: 'Gálatas 5:1',
    blocoNome: 'Gálatas',
    profundidadeExegetica: 'Para a "liberdade" (Eleutheria) Cristo nos libertou. Paulo usa o termo de alforria de escravos para proibir que os cristãos voltem a se submeter ao "jugo da escravidão" (a lei judaica como meio de salvação).',
    conexaoHumana: 'Revela nossa atração doentia pelo legalismo. Preferimos criar regras religiosas humanas e oprimir os outros com elas do que descansar na graça de Jesus.',
    aplicacaoPratica: 'Abandone hoje um comportamento puramente religioso e superficial que você pratica apenas para impressionar as pessoas da sua igreja.'
  },
  {
    livroId: 'filipenses',
    capitulo: 2,
    versiculo: 3,
    referenciaCompleta: 'Filipenses 2:3',
    blocoNome: 'Filipenses',
    profundidadeExegetica: '"Nada façais por partidarismo ou vanglória" (Kenodoxia - glória vazia). O imperativo é considerar o outro "superior" (Hyperecho) a si mesmo, emulando a humilhação (kenosis) do próprio Cristo.',
    conexaoHumana: 'Ataca o coração do narcisismo corporativo e das redes sociais. Gastamos a vida tentando provar que somos melhores, mais ricos e mais inteligentes que os outros.',
    aplicacaoPratica: 'Elogie sinceramente hoje uma habilidade ou conquista de um colega de trabalho que normalmente seria visto como um "concorrente" seu.'
  },
  {
    livroId: 'colossenses',
    capitulo: 3,
    versiculo: 2,
    referenciaCompleta: 'Colossenses 3:2',
    blocoNome: 'Colossenses',
    profundidadeExegetica: '"Pensai" (Phroneo - concentrar a mente, direcionar os afetos) nas coisas lá do alto, e não nas da terra. Exige uma disciplina mental cognitiva para alinhar os valores com a eternidade.',
    conexaoHumana: 'Mostra que nosso comportamento só muda quando mudamos o nosso padrão de pensamentos. Somos aprisionados pelas ansiedades terrenas (política, economia, opiniões alheias).',
    aplicacaoPratica: 'Quando um pensamento de ansiedade material atacar sua mente hoje, interrompa-o no mesmo segundo citando mentalmente um versículo sobre a eternidade.'
  },

  // EPÍSTOLAS (COMPLEMENTO DO BLOCO 2)
  {
    livroId: '1tessalonicenses',
    capitulo: 5,
    versiculo: 16,
    referenciaCompleta: '1 Tessalonicenses 5:16-18',
    blocoNome: '1 Tessalonicenses',
    profundidadeExegetica: 'Três imperativos contínuos: Alegrai-vos sempre (Chairo), orai sem cessar (Adialeiptos), dai graças em tudo (Eucharisteo). Esta é a vontade de Deus. A ação independe do estado emocional ou das circunstâncias.',
    conexaoHumana: 'Destrói a ideia de que dependemos de fatores externos ideais para sermos felizes ou gratos, colocando a gratidão como uma escolha deliberada de resistência.',
    aplicacaoPratica: 'Encontre um motivo para agradecer genuinamente a Deus pela pior situação que você vai enfrentar hoje.'
  },
  {
    livroId: '2tessalonicenses',
    capitulo: 3,
    versiculo: 10,
    referenciaCompleta: '2 Tessalonicenses 3:10',
    blocoNome: '2 Tessalonicenses',
    profundidadeExegetica: '"Se alguém não quer trabalhar (Ergazomai), também não coma". Paulo combate a preguiça disfarçada de espiritualidade (alguns pararam de trabalhar esperando a volta iminente de Cristo).',
    conexaoHumana: 'Confronta o comodismo espiritual que terceiriza as responsabilidades práticas da vida. A verdadeira fé exige produtividade civil e sustento honesto.',
    aplicacaoPratica: 'Execute a tarefa mais difícil e evitada do seu dia de trabalho hoje com total excelência, como se estivesse fazendo diretamente para Cristo.'
  },
  {
    livroId: '1timoteo',
    capitulo: 6,
    versiculo: 10,
    referenciaCompleta: '1 Timóteo 6:10',
    blocoNome: '1 Timóteo',
    profundidadeExegetica: 'O amor ao dinheiro (Philargyria) é a raiz de todos os males. O problema não é o dinheiro em si (matéria), mas a devoção idólatra da alma humana, que se desvia da fé por causa da ganância.',
    conexaoHumana: 'Diagnostica a raiz da maioria das traições, fraudes, divórcios e explorações sociais: a insaciável fome humana de construir impérios financeiros a qualquer custo.',
    aplicacaoPratica: 'Proteja seu coração da cobiça hoje celebrando a conquista financeira de um amigo, sem inveja e sem pensar "por que não aconteceu comigo?".'
  },
  {
    livroId: 'tito',
    capitulo: 2,
    versiculo: 11,
    referenciaCompleta: 'Tito 2:11-12',
    blocoNome: 'Tito',
    profundidadeExegetica: 'A "graça" (Charis) se manifestou e atua como uma educadora/pedagoga (Paideuo). Ela não nos dá licença para o pecado, mas nos treina a rejeitar as paixões mundanas e viver de forma sensata.',
    conexaoHumana: 'Evidencia o equívoco de que a graça nos torna permissivos. Quem realmente entende o favor imerecido de Deus desenvolve uma repulsa pelo que entristece a Ele.',
    aplicacaoPratica: 'Diga um "não" radical e imediato hoje a uma tentação cotidiana que você costumava aceitar com a desculpa de "ninguém é perfeito".'
  },
  {
    livroId: 'filemom',
    capitulo: 1,
    versiculo: 16,
    referenciaCompleta: 'Filemom 1:16',
    blocoNome: 'Filemom',
    profundidadeExegetica: 'Paulo pede a Filemom que receba o escravo fugitivo Onésimo "não mais como escravo", mas "como irmão caríssimo" (Adelphon agapeton). O evangelho subverte e quebra o brutal sistema de classes de Roma por meio da fraternidade em Cristo.',
    conexaoHumana: 'Demole o classismo e o racismo. A estrutura da sociedade humana baseia o valor no dinheiro e na cor, enquanto o Evangelho unifica patrão e empregado aos pés da cruz.',
    aplicacaoPratica: 'Trate uma pessoa que lhe presta serviços subordinados hoje (como um porteiro, garçom ou faxineiro) com a mesma honra e atenção que você daria ao presidente da sua empresa.'
  },

  // EPÍSTOLAS (COMPLEMENTO DO BLOCO 3)
  {
    livroId: '1pedro',
    capitulo: 5,
    versiculo: 7,
    referenciaCompleta: '1 Pedro 5:7',
    blocoNome: '1 Pedro',
    profundidadeExegetica: '"Lançando" (Epiripto - atirar de uma vez por todas) sobre Ele toda a vossa "ansiedade" (Merimna - cuidado que divide a mente). O motivo é relacional: Ele tem cuidado de vós.',
    conexaoHumana: 'Ilustra o fardo mental do homem moderno, que tenta prever e controlar cada variável do futuro, gerando fadiga mental extrema e perda de sono.',
    aplicacaoPratica: 'Escreva em um pedaço de papel a sua maior preocupação atual. Amasse o papel e jogue no lixo como um ato físico simbolizando que você transferiu esse peso para Deus.'
  },
  {
    livroId: '2pedro',
    capitulo: 3,
    versiculo: 9,
    referenciaCompleta: '2 Pedro 3:9',
    blocoNome: '2 Pedro',
    profundidadeExegetica: 'O Senhor não "retarda/procrastina" (Bradyno) a Sua promessa de voltar. O que parece demora para nós é, na verdade, a Sua "longanimidade" (Makrothymia - paciência antes de irar-se) para dar tempo de arrependimento.',
    conexaoHumana: 'Revela como somos apressados em exigir o juízo imediato de Deus sobre o mundo, esquecendo que nós mesmos fomos beneficiados por essa tolerância paciente no passado.',
    aplicacaoPratica: 'Tenha "longanimidade" com alguém que é irritantemente lento ou falho no seu convívio hoje. Dê a essa pessoa a mesma chance e paciência que Deus deu a você.'
  },
  {
    livroId: '1joao',
    capitulo: 4,
    versiculo: 18,
    referenciaCompleta: '1 João 4:18',
    blocoNome: '1 João',
    profundidadeExegetica: 'O perfeito amor "lança fora o medo" (Phobos). O medo pressupõe castigo, mas quem está enraizado no amor de Deus e na cruz não teme o juízo escatológico.',
    conexaoHumana: 'Ataca o motor primário de muitas religiões: o terrorismo psicológico. Não obedecemos a Deus por medo do inferno, obedecemos por estarmos seguros no amor.',
    aplicacaoPratica: 'Abandone o pensamento supersticioso. Hoje, tome uma atitude correta não por "medo do que Deus vai fazer", mas puramente por amor a Ele.'
  },
  {
    livroId: '2joao',
    capitulo: 1,
    versiculo: 6,
    referenciaCompleta: '2 João 1:6',
    blocoNome: '2 João',
    profundidadeExegetica: 'O amor (Agape) é definido por uma métrica objetiva: "que andemos segundo os seus mandamentos" (Entole). Na teologia joanina, o amor nunca é desvinculado da obediência à verdade.',
    conexaoHumana: 'Destrói o conceito distorcido da sociedade onde "amar é aceitar tudo o que o outro faz". O amor genuíno bíblico não aplaude o pecado.',
    aplicacaoPratica: 'Demonstre verdadeiro amor hoje ao falar a verdade com firmeza e bondade para um amigo que está tomando uma decisão destrutiva.'
  },
  {
    livroId: '3joao',
    capitulo: 1,
    versiculo: 11,
    referenciaCompleta: '3 João 1:11',
    blocoNome: '3 João',
    profundidadeExegetica: '"Não imites (Mimeomai) o que é mau, senão o que é bom." João instrui Gaio a não se conformar com a tirania de Diótrefes, mas copiar exemplos retos. Fazer o bem é a prova orgânica de quem "é de Deus".',
    conexaoHumana: 'Expõe nossa tendência psicológica de modelar o comportamento de pessoas arrogantes e influentes no trabalho, ignorando aqueles que têm caráter genuíno.',
    aplicacaoPratica: 'Identifique um líder ou irmão maduro e humilde na sua comunidade. Envie uma mensagem elogiando o caráter dele hoje e imite uma virtude visível dessa pessoa.'
  },
  {
    livroId: 'judas',
    capitulo: 1,
    versiculo: 24,
    referenciaCompleta: 'Judas 1:24',
    blocoNome: 'Judas',
    profundidadeExegetica: 'A doxologia final exalta Aquele que é poderoso para nos "guardar de tropeçar" (Aptaistos) e nos apresentar jubilosos na Sua glória. A preservação final do crente repousa na força de Deus, não na do homem.',
    conexaoHumana: 'Traz alívio à exaustão espiritual. Sozinhos, fatalmente cairíamos diante das seduções do mundo; é o poder soberano que garante a nossa chegada.',
    aplicacaoPratica: 'Termine o dia de hoje agradecendo em oração não apenas pelo que Deus te deu, mas agradecendo pelos "tropeços" dos quais Ele invisivelmente te protegeu.'
  },
  {
    livroId: 'hebreus',
    capitulo: 4,
    versiculo: 12,
    referenciaCompleta: 'Hebreus 4:12',
    blocoNome: 'Hebreus - Bloco Único (A Supremacia de Cristo)',
    profundidadeExegetica: 'A Palavra é viva (Zao), eficaz (Energes) e mais penetrante que espada de dois gumes, capaz de julgar (Kritikos) os desejos mais ocultos (Ennoia) da mente humana.',
    conexaoHumana: 'Tira nossa máscara religiosa. Podemos mentir para terapeutas ou líderes espirituais, mas a Bíblia corta a dissimulação e revela exatamente o que somos.',
    aplicacaoPratica: 'Pare de justificar seus pecados. Leia um texto exortativo e confesse a verdade crua a Deus sem maquiar suas falhas e intenções duvidosas.'
  },
  {
    livroId: 'hebreus',
    capitulo: 11,
    versiculo: 1,
    referenciaCompleta: 'Hebreus 11:1',
    blocoNome: 'Hebreus - Expansão de Auditoria (Versículo Alternativo)',
    profundidadeExegetica: '"Ora, a fé é o firme fundamento (Hypostasis - base/substância material) das coisas que se esperam, e a prova (Elegchos - evidência jurídica/convicção) das coisas que se não veem". Fé aqui não é pensamento positivo; é a posse antecipada de uma realidade prometida por Deus.',
    conexaoHumana: 'Expõe como confundimos "fé" com "torcida". Torcer é desejar que algo dê certo baseado na sorte; fé é descansar a mente baseado no caráter inabalável de quem prometeu.',
    aplicacaoPratica: 'Tire o peso das suas costas. Substitua a frase "eu espero que dê certo" por "eu descanso na providência de Deus" ao falar sobre o seu maior problema de hoje.'
  },
  {
    livroId: 'tiago',
    capitulo: 1,
    versiculo: 22,
    referenciaCompleta: 'Tg, 1 e 2 Pe, 1, 2, 3 Jo, Judas - Bloco 3',
    profundidadeExegetica: 'Sede praticantes (Poietes) e não apenas ouvintes (Akroates). O ouvinte não praticante sofre de "auto-engano lógico" (Paralogizomai), iludindo a si próprio de que é crente só por ter ouvido o sermão.',
    conexaoHumana: 'Ataca frontalmente a religiosidade teórica. Muito estudo, milhares de anotações em cultos, mas transformação prática zero na vida diária.',
    aplicacaoPratica: 'Selecione um versículo ou anotação do culto do último domingo que você ouviu e execute essa ordem de forma física e mensurável hoje.'
},
  {
    livroId: 'tiago',
    capitulo: 3,
    versiculo: 1,
    referenciaCompleta: 'Tiago 3:1',
    blocoNome: 'Tiago - Expansão de Auditoria (Versículo Alternativo)',
    profundidadeExegetica: '"Meus irmãos, não sejais muitos de vós mestres (Didaskalos), sabendo que receberemos mais duro juízo". Tiago freia a ambição desenfreada pela liderança e pelo ensino, alertando que a visibilidade espiritual atrai um escrutínio divino muito mais rigoroso sobre o caráter de quem fala.',
    conexaoHumana: 'Destrói a epidemia de narcisismo digital, onde todos querem ser "influenciadores", gurus ou mestres nas redes sociais, ignorando a grave responsabilidade espiritual de liderar a mente dos outros.',
    aplicacaoPratica: 'Revise o que você postou ou falou publicamente nas últimas 24 horas. Se houver algo que você ensinou aos outros, mas que você mesmo não pratica, apague ou retrate-se.'
  },

  // 8. APOCALIPSE
  {
    livroId: 'apocalipse',
    capitulo: 3,
    versiculo: 20,
    referenciaCompleta: 'Apocalipse 3:20',
    blocoNome: 'Apocalipse - Bloco 1 (Cap. 1-5: As Cartas e o Trono)',
    profundidadeExegetica: 'Jesus bate (Krouo) à porta. Notavelmente, esta exortação é para a igreja (Laodicéia), que estava morna, autossuficiente e O deixou do lado de fora do culto. É um convite à intimidade e ao arrependimento relacional (Deipneo - cear junto).',
    conexaoHumana: 'Mostra que é possível ter reuniões, sistemas, dinheiro e doutrina perfeitamente organizados e, no fim do dia, empurrar Jesus para o lado de fora do controle das coisas.',
    aplicacaoPratica: 'Reserve 10 minutos hoje à noite apenas para ficar em silêncio com Jesus. Sem pedir recursos, apenas para cultivar a intimidade da Sua presença em casa.'
  },
  // --- SUPER EXPANSÃO: O NOVO TESTAMENTO COMPLETO ---
  // OS EVANGELHOS
  {
    livroId: 'mateus',
    capitulo: 11,
    versiculo: 28,
    referenciaCompleta: 'Mateus 11:28-29',
    blocoNome: 'Mateus (O Jugo Suave)',
    profundidadeExegetica: 'Jesus convida os cansados a tomarem o Seu "jugo" (Zygos - canga de madeira que unia dois bois). O jugo dos fariseus era pesado (legalismo), mas o de Jesus é Chrestos (bem ajustado, suave). O resultado não é férias físicas, mas Anapausis (descanso/refrigério) para a alma.',
    conexaoHumana: 'Nossa geração sofre de exaustão crônica e burnout porque carregamos o "jugo" do perfeccionismo, da aprovação social e das metas corporativas inatingíveis.',
    aplicacaoPratica: 'Identifique uma autocobrança exagerada que está esmagando sua saúde mental hoje (ex: "preciso ser perfeito no trabalho"). Abandone esse peso e troque-o pela aceitação da graça de Cristo.'
  },
  {
    livroId: 'marcos',
    capitulo: 9,
    versiculo: 24,
    referenciaCompleta: 'Marcos 9:24',
    blocoNome: 'Marcos (Ajuda na Incredulidade)',
    profundidadeExegetica: '"Eu creio, Senhor! Ajuda a minha incredulidade" (Boethei mou te apistia). O pai do jovem possesso admite a coexistência paradoxal de Pistis (fé) e Apistia (incredulidade) no mesmo coração. Jesus honra a sinceridade desesperada, não exigindo uma fé plastificada e sem dúvidas.',
    conexaoHumana: 'Escondemos nossas dúvidas por medo do julgamento religioso. Fingimos ter uma fé inabalável, quando na verdade, a vulnerabilidade e a confissão da nossa fraqueza são os gatilhos para o milagre.',
    aplicacaoPratica: 'Não use jargões espiritualizados hoje. Confesse a Deus, em oração, uma dúvida específica ou um medo profundo que você tem tido vergonha de admitir.'
  },
  {
    livroId: 'lucas',
    capitulo: 12,
    versiculo: 15,
    referenciaCompleta: 'Lucas 12:15',
    blocoNome: 'Lucas (A Guarda Contra a Avareza)',
    profundidadeExegetica: '"Acautelai-vos e guardai-vos da avareza (Pleonexia - desejo insaciável de ter mais); porque a vida (Zoe) de qualquer não consiste na abundância do que possui." Jesus ataca o núcleo da identidade baseada em acúmulo de bens.',
    conexaoHumana: 'O materialismo nos convence de que o nosso "valor líquido" (dinheiro e posses) define o nosso "valor pessoal". Gastamos a vida comprando coisas que não precisamos para impressionar pessoas que não se importam.',
    aplicacaoPratica: 'Vá ao seu guarda-roupa ou armário hoje, escolha um item de valor que você gosta (mas não usa) e doe para quebrar fisicamente o poder do apego material.'
  },
  {
    livroId: 'joao',
    capitulo: 8,
    versiculo: 32,
    referenciaCompleta: 'João 8:32',
    blocoNome: 'João (A Verdade que Liberta)',
    profundidadeExegetica: '"E conhecereis a verdade, e a verdade vos libertará (Eleutheroo)." A Verdade (Aletheia) em João não é uma informação filosófica, mas a pessoa de Cristo. A libertação aqui não é política, mas o resgate da escravidão ontológica do pecado.',
    conexaoHumana: 'Achamos que "liberdade" é o direito de fazer qualquer coisa que desejamos, mas essa falsa liberdade nos escraviza a vícios, dívidas e paixões destrutivas. Liberdade real é ter o poder divino para fazer o que é certo.',
    aplicacaoPratica: 'Pare de dar desculpas para um mau hábito (mentira, gula, preguiça). Diga a verdade em voz alta hoje: "Eu sou escravo disso e preciso de Jesus para mudar."'
  },

  // HISTÓRIA DA IGREJA
  {
    livroId: 'atos',
    capitulo: 17,
    versiculo: 26,
    referenciaCompleta: 'Atos 17:26-27',
    blocoNome: 'Atos (A Orquestração dos Tempos)',
    profundidadeExegetica: 'Deus determinou os tempos (Kairos - épocas exatas) e os "limites da sua habitação" (Horothesia - fronteiras geográficas) para que os homens O buscassem. Nenhuma pessoa nasce na época ou no país errado; tudo é geopoliticamente orquestrado por Deus para a redenção.',
    conexaoHumana: 'Fere a nossa crise existencial de achar que "nascemos na época errada" ou que estamos presos num emprego/cidade inútil. Onde você está não é um acidente, é o seu campo missionário.',
    aplicacaoPratica: 'Mude sua perspectiva sobre a sua rotina hoje. Olhe para a sua escola, faculdade ou trabalho não como um fardo, mas como o território geográfico que Deus te designou para brilhar.'
  },

  // EPÍSTOLAS PAULINAS
  {
    livroId: 'romanos',
    capitulo: 5,
    versiculo: 8,
    referenciaCompleta: 'Romanos 5:8',
    blocoNome: 'Romanos (Demonstração do Amor)',
    profundidadeExegetica: '"Mas Deus prova (Synistemi - demonstração irrefutável) o seu amor para conosco, em que Cristo morreu por nós, sendo nós ainda pecadores (Hamartolos)." O ágape divino não é uma reação à nossa bondade; é uma ação proativa enquanto ainda éramos Seus inimigos e errávamos o alvo.',
    conexaoHumana: 'Projetamos o amor condicional humano em Deus. Achamos que precisamos "tomar banho" e nos consertar moralmente primeiro, para só então termos o direito de nos aproximar dEle.',
    aplicacaoPratica: 'Pare de tentar se "limpar" antes de orar. Apresente-se a Deus agora mesmo, exatamente com a falha, a sujeira ou o erro que você cometeu hoje.'
  },
  {
    livroId: '1corintios',
    capitulo: 10,
    versiculo: 13,
    referenciaCompleta: '1 Coríntios 10:13',
    blocoNome: '1 Coríntios (A Saída de Emergência)',
    profundidadeExegetica: 'Nenhuma tentação (Peirasmos) vos sobreveio que não fosse "humana" (Anthropinos - comum a todos). Deus não permite testes além das nossas forças e sempre providencia o "escape" (Ekbasis - a saída de emergência).',
    conexaoHumana: 'O diabo nos isola fazendo-nos acreditar que a nossa tentação ou o nosso vício é exclusivo, bizarro e imperdoável, e que não há como resistir. Isso é uma mentira; sempre há uma saída.',
    aplicacaoPratica: 'No momento exato em que a tentação bater hoje, procure a "saída de emergência" (ex: desligue o celular, mude de ambiente, ligue para um amigo) e fuja fisicamente do gatilho.'
  },
  {
    livroId: '2corintios',
    capitulo: 4,
    versiculo: 7,
    referenciaCompleta: '2 Coríntios 4:7',
    blocoNome: '2 Coríntios (Vasos de Barro)',
    profundidadeExegetica: '"Temos, porém, este tesouro em vasos de barro (Ostrakinos), para que a excelência (Hyperbole - poder insuperável) do poder seja de Deus e não de nós." O evangelho é guardado em recipientes frágeis e descartáveis (nossos corpos mortais) para que a glória não seja roubada.',
    conexaoHumana: 'Odiamos nossas fraquezas físicas, nossas falhas de memória e nossa fragilidade emocional. Queremos ser "vasos de ouro", esquecendo que é através das nossas rachaduras que a luz de Deus brilha para os outros.',
    aplicacaoPratica: 'Aceite uma limitação sua hoje sem se frustrar (cansaço físico, esquecimento, falta de habilidade) e ore agradecendo porque é na sua fraqueza que Deus atua.'
  },
  {
    livroId: 'galatas',
    capitulo: 6,
    versiculo: 9,
    referenciaCompleta: 'Gálatas 6:9',
    blocoNome: 'Gálatas (O Não Cansar de Fazer o Bem)',
    profundidadeExegetica: '"E não nos cansemos (Enkakeo - perder o ânimo/desistir) de fazer o bem, porque a seu tempo (Kairos) ceifaremos, se não houvermos desfalecido." A colheita espiritual segue leis agrícolas, não leis de fast-food; ela exige resiliência invisível antes do fruto visível.',
    conexaoHumana: 'Exige-se ROI (Retorno sobre Investimento) imediato em tudo. Quando tratamos alguém bem e somos correspondidos com ingratidão, nosso instinto é parar de amar.',
    aplicacaoPratica: 'Faça um favor ou um ato de bondade hoje para alguém que recentemente foi ingrato ou indiferente com você. Faça isso por Cristo, não pelo aplauso da pessoa.'
  },
  {
    livroId: 'efesios',
    capitulo: 4,
    versiculo: 26,
    referenciaCompleta: 'Efésios 4:26-27',
    blocoNome: 'Efésios (A Gestão da Ira)',
    profundidadeExegetica: '"Irai-vos (Orgidzo), e não pequeis; não se ponha o sol sobre a vossa ira. Não deis lugar (Topos - território/ponto de apoio) ao diabo." A emoção da raiva é química e natural; nutrir o ressentimento é alugar espaço na sua mente para o domínio demoníaco.',
    conexaoHumana: 'Nós romantizamos o ressentimento ("eu tenho o direito de estar ofendido"). Não percebemos que guardar mágoa de um dia para o outro não pune o ofensor, mas destrói quem guarda.',
    aplicacaoPratica: 'Não vá dormir esta noite brigado com seu cônjuge, filho ou amigo. Envie uma mensagem ou fale pessoalmente para zerar a dívida relacional antes de deitar a cabeça no travesseiro.'
  },
  {
    livroId: 'filipenses',
    capitulo: 4,
    versiculo: 6,
    referenciaCompleta: 'Filipenses 4:6',
    blocoNome: 'Filipenses (A Oração contra a Ansiedade)',
    profundidadeExegetica: '"Não andeis ansiosos (Merimnao - mente dividida em partes) por coisa alguma... sejam conhecidas as vossas petições com ação de graças (Eucharistia)." A cura para a ansiedade paralisante é a oração direta ancorada na memória de gratidão.',
    conexaoHumana: 'A ansiedade é a ilusão de que podemos controlar o futuro preocupando-nos com ele. Sofremos por tragédias mentais que nunca chegarão a acontecer na vida real.',
    aplicacaoPratica: 'Pegue sua maior preocupação de hoje e transforme-a numa oração. Mas antes de pedir a solução, agradeça verbalmente por um problema do passado que Deus já resolveu.'
  },
  {
    livroId: 'colossenses',
    capitulo: 3,
    versiculo: 23,
    referenciaCompleta: 'Colossenses 3:23',
    blocoNome: 'Colossenses (Trabalhar como para o Senhor)',
    profundidadeExegetica: '"E tudo quanto fizerdes, fazei-o de todo o coração (Ek psyches - a partir da alma), como ao Senhor (Kyrios), e não aos homens." Paulo eleva o trabalho manual e secular à categoria de adoração sagrada.',
    conexaoHumana: 'Criamos uma divisão esquizofrênica entre o "sagrado" (cantar na igreja) e o "profano" (fazer planilhas, limpar a casa). Desprezamos nosso trabalho diário por acharmos que ele não tem valor espiritual.',
    aplicacaoPratica: 'Escolha a tarefa mais chata ou frustrante do seu dia hoje e execute-a com o mais alto nível de excelência possível, como se Jesus fosse auditar o seu trabalho.'
  },
  {
    livroId: '1tessalonicenses',
    capitulo: 4,
    versiculo: 11,
    referenciaCompleta: '1 Tessalonicenses 4:11',
    blocoNome: '1 Tessalonicenses (A Ambição da Vida Tranquila)',
    profundidadeExegetica: '"Esforceis-vos (Philotimeomai - ter como ambição) por viver quietos, e tratar dos vossos próprios negócios..." A ordem apostólica subverte a ambição romana: o objetivo do cristão não é a fama escandalosa, mas a estabilidade, a honra do trabalho manual e não ser um "intrometido".',
    conexaoHumana: 'A cultura digital vive da indignação, da fofoca e de dar opinião sobre a vida de pessoas que nem conhecemos, negligenciando a nossa própria casa e deveres reais.',
    aplicacaoPratica: 'Recuse-se a emitir opinião sobre um escândalo de internet ou fofoca de corredor hoje. Gaste essa energia mental organizando algo que está bagunçado na sua própria vida.'
  },
  {
    livroId: '2tessalonicenses',
    capitulo: 2,
    versiculo: 15,
    referenciaCompleta: '2 Tessalonicenses 2:15',
    blocoNome: '2 Tessalonicenses (A Âncora da Doutrina)',
    profundidadeExegetica: '"Permanecei firmes (Stekete) e retende as tradições (Paradosis - os ensinos doutrinários apostólicos recebidos)." Diante do pânico de que o Dia do Senhor já havia chegado (espalhado por cartas falsas), a âncora é segurar firme a teologia histórica da cruz.',
    conexaoHumana: 'O constante desejo moderno de "desconstruir" a fé em busca de novidades teológicas ou gurus da internet, deixando os cristãos à deriva a cada nova crise ou dúvida.',
    aplicacaoPratica: 'Em vez de procurar uma revelação teológica inovadora, leia ou recite o "Credo Apostólico" hoje, reafirmando sua fé no alicerce testado pelos séculos.'
  },
  {
    livroId: '1timoteo',
    capitulo: 4,
    versiculo: 16,
    referenciaCompleta: '1 Timóteo 4:16',
    blocoNome: '1 Timóteo (Cuidado Consigo e com a Doutrina)',
    profundidadeExegetica: '"Tem cuidado de ti mesmo e da doutrina (Didaskalia)." A instrução a um jovem líder é dupla. Ortodoxia (doutrina reta) sem ortopraxia (conduta reta) anula o testemunho. Salvação no ministério exige coerência entre palco e bastidor.',
    conexaoHumana: 'Somos rápidos para discutir teologia profunda na internet, mas extremamente negligentes com nosso próprio caráter, pureza e trato com as pessoas.',
    aplicacaoPratica: 'Faça uma checagem de coerência. Verifique se o jeito que você tratou seus familiares esta manhã condiz com a doutrina do amor que você diz acreditar.'
  },
  {
    livroId: '2timoteo',
    capitulo: 1,
    versiculo: 7,
    referenciaCompleta: '2 Timóteo 1:7',
    blocoNome: '2 Timóteo (Espírito de Poder e Moderação)',
    profundidadeExegetica: '"Porque Deus não nos deu o espírito de covardia (Deilia - timidez/pavor), mas de poder, de amor e de moderação (Sophronismos - mente sã/disciplinada)." O medo irracional e paralisante tem origem espiritual (não vem de Deus) e deve ser combatido com a mente sob domínio próprio.',
    conexaoHumana: 'Frequentemente maquiamos nossa covardia chamando-a de "prudência" ou "traço de personalidade". Deixamos de obedecer a Deus e de avançar na vida porque estamos sequestrados pelo pavor imaginário.',
    aplicacaoPratica: 'Enfrente um problema ou uma conversa difícil que tem te causado medo irracional hoje, declarando em voz alta que a covardia não faz parte da sua identidade.'
  },
  {
    livroId: 'tito',
    capitulo: 3,
    versiculo: 2,
    referenciaCompleta: 'Tito 3:2',
    blocoNome: 'Tito (Mansidão Cívica)',
    profundidadeExegetica: '"Que a ninguém infamem (Blasphemeo), nem sejam contenciosos (Amachos - não briguentos), mas cordatos, mostrando toda a mansidão para com todos os homens." A instrução pastoral para lidar com as autoridades e com a sociedade corrupta cretense não era a revolução armada, mas a superioridade moral através da mansidão cívica.',
    conexaoHumana: 'Retrata o nosso vício em discutir política ou religião com hostilidade, insultando pessoas e destruindo nossa autoridade moral em nome de "defender a verdade".',
    aplicacaoPratica: 'Morda a língua hoje. Se você ver um comentário na rede social que seja o oposto do que você acredita, role a tela para baixo e não entre na discussão.'
  },
  {
    livroId: 'filemom',
    capitulo: 1,
    versiculo: 18,
    referenciaCompleta: 'Filemom 1:18',
    blocoNome: 'Filemom (Põe na Minha Conta)',
    profundidadeExegetica: '"E, se te fez algum dano, ou te deve alguma coisa, põe isso à minha conta (Ellogeo - debita no meu registro)." Paulo, intercedendo pelo escravo fugitivo Onésimo, encena a própria obra de Cristo: absorver a dívida do culpado para promover a reconciliação.',
    conexaoHumana: 'Quando alguém erra conosco, exigimos justiça rigorosa, esquecendo que o próprio Deus transferiu a nossa monstruosa dívida moral para a conta de Cristo na cruz.',
    aplicacaoPratica: 'Absorva o custo. Se alguém do seu convívio quebrar um objeto seu ou esquecer uma tarefa hoje, não faça a pessoa pagar com culpa; apenas perdoe.'
  },

  // EPÍSTOLAS GERAIS
  {
    livroId: 'hebreus',
    capitulo: 12,
    versiculo: 2,
    referenciaCompleta: 'Hebreus 12:2',
    blocoNome: 'Hebreus (Olhando para Jesus)',
    profundidadeExegetica: '"Olhando (Aphorontes - desviar o olhar das distrações para fixar em um ponto só) para Jesus, autor (Archegos - pioneiro/fundador) e consumador da fé..." A ordem não é olhar para a perseguição, nem para a hipocrisia dos outros, mas focar na linha de chegada.',
    conexaoHumana: 'Decepcionamo-nos com pastores, líderes e igrejas, deixando que as falhas humanas nos desviem da caminhada, pois estávamos focando nas pessoas e não no Salvador perfeito.',
    aplicacaoPratica: 'Se você lembrar de uma decepção que sofreu no ambiente religioso, recuse o cinismo e redirecione imediatamente seu pensamento para o caráter imaculado de Cristo.'
  },
  {
    livroId: 'tiago',
    capitulo: 1,
    versiculo: 19,
    referenciaCompleta: 'Tiago 1:19',
    blocoNome: 'Tiago (Pronto para Ouvir)',
    profundidadeExegetica: '"Pronto (Tachys - veloz) para ouvir, tardio para falar, tardio para se irar (Orge)." A anatomia da sabedoria nos relacionamentos inverte a proporção do comportamento carnal (onde falamos muito e ouvimos quase nada).',
    conexaoHumana: 'Em uma discussão, raramente ouvimos o outro; ficamos apenas esperando ele pausar para podermos disparar a nossa resposta e "vencer" o debate pelo volume da voz.',
    aplicacaoPratica: 'Na próxima vez que alguém vier desabafar ou discutir algo com você hoje, deixe a pessoa terminar a frase completamente. Espere 2 segundos em silêncio absoluto antes de começar a responder.'
  },
  {
    livroId: '1pedro',
    capitulo: 2,
    versiculo: 9,
    referenciaCompleta: '1 Pedro 2:9',
    blocoNome: '1 Pedro (Sacerdócio Real)',
    profundidadeExegetica: '"Vós sois a geração eleita, o sacerdócio real... para que anuncieis as virtudes (Arete - excelência moral) daquele que vos chamou das trevas." A identidade da igreja não é passiva. Somos chamados para fora da escuridão para exercermos um sacerdócio missionário (representar Deus diante do mundo secular).',
    conexaoHumana: 'Nós definimos nossa identidade pelo nosso contracheque, profissão ou status civil, esquecendo que nossa vocação primordial é agir como sacerdotes curando e abençoando a sociedade em que vivemos.',
    aplicacaoPratica: 'Entre no seu trabalho, escola ou escritório hoje com a consciência de que você não é apenas um funcionário/aluno, mas o representante oficial de Deus naquele ambiente.'
  },
  {
    livroId: '2pedro',
    capitulo: 1,
    versiculo: 5,
    referenciaCompleta: '2 Pedro 1:5',
    blocoNome: '2 Pedro (Construção do Caráter)',
    profundidadeExegetica: '"...Empregando toda a diligência, acrescentai (Epichoregeo - suplementar abundantemente/fornecer) à vossa fé a virtude..." A fé salva, mas o caráter deve ser construído intencionalmente. Pedro lista um esforço moral ativo (virtude, domínio próprio, fraternidade) que impede o crente de ser inútil.',
    conexaoHumana: 'A ilusão da passividade cristã: achamos que se continuarmos indo aos cultos no domingo, Deus "magicamente" nos tornará pessoas mais maduras, sem que nós tenhamos que fazer esforço nenhum.',
    aplicacaoPratica: 'Escolha uma virtude que lhe falta (ex: domínio próprio) e tome hoje uma atitude forçada e intencional para praticá-la, como resistir ao impulso de comprar algo supérfluo.'
  },
  {
    livroId: '1joao',
    capitulo: 1,
    versiculo: 9,
    referenciaCompleta: '1 João 1:9',
    blocoNome: '1 João (A Verdadeira Confissão)',
    profundidadeExegetica: '"Se confessarmos (Homologeo - falar a mesma coisa/concordar) os nossos pecados, ele é fiel e justo (Dikaios) para nos perdoar..." Confessar não é apenas pedir desculpas, é concordar com o veredito de Deus sobre a gravidade da nossa ofensa, sabendo que a base do perdão é a justiça da cruz.',
    conexaoHumana: 'Nós maquiamos e damos nomes bonitos para nossos pecados. Chamamos a mentira de "omissão estratégica", a fofoca de "compartilhar motivos de oração" e o ódio de "proteger minha paz".',
    aplicacaoPratica: 'Pare de dar desculpas para os seus erros. Confesse um pecado a Deus hoje usando o nome feio e bíblico dele, assumindo total responsabilidade sem culpar as circunstâncias.'
  },
  {
    livroId: '2joao',
    capitulo: 1,
    versiculo: 8,
    referenciaCompleta: '2 João 1:8',
    blocoNome: '2 João (Perseverança no Galardão)',
    profundidadeExegetica: '"Olhai por vós mesmos (Blepete - vigiai continuamente), para que não percamos o que temos ganhado, antes recebamos o inteiro galardão (Misthos)." O aviso do presbítero João contra os falsos mestres sublinha que é possível começar bem a corrida espiritual, mas afrouxar no final e comprometer a recompensa eterna.',
    conexaoHumana: 'Muitos crentes de longa data adquirem "fadiga da santidade". Após anos de obediência, passam a fazer concessões na pureza e na ética, arruinando um legado construído a vida inteira.',
    aplicacaoPratica: 'Revise um padrão de retidão que você sustentava fortemente no passado e que tem abandonado aos poucos (ex: tempo devocional, cuidado no falar). Retome esse padrão hoje.'
  },
  {
    livroId: '3joao',
    capitulo: 1,
    versiculo: 4,
    referenciaCompleta: '3 João 1:4',
    blocoNome: '3 João (Andar na Verdade)',
    profundidadeExegetica: '"Não tenho maior alegria (Chara) do que esta, a de ouvir que os meus filhos andam na verdade (Aletheia)." O ápice do sucesso para o apóstolo João não era ver os crentes enriquecendo, mas vivendo em obediência orgânica ao evangelho.',
    conexaoHumana: 'Sofremos para garantir que nossos filhos (ou discípulos) sejam bem-sucedidos academicamente, tirem boas notas e tenham carreiras lucrativas, mas negligenciamos completamente o estado da alma e da moralidade deles.',
    aplicacaoPratica: 'Faça hoje uma pergunta focada na espiritualidade (e não nas notas ou tarefas) para o seu filho ou pessoa que você mentoreia: "Como está o seu coração em relação a Deus ultimamente?"'
  },
  {
    livroId: 'judas',
    capitulo: 1,
    versiculo: 22,
    referenciaCompleta: 'Judas 1:22-23',
    blocoNome: 'Judas (Compaixão e Cuidado)',
    profundidadeExegetica: '"E apiedai-vos (Eleate - tende misericórdia) de alguns que estão na dúvida; salvai alguns, arrebatando-os do fogo (Pyr)... odiando até a túnica manchada da carne." A instrução traz o equilíbrio supremo: compaixão implacável pelo pecador confuso, e pavor absoluto do poder contaminante do seu pecado.',
    conexaoHumana: 'A igreja frequentemente cai em dois extremos: ou demoniza quem tem dúvidas (afastando-os de Deus) ou tenta ser tão amigável com o mundo que acaba relativizando o pecado e caindo junto com eles.',
    aplicacaoPratica: 'Demonstre compaixão radical. Envie uma mensagem de apoio e esperança hoje a um amigo que está desviado ou em crise existencial, sem criticá-lo ou forçar religiosidade.'
  },

  // REVELAÇÃO ESCATOLÓGICA
  {
    livroId: 'apocalipse',
    capitulo: 3,
    versiculo: 15,
    referenciaCompleta: 'Apocalipse 3:15-16',
    blocoNome: 'Apocalipse (O Perigo da Morneza)',
    profundidadeExegetica: '"Quem dera fosses frio (Psychros) ou quente (Zestos)... Como és morno (Chliaros), vomitar-te-ei da minha boca." A geografia de Laodiceia explica: água quente curava (águas de Hierápolis) e água fria refrescava (Colossos). A água morna de Laodiceia era inútil e causava náusea. O problema não é a "temperatura da fé", mas ser inútil no Reino.',
    conexaoHumana: 'É a tragédia do cristianismo de classe média confortável. Pessoas que não causam dano à sociedade, mas que também não abrem mão de nada, não se sacrificam e não transformam absolutamente nada ao seu redor.',
    aplicacaoPratica: 'Quebre a rotina do "cristianismo morno e seguro". Tome uma atitude ousada e desconfortável hoje: compartilhe sua fé com um estranho, faça uma oferta sacrifical ou enfrente uma injustiça no trabalho.'
  },
  {
    livroId: 'apocalipse',
    capitulo: 21,
    versiculo: 4,
    referenciaCompleta: 'Apocalipse 21:4',
    blocoNome: 'Apocalipse - Bloco 2 (Cap. 6-22: Juízos e a Nova Jerusalém)',
    profundidadeExegetica: '"Enxugará de seus olhos toda lágrima" (Exaleipho - apagar/limpar perfeitamente). O texto marca a abolição escatológica do ciclo amaldiçoado de morte, pranto e dor; a consumação da redenção no Novo Céu e Nova Terra.',
    conexaoHumana: 'A promessa suprema para a maior dor humana: o fim absoluto do luto, das separações traumáticas, do adoecimento e da mortalidade. O choro tem data de validade.',
    aplicacaoPratica: 'Se você está enfrentando uma dor profunda hoje, chore e sofra seu luto, mas faça isso com a esperança ativa e declarada de que este sofrimento é temporário e o fim da história já está ganho.'
  }
];

export function getComentarioCapitulo(livroId, capitulo) {
  if (!livroId) return null;
  const capInt = parseInt(capitulo, 10);
  const selecionados = CURADORIA_EXEGETICA.filter(
    item => item.livroId === livroId.toLowerCase() && item.capitulo === capInt
  );

  if (selecionados.length === 0) {
    return null;
  }

  const primeiro = selecionados[0];

  return {
    id: `curadoria_${livroId}_${capInt}`,
    livroId,
    capitulo: capInt,
    blocoNome: primeiro.blocoNome,
    titulo: '📖 CURADORIA EXEGÉTICA: A BÍBLIA EM BLOCOS',
    analiseVersiculos: selecionados.map(item => ({
      referenciaCompleta: item.referenciaCompleta,
      numero: item.versiculo,
      profundidadeExegetica: item.profundidadeExegetica,
      conexaoHumana: item.conexaoHumana,
      aplicacaoPratica: item.aplicacaoPratica
    }))
  };
}
