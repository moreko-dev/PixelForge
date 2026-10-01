import { DefaultInput } from "../../../../components/Inputs";

function TabContentFields({ fields, states }) {
  return (
    <div className="mt-2 my-4 flex flex-col gap-2">
      {fields.map((item, index) => (
        <div key={index} className="flex gap-2 items-center">
          <label htmlFor={item.id} className="flex-1">
            {item.label}:
          </label>
          <DefaultInput
            type={item.type}
            id={item.id}
            className="w-20 py-1 px-2 rounded-md text-sm"
            // value={states[index].value}
            // onChange={states[index].onChange}
          />
          {item.unit && <span className="text-text-muted">{item.unit}</span>}
        </div>
      ))}
    </div>
  );
}

export default TabContentFields;
