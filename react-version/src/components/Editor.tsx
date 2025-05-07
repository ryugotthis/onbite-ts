import { useState, useRef } from 'react';
interface Props {
  onClickAdd: (text: string) => void;
}

export default function Editor(props: Props) {
  const [text, setText] = useState(''); // useState는 제네릭 함수, 뭐라도 전달하는게 좋음

  const idRef = useRef(0);

  const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };
  const onClickbutton = () => {
    props.onClickAdd(text);
    setText('');
  };

  return (
    <div>
      <input value={text} onChange={onChangeInput} />
      <button onClick={onClickbutton}>클릭</button>
    </div>
  );
}
