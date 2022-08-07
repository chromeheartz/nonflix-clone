import React, { ReactNode, useState } from "react"
import { useForm } from "react-hook-form"

// function ToDoList() {
//   const [ todo, setTodo ] = useState("");
//   const [ todoError, setTodoError ] = useState("");

//   const onChange = (event:React.FormEvent<HTMLInputElement>) => {
//     const {
//       currentTarget : { value }
//     } = event;
//     setTodoError("");
//     setTodo(value)
//   }
//   const onSubmit = (event:React.FormEvent<HTMLFormElement>) => {
//     event.preventDefault();
//     if(todo.length < 10) {
//       return setTodoError("todo should be longer");
//     }
//     console.log("submit");
//   }
//   return (
//     <div>
//       <form onSubmit={onSubmit}>
//         <input value={todo} onChange={onChange} type="text" placeholder="Write a to do" />
//         <button>Add</button>
//         {todoError !== "" ? todoError : null}
//       </form>
//     </div>
//   )
// }
interface IForm {
  email: string;
  firstName: string;
  // lastName이 필수가 아니라면 ?
  lastName?: string;
  username: string;
  password: string;
  password1: string;
}

function ToDoList() {
  // formState의 error를 한번 더 분해
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<IForm>({
    defaultValues : {
      email : "@naver.com"
    }
  });
  const onValid = (data:any) => {
    console.log(data)
  }
  // console.log(watch())
  /*
    register를 쓰는것만으로 이벤트함수를 만들고 input에 props를 줄 수있다.
    watch는 form의 입력값들의 변화를 관찰해주는 함수.
  */
    return (
      <div>
        {/* 
          handleSubmit은 2개의 인자를 받는다.
          1. 데이터가 유효할때의 함수 ( 필수 )
          2. 데이터가 유효하지 않을때의 함수 ( 선택 )
          이전에는 함수를 호출하지 않았따
          onSubmit={onValid} 이렇게 해주었는데
          여기선 먼저 함수를 호출해주어야한다.
         */}
        <form onSubmit={handleSubmit(onValid)} style={{
          display : "flex",
          flexDirection : "column"
        }}>
          {/* 
            register함수가 반환하는 객체들을
            input에 props로 던져주는것
            {...register("todo")}

            spread문법

            만약 인풋이 많은경우에
            <input {...register("email")} type="text" placeholder="email" />
            <input {...register("firstName")} type="text" placeholder="firstName" />
            <input {...register("lastName")} type="text" placeholder="lastName" />
            <input {...register("password")} type="text" placeholder="password" />

            이런식으로 만들게되면 하나의 객체안에 form이 만들어지고 모든것이 잘 연결되어서 출력이될것이다.

            <input {...register("todo", { required : true })} type="text" placeholder="Write a to do" />

            기존에 HTML에 의지해 required속성을 넣어주는것과는 다르게 
            javascript에 의지하는 이유는 누군가 개발자도구에서 required 를 빼고 suubmit을 해도
            넘어가기 때문에. 

            또한 react-hook-fom이 submit 되었을때
            필수에 적혀있지않는 항목으로 이동시켜주는 기능도있다.

            정규표현식은 pattern으로 표시.
            pattern도 마찬가지로 객체로 표시가능
            pattern {
              value : /^[A-Za-z0-9._%+-]+@naver.com$/, 
              message : "only naver.com emails allowed"
            }
           */}
          <input
          {...register("email", {
            required: "Email is required",
            pattern: {
              value: /^[A-Za-z0-9._%+-]+@naver.com$/,
              message: "Only naver.com emails allowed",
            },
          })}
          placeholder="Email"
        />
        <span>{errors?.email?.message}</span>
        <input
          {...register("firstName", { required: "write here" })}
          placeholder="First Name"
        />
        <span>{errors?.firstName?.message}</span>
          <button>Add</button>
        </form>
      </div>
    )
}

export default ToDoList