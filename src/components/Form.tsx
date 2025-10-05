// import produce from "immer";
// import { FormEvent, useRef, useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const schema = z.object({
  name: z
    .string({ required_error: "Name is required." })
    .min(3, { message: "The name must be at least 3 characters." }),
  age: z
    .number({ invalid_type_error: "Age field is required." })
    .min(18, { message: "Age must be at least 18." }),
});

type FormData = z.infer<typeof schema>;
// interface FormData {
//   name: string;
//   age: number;
// }

const Form = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<FormData>({ resolver: zodResolver(schema) });
  // const nameRef = useRef<HTMLInputElement>(null);
  // const ageRef = useRef<HTMLInputElement>(null);
  // const [person, setPerson] = useState({
  //   name: "",
  //   age: "",
  // });
  // const handleSubmit = (event: FormEvent) => {
  //   // const person = { name: "", age: 0 };
  //   event.preventDefault();
  //   // if (nameRef.current) person.name = nameRef.current.value;
  //   // if (ageRef.current) person.age = parseInt(ageRef.current.value);
  //   console.log(person);
  // };
  const onSubmit = (data: FieldValues) => {
    console.log(data);
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="mb-3">
        <label htmlFor="name" className="form-label">
          Name
        </label>
        <input
          // value={person.name}
          // onChange={(event) =>
          //   setPerson({ ...person, name: event.target.value })
          // }
          // ref={nameRef}
          {...register("name")}
          id="name"
          type="text"
          className="form-control"
          placeholder="Hamed"
          required
        />
        {errors.name && <p className="text-danger">{errors.name.message}</p>}
        {/* {errors.name?.type === "minLength" && (
          <p className="text-danger">The name must be at least 3 characters.</p>
        )} */}
      </div>
      <div className="mb-3">
        <label htmlFor="age" className="form-label">
          Age
        </label>
        <input
          // value={person.age}
          // onChange={(event) =>
          //   setPerson(
          //     produce((draft) => {
          //       draft.age = event.target.value;
          //     })
          //   )
          // }
          // ref={ageRef}
          {...register("age", { valueAsNumber: true })}
          id="age"
          type="number"
          className="form-control"
          placeholder="26"
        />
        {errors.age && <p className="text-danger">{errors.age.message}</p>}
      </div>
      <button type="submit" className="btn btn-primary">
        Submit
      </button>
    </form>
  );
};

export default Form;
