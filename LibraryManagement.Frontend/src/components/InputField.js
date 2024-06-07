const InputField = (props) => {
  return (
    <div className={`bg-slate-200 p-2 w-[${props.width || "300px"}]`}>
      <label htmlFor={props.id} className="block text-sm">
        {props.label}
      </label>
      {props.type == "textarea" ? (
        <textarea
          {...props}
          className="w-full bg-transparent transition-all focus:bg-black focus:bg-opacity-10 focus:p-2 focus:outline-none"
        ></textarea>
      ) : (
        <input
          {...props}
          className="w-full bg-transparent transition-all focus:bg-black focus:bg-opacity-10 focus:p-2 focus:outline-none"
        />
      )}
    </div>
  );
};

export default InputField;
