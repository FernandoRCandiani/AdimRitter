import { addDays, format, startOfToday } from "date-fns";
import { useState } from "react";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { FaTrash } from "react-icons/fa";
import { IoIosArrowDown } from "react-icons/io";
import { MdPlaylistAdd } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";

import { useGlobal } from "../../contexts/Global";
import { api } from "../../services/api";
import { queryClient } from "../../services/queryClient";
import { showCategoryName } from "../../util";

import "./style.css";

const INITIAL_REGISTER = {
  name: "",
  startsAt: "",
  categoryId: "",
  questions: []
};

const INITIAL_QUESTIONS = {
  title: "",
  answers: []
};

const INITIAL_ANSWERS = {
  value: "",
  isCorrect: false
};

export function CriacaoMissao() {
  const [register, setRegister] = useState(INITIAL_REGISTER);

  const navigate = useNavigate();

  const { handleLoader, handleMessage, categories } = useGlobal();

  const today = startOfToday();

  function onChange(event) {
    setRegister((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  }

  function addQuestion() {
    setRegister(prev => ({
      ...prev,
      questions: [
        ...prev.questions,
        { ...INITIAL_QUESTIONS }
      ]
    }));
  }

  function addAnswer(indexQuestion) {
    const questions = [...register.questions];

    questions[indexQuestion].answers = [
      ...questions[indexQuestion].answers,
      { ...INITIAL_ANSWERS }
    ];

    setRegister(prev => ({
      ...prev,
      questions
    }));
  }

  function removeQuestion(question) {
    const questions = register.questions.filter(q => q !== question);

    setRegister(prev => ({
      ...prev,
      questions
    }));
  }

  async function handleRegister(event) {
    event.preventDefault();

    handleLoader(true);

    let data = {
      name: register.name,
      startsAt: register.startsAt,
      categoryId: register.categoryId,
    };

    try {
      const quizResponse = await api.post('/quizzes', data);

      let questions = [], answers = [];

      for (const item of register.questions) {
        questions.push({
          quizId: quizResponse.data.id,
          title: item.title,
          answers: item.answers
        });
      }

      const questionResponse = await Promise.all(questions.map(q => api.post('/questions', q)));

      for (const [i, item] of questions.entries()) {
        let data = item.answers.map(a => ({
          ...a,
          questionId: questionResponse[i].data.id
        }));

        answers.push(data);
      }

      await Promise.all(answers.map(a => api.post('/answers', a)));

      handleMessage("Missão cadastrada com sucesso", "success");

      await queryClient.refetchQueries('missionWithoutCertificate');

      await queryClient.getQueryCache().findAll("missions")[0].fetch();

      setRegister(INITIAL_REGISTER);
      navigate('/missao');
    } catch (error) {
      handleMessage("Erro ao criar missão", "error");
    } finally {
      handleLoader(false);
    }
  }

  return (
    <>
      <div className="d-flex align-items-center bg-body-tertiary shadow m-0 p-3">
        <Link
          to="/missao"
          className={["btn", "btn-primary", "/missao"].join(" ")}
        >
          <div className="d-flex align-items-center gap-2">
            <AiOutlineArrowLeft />
            Voltar
          </div>
        </Link>
        <div className="col text-center h3 m-0">Criar Missão</div>
      </div>

      <div className="d-flex flex-column gap-2">
        <div className="m-0">
          <div className="bg-body-tertiary p-3">
            <form onSubmit={handleRegister}>
              <div className="h5 mb-2">Formulário para criação de missão</div>

              <div className="row">
                <div className="col mb-3">
                  <input
                    type="text"
                    className="form-control"
                    id="nome"
                    aria-describedby="nomeHelp"
                    placeholder="Nome da missão"
                    name="name"
                    value={register.name}
                    onChange={onChange}
                  />
                </div>

                <div className="col mb-3">
                  <input
                    type="date"
                    className="form-control"
                    id="data"
                    aria-describedby="datalHelp"
                    placeholder="Data da missão"
                    min={format(addDays(today, 2), "yyyy'-'MM'-'dd")}
                    max="9999-12-31"
                    name="startsAt"
                    value={register.startsAt}
                    onChange={onChange}
                  />
                </div>

                <div className="col">
                  <select
                    className="form-select"
                    aria-label="Default select example"
                    name="categoryId"
                    value={register.categoryId}
                    onChange={onChange}
                  >
                    <option value="" disabled>
                      Categoria
                    </option>
                    {categories?.map((category) => (
                      <option value={category.id} key={category.id}>
                        {showCategoryName(category?.name)}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="accordion questions" id="accordionQuiz">
                {register.questions.map((question, idxQuestion) => (
                  <div key={idxQuestion} className="accordion-item">
                    <div className="accordion-header questions-header">
                      <div
                        className="h3"
                        data-bs-toggle="collapse"
                        data-bs-target={`#question-${idxQuestion}`}
                        aria-expanded="false"
                        aria-controls={`question-${idxQuestion}`}
                      >
                        Pergunta {idxQuestion + 1}
                        <IoIosArrowDown />
                      </div>

                      <button
                        type="button"
                        className="btn btn-danger"
                        onClick={() => removeQuestion(question)}
                      >
                        <FaTrash />
                      </button>
                    </div>

                    <div
                      className="accordion-collapse collapse questions-body"
                      id={`question-${idxQuestion}`}
                      data-bs-parent="#accordionQuiz"
                    >
                      <div className="mb-3">
                        <label className="form-label">
                          Pergunta
                        </label>
                        <input type="text" className="form-control" placeholder="Digite a pergunta"
                          name="title"
                          value={question.title}
                          onChange={e => {
                            question.title = e.target.value;
                            setRegister({ ...register });
                          }}
                        />
                      </div>

                      <div className="h4">Respostas</div>

                      {question.answers.map((answer, idxAnswer) => (
                        <div key={idxAnswer} className="row mb-3 align-items-center">
                          <div className="col-3">
                            <div className="form-check">
                              <input className="form-check-input" type="radio" id={`radio-${idxQuestion}-${idxAnswer}`}
                                name={`correct-answer-${idxQuestion}`}
                                checked={answer.isCorrect}
                                onChange={() => {
                                  question.answers.map((item, i) => {
                                    item.isCorrect = idxAnswer === i;
                                    return item;
                                  });

                                  setRegister({ ...register });
                                }}
                              />
                              <label className="form-check-label" htmlFor={`radio-${idxQuestion}-${idxAnswer}`}>
                                Resposta correta
                              </label>
                            </div>
                          </div>
                          <div className="col">
                            <input className="form-control" type="text" placeholder="Digite a resposta"
                              name="value"
                              value={answer.value}
                              onChange={e => {
                                answer.value = e.target.value;
                                setRegister({ ...register });
                              }}
                            />
                          </div>
                        </div>
                      ))}

                      <button
                        className="btn btn-primary d-flex align-items-center gap-2 mb-3"
                        type="button"
                        onClick={() => addAnswer(idxQuestion)}
                        disabled={question?.answers?.length === 3 || !question?.title}
                      >
                        <MdPlaylistAdd />
                        Adicionar resposta
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <button
                className="btn btn-primary d-flex align-items-center gap-2"
                type="button"
                onClick={addQuestion}
              >
                <MdPlaylistAdd />
                Adicionar pergunta
              </button>

              <div className="row mt-4">
                <div className="col">
                  <button
                    className="btn btn-primary"
                    disabled={register.questions.length < 5 || register.questions.length === 20}
                    type="submit"
                  >
                    Criar missão
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
