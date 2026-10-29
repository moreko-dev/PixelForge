import React, { useImperativeHandle, useMemo, useReducer } from "react";
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

type ColorInputConfigProps = Omit<ColorInputProps, "value" | "onValueChange">;
type NumberInputConfigProps = Omit<NumberInputProps, "value" | "onValueChange">;

type FormFieldType =
  | {
      id?: string;
      key: string;
      label: string;
      type: "number";
      layout?: "inline" | "stack";
      hint?: string;
      error?: string;
      config: NumberInputConfigProps;
    }
  | {
      id?: string;
      key: string;
      label: string;
      type: "color";
      layout?: "inline" | "stack";
      hint?: string;
      error?: string;
      config: ColorInputConfigProps;
    }
  | {
      id?: string;
      key: string;
      label: string;
      type: "textarea";
      layout?: "inline" | "stack";
      hint?: string;
      error?: string;
      config?: TextAreaProps;
    }
  | {
      id?: string;
      key: string;
      label: string;
      type: "select";
      layout?: "inline" | "stack";
      hint?: string;
      error?: string;
      config?: SelectProps;
    }
  | {
      id?: string;
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
      hint?: string;
      error?: string;
      config?: TextInputProps;
    }
  | {
      id?: string;
      key: string;
      label: string;
      type: "custom";
      layout?: "inline" | "stack";
      hint?: string;
      error?: string;
      config: {};
    };

type FormDataType = Record<string, any>;

type FormFieldsUngroupType = {
  id?: string;
  dir: DirectionsType;
  fields: FormFieldType[];
}[];

type FormFieldsGroupType = {
  id?: string;
  groupName: string;
  groupFields: {
    id?: string;
    dir: DirectionsType;
    fields: FormFieldType[];
  }[];
}[];

type FormPropsType =
  | {
      formConfig: FormConfigType & { group: true };
      formFields: FormFieldsGroupType;
      formData?: FormDataType;
      ref?: React.Ref<FormRef>;
    }
  | {
      formConfig: FormConfigType & { group: false };
      formFields: FormFieldsUngroupType;
      formData?: FormDataType;
      ref?: React.Ref<FormRef>;
    };

export type FormRef = {
  getValues: () => Record<string, unknown>;
};

const DIR_CN: Record<DirectionsType, string> = {
  row: "flex-row gap-2",
  col: "flex-col gap-1",
};

const formReducer = (
  state: FormDataType,
  action: { type: string; payload: any },
) => {
  return { ...state, [action.type]: action.payload };
};

function Form({
  formConfig = { group: true },
  formFields,
  formData = {},
  ref,
}: FormPropsType) {
  const [formState, dispatch] = useReducer(formReducer, formData);

  useImperativeHandle(
    ref,
    () => ({
      getValues: () => formState,
    }),
    [formState],
  );

  const newFormFields = useMemo(
    () =>
      formConfig.group === true
        ? (formFields as FormFieldsGroupType).map((item) => ({
            ...item,
            groupFields: item.groupFields.map((iItem) => ({
              ...iItem,
              id: crypto.randomUUID(),
              fields: iItem.fields.map((iiItem) => ({
                ...iiItem,
                id: crypto.randomUUID(),
              })),
            })),
          }))
        : (formFields as FormFieldsUngroupType).map((item) => ({
            ...item,
            id: crypto.randomUUID(),
            fields: item.fields.map((iItem) => ({
              ...iItem,
              id: crypto.randomUUID(),
            })),
          })),
    [formFields, formConfig.group],
  );

  return (
    <form>
      {formConfig.group === true
        ? (newFormFields as FormFieldsGroupType).map((group, index) => (
            <div
              key={group.groupName.replace(/\s/g, "").concat(String(index))}
              className="mb-4"
            >
              <div className="mb-2 flex gap-2 items-center text-foreground-secondary after:flex-1 after:h-px after:border after:border-border-subtle">
                {group.groupName}
              </div>
              <div className="flex flex-col gap-2 px-2">
                {group.groupFields.map((item) => (
                  <FieldsRenderer
                    formState={formState}
                    dispatch={dispatch}
                    field={item}
                  />
                ))}
              </div>
            </div>
          ))
        : (newFormFields as FormFieldsUngroupType).map((item) => (
            <FieldsRenderer
              key={item.id}
              formState={formState}
              dispatch={dispatch}
              field={item}
            />
          ))}
    </form>
  );
}

function FieldsRenderer({
  formState,
  dispatch,
  field: item,
}: {
  formState: FormDataType;
  dispatch: React.ActionDispatch<
    [
      action: {
        type: string;
        payload: any;
      },
    ]
  >;
  field: FormFieldsUngroupType[number];
}) {
  return (
    <div key={item.id} className={`flex ${DIR_CN[item.dir]} mb-4`}>
      {item.fields.map(
        ({ id, key, label, type, hint, error, layout = "stack", config }) => (
          <Input.Field
            key={id}
            label={label}
            htmlFor={key}
            className="w-full text-sm"
            labelClassName="flex-1"
            layout={layout}
            hint={hint}
            error={error}
          >
            {type === "custom" ? (
              <>Custom</>
            ) : type === "select" ? (
              <Input.Select
                {...(config as SelectProps)}
                id={key}
                value={formState[key]}
                onChange={(e) =>
                  dispatch({ type: key, payload: e.target.value })
                }
              />
            ) : type === "textarea" ? (
              <Input.TextArea
                {...(config as TextAreaProps)}
                id={key}
                value={formState[key]}
                onChange={(e) =>
                  dispatch({ type: key, payload: e.target.value })
                }
              />
            ) : type === "number" ? (
              <Input.Number
                {...(config as NumberInputConfigProps)}
                id={key}
                value={formState[key]}
                onValueChange={(value) =>
                  dispatch({ type: key, payload: value })
                }
              />
            ) : type === "color" ? (
              <Input.Color
                {...(config as ColorInputConfigProps)}
                id={key}
                value={formState[key]}
                onValueChange={(value) =>
                  dispatch({ type: key, payload: value })
                }
              />
            ) : (
              <Input.Text
                {...(config as TextInputProps)}
                id={key}
                value={formState[key]}
                onChange={(e) =>
                  dispatch({ type: key, payload: e.target.value })
                }
              />
            )}
          </Input.Field>
        ),
      )}
    </div>
  );
}

export default Form;
