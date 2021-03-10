import React, {FormEvent, useCallback, useState} from 'react';
import Image from 'next/image';

import Api from '../services/api';
import FormatPhone from '../services/FormatPhone';
import CleanNumber from '../services/CleanNumber';

import RadioQuest from '../components/RadioQuest';
import StarList from '../components/StarList';

const questions = [
  {
    title: '1. Sua marmitaria já existe? Se sim, há quanto tempo?',
    type: 'exist',
    options: [
      {text: 'Ainda não tenho, mas quero abrir!', value: 0},
      {text: 'É um bebê, menos de 1 ano.', value: 2},
      {text: 'Entre 1 à 3 anos.', value: 3},
      {text: 'Entre 3 à 5 anos.', value: 5},
      {text: 'Mais de 5 anos.', value: 8},
    ],
  },
  {
    title:
      '2. Você tem apoio da sua família ou do seu companheiro(a) para investir seu tempo e dinheiro na sua marmitaria?',
    type: 'support',
    options: [
      {text: 'Sim, tenho bastante apoio.', value: 5},
      {text: 'Não, quase ninguém me apoia.', value: 1},
      {text: 'Mais ou menos.', value: 2},
    ],
  },
  {
    title: '3. Como é a gestão do seu estoque?',
    type: 'inventory',
    options: [
      {text: 'Ainda não faço gestão de estoque.', value: 1},
      {text: 'Anoto em caderno ou planilha e faço algum controle.', value: 2},
      {
        text: 'Anoto em um caderno ou planilha e tenho um grande controle.',
        value: 5,
      },
      {
        text: 'Tenho um sistema e controlo de forma automatizada.',
        value: 8,
      },
    ],
  },
  {
    title: '4. Sua Marmitaria está cadastrada em Redes Sociais?',
    type: 'socialMedia',
    options: [
      {text: 'Sim, estou no Facebook e Instagram.', value: 5},
      {text: 'Sim, estou apenas no Instagram.', value: 3},
      {
        text: 'Sim, estou apenas no Facebook.',
        value: 2,
      },
      {
        text: 'Não, atendo por telefone ou whatsapp.',
        value: 0,
      },
    ],
  },
  {
    title:
      '5. Se pesquisarmos o nome da sua marmitaria no Google, você vai aparecer?',
    type: 'hasGoogle',
    options: [
      {text: 'Sim, na primeira página.', value: 6},
      {text: 'Sim, mas não na primeira página.', value: 3},
      {
        text: 'Não apareço no Google.',
        value: 1,
      },
      {
        text: 'Não sei responder.',
        value: 0,
      },
    ],
  },
  {
    title: '6. De 1 a 5 conte-nos quanto você planeja a sua empresa.',
    type: 'planning',
    options: [
      {
        text: '1. Nunca anotei nada e não tenho um planejamento estruturado.',
        value: 0,
      },
      {
        text: '2. Anoto em papel minhas vendas, mas não planejo o negócio.',
        value: 1,
      },
      {
        text:
          '3. Tenho sistema, mas vivo dia a dia e não planejo muito bem o futuro do negócio.',
        value: 3,
      },
      {
        text:
          '4. Tenho sistema, faço um controle legal e sigo algum planejamento',
        value: 5,
      },
      {
        text:
          '5. Me reconheço como gestor, tenho todos os dados e sigo um planejamento de longo prazo',
        value: 13,
      },
    ],
  },
  {
    title:
      '7. Como dono de empresa, quanto você investe na sua capacitação para gerenciar melhor o negócio? ',
    type: 'investment',
    options: [
      {
        text: 'Nunca investi na minha formação como empreendedor(a)',
        value: 0,
      },
      {text: 'Já investi, mas faz muito tempo.', value: 1},
      {
        text: 'Investi nos últimos 12 meses.',
        value: 3,
      },
      {
        text: 'Invisto tempo ou dinheiro constantemente para aprender mais.',
        value: 5,
      },
    ],
  },
];

const Home: React.FC = () => {
  const [selectedAnswer, setSelectedAnswer] = useState<Map<string, number>>(
    new Map(),
  );
  const [answer, setAnswer] = useState<Map<string, string>>(new Map());
  const [questionEight, setQuestionEight] = useState('');
  const [questionNine, setQuestionNine] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [level, setLevel] = useState(0);

  const selectAnswer = (type: string, value: number, text: string) => {
    setSelectedAnswer(new Map(selectedAnswer.set(type, value)));
    setAnswer(new Map(answer.set(type, text)));
  };

  const handleReset = () => {
    setLevel(0);
    setQuestionNine('');
    setQuestionEight('');
    setSelectedAnswer(new Map());
  };

  const handleInputMask = useCallback((value) => {
    const formated = FormatPhone(value);
    setPhone(formated);
  }, []);

  const handleSubmitForm = async (event: FormEvent) => {
    event.preventDefault();

    const arrayOfResuls = Array.from(selectedAnswer.values());

    const result = arrayOfResuls.reduce((total, current) => total + current, 0);

    let lvl = 1;

    if (result > 13 && result < 33) lvl = 2;

    if (result > 33) lvl = 3;

    setLevel(lvl);

    const emailDate = {
      service_id: 'service_uvlwmag',
      template_id: 'template_0VMkQIcx',
      user_id: 'user_6kJUL0UUOlrnNzl1TrDFo',
      template_params: {
        receiver: 'rafaelbarbosa01+1r1or4qqpjgwchgan6mn@boards.trello.com',
        subject: `${name} -  ${phone} - NIVEL ${lvl}`,
        name,
        phone: CleanNumber(phone),
        one: answer.get('exist'),
        two: answer.get('support'),
        three: answer.get('inventory'),
        four: answer.get('socialMedia'),
        five: answer.get('hasGoogle'),
        six: answer.get('planning'),
        seven: answer.get('investment'),
        eight: questionEight,
        nine: questionNine,
      },
    };

    try {
      await Api.post('email/send', emailDate);
    } catch (err) {
      console.log(err);
    }
  };

  let link = 'https://go.kiwify.com.br/jklNYdg';

  if (level === 2) link = 'https://go.kiwify.com.br/KdqFu4C';

  if (level === 3) link = 'https://go.kiwify.com.br/JHvUAiJ';

  return (
    <div className="w-screen h-full min-h-screen bg-primary">
      <header className="text-center py-4">
        <figure className="">
          <Image
            src="/logo.png"
            alt="Club das Marmiteiras"
            width={223}
            height={60}
          />
        </figure>
      </header>

      <main className="max-w-screen-md mx-auto p-6">
        {level === 0 && (
          <form onSubmit={handleSubmitForm}>
            <fieldset className="mb-4 text-lg">
              <legend className="text-2xl font-bold mb-4">
                Primeiro precisamos de alguns dados!
              </legend>
              <input
                className="block border rounded-md p-2 w-full mb-4"
                type="text"
                onChange={(e) => setName(e.target.value)}
                placeholder="Seu Nome"
              />
              <input
                className="block border rounded-md p-2 w-full mb-4"
                type="text"
                value={phone}
                onChange={(e) => handleInputMask(e.target.value)}
                placeholder="Seu Whatsapp"
              />
            </fieldset>
            <fieldset className="mb-4 text-lg">
              <legend className="text-2xl font-bold mb-4">
                Agora, responda algumas perguntas para te conhecermos melhor!
              </legend>

              {questions.map((question) => (
                <RadioQuest
                  key={question.type}
                  title={question.title}
                  type={question.type}
                  options={question.options}
                  stateValue={`${selectedAnswer.get(question.type)}`}
                  setState={selectAnswer}
                />
              ))}
            </fieldset>

            <fieldset className="mb-4 text-lg">
              <legend className="text-2xl font-bold mb-4">
                Deixe a sinceridade reinar e preencha as últimas etapas abaixo.
              </legend>

              <div className="mb-8">
                <label className="block mb-4" htmlFor="questionEight">
                  8. Conte um pouco sobre você, seu negócio e resultados
                  profissionais para sabermos como a Comunidade VIP do Club das
                  Marmiteiras vai poder te ajudar.
                </label>
                <textarea
                  className="block w-full h-40 border-transparent rounded-lg"
                  name="questionEight"
                  id="questionEight"
                  onChange={(e) => setQuestionEight(e.target.value)}
                />
              </div>

              <div>
                <label className="block mb-4" htmlFor="questionNine">
                  Lembrando que a lista de interessados na Comunidade VIP é
                  grande, que muitas pessoas pedem para participar, mas para
                  garantirmos o maior contato possível com todos, serão poucas
                  vagas abertas. Por que você acredita que a sua marmitaria ou
                  você deva fazer parte da Comunidade VIP do Club das
                  Marmiteiras?
                </label>
                <textarea
                  className="block w-full h-40 border-transparent rounded-lg"
                  name="questionNine"
                  id="questionNine"
                  onChange={(e) => setQuestionNine(e.target.value)}
                />
              </div>
            </fieldset>

            <div className="my-4 h-20 flex justify-center items-center">
              <button
                className="p-4 w-full md:w-auto duration-200 bg-yellow-400 hover:bg-yellow-600 rounded-lg"
                type="submit">
                Calcular Meu Nivel
              </button>
            </div>
          </form>
        )}
        {level !== 0 && (
          <div className="text-center">
            <figure>
              <Image src="/vip.png" alt="Mensagem" width={115} height={115} />
            </figure>
            <h1 className="text-3xl font-bold my-4">Legal!</h1>
            <span className="block text-lg">
              Seu resultado foi calculado e você está convidado(a) para o
            </span>
            <span className="block text-4xl my-4">NIVEL {level}</span>
            <StarList level={level} />
            <div className="flex flex-col md:flex-row justify-center">
              <a
                href={link}
                className="p-4 w-full my-2 md:mx-2 md:w-auto duration-200 bg-yellow-400 hover:bg-yellow-600 font-bold rounded-lg"
                type="button">
                Entrar para ComuVip
              </a>
              <button
                className="p-4 w-full my-2 md:mx-2 md:w-auto duration-200 hover:opacity-50 bg-transparent border border-black font-bold rounded-lg"
                type="button"
                onClick={handleReset}>
                Quero Preencher novamente
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default Home;
