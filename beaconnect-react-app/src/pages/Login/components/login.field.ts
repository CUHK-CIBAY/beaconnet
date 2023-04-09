export type FormFieldElements = {
  email: HTMLInputElement;
  username: HTMLInputElement;
  password: HTMLInputElement;
  'confirm-password': HTMLInputElement;
} & HTMLFormControlsCollection;

export type FormElement = {
  readonly elements: FormFieldElements;
} & HTMLFormElement;

export const RegisterField = [
  {
    id: 'email',
    type: 'text',
    placeholder: 'Enter Here',
    label: 'Email',
  },
  {
    id: 'username',
    type: 'text',
    placeholder: 'Enter Here',
    label: 'Username',
  },
  {
    id: 'password',
    type: 'password',
    placeholder: 'Enter Here',
    label: 'Password',
  },
  {
    id: 'confirm-password',
    type: 'password',
    placeholder: 'Enter Here',
    label: 'Confirm Password',
  },
];

export const LoginField = [
  {
    id: 'username',
    type: 'text',
    placeholder: 'Enter Here',
    label: 'Username',
  },
  {
    id: 'password',
    type: 'password',
    placeholder: 'Enter Here',
    label: 'Password',
  },
];
