import { IoCloseSharp } from "react-icons/io5";
import Button from "../button/Button";
import { useFormik } from "formik";
import { Priority } from "../../types/task.interface";
import { validationSchema } from "../../utils/validate-form";
import { useAppDispatch } from "../../hooks/redux-hooks";
import { taskCreate } from "../../redux/todo/operations";
import { formatDate } from "../../utils/format-date";

interface IModalCreateTodo {
    handleToggle: () => void,
    currentCategory: string
}

export default function ModalCreateTodo({ handleToggle, currentCategory }: IModalCreateTodo) {
    const dispatch = useAppDispatch()
    const formik = useFormik({
        initialValues: {
            name: '',
            description: '',
            date: '',
            priority: 'LOW',
            category: currentCategory
        },
        validationSchema: validationSchema,
        onSubmit: async (values, { resetForm }) => {
            values.date = formatDate(values.date);
            dispatch(taskCreate(values))
            resetForm()
            handleToggle()
        },
    });



    return <div className="w-96 h-[500px] relative z-20 pt-[52px]">

        <Button onClick={handleToggle} className="absolute top-[7px] right-[7px]">
            <IoCloseSharp />
        </Button>
        <div>
            <form onSubmit={formik.handleSubmit} className="w-11/12 mx-auto">
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
                        className={`w-full p-2 border ${formik.touched.name && formik.errors.name ? 'border-red-500' : 'border-gray-300'} rounded-md`}
                    />
                    {formik.touched.name && formik.errors.name && (
                        <p className="text-red-500 text-base mt-1">{formik.errors.name}</p>
                    )}
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
                        className={`w-full p-2 border ${formik.touched.description && formik.errors.description ? 'border-red-500' : 'border-gray-300'} rounded-md`}
                    />
                    {formik.touched.description && formik.errors.description && (
                        <p className="text-red-500 text-base mt-1">{formik.errors.description}</p>
                    )}
                </div>

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
                        className={`w-full p-2 border ${formik.touched.date && formik.errors.date ? 'border-red-500' : 'border-gray-300'} rounded-md`}
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
                        className={`w-full p-2 border ${formik.touched.priority && formik.errors.priority ? 'border-red-500' : 'border-gray-300'} rounded-md`}
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

                <div className='mt-[24px] flex justify-between'>

                    <Button type="submit" createList>
                        Create To Do
                    </Button>
                </div>
            </form>
        </div>
    </div>
}
