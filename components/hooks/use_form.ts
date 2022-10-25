import React, { useState } from 'react'

interface useFormReturnInterface {
  handleChange: React.ChangeEventHandler<HTMLInputElement>
  handleSubmission: React.FormEventHandler<HTMLFormElement>
  values: any
  errFields: string[]
}

type useFormHandler = {
  (onSubmit: React.FormEventHandler<HTMLFormElement>): useFormReturnInterface
}

const useForm: useFormHandler = (onSubmit) => {
  const [values, setValues] = useState({})
  const [errFields, setErrfields] = useState<string[]>([])

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setValues({
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmission: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault()
    /*
     *
     *    for (let element of (e.target as HTMLFormElement).elements) {
     *      if (!(element as HTMLInputElement).validity.valid) {
     *        invalidFields.push(element.getAttribute("name"));
     *      }
     *    }
     *
     *    if (invalidFields.length > 0) {
     *      setErrfields(invalidFields);
     *    } else {
     *      onSubmit(e);
     *    }
     */
    onSubmit(e)
  }

  return {
    handleChange,
    handleSubmission,
    values,
    errFields,
  }
}

export default useForm
