import { Select, SelectTrigger, SelectValue } from "@radix-ui/react-select";

function CommonForm({ formFields, formData, setFormData, onSubmit, buttonText }) {

    function renderInputField(field) {
        let element = null;
        switch (field.type) {
            case 'input':
                element = <input
                    type={field.type}
                    name={field.name}
                    placeholder={field.placeholder}
                    id={field.id}
                />;
                break;

            case 'select':
                element = (
                    <Select>
                        <SelectTrigger className="w-full">
                            <SelectValue placeholder={field.placeholder} />
                        </SelectTrigger>
                        <SelectContent>
                            {
                                field.options && field?.options.length > 0 ?
                                    field.options.map(option => <SelectItem key={option.id} value={option.id}>{option.label}</SelectItem>)
                                    : null
                            }
                        </SelectContent>
                    </Select>
                )
                break;

            case 'textarea':
                element = (
                    <textarea
                        placeholder={field.placeholder}
                        name={field.name}
                        id={field.id}
                    />
                );
                break;

            default:
                element = <input
                    type={field.type}
                    name={field.name}
                    placeholder={field.placeholder}
                    id={field.id}
                />;
                break;
        }

        return element;
    }
    return (
        <form>
            <div className="flex flex-col gap-3">
                {
                    formFields.map(field => <div key={field.id} className="grid w-full gap-1.5">
                        <label htmlFor={field.name} className="mb-1">{field.label}</label>
                        {
                            renderInputField(field)
                        }
                    </div>)
                }
            </div>
        </form>
    )
}

export default CommonForm;