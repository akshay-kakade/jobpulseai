import React from 'react'
import { FormControl,  FormItem, FormLabel, FormMessage } from './ui/form'
import { Input } from './ui/input'
import { Control, Controller, FieldValues } from 'react-hook-form'

interface FormFieldProps<T extends FieldValues> {
    control: Control<T>
    name: keyof T
    label: string
    placeholder?: string
    type?: 'text' | 'password' | 'email' | 'file'
}
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const FormField = ({control, name, label, placeholder, type="text"}: FormFieldProps<T>) => (
   <Controller name={name} control={control} render={({ field }) => (
    <FormItem>
        <FormLabel className='label'>{label}</FormLabel>
        <FormControl>
          <Input 
          className='input' 
          placeholder={placeholder} 
          {...field} 
          name={String(field.name)} 
          type={type}
          />
        </FormControl>
        <FormMessage />
      </FormItem>
   )} />
      
)


export default FormField
