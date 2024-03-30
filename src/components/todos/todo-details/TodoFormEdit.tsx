import { useFormik } from "formik";
import { useEffect } from "react";
import { validationSchemaEdit } from "../../../utils/validate-form";
import { ITask, Priority } from "../../../types/task.interface";
import { useAppDispatch, useAppSelector } from "../../../hooks/redux-hooks";
import Button from "../../button/Button";
import { listAll } from "../../../redux/list/operations";
import { selectIsList } from "../../../redux/list/selectors";
import { taskUpdate } from "../../../redux/todo/operations";
import { formatDate, formatDateDMY } from "../../../utils/format-date";


interface ITodoFormEdit {
    todo: ITask
    handleEditing: () => void
}

export default function TodoFormEdit({handleEditing, todo }: ITodoFormEdit) {
    const dispatch = useAppDispatch()
    useEffect(() => {
    dispatch(listAll())
    }, [dispatch])
    
    const allStatus = useAppSelector(selectIsList)

    const formik = useFormik({
        initialValues: {
            name: todo.name,
            category: todo.category,
            date: formatDateDMY(todo.date),
            priority: todo.priority,
            description: todo.description

        },
        validationSchema: validationSchemaEdit,
        onSubmit: async (values, { resetForm }) => {
            values.date = formatDate(values.date);
            dispatch(taskUpdate({id: todo.id, ...values}))
            resetForm()
            handleEditing()
        },
    });


    return <div> <form onSubmit={formik.handleSubmit} className="w-11/12 mx-auto flex flex-col">
        <div className="flex gap-[25px]">
        <div className="w-[50%]">
            <div className="mb-4">
                <label htmlFor="name" className="block text-black text-sm font-bold mb-2">
                    Name
                </label>
                <input
                    type="text"
                    id="name"
                    name="name"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.name}
                    className={`w-full p-2 border ${formik.touched.name && formik.errors.name ? 'border-red-500' : 'border-gray-300'} h-[45px] rounded-md`}
                />
                {formik.touched.name && formik.errors.name && (
                    <p className="text-red-500 text-base mt-1">{formik.errors.name}</p>
                )}
            </div>
            <div className="mb-4">
                <label htmlFor="category" className="block text-black text-sm font-bold mb-2">
                    Status
                </label>
                <select
                    id="category"
                    name="category"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.category}
                    className={`w-full p-2 border ${formik.touched.category && formik.errors.category ? 'border-red-500' : 'border-gray-300'} h-[45px] rounded-md`}
                >
                    {
                        allStatus.map(el => (
                            <option key={el.id} value={el.name}>{el.name}</option>
                        ))
                    }
                </select>
                {formik.touched.category && formik.errors.category && (
                    <p className="text-red-500 text-base mt-1">{formik.errors.category}</p>
                )}
            </div>
        </div>


        <div className="w-[50%]">
            <div className="mb-4">
                <label htmlFor="date" className="block text-black text-sm font-bold mb-2">
                    Date
                </label>
                <input
                    type="date"
                    id="date"
                    name="date"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.date}
                    className={`w-full p-2 border ${formik.touched.date && formik.errors.date ? 'border-red-500' : 'border-gray-300'} h-[45px] rounded-md`}
                />
                {formik.touched.date && formik.errors.date && (
                    <p className="text-red-500 text-base mt-1">{formik.errors.date}</p>
                )}
            </div>

            <div className="mb-4">
                <label htmlFor="priority" className="block text-black text-sm font-bold mb-2">
                    Priority
                </label>
                <select
                    id="priority"
                    name="priority"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.priority}
                    className={`w-full p-2 border ${formik.touched.priority && formik.errors.priority ? 'border-red-500' : 'border-gray-300'} h-[45px] rounded-md`}
                >
                    {
                        Object.keys(Priority).map(key => (
                            <option key={key} value={key}>{key.toLowerCase()}</option>
                        ))
                    }
                </select>
                {formik.touched.priority && formik.errors.priority && (
                    <p className="text-red-500 text-base mt-1">{formik.errors.priority}</p>
                )}
            </div>
        </div>
        </div>

        <div className="mb-4">
            <label htmlFor="description" className="block text-black text-sm font-bold mb-2">
                Description
            </label>
            <input
                type="text"
                id="description"
                name="description"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.description}
                className={`w-full p-2 border ${formik.touched.description && formik.errors.description ? 'border-red-500' : 'border-gray-300'} h-[45px] rounded-md`}
            />
            {formik.touched.description && formik.errors.description && (
                <p className="text-red-500 text-base mt-1">{formik.errors.description}</p>
            )}
        </div>
        <div className='mt-[24px] flex justify-between gap-[5px]'>

            <Button type="submit" green createList>
                Save
            </Button>
            <Button type="button" onClick={handleEditing} red createList>
                Cancel
            </Button>
            
        </div>
    </form></div>
}
