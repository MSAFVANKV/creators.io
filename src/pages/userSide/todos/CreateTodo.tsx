import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

type TodoField = {
  type: string;
  name: string;
};

type CreateTodoProps = {
  onAddTodo: (todo: Record<string, any>) => void;
};

const CreateTodo: React.FC<CreateTodoProps> = ({ onAddTodo }) => {
  const [todoFields, setTodoFields] = useState<TodoField[]>([]);
  const [fieldType, setFieldType] = useState<string>("text");
  const [formValues, setFormValues] = useState<Record<string, any>>({});

  const addField = () => {
    setTodoFields([...todoFields, { type: fieldType, name: `field${todoFields.length + 1}` }]);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, name: string) => {
    setFormValues({ ...formValues, [name]: e.target.value });
  };

  const handleSubmit = () => {
    onAddTodo(formValues);
    setTodoFields([]);
    setFormValues({});
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
        </select>
        <Button onClick={addField}>Add Field</Button>
      </div>

      {todoFields.map((field, index) => (
        <div key={index} className="mb-2">
          <Label htmlFor={field.name}>Field {index + 1}</Label>
          <Input
            id={field.name}
            type={field.type}
            value={formValues[field.name] || ""}
            onChange={(e) => handleChange(e, field.name)}
            className="mt-1"
          />
        </div>
      ))}

      <Button onClick={handleSubmit}>Save Todo</Button>
    </div>
  );
};

export default CreateTodo;
