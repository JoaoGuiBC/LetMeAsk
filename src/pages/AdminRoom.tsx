import { FormEvent, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ToastContainer, toast, Zoom } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';

import { useAuth } from '../hooks/useAuth';
import { useRoom } from '../hooks/useRoom';
import { database } from '../services/firebase';

import logoImg from '../assets/images/logo.svg';

import { Button } from '../components/Button';
import { RoomCode } from '../components/RoomCode';
import { Question } from '../components/Question';

import '../styles/pages/room.scss';

type RoomParams = {
  id: string
}

export const AdminRoom: React.FC = () => {
  const [newQuestion, setNewQuestion] = useState('');

  const params = useParams<RoomParams>();
  const roomId = params.id;

  const { user } = useAuth();
  const { questions, title } = useRoom(roomId);

  async function handleSendQuestion(event: FormEvent) {
    event.preventDefault();

    if (newQuestion.trim() === '') {
      return;
    }

    if (!user) {
      return toast.warning('Você deve estar logado para enviar perguntas.');
    }

    const question = {
      content: newQuestion,
      author: {
        name: user.name,
        avatar: user.avatar
      },
      isHighlighted: false,
      isAnswered: false,
    };

    await database.ref(`rooms/${roomId}/questions`).push(question);

    setNewQuestion('')
  }

  return (
    <div id="page-room">
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        pauseOnHover
        limit={3}
        transition={Zoom}
      />

      <header>
        <div className="content">
          <img src={logoImg} alt="LetMeAsk" />
          <div>
            <RoomCode code={roomId} />
            <Button isOutlined>Encerrar sala</Button>
          </div>
        </div>
      </header>

      <main>
        <div className="room-title">
          <h1>Sala {title}</h1>
          { questions.length > 0 && <span>{questions.length} pergunta(s)</span> }
        </div>

        <div className="question-list">
          { questions.map(question => (
            <Question
              key={question.id}
              content={question.content}
              author={question.author}
            />
          )) }
        </div>
      </main>
    </div>
  );
}
