import React, { useState } from 'react';

import Button from '../Button/Button';
import TextField from '../TextField/TextField';

interface FormValues {
  name: string;
  email: string;
  password: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  password?: string;
}

const validate = (values: FormValues): FormErrors => {
  const errors: FormErrors = {};

  if (!values.name.trim()) {
    errors.name = 'Nome é obrigatório.';
  } else if (values.name.trim().length < 3) {
    errors.name = 'Nome deve ter pelo menos 3 caracteres.';
  }

  if (!values.email.trim()) {
    errors.email = 'E-mail é obrigatório.';
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
    errors.email = 'Informe um e-mail válido.';
  }

  if (!values.password) {
    errors.password = 'Senha é obrigatória.';
  } else if (values.password.length < 8) {
    errors.password = 'Senha deve ter pelo menos 8 caracteres.';
  }

  return errors;
};

const Form = () => {
  const [values, setValues] = useState<FormValues>({
    name: '',
    email: '',
    password: '',
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (field: keyof FormValues) => (value: string) => {
    setValues((prev) => ({ ...prev, [field]: value }));

    // Limpa o erro externo do campo conforme o usuário digita
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const validationErrors = validate(values);

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});
    setSubmitted(true);
  };

  const handleReset = () => {
    setValues({ name: '', email: '', password: '' });
    setErrors({});
    setSubmitted(false);
  };

  if (submitted) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16, maxWidth: 400 }}>
        <p style={{ color: 'green', fontWeight: 600 }}>
          Formulário enviado com sucesso!
        </p>
        <pre style={{ background: '#f4f4f4', padding: 12, borderRadius: 6, fontSize: 13 }}>
          {JSON.stringify(values, null, 2)}
        </pre>
        <Button variant="outlined" onClick={handleReset}>
          Preencher novamente
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate style={{ display: 'flex', flexDirection: 'column', gap: 16, maxWidth: 400 }}>
      <TextField
        label="Nome"
        type="text"
        value={values.name}
        onChange={handleChange('name')}
        placeholder="Digite seu nome"
        error={!!errors.name}
        errorMessage={errors.name}
        maxLength={60}
      />

      <TextField
        label="E-mail"
        type="email"
        value={values.email}
        onChange={handleChange('email')}
        placeholder="Digite seu e-mail"
        error={!!errors.email}
        errorMessage={errors.email}
        maxLength={80}
      />

      <TextField
        label="Senha"
        type="password"
        value={values.password}
        onChange={handleChange('password')}
        placeholder="Mínimo 8 caracteres"
        error={!!errors.password}
        errorMessage={errors.password}
        maxLength={50}
        helperText="Deve conter letras e números"
      />

      <Button type="submit" variant="filled">
        Enviar
      </Button>
    </form>
  );
};

export default Form;
