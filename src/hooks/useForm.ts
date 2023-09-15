import type { ChangeData } from "@ts/form";
import { writable, get } from "svelte/store";
import type Validator from "@shared/utils/Validator";
import type { ValidationErrors } from "@shared/ts/api/generic";
import { isBoolean } from "@shared/utils/generic";

export default <IS extends object>(
  initialValues: IS,
  handle: (values: IS) => void,
  getValidators?: (values: IS) => {
    [N in keyof IS]?: Validator;
  },
) => {
  const values = writable(initialValues);
  const validation = writable({ failed: false } as ValidationErrors<keyof IS>);

  const updateValidation = <N extends keyof IS>(name: N, errors: string[]) => {
    validation.update(validation => {
      const newValidation = { ...validation, [name]: errors };
      if (errors.length === 0) delete newValidation[name];
      const failed = Object.values(newValidation).some(err => !isBoolean(err) && err);

      return { ...newValidation, failed };
    });
  };

  const onChange = <N extends keyof IS>({ name, value }: ChangeData<N, IS[N]>) => {
    if (name == null) return;

    values.update(values => ({ ...values, [name]: value }));

    validate(name);
  };

  const validate = <N extends keyof IS>(name: N) => {
    if (!getValidators) return { failed: false } as ValidationErrors<keyof IS>;

    const currentValues = get(values);
    const validator = getValidators(currentValues)[name];
    if (!validator) return { failed: false } as ValidationErrors<keyof IS>;

    updateValidation(name, validator.getErrors());
  };

  const validateAll = () => {
    for (const name of Object.keys(get(values)) as Array<keyof IS>) validate(name);
  };

  const onSubmit = () => {
    validateAll();
    const failed = get(validation).failed;
    if (!failed) handle(get(values));
    return !failed;
  };

  return { values, validation, onChange, onSubmit };
};
