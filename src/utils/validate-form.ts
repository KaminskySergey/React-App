import * as yup from 'yup';
import { Priority } from '../types/task.interface';


export const validationSchema = yup.object().shape({
  name: yup
    .string()
    .required('Required field')
    .matches(/^[^\d]+$/, 'Only letters and symbols are allowed'),
    description: yup
    .string()
    .required('Required field'),
    priority: yup
    .string()
    .required('Required field')
    .oneOf(Object.keys(Priority), 'Invalid priority'),
    category: yup
    .string()
    .required('Required field'),
    date: yup
    .date()
    .required('Required field')
    .min(new Date(), 'Date cannot be in the past'),
});

export const validationSchemaList = yup.object().shape({
  name: yup
    .string()
    .required('Required field')
    .matches(/^[^\d]+$/, 'Only letters and symbols are allowed'),
});


export const validationSchemaEdit = yup.object().shape({
  name: yup
    .string()
    .required('Required field')
    .matches(/^[^\d]+$/, 'Only letters and symbols are allowed'),
    description: yup
    .string()
    .required('Required field'),
    priority: yup
    .string()
    .required('Required field')
    .oneOf(Object.keys(Priority), 'Invalid priority'),
    category: yup
    .string()
    .required('Required field'),
    date: yup
    .date()
    .required('Required field')
    .min(new Date(), 'Date cannot be in the past'),
});