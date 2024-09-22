// import React, { useState } from "react";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { Button } from "@/components/ui/button";

// type TodoField = {
//   type: string;
//   name: string;
// };

// type CreateTodoProps = {
//   onAddTodo: (todo: Record<string, any>) => void;
// };

// const CreateTodo: React.FC<CreateTodoProps> = ({ onAddTodo }) => {
//   const [todoFields, setTodoFields] = useState<TodoField[]>([]);
//   const [fieldType, setFieldType] = useState<string>("text");
//   const [formValues, setFormValues] = useState<Record<string, any>>({});

//   const addField = () => {
//     setTodoFields([...todoFields, { type: fieldType, name: `field${todoFields.length + 1}` }]);
//   };

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>, name: string) => {
//     setFormValues({ ...formValues, [name]: e.target.value });
//   };

//   const handleSubmit = () => {
//     onAddTodo(formValues);
//     setTodoFields([]);
//     setFormValues({});
//   };

//   return (
//     <div>
//       <div className="flex space-x-4 mb-4">
//         <select
//           value={fieldType}
//           onChange={(e) => setFieldType(e.target.value)}
//           className="border rounded px-2 py-1"
//         >
//           <option value="text">Text</option>
//           <option value="number">Number</option>
//           <option value="date">Date</option>
//           <option value="textarea">Text Area</option>

//         </select>
//         <Button onClick={addField}>Add Field</Button>
//       </div>

//       {todoFields.map((field, index) => (
//         <div key={index} className="mb-2">
//           <Label htmlFor={field.name}>Field {index + 1}</Label>
//           <Input
//             id={field.name}
//             type={field.type}
//             value={formValues[field.name] || ""}
//             onChange={(e) => handleChange(e, field.name)}
//             className="mt-1"
//           />
//         </div>
//       ))}

//       <Button onClick={handleSubmit}>Save Todo</Button>
//     </div>
//   );
// };

// export default CreateTodo;
import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import ClipLoader from "react-spinners/ClipLoader";
import axios from "axios";
import { Todo } from "./ToDo";
type TodoField = {
  type: string;
  name: string;
  options?: string[];
};

type CreateTodoProps = {
  // onAddTodo: (todo: Record<string, any>) => void;
  setMessage: any;
  setTodos: (todos: Todo[]) => void;

};

const CreateTodo: React.FC<CreateTodoProps> = ({ setMessage , setTodos}) => {
  const [todoFields, setTodoFields] = useState<TodoField[]>([]);
  const [fieldType, setFieldType] = useState<string>("text");
  const [formValues, setFormValues] = useState<Record<string, any>>({});
  const [options, setOptions] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  // const [message, setMessage] = useState<string>("");
  // New state to handle adding options
  const [currentOption, setCurrentOption] = useState<string>("");

  const addField = () => {
    const newField: TodoField = {
      type: fieldType,
      name: `${fieldType}_${todoFields.length + 1}`,
    };
    if (["select", "checkbox", "radio"].includes(fieldType)) {
      newField.options = options
        .split(",")
        .map((opt) => opt.trim())
        .filter((opt) => opt);
    }
    setTodoFields([...todoFields, newField]);
    setOptions("");
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    name: string
  ) => {
    setFormValues({ ...formValues, [name]: e.target.value });
  };

  const handleSelectChange = (value: string, name: string) => {
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = async () => {
    // onAddTodo(formValues);
    try {
      setLoading(true);
      const response = await axios.post(`/todos/create-todo`, {
        fields: formValues,
      },{withCredentials:true});
      // console.log(data);

      if (response.status === 201) {
        // alert("sdfsdf")
        setMessage(response.data.message);
        setTodoFields([]);
        setFormValues({});
        fetchTodos();
      }
      // setTodos([...todos, todo]);
    } catch (error: any) {
      setLoading(false);
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  const fetchTodos = async () => {
    try {
    const response =  await axios.get(`/todos/get-todos`,{withCredentials:true});
      setTodos(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  // Function to handle adding options to select
  const addOption = () => {
    if (currentOption.trim() && fieldType === "select") {
      setOptions((prev) =>
        prev ? `${prev},${currentOption.trim()}` : currentOption.trim()
      );
      setCurrentOption("");
    }
  };

  // Function to delete a field
  const deleteField = (index: number) => {
    const updatedFields = [...todoFields];
    updatedFields.splice(index, 1);
    setTodoFields(updatedFields);

    // Clean up form values for the deleted field
    const updatedFormValues = { ...formValues };
    delete updatedFormValues[`field${index + 1}`];
    setFormValues(updatedFormValues);
  };

  return (
    <div>
      <div className="flex space-x-4 mb-4">
        <select
          value={fieldType}
          onChange={(e) => setFieldType(e.target.value)}
          className="border rounded px-2 py-1"
        >
          <option value="text">Text</option>
          <option value="number">Number</option>
          <option value="date">Date</option>
          <option value="textarea">Textarea</option>
          <option value="select">Select</option>
          <option value="checkbox">Checkbox</option>
          <option value="radio">Radio</option>
        </select>

        {(fieldType === "select" ||
          fieldType === "checkbox" ||
          fieldType === "radio") && (
          <>
            <Input
              placeholder="Enter options (comma-separated)"
              value={options}
              onChange={(e) => setOptions(e.target.value)}
              className="border rounded px-2 py-1"
            />
            <Input
              placeholder="Add single option"
              value={currentOption}
              onChange={(e) => setCurrentOption(e.target.value)}
              className="border rounded px-2 py-1"
            />
            <Button onClick={addOption}>Add Option</Button>
          </>
        )}

        <Button onClick={addField}>Add Field</Button>
      </div>

      {todoFields.map((field, index) => (
        <div key={index} className="mb-4 border p-2 rounded">
          <div className="flex justify-between items-center mb-2">
            <Label htmlFor={field.name}>{field.name} </Label>
            <Button variant="destructive" onClick={() => deleteField(index)}>
              Delete
            </Button>
          </div>
          {field.type === "text" ||
          field.type === "number" ||
          field.type === "date" ? (
            <Input
              id={field.name}
              type={field.type}
              value={formValues[field.name] || ""}
              onChange={(e) => handleChange(e, field.name)}
              className="mt-1"
            />
          ) : field.type === "textarea" ? (
            <Textarea
              id={field.name}
              value={formValues[field.name] || ""}
              onChange={(e) => handleChange(e, field.name)}
              className="mt-1"
            />
          ) : field.type === "select" ? (
            <Select
              onValueChange={(value) => handleSelectChange(value, field.name)}
            >
              <SelectTrigger id={field.name} className="mt-1">
                {formValues[field.name] || "Select an option"}
              </SelectTrigger>
              <SelectContent>
                {field.options?.map((option, idx) => (
                  <SelectItem key={idx} value={option}>
                    {option}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          ) : field.type === "checkbox" || field.type === "radio" ? (
            field.options?.map((option, idx) => (
              <div key={idx} className="flex items-center space-x-2 mt-1">
                <input
                  type={field.type}
                  id={`${field.name}-${idx}`}
                  name={field.name}
                  value={option}
                  checked={formValues[field.name]?.includes(option) || false}
                  onChange={(e) => {
                    if (field.type === "checkbox") {
                      const currentValues = formValues[field.name] || [];
                      setFormValues({
                        ...formValues,
                        [field.name]: e.target.checked
                          ? [...currentValues, option]
                          : currentValues.filter((v: string) => v !== option),
                      });
                    } else {
                      handleChange(e, field.name);
                    }
                  }}
                />
                <Label htmlFor={`${field.name}-${idx}`}>{option}</Label>
              </div>
            ))
          ) : null}
        </div>
      ))}
      <Button
        type="submit"
        onClick={handleSubmit}
        variant={"outline"}
        disabled={loading}
      >
        {" "}
        {loading ? (
          <ClipLoader color="#fff" loading={loading} size={24} />
        ) : (
          "Submit"
        )}{" "}
      </Button>
    </div>
  );
};

export default CreateTodo;
