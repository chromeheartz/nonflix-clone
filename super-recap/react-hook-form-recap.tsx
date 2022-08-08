//  기존코드


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

  /*
    register를 쓰는것만으로 이벤트함수를 만들고 input에 props를 줄 수있다.
    watch는 form의 입력값들의 변화를 관찰해주는 함수.
  */

  /* 
    handleSubmit은 2개의 인자를 받는다.
    1. 데이터가 유효할때의 함수 ( 필수 )
    2. 데이터가 유효하지 않을때의 함수 ( 선택 )
    이전에는 함수를 호출하지 않았따
    onSubmit={onValid} 이렇게 해주었는데
    여기선 먼저 함수를 호출해주어야한다.
  */

  /* 
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
  */

  /*
    validate 옵션은 함수를 값으로 가지는데 인자로 항목에 현재 쓰고있는 값을 받을것이다.
    error에 type에 validate라고 나오게된다.
    value가 bibi를 포함하지 않는다면 true를 반환할것이다.
    문자열을 써주면 에러메시지로 리턴이 되어서 이런식으로도 써줄수 있다.
    // validate는 하나의 함수 또는 여러함수가 있는 객체가 될수있는데
    input에서 여러개의 검사가 필요할 수 있기 때문이다 . 그럴때에는

    validate : {
      noBibi : (value) => 
        value.includes("bibi") ? "no bibi allowed" : true,
      noBarnes : (value) => 
        value.includes("barnes") ? "no barnes allowed" : true
    }
    
    객체리터럴을 만들고 규칙의 이름을 만든다. 
    이 하나하나가 함수가 될것이다.
  */

  /*
    import React from "react"
    import { useForm } from "react-hook-form"

    interface IForm {
      email: string;
      firstName: string;
      // lastName이 필수가 아니라면 ?
      lastName?: string;
      username: string;
      password: string;
      password1: string;
      extraerror?: string;
    }

    function ToDoList() {
      // formState의 error를 한번 더 분해
      const {
        register,
        watch,
        handleSubmit,
        formState: { errors },
        setError
      } = useForm<IForm>({
        defaultValues : {
          email : "@naver.com"
        } 
      });
      const onValid = (data: IForm) => {
        if(data.password !== data.password1) {
          setError("password1", {
            message : "Password are not the same"
          }, {
            // 커서가 어디에있던지 이 에러난 항목으로 옮겨주게함.
            shouldFocus : true
          })
          // form 전체에 해당하는 에러
          setError("extraerror", {
            message : "Server offline"
          })
        }
      }
      console.log(errors)
      // console.log(watch())
        return (
          <div>
            <form onSubmit={handleSubmit(onValid)} style={{
              display : "flex",
              flexDirection : "column"
            }}>
              
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
                {...register("username",{
                  required: "write here" ,
                  validate : (value) => value.includes("bibi") ? "no bibi allowed" : true,
                },
                )}
                placeholder="username"
              />
              <span>{errors?.username?.message}</span>
              <input
                {...register("password", { required: "write here" })}
                placeholder="PASSWORD"
              />
              <span>{errors?.password?.message}</span>
              <input
                {...register("password1", { required: "write here" })}
                placeholder="PASSWORD1"
              />
              <span>{errors?.password1?.message}</span>
              <button>Add</button>
              <h6>{errors?.extraerror?.message}</h6>
            </form>
          </div>
        )
    }

    export default ToDoList
  */

  /*
      -------- react-hook-form 정리 --------

      register함수는 useForm hook을 사용해서 가져올 수 잇고
      내가 해야할 것은 이 함수를 내가 가진 모든 input에서 호출해주는것
      물론 알 수 있도록 input의 이름을 주어야함.
      그래야 react-hook-form이 data객체에 input값을 주고, 에러를 확인할 수 있다

      그래서 모든게 register함수에서 시작

      그 후에는 validation에 어떤 옵션들이 있는지 알아보았다.
      내가 검사 규칙을 설정하면 react-hook-form이 그 input에 대한 검사를 자동으로 해준다
      나의 validation규칙이 어떤것인지 말해주는것 말고는 아무것도 안해도 되는것

      또, 애러객체를 제공하는데  우리가 설정한 규칙과 메세지에 따라서
      알아서 채워지기 때문에 작업하기 굉장히 간편하다.

      이제 모든 validation이 우리가 handleSubmit을 호출하면 수행될것이다.
      handleSubmit도 useForm hook에서 제공하는 함수인데 onSubmit이벤트에 등록해야한다.
      인자는 딱 한개를 받는데 바로 onValid 함수이다.
      이 함수는 나의 form데이터가 유효할때만 호출되는 함수이다.
      이것이 호출되었다면 form이 모든 validation을 통과했고, 모든 input의 입력값들이 다 정상적이고
      에러가 없다는것

      1. useForm import
      2. 컴포넌트에서 useForm을 호출하면 register와 handleSubmit이 제공
      3. register함수를 form에 있는 도믄 input에서 호출(검사 옵션을 설정)
      (필수로하고 메세지를 전달할 수 있고, 정규식이나 내가만든 함수를 이용해서 검사 가능, 물론 minLength같은 옵션도 사용가능)
      minLength같은 옵션들은 validation을 사용할 수 있다 메세지를 적고 값을 적게 해줌.
      그냥 minLength:5로 써도 되고 객체리터럴을 통해 value와 message로 나눠도 된다.
      여기 적은 매세지는 에러객체에 자동으로 나타나게 될것

      * 에러객체

      에러객체는 formState내부에 있는데 여기에는 form의 state가 들어있다.
      그래서 errors를 formState의 내부에서 가져와서 HTML태그안에 에러메세지로 넣어준것

      * 기본값 설정

      defaultValues를 적고 원하는 항목의 기본값을 적어주면된다.

      * setError

      이 함수는 코드에서 에러를 발생시킬때 매우 유용.
      만약 내가 에러를 발생시키고 싶다면
      setError를 호출하고 extraError같은 이름의 항목을 추가한 다음 메세지를 전달하면된다.
      특정한 항목에 에러를 발생시키고 싶다면 그 항목의 이름과 메세지를 적음

      * shouldFocus

      사용자가 form을 submit할 때 에러를 발생시키면, 커서를 해당 input에 focus시켜주는것

      ** 가장 중요한것

      interface IForm{
        toDo : string;
      }

      function ToDoList() {
        const {
          register, handleSubmit, setValue
        } = useForm<IForm>()
        const handleValid = (data : IForm) => {
          console.log("data", data.toDo)
          setValue("toDo", ""); 
        }
        return (
            <div>
              <form onSubmit={handleSubmit(handleValid)}>
                <input {...register("toDo")} placeholder="Write a to do" />
                <button>Add</button>
              </form>
            </div>
          )
      }

      여기서 중요한것은 input의 이름(register에 넣어준 인자)가
      그대로 data에 들어간다는 것이다.
      handleSubmit함수를 사용할 때는
      첫번째 매개변수로 데이터가 유효할때 호출되는 다른 함수를 받는것이다.
      두번째는 내가 원한다면, 데이터가 유효하지 않을때 호출될 다른 함수를 2번째로 넣을 수 있다.

      * setValue

      useForm에서 제공하는것중에 setValue가 있는데 이것은
      검사가 통과했을때 input을 비게 만들어준다
      setValue("항목이름", "")
      이런식으로 항목이름과 빈문자열을 넣어주면
      submit 이후에 해당 항목은 빈 문자열이 된다.

  */