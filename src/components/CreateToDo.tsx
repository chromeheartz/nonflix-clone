import { useForm } from "react-hook-form";
import { useSetRecoilState } from "recoil";
import { toDoState } from "../todoAtoms";

interface IForm{
  toDo : string;
}

function CreateToDo() {
  const setToDos = useSetRecoilState(toDoState);
  const {
    register, handleSubmit, setValue
  } = useForm<IForm>();
  const handleValid = ({ toDo } : IForm) => {
    console.log("data", toDo)
    // 함수의 return값이 toDos로 들어갈것이다.
    setToDos(oldToDos => [ 
      { text:toDo, id:Date.now(), category : "TO_DO" },
      ...oldToDos
    ])
    setValue("toDo", ""); 
  }
  return (
    <form onSubmit={handleSubmit(handleValid)}>
        <input {...register("toDo")} placeholder="Write a to do" />
        <button>Add</button>
    </form>
  )
}

export default CreateToDo;