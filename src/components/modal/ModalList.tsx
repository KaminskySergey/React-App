import { IoCloseSharp } from "react-icons/io5";
import { useFormik } from "formik";
import { useAppDispatch } from "../../hooks/redux-hooks";
import { validationSchemaList } from "../../utils/validate-form";
import { listCreate, listUpdate } from "../../redux/list/operations";
import Button from "../button/Button";


interface IModalList {
    handleToggle: () => void;
    currentName?: string | undefined,
    id?: string | undefined,
    isEditing?: boolean
 }

export default function ModalList({handleToggle, currentName, id = '', isEditing }: IModalList) {
    const dispatch = useAppDispatch()
    
    const formik = useFormik({
        initialValues: {
            name: isEditing && currentName ? currentName : '',
        },
        validationSchema: validationSchemaList,
        onSubmit: async (values, { resetForm }) => {
            if (isEditing) {
                dispatch(listUpdate({id, name: values.name}));
                
            } else {
                dispatch(listCreate(values));
            }
           
            resetForm()
            handleToggle()
        },
    });



    return <div className="w-[300px] h-auto relative z-20 py-[16px]">

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
                <div className='mt-[24px] flex justify-between'>

                    <Button type="submit" isEditing={isEditing ? true : false} createList>
                        {isEditing ? 'Edit List' : 'Create List'} 
                    </Button>
                </div>
            </form>
        </div>
    </div>
}
