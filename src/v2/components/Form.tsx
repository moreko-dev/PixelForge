import { useMemo } from "react";
import {
  Input,
  type ColorInputProps,
  type NumberInputProps,
  type SelectProps,
  type TextAreaProps,
  type TextInputProps,
} from "./inputs.js";

type DirectionsType = "row" | "col";

type FormConfigType = {
  group: boolean;
};

type FormFieldType =
  | {
      key: string;
      label: string;
      type: "number";
      layout?: "inline" | "stack";
      config: NumberInputProps;
    }
  | {
      key: string;
      label: string;
      type: "color";
      layout?: "inline" | "stack";
      config: ColorInputProps;
    }
  | {
      key: string;
      label: string;
      type: "textarea";
      layout?: "inline" | "stack";
      config?: TextAreaProps;
    }
  | {
      key: string;
      label: string;
      type: "select";
      layout?: "inline" | "stack";
      config?: SelectProps;
    }
  | {
      key: string;
      label: string;
      type:
        | "checkbox"
        | "date"
        | "datetime-local"
        | "email"
        | "file"
        | "image"
        | "month"
        | "password"
        | "radio"
        | "range"
        | "search"
        | "tel"
        | "text"
        | "time"
        | "url"
        | "week";
      layout?: "inline" | "stack";
      config?: TextInputProps;
    }
  | {
      key: string;
      label: string;
      type: "custom";
      layout?: "inline" | "stack";
      config: {};
    };

type FormDataType = Record<string, unknown>;

type FormPropsType = {
  formConfig?: FormConfigType;
  formFields: {
    groupName: string;
    groupFields: {
      dir: DirectionsType;
      fields: FormFieldType[];
    }[];
  }[];
  formData?: FormDataType;
};

const INPUT_CN = "rounded! max-w-20 w-full";

const DIR_CN: Record<DirectionsType, string> = {
  row: "flex-row gap-2",
  col: "flex-col gap-1",
};

function Form({
  formConfig = { group: true },
  formFields,
  formData = {},
}: FormPropsType) {
  const newFormFields = useMemo(
    () =>
      formFields.map((item) => ({
        ...item,
        groupFields: item.groupFields.map((iItem) => ({
          ...iItem,
          id: crypto.randomUUID(),
          fields: iItem.fields.map((iiItem) => ({
            ...iiItem,
            id: crypto.randomUUID(),
          })),
        })),
      })),
    [formFields],
  );

  return (
    <form>
      {newFormFields.map((group, index) => (
        <div
          key={group.groupName.replace(/\s/g, "").concat(String(index))}
          className="mb-4"
        >
          <div className="mb-2 flex gap-2 items-center text-foreground-secondary after:flex-1 after:h-px after:border after:border-border-subtle">
            {group.groupName}
          </div>
          <div className="flex flex-col gap-2 px-2">
            {group.groupFields.map((item) => (
              <div key={item.id} className={`flex ${DIR_CN[item.dir]}`}>
                {item.fields.map(
                  ({ id, key, label, type, layout = "stack", config }) => (
                    <Input.Field
                      key={id}
                      label={label}
                      htmlFor={key}
                      className="w-full text-sm"
                      labelClassName="flex-1"
                      layout={layout}
                    >
                      {type === "custom" ? (
                        <>Custom</>
                      ) : type === "select" ? (
                        <Input.Select id={key} {...(config as SelectProps)} />
                      ) : type === "textarea" ? (
                        <Input.TextArea
                          id={key}
                          {...(config as TextAreaProps)}
                        />
                      ) : type === "number" ? (
                        <Input.Number
                          id={key}
                          {...(config as NumberInputProps)}
                        />
                      ) : type === "color" ? (
                        <Input.Color
                          id={key}
                          {...(config as ColorInputProps)}
                        />
                      ) : (
                        <Input.Text id={key} {...(config as TextInputProps)} />
                      )}
                    </Input.Field>
                  ),
                )}
              </div>
            ))}
          </div>
        </div>
      ))}
    </form>
  );
}

export default Form;
