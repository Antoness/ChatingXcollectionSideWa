import PropTypes from "prop-types";
import { Controller } from "react-hook-form";
import { Form, FormLabel, InputGroup } from "react-bootstrap";
import "./style.scss";

const InputField = ({
  id,
  name,
  control,
  errors,
  label,
  value,
  type = "text",
  onChange,
  isMulti,
  placeholder,
  rows = 1,
  className,
  style,
  ...props
}) => {
  return (
    <Controller
      name={name}
      defaultValue=""
      control={control}
      render={({ field }) => (
        <InputGroup className="w-100 input-wrapper" hasValidation>
          {label && (
            <FormLabel htmlFor={id ? id : name} className="input__label">
              {label}
            </FormLabel>
          )}
          <Form.Control
            as={!isMulti ? "input" : "textarea"}
            {...field}
            type={type}
            id={id ?? name}
            onChange={(e) => {
              if (onChange) {
                onChange(e);
              } else {
                field.onChange(e);
              }
            }}
            value={value ? value : field.value}
            rows={isMulti && rows}
            className={[className, "w-100 input__text rounded-lg"].join(" ")}
            style={{
              resize: "none",
              ...(!!errors[name] && { borderColor: "red" }),
              ...style,
            }}
            isValid={false}
            placeholder={placeholder}
            {...props}
          />
          {!!errors[name] && (
            <span className="error">
              {!!errors[name] && errors[name].message}
            </span>
          )}
        </InputGroup>
      )}
    />
  );
};

InputField.propTypes = {
  name: PropTypes.string.isRequired,
  id: PropTypes.string,
  label: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
  rows: PropTypes.number,
  type: PropTypes.oneOf(["text", "number", "date"]),
  isMulti: PropTypes.bool,
  style: PropTypes.any,
  placeholder: PropTypes.string,
  control: PropTypes.any.isRequired,
  errors: PropTypes.any.isRequired,
  className: PropTypes.string,
};

export default InputField;
