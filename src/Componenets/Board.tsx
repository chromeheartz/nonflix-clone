import { useForm } from "react-hook-form"
import { Droppable } from "react-beautiful-dnd"
import styled from "styled-components"
import DragabbleCard from "./DragabbleCard"
import { ITodo, toDostate } from "../atoms"
import { useSetRecoilState } from "recoil"

const Wrapper = styled.div`
  width : 300px;
  padding-top : 10px;
  background-color : ${props => props.theme.boardColor};
  border-radius :5px;
  min-height : 300px;
  display : flex;
  flex-direction : column;
`

interface IAreaProps {
  isDraggingFromThis : boolean;
  isDraggingOver : boolean;
}
// Area는 그냥 div이기 때문에 props를 받을수없어서
// isDraggingOver라는 prop을 받을것이라고 말하는것
// const Area = styled.div<{isDraggingOver : boolean}>`
const Area = styled.div<IAreaProps>`
  background-color : ${props => props.isDraggingOver ? "#dfe6e9" : props.isDraggingFromThis ? "#b2bec3" : "transparent"};
  flex-grow : 1;
  transition : background-color 0.3s ease-in-out;
  padding : 20px;
`

const Title = styled.h2`
  text-align: center;
  font-weight: 600;
  margin-bottom: 10px;
  font-size: 18px;
`

const Form = styled.form`
  width : 100%;
  input {
    width : 100%;
  }
`

interface IBoardProps {
  // string으로 이루어진 array 라는뜻
  toDos : ITodo[];
  boardId : string;
}

interface IForm {
  toDo : string;
}

function Board({ toDos, boardId } : IBoardProps){
  const setToDos = useSetRecoilState(toDostate);
  const { register, setValue, handleSubmit } = useForm<IForm>();
  const onValid = ({ toDo }:IForm) => {
    const newToDo = {
      id : Date.now(),
      text : toDo,
    }
    /*
      현재 속한 board의 정보만 업데이트 해야한다.
      그래서 toDo를 만들때 내가 있는 board에만 올려줄 필요가 있다

      만약 done이라면 done을 제외한 나머지는 제자리에 그대로 두고
      done 안에 내 값만 마지막에 붙여줄것

      그럼 현재 board 를 사용해서 copy하고 다시 state에 넣어주어야 한다.
    */
    // setter 함수는 value를 설정하기도 하지만 이전 Value에 기반해서 현재 value를 업데이트해줄수도있었다.
    setToDos(allBoards => {
      return {
        ...allBoards,
        // boardId가 done이면 "done"이 됨
        // 이미 다른 todo를 가지고 있을 수 있기 때문에 
        // 다른것들까지 replace되지않도록
        [boardId] : [
          // 새로운것이 맨 위로 오도록
          newToDo,
          ...allBoards[boardId]
        ]
      }
    })
    setValue("toDo", "");
  }
  return (
    <Wrapper>
      <Title>{boardId}</Title>
      <Form onSubmit={handleSubmit(onValid)}>
        <input {...register(("toDo"), {required : true})} type="text" placeholder={`Add task on ${boardId}`}/>
      </Form>
      <Droppable droppableId={boardId}>
        {/*
          두번쨰 argument

          info 의 오른쪽클릭 type definition을 보면
          type정의에 뭘 얻을지 알 수 있다.
        */}
        {(magic, info) => (
          <Area 
            isDraggingOver={info.isDraggingOver}
            // 안의 값이 string이던 뭐던 true가 되고, undefined거나 null이면 false
            isDraggingFromThis={Boolean(info.draggingFromThisWith)}
            ref={magic.innerRef}
            {...magic.droppableProps}
          >
            {toDos.map((toDo, index) => (
              <DragabbleCard key={toDo.id} index={index} toDoId={toDo.id} toDoText={toDo.text} />
            ))}
            {magic.placeholder}
          </Area>
        )}
      </Droppable>
    </Wrapper>
  )
}

export default Board

