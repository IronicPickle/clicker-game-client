import type { ChangeData } from "@ts/form";
import { writable, get } from "svelte/store";
import type Validator from "@shared/utils/Validator";
import type { ApiErrors } from "@api/api";
import { isBoolean } from "@shared/utils/generic";

export default <IS extends object>(
  initialValues: IS,
  handle: (values: IS) => void,
  getValidators?: (values: IS) => {
    [N in keyof IS]?: Validator;
  },
) => {
  const values = writable(initialValues);
  const errs = writable({ failed: false } as ApiErrors<IS>);

  const updateErrs = <N extends keyof IS>(name: N, errors: string[]) => {
    errs.update(errs => {
      const newErrs = { ...errs, [name]: errors };
      if (errors.length === 0) delete newErrs[name];
      const failed = Object.values(newErrs).some(err => !isBoolean(err) && err);

      return { ...newErrs, failed };
    });
  };

  const onChange = <N extends keyof IS>({ name, value }: ChangeData<N, IS[N]>) => {
    if (name == null) return;

    values.update(values => ({ ...values, [name]: value }));

    validate(name);
  };

  const validate = <N extends keyof IS>(name: N) => {
    if (!getValidators) return { failed: false } as ApiErrors<IS>;

    const currentValues = get(values);
    const validator = getValidators(currentValues)[name];
    if (!validator) return { failed: false } as ApiErrors<IS>;

    updateErrs(name, validator.getErrors());
  };

  const validateAll = () => {
    for (const name of Object.keys(get(values)) as Array<keyof IS>) validate(name);
  };

  const onSubmit = () => {
    validateAll();
    const failed = get(errs).failed;
    if (!failed) handle(get(values));
    return !failed;
  };

  return { values, errs, onChange, onSubmit };
};
