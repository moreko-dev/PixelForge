import type React from "react";

type DirectionsType = "row" | "col";

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

type FormConfigType = {
  group: boolean;
};

type FormFieldType = {
  key: string;
  label: string;
  type: React.HTMLInputTypeAttribute | "textarea" | "select" | "custom";
};

type FormDataType = Record<string, unknown>;

const DIR_CN: Record<DirectionsType, string> = {
  row: "flex-row",
  col: "flex-col",
};

function Form({
  formConfig = { group: true },
  formFields,
  formData = {},
}: FormPropsType) {
  return (
    <form>
      {formFields.map((group) => (
        <div className="mb-4">
          <div className="mb-2 flex gap-2 items-center text-foreground-secondary after:flex-1 after:h-px after:border after:border-border-subtle">
            {group.groupName}
          </div>
          <div className="flex flex-col gap-2 px-2">
            {group.groupFields.map((item) => (
              <div className={`flex ${DIR_CN[item.dir]} gap-1`}>
                {item.fields.map(({ key, label, type, ...rest }) => (
                  <div className="flex gap-2">
                    <label htmlFor={key} className="text-sm flex-1">
                      {label}
                    </label>
                    <input type={type} id={key} {...rest} />
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      ))}
    </form>
  );
}

export default Form;
