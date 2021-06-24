import copyImg from '../assets/images/copy.svg';

import '../styles/components/roomCode.scss';

type RoomCodeProps = {
  code: string;
}

export const RoomCode: React.FC<RoomCodeProps> = ({ code }) => {
  function copyRoomCodeToClipboard() {
    navigator.clipboard.writeText(code);
  }

  return (
    <button className="room-code" onClick={copyRoomCodeToClipboard}>
      <div>
        <img src={copyImg} alt="Copy room code" />
      </div>
      <span>Sala #{code}L</span>
    </button>
  );
}
